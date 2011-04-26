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
	fields: ['id', 'name', 'description', 'imagePath', 'categoryId'],
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
	// data: [
	// 	{id: 1, name: 'Rice 1', description: 'desc 1', categoryId: 1},
	// 	{id: 2, name: 'Rice 2', description: 'desc 2', categoryId: 1},
	// 	{id: 3, name: 'Rice 3', description: 'desc 3', categoryId: 1},
	// 	{id: 4, name: 'Drink 1', description: 'desc 1', categoryId: 2},
	// 	{id: 5, name: 'Drink 2', description: 'desc 2', categoryId: 2},
	// 	{id: 6, name: 'Meat 1', description: 'desc 1', categoryId: 3},
	// ]
})
