import React from "react";
import CreateRoutineImmunization from "./CreateRoutineImmunization";
import UpdateRoutineImmunization from "./UpdateRoutineImmunization";

const Immunization = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <CreateRoutineImmunization {...props} />,
    update: <UpdateRoutineImmunization {...props} disableInputs={false}/>,
    view: <UpdateRoutineImmunization {...props} disableInputs={true} />,
  };

  const mapCompoenentToActionType = (actionType) => {
    if (!actionType) {
      return componentMap["create"];
    }

    return componentMap[actionType];
  };

  return <>{mapCompoenentToActionType(actionType)}</>;
};

export default Immunization;
