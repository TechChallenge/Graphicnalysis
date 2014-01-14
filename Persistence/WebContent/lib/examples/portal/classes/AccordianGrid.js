Ext.define('Ext.app.AccordianGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridportlet',
    uses: [
        'Ext.data.ArrayStore'
    ],
    height: 600,

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    change: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    },

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    pctChange: function(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    },

    initComponent: function(){

        /* var store = Ext.create('Ext.data.ArrayStore', {
            fields: [
               {name: 'examineeid'},
               {name: 'firstname'},
               {name: 'lastname'}
            ],
            data: this.myData
        }); */
		
		Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'notificationmessage', type: 'string'  },
		]
	});
		
		 var store = Ext.create('Ext.data.Store', {
        //pageSize: 50,
        model: 'User',
        //remoteSort: true,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'ajax',
            url: 'AccordianPagingData.seam',
            reader: {
            type: 'json',
            root: 'rows'
            //totalProperty: 'total'
        }
            // sends single sort as multi parameter
           
        },
		 autoLoad: true
        
    });
		
		

        Ext.apply(this, {
            //height: 300,
            height: this.height,
            store: store,
            stripeRows: true,
			enableTextSelection: true,
            columnLines: true,
			
            columns: [{
                text   : '',
                width    : 250,
                sortable : true,
               renderer : this.notificationmessage,
			   renderer: function(value, meta, record) {
				var newvalue;
				newvalue = "<span style='color:red;font-size: 10px; line-height: normal; white-space: normal;'>"+value+"</span>";
				return newvalue;
			},
                dataIndex: 'notificationmessage'
            }]
        });

        this.callParent(arguments);
    }
});
