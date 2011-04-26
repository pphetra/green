ProductView = Ext.extend(Ext.form.FormPanel, {
	initComponent: function() {
		Ext.apply(this, {
			dockedItems: [
				{
					dock : 'top',
					xtype: 'toolbar',
					title: 'Product',
					items: [
						{
							ui: 'back',
							text: 'Back',
							handler: function() {
								app.viewport.setActiveItem(0, {type: 'slide', direction: 'right'})
							}
						}
					]
				},
                {
                    dock : 'left',
                    xtype: 'list',
                    width: 250,
                    store: productStore,
        			itemTpl: '<div class="category">{name}</div>',
        			listeners: {
        				'selectionchange': function(selModel, records) {
        					Ext.dispatch({
					            controller: app.controllers.product,
					            action: 'show',
					            record: records[0]
					        });		
        				}
        			},
        			onItemDiscloxsure: function(record) {
        			}
                }
            ],
			items: [
				{
					xtype: 'displayfield',
					name: 'name',
					label: 'Name'
				},
				{
					xtype: 'displayArea',
					name: 'description',
					label: 'Description',
					maxRows: 20
				},
				{
					xtype: 'imagefield',
					itemId: 'imageField',
					height: 400
				}
			]
		});

		ProductView.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('productView', ProductView);