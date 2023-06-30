import React, { useState } from 'react';

import { Col, Form,CardBody,  Row,CardTitle, CardText,
   } from "reactstrap";
import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Highcharts from 'highcharts';
 import HighchartsReact from 'highcharts-react-official';
import {NewlyEnrolledArtBySex} from './Highcharts/NewlyEnrolledArtBySex';
import {NewlyEnrolledArtByAge} from './Highcharts/NewlyEnrolledArtByAge';
import {ReceivingArtByAge}  from './Highcharts/ReceivingArtByAge';
import {ReceivingArtBySex} from './Highcharts/ReceivingArtBySex';
import { Progress } from 'reactstrap';


// Load Highcharts modules
//require("highcharts/modules/exporting")(Highcharts);

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
    },
},
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const SummaryView = (props) => {
  const classes = useStyles();
  const [chartValue, setChartValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const [state, setState] = useState({ activeItem: 'gamepad' })

  const handleItemClick = (e, { name }) => setState({ activeItem: name })
  const { activeItem } = state
  const chartPage  = e => {

    setChartValue(e)
  }

  //Menu Icon 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <div  spacing={5} style={{ padding: 20 }} >
      <Row>
        <Col md={12}>
          {/* The second Column Card Layout  */}
        <Row>
                 
                  <Col  lg={6} md={6} sm={12} xs={12} className="mb-4">
                  <Card><CardBody>
                    <HighchartsReact highcharts={Highcharts} options={ReceivingArtBySex} />
                  </CardBody></Card>
                  </Col>
                  <Col  lg={6} md={6} sm={12} xs={12} className="mb-4">
                  <Card><CardBody>
                    <HighchartsReact highcharts={Highcharts} options={ReceivingArtByAge} />
                  </CardBody></Card>
                  </Col>
              </Row>

           
        </Col>
      </Row>

      

      

    </div>
  );
}

export default SummaryView;
