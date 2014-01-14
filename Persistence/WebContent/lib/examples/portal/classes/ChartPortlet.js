Ext.define('Ext.app.ChartPortlet', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.chartportlet',

    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],


    initComponent: function(){
		Ext.define('User', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'usage', type: 'string'  }
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
            url: 'BUData',
            reader: {
            type: 'json',
            root: 'rows'
            //totalProperty: 'total'
        }
            // sends single sort as multi parameter
           
        },
		 autoLoad: true
        
    });
	/* var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data'],
    data: [
        { 'name': 'metric one',   'data': 10 },
        { 'name': 'metric two',   'data':  7 },
        { 'name': 'metric three', 'data':  5 },
        { 'name': 'metric four',  'data':  8 },
        { 'name': 'metric five',  'data': 10 }
    ]
});*/

        Ext.apply(this, {
            layout: 'fit',
			height: 280,
            items: {
                xtype: 'chart',
                animate: true,
                shadow: true,
                store: store,
                axes: [{
            type: 'Numeric',
            position: 'left',
            fields: ['usage'],
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Inventory Purchased',
            grid: true,
            minimum: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Buisness Units'
        }],
          series: [{
            type: 'column',
            axis: 'bottom',
            highlight: true,
            xField: 'name',
            yField: 'usage'
        }]
            }
        });

        this.callParent(arguments);
    }
});
