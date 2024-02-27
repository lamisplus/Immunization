import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { FormGroup, Label, Input } from "reactstrap";
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
  const [vaccineDosage, setVaccineDosage] = useState("");
  const actionType = props?.activeContent?.actionType || "create";

  const [query] = useState({
    page: 0,
    pageSize: 20,
    search: "",
    id: props?.patientObj?.id,
  });
  const [
    doesPreviousCovidVaccinationExist,
    setDoesPreviousCovidVaccinationExist,
  ] = useState(false);

  const componentMap = {
    create: (
      <CreateCovidVaccination
        {...props}
        vaccineDosage={vaccineDosage}
        setVaccineDosage={setVaccineDosage}
      />
    ),
    update: (
      <UpdateCovidVaccination
        {...props}
        disableInputs={false}
        vaccineDosage={vaccineDosage}
        setVaccineDosage={setVaccineDosage}
      />
    ),
    view: (
      <UpdateCovidVaccination
        {...props}
        disableInputs={true}
        vaccineDosage={vaccineDosage}
        setVaccineDosage={setVaccineDosage}
      />
    ),
  };

  const mapCompoenentToActionType = (actionType) => {
    if (!actionType) {
      return componentMap["create"];
    }

    return componentMap[actionType];
  };

  const setPatientVaccinationDosage = (content) => {
    const firstDose =
      content?.filter(
        (data) => data.uniqueImmunizationData?.vaccinationDosage === "FIRST"
      )?.[0] || null;
    const secondDose =
      content?.filter(
        (data) => data.uniqueImmunizationData?.vaccinationDosage === "SECOND"
      )?.[0] || null;
    const boosterDose =
      content?.filter(
        (data) => data.uniqueImmunizationData?.vaccinationDosage === "BOOSTER"
      )?.[0] || null;

    if (boosterDose) {
      setDoesPreviousCovidVaccinationExist(true);
      setVaccineDosage("BOOSTER");
    } else if (secondDose) {
      setDoesPreviousCovidVaccinationExist(true);
      setVaccineDosage("BOOSTER");
    } else if (firstDose) {
      setDoesPreviousCovidVaccinationExist(true);
      setVaccineDosage("SECOND");
    } else {
      setDoesPreviousCovidVaccinationExist(true);
      setVaccineDosage("FIRST");
    }
  };

  useQuery(
    [getVaccinatedPatientDataKey, query],
    () => fetchPatientVaccinationHistory(query),
    {
      onSuccess: (data) => setPatientVaccinationDosage(data?.content),
    }
  );

  return (
    <div>
      <ToastContainer autoClose={3000} hideProgressBar />

      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <Link
          to={{
            pathname: "/",
            state: "users",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            className=" float-end mr-10 pr-10"
            style={{
              backgroundColor: "#014d88",
              fontWeight: "bolder",
              margingRight: "-40px",
            }}
            startIcon={<TiArrowBack />}
          >
            <span style={{ textTransform: "capitalize", color: "#fff" }}>
              Back{" "}
            </span>
          </Button>
        </Link>
      </div>

      <br />
      <br />

      <div>
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="form-group mb-3 col-md-12">
                  <FormGroup>
                    <Label>
                      Vaccine Dosage
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <Input
                      type="select"
                      name="vaccineDosage"
                      id="vaccineDosage"
                      value={vaccineDosage}
                      onChange={(e) => setVaccineDosage(e.target.value)}
                      disabled={doesPreviousCovidVaccinationExist}
                    >
                      <option value="">Select option</option>
                      <option value="FIRST">FIRST</option>
                      <option value="SECOND">SECOND</option>
                      <option value="BOOSTER">BOOSTER</option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mapCompoenentToActionType(actionType)}
    </div>
  );
};

export default CovidVaccinationHome;
