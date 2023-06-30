import React from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';

const PeitySvg = () =>{
	return(
		<>
			<span className="peity-success" data-style="width:100%;" style={{display: "none"}}>0,2,1,4</span>
			<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect width="3.7193" height="27" rx="1.85965" transform="matrix(-1 0 0 1 26.8359 0)" fill="#FB3E7A"/>
				<rect width="3.7193" height="19.6364" rx="1.85965" transform="matrix(-1 0 0 1 19.3975 7.36365)" fill="#FB3E7A"/>
				<rect width="3.7193" height="8.59091" rx="1.85965" transform="matrix(-1 0 0 1 11.958 18.4091)" fill="#FB3E7A"/>
				<rect width="4.19613" height="16.6154" rx="2.09806" transform="matrix(-1 0 0 1 4.99707 10.3846)" fill="#FB3E7A"/>
			</svg>
		</>
	)
}

const TrendingItems = () => {
	return(
		<>
			<div className="card overflow-hidden">
				<div className="card-header border-0 pb-0">
					<h4 className="card-title mb-1 ">Trending Items</h4>
					<Dropdown className="ms-auto text-right">
						<Dropdown.Toggle as="div" className="btn-link i-false c-pointer">	
							<svg xmlns="http://www.w3.org/2000/svg"  width="24px" height="24px" viewBox="0 0 24 24" version="1.1"><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"><rect x="0" y="0" width="24" height="24"></rect><circle fill="#000" cx="12" cy="5" r="2"></circle><circle fill="#000" cx="12" cy="12" r="2"></circle><circle fill="#000" cx="12" cy="19" r="2"></circle></g></svg>
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
							<Dropdown.Item>View Detail</Dropdown.Item>
							<Dropdown.Item>Edit</Dropdown.Item>
							<Dropdown.Item>Delete</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="card-body pt-0 p-0">
					<div className="media align-items-center border-bottom p-md-4 p-3">
						<span className="number  col-1 px-0 align-self-center d-none d-sm-inline-block ">#1</span>
						<div className="ticket-icon  ms-0 me-3 d-none d-sm-inline-block">
							<i className="fa fa-ticket" aria-hidden="true"></i>
						</div>
						<div className="media-body col-sm-6 col-6 col-xxl-5 px-0">
							<h5 className="mt-0 mb-0"><Link to={"#"} className="number font-w500">Envato International Meetup 2020</Link></h5>
						</div>
						<div className="media-footer ms-auto col-2 px-0 d-flex align-self-center align-items-center">
							<div className="text-center">
								<span className="text-secondary d-block chart-num-3 font-w600">454</span>
								<span className="fs-14">Sales</span>
							</div>
						</div>
						<div className="me-3">
							<PeitySvg />
						</div>
						<svg width="23" height="11" viewBox="0 0 23 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.866657 -9.6165e-07L11.8816 11L22.8965 0" fill="#FF3131"/>
						</svg>

					</div>
					<div className="media align-items-center border-bottom p-md-4 p-3">
						<span className="number col-1 px-0 align-self-center d-none d-sm-inline-block ">#2</span>
						<div className="ticket-icon ms-0 me-3 d-none d-sm-inline-block">
							<i className="fa fa-ticket" aria-hidden="true"></i>
						</div>
						<div className="media-body col-sm-6 col-6 col-xxl-5 px-0">
							<h5 className="mt-0 mb-0"><Link to={"#"} className=" number font-w500">Jakarta Indie Music Festival 2020</Link></h5>
						</div>
						<div className="media-footer ms-auto col-2 px-0 d-flex align-self-center align-items-center">
							<div className="text-center">
								<span className="text-secondary d-block chart-num-3 font-w600">341</span>
								<span className="fs-14">Sales</span>
							</div>
						</div>
						<div className="me-3">
							<PeitySvg />
						</div>
						<svg width="23" height="11" viewBox="0 0 23 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.866657 11L11.8816 -4.72849e-07L22.8965 11" fill="#0E8A74"/>
						</svg>
					</div>
					<div className="media align-items-center border-bottom p-md-4 p-3">
						<span className="number  col-1 px-0 align-self-center d-none d-sm-inline-block ">#3</span>
						<div className="ticket-icon ms-0 me-3 d-none d-sm-inline-block">
							<i className="fa fa-ticket" aria-hidden="true"></i>
						</div>
						<div className="media-body col-sm-6 col-6 col-xxl-5 px-0">
							<h5 className="mt-0 mb-0"><Link to={"#"} className="number font-w500">Live Choir in Sydney 2020</Link></h5>
						</div>
						<div className="media-footer ms-auto col-2 px-0 d-flex align-self-center align-items-center">
							<div className="text-center">
								<span className="text-secondary d-block chart-num-3 font-w600">225</span>
								<span className="fs-14">Sales</span>
							</div>
						</div>
						<div className="me-3">
							<PeitySvg />
						</div>
						<svg width="23" height="11" viewBox="0 0 23 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.866657 -9.6165e-07L11.8816 11L22.8965 0" fill="#FF3131"/>
						</svg>
					</div>
					<div className="media align-items-center border-bottom p-md-4 p-3">
						<span className="number col-1 px-0 align-self-center d-none d-sm-inline-block ">#4</span>
						<div className="ticket-icon ms-0 me-3 d-none d-sm-inline-block">
							<i className="fa fa-ticket" aria-hidden="true"></i>
						</div>
						<div className="media-body col-sm-6 col-6 col-xxl-5 px-0">
							<h5 className="mt-0 mb-0"><Link to={"#"} className="number font-w500">Artist Performing Festival In Aus..</Link></h5>
						</div>
						<div className="media-footer ms-auto col-2 px-0 d-flex align-self-center align-items-center">
							<div className="text-center">
								<span className="text-secondary d-block fs-20 font-w600">127</span>
								<span className="fs-14">Sales</span>
							</div>
						</div>
						<div className="me-3">
							<PeitySvg />
						</div>
						<svg className="min-w22" width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 -9.61651e-07L11 11L22 0" fill="#E63D3D"/>
						</svg>
					</div>
					<div className="media align-items-center border-bottom p-md-4 p-3">
						<span className="number col-1 px-0 align-self-center d-none d-sm-inline-block ">#5</span>
						<div className="ticket-icon ms-0 me-3 d-none d-sm-inline-block">
							<i className="fa fa-ticket" aria-hidden="true"></i>
						</div>
						<div className="media-body col-sm-6 col-6 col-xxl-5 px-0">
							<h5 className="mt-0 mb-0"><Link to={"#"} className="number font-w500">[LIVE] Football Charity Event 2020</Link></h5>
						</div>
						<div className="media-footer ms-auto col-2 px-0 d-flex align-self-center align-items-center">
							<div className="text-center">
								<span className="text-secondary  d-block chart-num-3 font-w600">67</span>
								<span className="fs-14">Sales</span>
							</div>
						</div>
						<div className="me-3">
							<PeitySvg />
						</div>
						<svg width="23" height="11" viewBox="0 0 23 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.866657 11L11.8816 -4.72849e-07L22.8965 11" fill="#0E8A74"/>
						</svg>
					</div>
				</div>
			</div>
		</>
	)
}
export default TrendingItems;