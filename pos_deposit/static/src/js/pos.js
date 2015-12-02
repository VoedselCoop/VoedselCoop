openerp.pos_deposit = function (instance) {
    var module = instance.point_of_sale;

    var PosModelSuper = module.PosModel;
    module.PosModel = module.PosModel.extend({
        initialize: function (session, attributes) {
            /* Add the company logo to the available fields in the POS */
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

    var orderline_id = 1;
    instance.point_of_sale.Orderline = instance.point_of_sale.Orderline.extend({
    	initialize: function(attr,options){
            this.pos = options.pos;
            this.order = options.order;
            this.product = options.product;
            this.price   = options.product.price;
            this.quantity = 1;
            this.quantityStr = '1';
            this.discount = 0;
            this.discountStr = '0';
            this.type = 'unit';
            this.selected = false;
            this.id       = orderline_id++; 
            this.dep_prod = null;
            this.unique_id= null;
        },
        set_deposit_of: function(dep_prod) {
            this.set('dep_prod', dep_prod);
        },
        get_deposit_of: function() {
            return this.get('dep_prod');
        },
        set_line_uniqueId: function(unique_id) {
        	this.set('unique_id', unique_id);
        },
        get_line_uniqueId: function() {
        	return this.get('unique_id');
        }
    });
    
    instance.point_of_sale.Order = instance.point_of_sale.Order.extend({
//    	generateUniqueId_line: function() {
//            return new Date().getTime();
//        },
        addProduct: function(product, options){
            options = options || {};
            var attr = JSON.parse(JSON.stringify(product));
            attr.pos = this.pos;
            attr.order = this;
            
            var line = new instance.point_of_sale.Orderline({}, {pos: this.pos, order: this, product: product});
            line.set_line_uniqueId(new Date().getTime());
            if(options.quantity !== undefined){
                line.set_quantity(options.quantity);
            }
            if(options.price !== undefined){
                line.set_unit_price(options.price);
            }
            if(options.discount !== undefined){
                line.set_discount(options.discount);
            }

            var last_orderline = this.getLastOrderline();
            if( last_orderline && last_orderline.can_be_merged_with(line) && options.merge !== false){
                last_orderline.merge(line);
            }else{
                this.get('orderLines').add(line);
            }
            if (attr.use_deposit) {
                if (attr.select_deposit && attr.select_deposit[0]) {
                    var dep_prod = this.pos.db.get_product_by_id(attr.select_deposit[0]);
                    var dep_line = new instance.point_of_sale.Orderline({}, {pos: this.pos, order: this, product: dep_prod});
                    this.get('orderLines').add(dep_line);
                    dep_line.set_deposit_of(attr.display_name)
                    dep_line.set_line_uniqueId(line.get_line_uniqueId());
                } else {
                    alert ('Product for deposit is not configured properly !');
                    return;
                }
            } 
            this.selectLine(this.getLastOrderline());
        },
    });
    
    instance.point_of_sale.OrderWidget = instance.point_of_sale.OrderWidget.extend({
    	set_value: function(val) {
            var order = this.pos.get('selectedOrder');
            currentOrderLines = order.get('orderLines');
            if (this.editable && order.getSelectedLine()) {
                var mode = this.numpad_state.get('mode');
                if( mode === 'quantity'){
                	var uniqueid = order.getSelectedLine().get_line_uniqueId();
                    order.getSelectedLine().set_quantity(val);

                    (currentOrderLines).each(_.bind( function(item) {
                        dep_uniqueid = item.get_line_uniqueId();
                        if (dep_uniqueid == uniqueid) {
                        	item.set_quantity(val)
                        }
                    }, this));

                }else if( mode === 'discount'){
                    order.getSelectedLine().set_discount(val);
                }else if( mode === 'price'){
                    order.getSelectedLine().set_unit_price(val);
                }
            }
        },
    });
}
