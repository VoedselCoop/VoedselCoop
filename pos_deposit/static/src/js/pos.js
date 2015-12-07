openerp.pos_deposit = function (instance) {
    var module = instance.point_of_sale;

    var PosModelSuper = module.PosModel;
    module.PosModel = module.PosModel.extend({
        initialize: function (session, attributes) {
            // Add the deposit related fields to the product model
            var self = this;
            _.each(self.models, function(model) {
                if (model.model === 'res.product') {
                    model.fields.push('select_deposit');
                    model.fields.push('use_deposit');
                }
            });
            PosModelSuper.prototype.initialize.apply(this, arguments);
        }
    });

    var OrderSuper = module.Order;
    module.Order = module.Order.extend({
        addProduct: function(product, options){
            // Create deposit line for products with a deposit
            OrderSuper.prototype.addProduct.apply(arguments);
            var attr = JSON.parse(JSON.stringify(product));
            if (attr.use_deposit) {
                if (attr.select_deposit && attr.select_deposit[0]) {
                    var dep_prod = this.pos.db.get_product_by_id(attr.select_deposit[0]);
                    last = this.selectLine(this.getLastOrderline());
                    var dep_line = new module.Orderline({}, {pos: this.pos, order: this, product: dep_prod});
                    this.get('orderLines').add(dep_line);
                    dep_line.deposit_for = last;
                    last.deposit_line = dep_line;
                } else {
                    alert ('Product for deposit is not configured properly !');
                    return;
                }
            } 
            this.selectLine(this.getLastOrderline());
        },
    });
    
    var OrderWidgetSuper = module.OrderWidget;
    module.OrderWidget = module.OrderWidget.extend({
    	set_value: function(val) {
            // Sync quantity to related deposit lines
            OrderWidgetSuper.prototype.set_value.apply(arguments);
            var order = this.pos.get('selectedOrder');
            if (this.editable && order.getSelectedLine()) {
                var mode = this.numpad_state.get('mode');
                if( mode === 'quantity'){
                    var line = order.getSelectedLine();
                    var related = line.deposit_line || line.deposit_for;
                    if (related) related.set_quantity(val);
                }
            }
        },
    });
}
