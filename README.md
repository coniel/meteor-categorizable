# Categorizable #

A package for creating arbitrary categories and linking models to them

## CategoryModel ##

```javascript
var thriller = new Category({
    type: 'genre',
    name: 'thriller',
    icon: 'thriller-icon.svg'
}).save();
```

## CategorizableModel ##

```javascript
var Book = BaseModel.extendAndSetupCollection("books");

CategorizableModel.makeCategorizable(Book, "book", options);
```
Class and instance methods coming soon...