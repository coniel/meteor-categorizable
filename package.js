Package.describe({
    name: "coniel:categorizable",
    summary: "A package to create categories and link models to those categories",
    version: "0.0.1",
    git: "https://github.com/coniel/meteor-categorizable.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.2");

    api.use([
        "coniel:linkable-model@0.0.1",
        "coniel:base-model@0.3.0",
        "coniel:can@0.1.0",
        "mdg:validated-method@1.0.1",
        "didericis:callpromise-mixin@0.0.1",
        "tunifight:loggedin-mixin@0.1.0",
        "ecmascript",
        "es5-shim"
    ]);

    api.imply("coniel:linkable-model");

    //Add the friend-model files
    api.addFiles("common/categorizable-model.js");
    api.addFiles("common/category-model.js");


    api.export(["CategorizableModel", "Category"]);
});
