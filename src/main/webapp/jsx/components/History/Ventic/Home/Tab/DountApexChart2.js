import React from "react";
import ReactApexChart from "react-apexcharts";

class DountApexChart2 extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
		series: [25, 45, 30],
		options: {
			chart: {
			  type: "donut",
			},
		
			legend: {
			  show: false,
			},
			plotOptions: {
				pie: {
					donut: {
					  size: "40%",
					},
				},				
			},
			stroke: {
			  width: "10",
			},
			dataLabels: {
			  formatter(val, opts) {
				
				return [val.toFixed() + "%"];
			  },
			  dropShadow: {
				enabled: false,
			  },
			  style: {
				fontSize: "15px",
				colors: ["#fff"],
			  },
			},
			colors:['#FB3E7A','#0E8A74','#C8C8C8'],
		},
    };
}

  render() {
    return (
		<div id="chart" className="chart-strok">
		  <ReactApexChart
			options={this.state.options}
			series={this.state.series}
			type="donut"
			 height="225px"
		  />
		 </div> 
    );
  }
}

export default DountApexChart2;