/**
 * A model for a category which can be linked to many other database objects
 * @class Category
 */
Category = BaseModel.extendAndSetupCollection("categories", {userId: true});
LinkableModel.makeLinkable(Category, {optional: true});

//create the schema
Category.appendSchema({
    "type": {
        type: String,
        max: 100,
        index: 1
    },
    "name": {
        type: String,
        max: 100
    },
    "icon": {
        type: String,
        max: 100,
        optional: true
    },
    "itemCount": {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 0;
            }
        }
    }
});

Category.meteorMethods({
    insert: new ValidatedMethod({
        name: 'categories.insert',
        mixins: [CallPromiseMixin, LoggedInMixin],
        validate: new SimpleSchema({
            doc: {
                type: Object
            },
            'doc.linkedObjectId': Category.getSchemaKey('linkedObjectId'),
            'doc.linkedObjectType': Category.getSchemaKey('linkedObjectType'),
            'doc.type': Category.getSchemaKey('type'),
            'doc.name': Category.getSchemaKey('name')
        }).validator(),
        checkLoggedInError: {
            error: 'notLogged',
            message: 'You need to be logged in to call this method',//Optional
            reason: 'You need to login' //Optional
        },
        run({doc}) {
            return Category.collection.insert(doc);
        }
    }),
    update: new ValidatedMethod({
        name: 'categories.update',
        mixins: [CallPromiseMixin, LoggedInMixin],
        validate: new SimpleSchema({
            _id: Category.getSchemaKey('_id'),
            doc: {
                type: Object
            },
            'doc.name': Category.getSchemaKeyAsOptional('name'),
            'doc.icon': Category.getSchemaKeyAsOptional('icon')
        }).validator(),
        checkLoggedInError: {
            error: 'notLogged',
            message: 'You need to be logged in to call this method',//Optional
            reason: 'You need to login' //Optional
        },
        run({_id, doc}) {
            return Category.collection.update({_id: _id}, {$set: doc});
        }
    }),
    remove: new ValidatedMethod({
        name: 'categories.remove',
        mixins: [CallPromiseMixin, LoggedInMixin],
        validate: Category.getSubSchema(["_id"], null, true),
        checkLoggedInError: {
            error: 'notLogged',
            message: 'You need to be logged in to call this method',//Optional
            reason: 'You need to login' //Optional
        },
        run({_id}) {
            Category.collection.remove({_id: _id});
        }
    })
});