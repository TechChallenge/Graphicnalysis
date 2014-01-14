Ext.define('Ext.app.GridPortlet', {

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

        /*
		 * var store = Ext.create('Ext.data.ArrayStore', { fields: [ {name:
		 * 'examineeid'}, {name: 'firstname'}, {name: 'lastname'} ], data:
		 * this.myData });
		 */
		
	
		
		 /*var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data'],
    data: [
        { 'name': 'metric one',   'data': 10 },
        { 'name': 'metric two',   'data':  7 },
        { 'name': 'metric three', 'data':  5 },
        { 'name': 'metric four',  'data':  8 },
        { 'name': 'metric five',  'data': 10 }
    ]
});*/
	Ext.define('Assessment', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'usage', type: 'string'  }
    ]
	})
		
		var store = Ext.create('Ext.data.Store', {
        //pageSize: 50,
        model: 'Assessment',
        //remoteSort: true,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'ajax',
            url: 'AssessmentUsage',
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
			  animate: true,
            items: {
                xtype: 'chart',
                animate: true,
                shadow: true,
				theme: 'Base:gradients',
                store: store,
				series: [{
        type: 'pie',
        angleField: 'usage',
        showInLegend: true,
        tips: {
            trackMouse: true,
            width: 140,
            height: 28,
            renderer: function(storeItem, item) {
                // calculate and display percentage on hover
                var total = 0;
                store.each(function(rec) {
                    total += rec.get('usage');
                });
                this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('usage') / total * 100) + '%');
            }
        },
        highlight: {
            segment: {
                margin: 20
            }
        },
        label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
    }]
          }
       
        });
		 this.callParent(arguments);
}
});
