import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import CreateCovidVaccination from "./CreateCovidVaccination";
import UpdateCovidVaccination from "./UpdateCovidVaccination";

library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const CovidVaccinationHome = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const componentMap = {
    create: <CreateCovidVaccination {...props} />,
    update: <UpdateCovidVaccination {...props} disableInputs={false} />,
    view: <UpdateCovidVaccination {...props} disableInputs={true} />,
  };

  return <div>{componentMap[actionType] || componentMap.create}</div>;
};

export default CovidVaccinationHome;
