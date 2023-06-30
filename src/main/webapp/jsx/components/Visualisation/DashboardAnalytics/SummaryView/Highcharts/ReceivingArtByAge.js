import Highcharts from 'highcharts';

// Radialize the colors
Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});

export const ReceivingArtByAge = {
    chart: {
        
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Number of Adults and Children currently receiving ART by Age'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'black'
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Currently Receiving ART By Age',
        data: [
            { name: '25 + ',  sliced: true, y: 61.41 },
            { name: '20-24 ', y: 11.84 },
            { name: '10-19 ', y: 10.85 },
            { name: '≤ 9 ', y: 4.67 },
           
        ]
    }]
};