import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { Link } from "react-router-dom";
import ButtonMui from "@material-ui/core/Button";
import { TiArrowBack } from "react-icons/ti";
import Divider from "@material-ui/core/Divider";
import "semantic-ui-css/semantic.min.css";
import { Col, Row } from "reactstrap";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";

//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "20.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

function PatientCard(props) {
  const { classes } = props;
  const patientObj = props.patientObj;
  

  useEffect(() => {
    //PatientCurrentStatus();
    //CheckBiometric();
  }, [props.patientObj]);

  const calculate_age = (dob) => {
    var today = new Date();
    var dateParts = dob.split("-");
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    var birthDate = new Date(dateObject); // create a date object directlyfrom`dob1`argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    if (age_now === 0) {
      return m + " month(s)";
    }
    return age_now + " year(s)";
  };
  const getPhoneNumber = (identifier) => {
    const identifiers = identifier;
    const phoneNumber = identifiers.contactPoint.find(
      (obj) => obj.type === "phone"
    );
    return phoneNumber ? phoneNumber.value : "";
  };
  const getAddress = (identifier) => {
    const identifiers = identifier;
    const address = identifiers.address.find((obj) => obj.city);
    const houseAddress =
      address && address.line[0] !== null ? address.line[0] : "";
    const landMark =
      address && address.city && address.city !== null ? address.city : "";
    return address ? houseAddress + " " + landMark : "";
  };

  const getLastName = (obj) => {
    if (obj && obj.lastName) {
      return obj.lastName;
    } else if (obj && obj.surname) {
      return obj.surname;
    } else if (obj && obj.otherName) {
      return obj.otherName;
    } else {
      return "";
    }
  };

  const getHospitalNumber = (obj) => {
    if (obj && obj.participantId) {
      return obj.participantId
    }else {
    
      const identifiers = obj?.identifier?.identifier?.filter((obj) => obj?.type === "HospitalNumber") || []
      const currentIdentifier = identifiers?.pop?.() || null;
      
    return  (currentIdentifier?.value !== null ? currentIdentifier.value : "")
    }
  
  }

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Row>
            <Col md={12}>
              <Row className={"mt-1"}>
                <Col md={12} className={classes.root2}>
                  <b style={{ fontSize: "25px", color: "rgb(153, 46, 98)" }}>
                    {patientObj.firstName + " " + getLastName(patientObj)}
                  </b>
                  <Link to={"/"}>
                    <ButtonMui
                      variant="contained"
                      color="primary"
                      className=" float-end ms-2 mr-2 mt-2"
                      //startIcon={<FaUserPlus size="10"/>}
                      startIcon={<TiArrowBack />}
                      style={{
                        backgroundColor: "rgb(153, 46, 98)",
                        color: "#fff",
                        height: "35px",
                      }}
                    >
                      <span style={{ textTransform: "capitalize" }}>Back</span>
                    </ButtonMui>
                  </Link>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Patient ID :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {getHospitalNumber(patientObj)}
                    </b>
                  </span>
                </Col>

                <Col md={4} className={classes.root2}>
                  <span>
                    Date Of Birth :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {patientObj?.dob || patientObj?.dateOfBirth}
                    </b>
                  </span>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Age :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {calculate_age(
                        moment(
                          patientObj.dob || patientObj?.dateOfBirth
                        ).format("DD-MM-YYYY")
                      )}
                    </b>
                  </span>
                </Col>
                <Col md={4}>
                  <span>
                    {" "}
                    Gender :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {patientObj.gender !== null
                        ? patientObj.gender.display
                        : ""}
                    </b>
                  </span>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Phone Number :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {getPhoneNumber(patientObj.contactPoint)}
                    </b>
                  </span>
                </Col>
                <Col md={4} className={classes.root2}>
                  <span>
                    {" "}
                    Address :{" "}
                    <b style={{ color: "#0B72AA" }}>
                      {getAddress(patientObj.address)}{" "}
                    </b>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </ExpansionPanelSummary>
        <Divider />
      </ExpansionPanel>
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
