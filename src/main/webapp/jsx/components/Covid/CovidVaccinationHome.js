/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import "react-phone-input-2/lib/style.css";
import "react-widgets/dist/css/react-widgets.css";
import CreateCovidVaccination from "./CreateCovidVaccination";
import { getVaccinatedPatientDataKey } from "../../utils/queryKeys";
import { fetchPatientVaccinationHistory } from "../../services/fetchPatientVaccinationHistory";
import { useQuery } from "react-query";
import UpdateCovidVaccination from "./UpdateCovidVaccination";

library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const CovidVaccinationHome = (props) => {
  const actionType = props?.activeContent?.actionType || "create";

  const [query] = useState({
    page: 0,
    pageSize: 20,
    search: "",
    id: props?.patientObj?.id,
  });

  const componentMap = {
    create: <CreateCovidVaccination {...props} />,
    update: <UpdateCovidVaccination {...props} disableInputs={false} />,
    view: <UpdateCovidVaccination {...props} disableInputs={true} />,
  };

  const mapCompoenentToActionType = (actionType) => {
    if (!actionType) {
      return componentMap["create"];
    }
    return componentMap[actionType];
  };

  useQuery([getVaccinatedPatientDataKey, query], () =>
    fetchPatientVaccinationHistory(query)
  );

  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />

     

      {mapCompoenentToActionType(actionType)}
    </div>
  );
};

export default CovidVaccinationHome;
