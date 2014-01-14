Ext.define('Ext.app.LiveData', {

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
	/* var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3'],
    data: [
        { 'name': 'metric one',   'data1': 10,  'data3': 7 },
        { 'name': 'metric two',   'data1':  7,  'data3': 9},
        { 'name': 'metric three', 'data1':  5,  'data3': 6},
        { 'name': 'metric four',  'data1':  8,  'data3': 2 },
        { 'name': 'metric five',  'data1': 10,  'data3': 1 }
    ]
}); */

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
            url: 'ReportUsage',
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
            layout: 'fit',
			height: 280,
            items: {
                xtype: 'chart',
                animate: true,
                shadow: true,
                store: store,
                 axes: [{
            type: 'Numeric',
            position: 'bottom',
            fields: ['usage'],
            minimum: 0,
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            grid: true,
            title: 'Inventory Purchased'
        }, {
            type: 'Category',
            position: 'left',
            fields: ['name'],
            title: 'Reports'
        }],
                series: [{
            type: 'bar',
            axis: 'bottom',
            xField: 'name',
            yField: ['usage']
        }]
            }
        });

        this.callParent(arguments);
    }
});
