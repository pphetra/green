new Ext.Application({
    name: 'app',
    launch: function() {

    	win = new Ext.Panel({
            floating: true,
            modal: true,
            centered: true,
            hideOnMaskTap: false,
            height: 190,
            width: Ext.is.Phone ? 320 :480,
            tpl: new Ext.XTemplate(
            	'<ul><tpl for="rows">',
            	'<li>{symbol} Product Name: {product__name}</li>',
            	'</tpl></ul>'
            )
        });

    	viewport = new Ext.Panel({
    		fullscreen: true,
    		html: 'Hello'
    	});

    	app.keyLogger.init();

    }
});



app.keyLogger = {
	pending: [],
	init: function() {
		document.addEventListener('keypress', function(e) {
    		var s = String.fromCharCode(e.charCode);
    		app.keyLogger.add(s);
    	});
	},
	add: function(code) {
		this.pending.push(code);
		if (! ('task' in this)) {
			this.task = new Ext.util.DelayedTask(function() {

				var code = this.pending.join('');
				Ext.dispatch({
		            controller: app.controllers.product,
		            action: 'load',
		            code: code
		        });
        		this.pending.length = 0;
			}, this);
		}
		console.log(this.pending);
		this.task.delay(500);
	}
}

function process(code) {


}

app.controllers.product = new Ext.Controller({
	load: function(options) {
		Ext.Ajax.request({
		url: '/product',
		params: {
			code: options.code
		},
		success: function(response, opts) {
			var obj = Ext.decode(response.responseText);
			win.show();
			win.update(obj);
			Ext.defer(function() {
				win.hide();
			}, 2000)
		}
	})
	}
});