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
import CovidFirstVaccinationDose from "./CovidFirstVaccination";

library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const CovidVaccinationHome = (props) => {
  const [vaccineDosage, setVaccineDosage] = useState("");

  const covidFormMap = {
    FIRST: <CovidFirstVaccinationDose />,
  };

  const RenderCovidForm = () => {
    if (!vaccineDosage || vaccineDosage === "") {
      return null;
    }
    return covidFormMap[vaccineDosage];
  };

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
                    >
                      <option value="">Select option</option>
                      <option value="FIRST">First</option>
                      <option value="SECOND">Second</option>
                      <option value="THIRD">Third</option>
                    </Input>
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {RenderCovidForm()}
    </div>
  );
};

export default CovidVaccinationHome;
