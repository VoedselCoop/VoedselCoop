openerp.pos_logo = function (instance) {
    var module = instance.point_of_sale;

    var PosModelSuper = module.PosModel;
    module.PosModel = module.PosModel.extend({
        initialize: function (session, attributes) {
            /* Add the company logo to the available fields in the POS */
            var self = this;
            _.each(self.models, function(model) {
                if (model.model === 'res.company') {
                    model.fields.push('pos_logo');
                }
            });
            PosModelSuper.prototype.initialize.apply(this, arguments);
        }
    });

    var OrderSuper = module.Order;
    module.Order = module.Order.extend({
        export_for_printing: function(){
            res = OrderSuper.prototype.export_for_printing.apply(this, arguments);
            if(this.pos.company.pos_logo) {
                res.pos_logo = 'data:image/png;base64,' + this.pos.company.pos_logo;
            }
            return res;
        }
    });
}
