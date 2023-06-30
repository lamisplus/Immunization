import React from "react";
// import { Link } from 'react-router-dom';
import { Row, Col, Card } from "react-bootstrap";

import PageTitle from "../../../layouts/PageTitle";

import Bmi from "./Bmi";
import Height from "./Height";
import ViccinationStatus from "./ViccinationStatus";
//import LegendEffectOpacity from "./LegendEffectOpacity";

function RechartJs() {
  return (
    <>

      <Row>
        <Col xl={4} lg={4}>
          <Card>            
            <Card.Body>
                <p>Blood presure(7)                    
                    <span className="float-end text-success">Normal</span>
                </p>
                <p><h5>125/85mm/hg</h5></p>                
              <Bmi />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={4}>
          <Card>           
            <Card.Body>
            <p>Heart Rate(12)                    
                    <span className="float-end text-success">Normal</span>
                </p>
                <p><h5>85 per min</h5></p>
              <Height />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={4}>
          <Card>            
            <Card.Body>
            <p>Oxygen Sat.(2)                    
                    <span className="float-end text-danger">Below Normal</span>
                </p>
                <p><h5>81%</h5></p>
                <Height />
            </Card.Body>
          </Card>
        </Col>

        <Col xl={4} lg={4}>
          <Card>            
            <Card.Body>
                <p>BMI Status(8)                    
                    <span className="float-end text-danger">Overweight</span>
                </p>
                <p><h5>25.4</h5></p>                
              <Bmi />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={4}>
          <Card>           
            <Card.Body>
            <p>Temperature(4)                    
                    <span className="float-end text-success">Normal</span>
                </p>
                <p><h5>97.00<sup>o</sup>F (36<sup>o</sup>C)</h5></p>
              <Height />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4} lg={4}>
          <Card>            
            <Card.Body>
            <p>Respiration(1)                    
                    <span className="float-end text-success"> Normal</span>
                </p>
                <p><h5>22 per min</h5></p>
                <Height />
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
    </>
  );
}

export default RechartJs;
