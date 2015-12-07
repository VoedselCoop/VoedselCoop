openerp.pos_deposit = function (instance) {
    var module = instance.point_of_sale;

    var PosModelSuper = module.PosModel;
    module.PosModel = module.PosModel.extend({
        initialize: function (session, attributes) {
            /* Add the deposit related fields to the product model */
            var self = this;
            _.each(self.models, function(model) {
                if (model.model === 'product.product') {
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
            /* Create deposit line for products with a deposit. Check if 
               pos_deposit's addProduct() has triggered a merge with an existing
               line, and in that case don't do anything. Otherwise, add a line
               with the deposit product. */
            OrderSuper.prototype.addProduct.apply(this, arguments);
            var merged_line = null;
            var orderLines = this.get('orderLines').models;
            for (var i = 0; i < orderLines.length; i++) {
                if (orderLines[i].merged) {
                    merged_line = orderLines[i];
                    break;
                }
            }
            if (merged_line) {
                merged_line.merged = false;
            } else {
                var attr = JSON.parse(JSON.stringify(product));
                if (attr.use_deposit) {
                    if (attr.select_deposit && attr.select_deposit[0]) {
                        var dep_prod = this.pos.db.get_product_by_id(attr.select_deposit[0]);
                        last = this.getLastOrderline();
                        var dep_line = new module.Orderline({}, {pos: this.pos, order: this, product: dep_prod});
                        this.get('orderLines').add(dep_line);
                        dep_line.deposit_for = last;
                        last.deposit_line = dep_line;
                    } else {
                        alert ('Product for deposit is not configured properly !');
                        return;
                    }
                }
            } 
            this.selectLine(this.getLastOrderline());
        },
    });
    
    var OrderlineSuper = module.Orderline;
    module.Orderline = module.Orderline.extend({
        merge: function(orderline){
            /* Mark the target merge line to be picked up in our override of
               addProduct() */
            OrderlineSuper.prototype.merge.apply(this, arguments);
            this.merged = 1;
        },
        set_quantity: function(quantity, no_propagate) {
            /* Keep quantities in sync between deposit product lines and
               lines containing the deposit */
            OrderlineSuper.prototype.set_quantity.apply(this, arguments);
            if (!no_propagate) {
                var related = this.deposit_line || this.deposit_for;
                if (related) related.set_quantity(quantity, true);
            }
        },
    });

}
