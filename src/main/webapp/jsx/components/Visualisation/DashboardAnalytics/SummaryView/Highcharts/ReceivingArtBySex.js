export const ReceivingArtBySex = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Number of Adults and Children newly enrolled on ART by Sex',
        align: 'center',
        verticalAlign: 'middle',
        y: -160
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
            
            dataLabels: {
                enabled: true,
                distance: -50,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            size: '110%',
            showInLegend: true
        }
    },
    series: [{
        type: 'pie',
        name: 'Newly Enrolled on ART ',
        innerSize: '50%',
        data: [
            ['Male', 58.9],
            ['Female', 13.29],
            
        ]
    }]
};