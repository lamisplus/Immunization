import React, {useState, Fragment } from "react";
import { Row, Col, Card,  Tab, Tabs, } from "react-bootstrap";
import PatientList from './Patient/PatientList'
import PatientVaccinatedLIst from './Patient/PatientVaccinatedLIst'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { FaUserPlus } from "react-icons/fa";
//import PageTitle from "./../layouts/PageTitle";
const divStyle = {
  borderRadius: "2px",
  fontSize: 14,
};

const Home = () => {
    const [key, setKey] = useState('home');


  return (
    <Fragment>  
      <div className="row page-titles mx-0" style={{marginTop:"0px", marginBottom:"-10px"}}>
			<ol className="breadcrumb">
				<li className="breadcrumb-item active"><h4>COVID-19</h4></li>
			</ol>
		  </div>
      <Link to={"register-patient"}>
            <Button
                variant="contained"
                color="primary"
                className=" float-end mb-10"
                startIcon={<FaUserPlus size="10"/>}
                style={{backgroundColor:'#014d88'}}
            >
                <span style={{ textTransform: "capitalize" }}>New Patient</span>
            </Button>
        </Link>
        <br/><br/>
      <br/>
      <Row>       
        <Col xl={12}>
          <Card style={divStyle}>            
            <Card.Body>
              {/* <!-- Nav tabs --> */}
              <div className="custom-tab-1">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                  
                  <Tab eventKey="home" title="Find Patients">                   
                    <PatientList />
                  </Tab>
                  <Tab eventKey="vaccinated" title="Vaccinated Patients">                   
                    <PatientVaccinatedLIst />
                  </Tab>
                  {/* <Tab eventKey="visualization" title="Data Visualisation">                   
                    <VisualisationHome />
                  </Tab>                     */}
                </Tabs>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </Fragment>
  );
};

export default Home;
