import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PatientCardDetail from "./PatientCard";
import { useHistory } from "react-router-dom";
import SubMenu from "./SubMenu";
import PatientVaccinationHistory from "./../Vaccination/VaccinationHistory";
import ImmunizationHome from "../Immunization/ImmunizationHome";
import Tetanus from "../Tetanus/TetanusHome";
import CovidVaccinationHome from "../Covid/CovidVaccinationHome";
import PatientnHistory from "../History/PatientHistory";
import RecentHistory from "../History/PatientHistory";

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
  let history = useHistory();
  const [art, setArt] = useState(false);
  const [activeContent, setActiveContent] = useState({
    route: "patient-vaccination-history",
    id: "",
    activeTab: "home",
    actionType: "create",
    obj: {},
  });
  const { classes } = props;
  const patientObj = useMemo(() => {
    return history.location && history.location.state
      ? history.location.state.patientObj
      : {};
  }, [history.location]);

  return (
    <div className={classes.root}>
      <div
        className="row page-titles mx-0"
        style={{ marginTop: "0px", marginBottom: "-10px" }}
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">
            <h4>
              {" "}
              <Link to={"/"}>Immunization /</Link> Patient Dashboard
            </h4>
          </li>
        </ol>
      </div>
      <Card>
        <CardContent>
          <PatientCardDetail
            patientObj={patientObj}
            setArt={setArt}
            setActiveContent={setActiveContent}
          />
          <SubMenu
            patientObj={patientObj}
            art={art}
            setActiveContent={setActiveContent}
          />
          <div>
            {activeContent.route === "vaccination-history" && (
              <PatientVaccinationHistory
                patientObj={patientObj}
                setActiveContent={setActiveContent}
                activeContent={activeContent}
              />
            )}

            {activeContent.route === "routine-immunization-patient" && (
              <ImmunizationHome
                patientObj={patientObj}
                setActiveContent={setActiveContent}
                activeContent={activeContent}
              />
            )}

            {activeContent.route === "tetanus-patient" && (
              <Tetanus
                patientObj={patientObj}
                setActiveContent={setActiveContent}
                activeContent={activeContent}
              />
            )}

            {activeContent.route === "covid-patient" && (
              <CovidVaccinationHome
                patientObj={patientObj}
                setActiveContent={setActiveContent}
                activeContent={activeContent}
              />
            )}

            {/* {activeContent.route === "patient-vaccination-history" && (
              <RecentHistory
                patientObj={patientObj}
                setActiveContent={setActiveContent}
                activeContent={activeContent}
              />
            )} */}
            {activeContent.route === "patient-vaccination-history" && (
              <PatientVaccinationHistory
                patientObj={patientObj}
                setActiveContent={setActiveContent}
                activeContent={activeContent}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

PatientCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientCard);
