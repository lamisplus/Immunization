import React from "react";
import {Link} from 'react-router-dom';
import PerfectScrollbar from "react-perfect-scrollbar";

const TableData = [
	{Oid: '#0012451'},
	{Oid: '#0012552'},
	{Oid: '#0012653'},
	{Oid: '#0012754'},
	{Oid: '#0012855'},
	{Oid: '#0012956'},
	{Oid: '#0013157'},
	{Oid: '#0013258'},
	{Oid: '#0013359'},
	{Oid: '#0013460'},
]; 

const RecentSaleTable = () =>{
	return(
		<>
			<div className="card">
				<div className="card-body p-0">
					<PerfectScrollbar className="table-responsive fs-14 dz-scroll recent-sell" id="event-bx-2">
						<table className="table table-responsive-md card-table border-0">
							<thead>
								<tr>
									<th>Order ID</th>
									<th>Date</th>
									<th>Customer Name</th>
									<th>Location</th>
									<th>Sold Ticket</th>
									<th>Refund</th>     
								</tr>
							</thead>
							<tbody>
								{TableData.map((item,index)=>(
									<tr key={index}>
										<td>#0012451</td>
										<td>04/08/2020 12:34 AM</td>
										<td>Elisabeth Queen</td>
										<td>Medan, Indonesia</td>
										<td>4 Pcs</td>
										<td><strong>NO</strong></td>
									</tr>
								))}
							</tbody>
						</table>
					</PerfectScrollbar>
				</div>
				<div className="card-footer pt-0 border-0">
					<Link to={"#"} className="btn btn-secondary d-block text-white">Load More</Link>
				</div>
			</div>
		</>
	)
}	
export default RecentSaleTable;