Ext.ns("app.form");
Ext.ns("app.views");

app.form.DisplayArea = Ext.extend(Ext.form.TextArea, {
    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><div class="x-form-field-container">',
            '<textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
            ' readonly ',
            '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
            '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
            '<tpl if="style">style="{style}" </tpl>',
            '<tpl if="maxRows != undefined">rows="{maxRows}" </tpl>',
            '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
            '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
            '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
            '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
            '></textarea>',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
        '</div></tpl>'
    ]
});
Ext.reg('displayArea', app.form.DisplayArea);

app.form.DisplayField = Ext.extend(Ext.form.Field,  {
    zoomable: false,
    renderTpl: [
        '<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div class="x-form-field-container"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls} x-display-only"',
                'readonly ',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
                '<tpl if="autoCorrect">autocorrect="{autoCorrect}" </tpl> />',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
            '</div>',
            '<tpl if="zoomable">',
                '<div class="zoomable"></div>',
            '</tpl>',
            '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div></div></tpl>',
        '</tpl>'
    ],
    onRender: function() {
        
        app.form.DisplayField.superclass.onRender.apply(this, arguments);

        if (this.zoomable) {
            this.mon(this.el,
                'singletap',
                this.zoomFn,
                this,
                {delegate: '.zoomable'}
            );
        }
    },
    initRenderData: function() {
        app.form.DisplayField.superclass.initRenderData.apply(this, arguments);

        Ext.applyIf(this.renderData, {
            zoomable: this.zoomable
        });

        return this.renderData;
    }
});

Ext.reg('displayfield', app.form.DisplayField);

app.views.ImageField = Ext.extend(Ext.Panel, {
    initComponent: function() {
        var self = this;
        this.data = {
            name: 'image'
        };
        console.log("new imagefield");
        Ext.apply(this, {
            tpl: [
                '<div style="text-align:center; width: 100%; background-color: white; height: 100%;">',
                    '<image class="product-image show-image" src="" title="{name} style="width: 100%; height: 100%;"></img>',
                '</div>'
            ],
            listeners: {
                'afterrender': {
                    fn: function(c) {
                        console.log('after render', c, c.el.query('img.product-image'));
                        var me = this;
                        Ext.each(c.el.query('img.product-image'), function(item) {
                            console.log(item);
                            self.bucket = item;
                            console.log(self.bucket);
                        });
                    },
                    scope: this
                }
            }
        });
        app.views.ImageField.superclass.initComponent.apply(this, arguments);
    },
    loadImage: function(path) {
        console.log(path);
        var self = this;
        var bg =  chrome.extension.getBackgroundPage();
        bg.readDB(path, function(content) {
            window.pok = self.bucket;
            window.bunny = content;
            self.bucket.src = '';
            self.bucket.src = content;
        })
    }
});

Ext.reg('imagefield', app.views.ImageField);