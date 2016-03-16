CategorizableModel = {};

CategorizableModel.makeCategorizable = function (model, type) {
    if (model.appendSchema && type) {
        LinkableModel.registerLinkableType(model, type);
        _.extend(model.prototype, categorizableMethods);
        model.appendSchema(categorizableSchema);
    } else {
        throw new Meteor.Error("makeCategorizableFailed", "Could not make model categorizable. Please make sure you passed in a model and type");
    }
};


var categorizableMethods = {

};

var categorizableSchema = new SimpleSchema({
    categoryId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    }
});