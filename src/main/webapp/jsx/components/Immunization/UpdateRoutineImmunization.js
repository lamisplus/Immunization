import React from "react";
import RoutineImmunizationForm from "./RoutineImmunizationForm";

const UpdateRoutineImmunization = (props) => (
  <RoutineImmunizationForm {...props} mode={props.disableInputs ? "view" : "update"} />
);

export default UpdateRoutineImmunization;
