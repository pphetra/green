SQLiteProxy = Ext.extend(Ext.data.ClientProxy, {
	constructor: function(config) {
		SQLiteProxy.superclass.constructor.call(this, config);
	},

	clear: function() {
		this.db.transaction(function(tx) {
			tx.executeSql('delete from product');
		})        
    },

	create: function(operation, callback, scope) {
		var records = operation.records,
            length  = records.length,
            id, record, i;
        
        operation.setStarted();
        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
	},

	read: function(operation, callback, scope) {
        //TODO: respect sorters, filters, start and limit options on the Operation

        var records = [],
            i, recordData, record;
        

        var mycb = Ext.util.Functions.createDelegate(function(records) {
            operation.setSuccessful();
	        operation.setCompleted();

	        operation.resultSet = new Ext.data.ResultSet({
	            records: records,
	            total  : records.length,
	            loaded : true
	        });

	        if (typeof callback == 'function') {
	            callback.call(scope || this, operation);
	        }        	
        }, this);

        //read a single record
        if (operation.id) {
            this.getRecord(operation.id, mycb);
        } else { // all record
        	this.getRecords(mycb);
        }
        
    },


    setRecord: function(record) {
    	var rawData = record.data,
    	    data = [],
    	    model = this.model,
    	    fields = model.prototype.fields.items,
    	    length = fields.length,
    	    names = [],
    	    params = [],
    	    i, field, name;
    	
    	for (i = 0; i < length; i++) {
    		field = fields[i];
    		name = field.name;
    		if (this.insertStmt == undefined) {
	    		names.push(name);
	    		params.push('?');
	    	}

    		if (typeof field.encode == 'function') {
                data.push(field.encode(rawData[name], record));
            } else {
                data.push(rawData[name]);
            }
    	}

    	if (this.insertStmt == undefined) {
	    	this.insertStmt = "insert or replace into " + this.tableName + " (" + names.join(',') + ") values (" +
	    		params.join(',') + ")"		
    	}
    	var stmt = this.insertStmt;
    	this.db.transaction(function(tx) {
    		tx.executeSql(stmt, data);
    	})
    },

    generateSelectStmt: function() {
    	if (this.namesCache == undefined) {
	    	var model = this.model,
    			fields = model.prototype.fields.items,
    			length = fields.length;
    			names = [];

    		for (var i = 0; i < length; i++) {
    			var field = fields[i];
    			var name = field.name;
    			names.push(name);
    		}
    		this.namesCache = names;
    		this.selectStmt = "select " + names.join(',') + " from " + this.tableName;
    		this.selectSingleStmt =  this.selectStmt + " where id = ? "
    	}
    },
    
    getRecords: function(callback) {

    	this.generateSelectStmt();
		var self = this;

		this.db.transaction(function(tx) {
			tx.executeSql(self.selectStmt, [], function(tx, results) {
		    	var records = [];
				var cnt = results.rows.length;
				for (var j = 0; j < cnt; j++) {
					var data = results.rows.item(j);
					var record = new self.model(data);
					records.push(record);
				}
				callback(records);
				
			});
		})

    },

    getRecord: function(id, callback) {
    	
    	this.generateSelectStmt();
	
		var record = new this.model({}, id);

		var self = this;
		this.db.transaction(function(tx) {
			tx.executeSql(self.selectSingleStmt, [id], function(tx, results) {
				if (results.rows.length == 1) {
					var data = results.rows.item(0);
					var length = self.namesCache.length;
					for (var i = 0; i < length; i++) {
						var name = self.namesCache[i];
						record.set(name, data[name]);
					}
				}
				callback(record);
			});
		})

    }
})

Ext.data.ProxyMgr.registerType('sqlitestorage', SQLiteProxy);