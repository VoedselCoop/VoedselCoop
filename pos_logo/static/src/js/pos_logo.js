openerp.pos_logo = function (instance) {
    var module = instance.point_of_sale;

    var PosModelSuper = module.PosModel;
    module.PosModel = module.PosModel.extend({
        initialize: function (session, attributes) {
            /* Add the company logo to the available fields in the POS */
            PosModelSuper.prototype.initialize.apply(this, arguments);
            var self = this;
            _.each(self.models, function(model) {
                if (model.model === 'res.company') {
                    model.fields.push('pos_logo');
                }
            });
        }
    });
}
