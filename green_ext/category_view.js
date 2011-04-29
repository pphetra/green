CategoryView = Ext.extend(Ext.Panel, {
	initComponent: function() {
		Ext.apply(this, {
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			dockedItems: [
                {
                    dock: 'top',
                    xtype: 'toolbar',
                    title: 'Green Fair',
                    items: [
                        {
                            xtype : 'searchfield',
                            name  : 'query'
                        }
                    ]
                }
            ],
			items: [{
				xtype: 'list',
				height: 500,
				width: 300,
				store: categoryStore,
				itemTpl: '<div class="category">{name}</div>',
				onItemDisclosure: function(record) {
					Ext.dispatch({
			            controller: app.controllers.category,
			            action: 'show',
			            record: record
			        });
				}
			}]
		});
		CategoryView.superclass.initComponent.apply(this, arguments);
	}
});


Ext.reg('categoryView', CategoryView);