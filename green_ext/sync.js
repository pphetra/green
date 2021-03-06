database.db.transaction(function(tx) {
	//tx.executeSql('create table if not exists category(id integer primary key asc, name varchar(200))', []);
	tx.executeSql('create table if not exists product' +
		'(id integer primary key asc, name varchar(200), ' +
		'imagePath varchar(300), description text, ' +
		'categoryId integer, producerId integer, producerName varchar(200), ' +
		'standardId integer, standardName varchar(200))', []);
})

function sync() {
	Ext.Ajax.request({
		url: 'http://localhost:8000/sync/',
		success: function(response, opts) {
			var obj = Ext.decode(response.responseText);
			categoryStore.proxy.clear();
			categoryStore.load();

			Ext.each(obj.categories, function(item) {
				categoryStore.add(item);
			});

			categoryStore.sync();

			var total = obj.products.length;
			var cnt = 0;
			var bg =  chrome.extension.getBackgroundPage();
			Ext.each(obj.products, function(item) {
				productStore.add(item);
				bg.loadImg(item.imagePath, 'http://localhost:8000' + item.imagePath, function() {
					cnt++;
				})
			})
			productStore.sync();
		}
	})	
}
