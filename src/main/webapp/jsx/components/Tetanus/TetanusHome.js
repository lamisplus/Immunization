import React from "react";
import CreateTetanusImmunization from "./CreateTetanusImmunization";
import UpdateTetanusImmunizationTetanus from "./UpdateTetanusImmunization";

const TetanusHome = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <CreateTetanusImmunization {...props} />,
    update: (
      <UpdateTetanusImmunizationTetanus {...props} disableInputs={false} />
    ),
    view: <UpdateTetanusImmunizationTetanus {...props} disableInputs={true} />,
  };

  const mapCompoenentToActionType = (actionType) => {
    if (!actionType) {
      return componentMap["create"];
    }

    return componentMap[actionType];
  };

  return <>{mapCompoenentToActionType(actionType)}</>;
};

export default TetanusHome;
