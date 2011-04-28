database = {
	db: openDatabase("green", '1.0', 'image database', 15 * 1024 * 1024)
}

Ext.regModel('Category', {
	fields: ['id', 'name'],
	proxy: {
        type: 'localstorage',
        id  : 'category'
    }
});

Ext.regModel('Product', {
	fields: ['id', 'name', 'description', 'imagePath', 'categoryId', 'producerId', 'producerName', 'standardId', 'standardName'],
	proxy: {
		type: 'sqlitestorage',
		db: database.db,
		tableName: 'product'
	}
});

categoryStore = new Ext.data.Store({
	model: 'Category',
	sorters: 'name',
	autoLoad: true
})

productStore = new Ext.data.Store({
	model: 'Product',
	sorters: 'name',
	autoLoad: true,
})
