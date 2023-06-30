export const NewlyEnrolledArtBySex = {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Number of Adults and Children currently receiving ART by Sex',
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
        }, 
        
    },
    series: [{
        type: 'pie',
        name: 'Currently Receiving ART ',
        innerSize: '50%',
        data: [
            ['Male', 58.9],
            ['Female', 13.29],
            
        ]
    }]
};