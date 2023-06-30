import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class CanvasRevenue extends Component {
   render() {
		const data = {
			defaultFontFamily: 'Poppins',
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec","Jan"],
			datasets: [
				{
					label: "My First dataset",
					data: [15, 40, 55, 40, 25, 35, 40, 50, 85, 95, 54, 35,15],
					borderColor: '#13B497',
					borderWidth: "0",
					backgroundColor: ['#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74','#FB3E7A','#0E8A74',], 
					hoverBackgroundColor: '#13B497'
				}
			]
		};
		const options = {
			legend: false,
			responsive: true, 
			maintainAspectRatio: false,  
			scales: {
				yAxes: [{
					display: false, 
					ticks: {
						beginAtZero: true, 
						display: false, 
						max: 100, 
						min: 0, 
						stepSize: 10
					}, 
					gridLines: {
						display: false, 
						drawBorder: false
					}
				}],
				xAxes: [{
					display: false, 
					barPercentage: 0.4, 
					gridLines: {
						display: false, 
						drawBorder: false
					}, 
					ticks: {
						display: false
					}
				}]
			}
		};

      return (
         <>	
			<div className="chart-w2">
				<Bar data={data} height={85} options={options} />
			</div>	
         </>
      );
   }
}

export default CanvasRevenue;