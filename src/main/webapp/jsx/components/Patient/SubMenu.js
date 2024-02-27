import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { calculateAgeNoText } from "../../utils/calculateAge";

function SubMenu(props) {
  const patientProp = props.patientObj ? props.patientObj : {};
  // eslint-disable-next-line no-unused-vars
  const [activeItem, setActiveItem] = useState("patient-vaccination-history");
  const [patientObj] = useState(patientProp);
  const [patientAge] = useState(
    calculateAgeNoText(patientObj?.dob || patientObj?.dateOfBirth) || 0
  );

  const onClickHome = (row) => {
    props.setActiveContent({ ...props.activeContent, route: "patient-vaccination-history" });
  };

  const onClickImmunization = (row) => {
    setActiveItem("immunization");
    props.setActiveContent({
      ...props.activeContent,
      route: "routine-immunization-patient",
      actionType: "create",
    });
  };

  const onClickTetanus = (row) => {
    setActiveItem("tetanus");
    props.setActiveContent({
      ...props.activeContent,
      route: "tetanus-patient",
      actionType: "create",
    });
  };

  const onClickCovid = (row) => {
    setActiveItem("covid");
    props.setActiveContent({
      ...props.activeContent,
      route: "covid-patient",
      actionType: "create",
    });
  };

  const loadPatientVaccinationHistory = () => {
    setActiveItem("history");
    props.setActiveContent({
      ...props.activeContent,
      route: "vaccination-history",
    });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Menu size="large" color={"black"} inverted>
        <Menu.Item onClick={() => onClickHome()}> Home</Menu.Item>
        <Menu.Item onClick={() => onClickImmunization()}>
          {" "}
          Routine Immunization
        </Menu.Item>
        <Menu.Item onClick={() => onClickTetanus()}> Tetanus </Menu.Item>
        {patientAge >= 5 && (
          <Menu.Item onClick={onClickCovid}> COVID-19 </Menu.Item>
        )}
        <Menu.Item onClick={() => loadPatientVaccinationHistory(patientObj)}>
          History
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SubMenu;
