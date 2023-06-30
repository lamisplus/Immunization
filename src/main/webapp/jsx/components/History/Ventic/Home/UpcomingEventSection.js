import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const UpcomingEventSection = () =>{
	const [value, onChange] = useState(new Date());
	return(
		<>	
			<div className="card">
				<div className="card-body text-center event-calender pb-4">
					<Calendar onChange={onChange} value={value} />
				</div>
				<div className="card-header py-0 border-0">
					<h4 className="text-black fs-20">Upcoming Events</h4>
				</div>
				<div className="card-body pb-0">
					<div className="media mb-5 align-items-center event-list">
						<div className="p-3 text-center me-3 date-bx bgl-primary">
							<h2 className="mb-0 text-secondary fs-28 font-w600">3</h2>
							<h5 className="mb-1 text-black">Wed</h5>
						</div>
						<div className="media-body px-0">
							<h6 className="mt-0 mb-3 fs-14"><Link to={"/event"} className="text-black" >Live Concert Choir Charity Event 2020</Link></h6>
							<ul className="fs-14 list-inline mb-2 d-flex justify-content-between">
								<li>Ticket Sold</li>
								<li>561/650</li>
							</ul>
							<div className="progress mb-0" style={{height:"4px", width:"100%"}}>
								<div className="progress-bar bg-warning progress-animated" style={{width:"60%", height:"8px"}} role="progressbar">
									<span className="sr-only">60% Complete</span>
								</div>
							</div>
						</div>
					</div>
					<div className="media mb-5 align-items-center event-list">
						<div className="p-3 text-center me-3 date-bx bgl-primary">
							<h2 className="mb-0 text-secondary fs-28 font-w600">16</h2>
							<h5 className="mb-1 text-black">Wed</h5>
						</div>
						<div className="media-body px-0">
							<h6 className="mt-0 mb-3 fs-14"><Link to={"/event"} className="text-black">Live Concert Choir Charity Event 2020</Link></h6>
							<ul className="fs-14 list-inline mb-2 d-flex justify-content-between">
								<li>Ticket Sold</li>
								<li>431/650</li>
							</ul>
							<div className="progress mb-0" style={{height:"4px", width:"100%"}}>
								<div className="progress-bar bg-warning progress-animated" style={{width:"50%", height:"8px"}} role="progressbar">
									<span className="sr-only">60% Complete</span>
								</div>
							</div>
						</div>
					</div>
					<div className="media mb-5 align-items-center event-list">
						<div className="p-3 text-center me-3 date-bx bgl-primary">
							<h2 className="mb-0 text-primary fs-28 font-w600">28</h2>
							<h5 className="mb-1 text-black">Wed</h5>
						</div>
						<div className="media-body px-0">
							<h6 className="mt-0 mb-3 fs-14"><Link to={"/event"} className="text-black">Live Concert Choir Charity Event 2020</Link></h6>
							<ul className="fs-14 list-inline mb-2 d-flex justify-content-between">
								<li>Ticket Sold</li>
								<li>650/650</li>
							</ul>
							<div className="progress mb-0" style={{height:"4px", width:"100%"}}>
								<div className="progress-bar bg-warning progress-animated" style={{width:"100%", height:"8px"}} role="progressbar">
									<span className="sr-only">60% Complete</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card-footer pt-0 border-0">
					<Link to={"#"} className="btn btn-secondary btn-block text-white">Load More</Link>
				</div>
			</div>
			
		</>
	)
}
export default UpcomingEventSection; 