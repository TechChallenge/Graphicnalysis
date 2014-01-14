Ext.define('Ext.app.AssessmentGrid', {

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
	 var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1', 'data2', 'data3'],
    data: [
        { 'name': 'D-REF',   'data1': 7975,  'data3': 1625 },
        { 'name': 'DIAL-4',   'data1':  66571,  'data3': 32271},
        { 'name': 'CELF-5', 'data1':  6369,  'data3': 29},
        { 'name': 'WRMT-III',  'data1':  60513,  'data3': 16092 },
        { 'name': 'WIAT-III',  'data1': 11918,  'data3': 10603 },
		{ 'name': 'MMPI-2',  'data1': 1849,  'data3': 622 },
		{ 'name': 'CISS',  'data1': 1545,  'data3': 94 }
    ]
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
            position: 'left',
            fields: ['data1', 'data2', 'data3'],
            title: 'Purchased/Consumed',
            grid: true
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Assessments'
        }],
              series: [{
            type: 'column',
            axis: 'left',
            xField: 'name',
            yField: 'data1'
        }, {
            type: 'scatter',
            axis: 'left',
            xField: 'name',
            yField: 'data2',
            markerCfg: {
                type: 'circle'
            }
        }, {
            type: 'line',
            axis: 'left',
            fill: true,
            fillOpacity: 0.5,
            xField: 'name',
            yField: 'data3',
            style: {
                'stroke-width': 0
            }
        }]
            }
        });

        this.callParent(arguments);
    }
});
