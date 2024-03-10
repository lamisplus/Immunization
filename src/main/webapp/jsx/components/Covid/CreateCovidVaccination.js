/* eslint-disable no-unused-vars */
import MatButton from "@material-ui/core/Button";
import React, { useState } from "react";
import { FormGroup, Label, Input, Form, Spinner } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import "react-widgets/dist/css/react-widgets.css";
import { fetchCodesets } from "../../services/fetchCodeset";
import { useQuery } from "react-query";
import { fetchCovidVaccines } from "../../services/fetchCovidVaccines";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useCovidVaccinationFormValidationSchema } from "./covidFirstVaccinationValidationSchema";
import { useSaveImmunization } from "../../customHooks/useSaveImmunization";
import { getVaccinatedPatientDataKey } from "../../utils/queryKeys";
import { fetchPatientVaccinationHistory } from "../../services/fetchPatientVaccinationHistory";

library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardBottom: {
    marginBottom: 20,
  },
  Select: {
    height: 45,
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    "& .card-title": {
      color: "#fff",
      fontWeight: "bold",
    },
    "& .form-control": {
      borderRadius: "0.25rem",
      height: "41px",
    },
    "& .card-header:first-child": {
      borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0",
    },
    "& .dropdown-toggle::after": {
      display: " block !important",
    },
    "& select": {
      "-webkit-appearance": "listbox !important",
    },
    "& p": {
      color: "red",
    },
    "& label": {
      fontSize: "14px",
      color: "#014d88",
      fontWeight: "bold",
    },
  },
  demo: {
    backgroundColor: theme.palette.background.default,
  },
  inline: {
    display: "inline",
  },
  error: {
    color: "#f85032",
    fontSize: "12.8px",
  },
  success: {
    color: "#4BB543 ",
    fontSize: "11px",
  },
}));

const CreateCovidVaccination = (props) => {
  const classes = useStyles();

  const { data: covidAdverseEffects } = useQuery(
    ["GET_CODESETS", "COVID_ADVERSE_EFFECT"],
    () => fetchCodesets("COVID_ADVERSE_EFFECT")
  );

  const { data: vaccines } = useQuery(["COVID_VACCINES"], () =>
    fetchCovidVaccines()
  );

  const handleSubmit = async () => {
    Object.keys(formik?.initialValues).forEach((fieldName) => {
      formik?.setFieldTouched(fieldName, true);
    });
    const errorObj = await formik.validateForm();
    const isValid = Object.keys(errorObj).length === 0;

    const payload = {
      immunizationType: "COVID_IMMUNIZATION",

      patientId: props?.patientObj?.id,
      patientUuid: props?.patientObj?.uuid,
      vaccinationDate: formik?.values?.vaccinationDate,
      uniqueImmunizationData: {
        ...formik.values,
        patientDto: props.patientObj,
      },
    };

    if (isValid) {
      mutate(payload);
    }
  };

  const history = useHistory();
  const { formik } = useCovidVaccinationFormValidationSchema(handleSubmit);
  const { mutate } = useSaveImmunization(formik);

  const actionType = props?.activeContent?.actionType || "create";

  const [query] = useState({
    page: 0,
    pageSize: 20,
    search: "",
    id: props?.patientObj?.id,
  });

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
      formik?.setFieldValue("vaccinationDosage", "BOOSTER");
    } else if (secondDose) {
      formik?.setFieldValue("vaccinationDosage", "BOOSTER");
    } else if (firstDose) {
      formik?.setFieldValue("vaccinationDosage", "SECOND");
    } else {
      formik?.setFieldValue("vaccinationDosage", "FIRST");
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
                      name="vaccinationDosage"
                      id="vaccinationDosage"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.vaccinationDosage}
                    >
                      <option value="">Select option</option>
                      <option value="FIRST">FIRST</option>
                      <option value="SECOND">SECOND</option>
                      <option value="BOOSTER">BOOSTER</option>
                    </Input>

                    {formik?.touched?.vaccinationDosage &&
                      formik?.errors.vaccinationDosage && (
                        <span className={classes.error}>
                          {formik?.errors.vaccinationDosage}
                        </span>
                      )}
                  </FormGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className={classes.root}>
        <CardContent>
          <div className="col-xl-12 col-lg-12">
            <Form>
              <div className="card">
                <div
                  className="card-header"
                  style={{
                    backgroundColor: "#014d88",
                    color: "#fff",
                    fontWeight: "bolder",
                    borderRadius: "0.2rem",
                  }}
                >
                  <h5 className="card-title" style={{ color: "#fff" }}>
                    COVID-19 Vaccination
                  </h5>
                </div>

                <div className="card-body">
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label>
                          Do you work in the Health sector ?
                          <span style={{ color: "red" }}> *</span>
                        </Label>

                        <Input
                          type="select"
                          name="workInHealthSector"
                          id="workInHealthSector"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values?.workInHealthSector}
                        >
                          <option value="">Select</option>
                          <option value="YES">Yes</option>
                          <option value="NO">No</option>
                        </Input>

                        {formik?.touched?.workInHealthSector &&
                          formik?.errors.workInHealthSector && (
                            <span className={classes.error}>
                              {formik?.errors.workInHealthSector}
                            </span>
                          )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label>
                          Any known medical condition ?{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Label>
                        <Input
                          type="select"
                          name="knownMedicalCondition"
                          id="knownMedicalCondition"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values?.knownMedicalCondition}
                        >
                          <option value="">Select</option>
                          <option value="YES">Yes</option>
                          <option value="NO">No</option>
                        </Input>

                        {formik?.touched?.knownMedicalCondition &&
                          formik?.errors.knownMedicalCondition && (
                            <span className={classes.error}>
                              {formik?.errors.knownMedicalCondition}
                            </span>
                          )}
                      </FormGroup>
                    </div>

                    {formik?.values?.knownMedicalCondition === "YES" && (
                      <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                          <Label for="medicalCondition">
                            Medical conditions{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            name="medicalCondition"
                            id="medicalCondition"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values?.medicalCondition}
                            style={{
                              border: "1px solid #014D88",
                              borderRadius: "0.2rem",
                            }}
                          />
                          {formik?.touched?.medicalCondition &&
                            formik?.errors.medicalCondition && (
                              <span className={classes.error}>
                                {formik?.errors.medicalCondition}
                              </span>
                            )}
                        </FormGroup>
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label for="adverseEffect">
                          Adverse Effect{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Label>

                        <Input
                          type="select"
                          name="adverseEffect"
                          id="adverseEffect"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values?.adverseEffect}
                        >
                          <option value="">Select</option>
                          <option value="YES">Yes</option>
                          <option value="NO">No</option>
                        </Input>

                        {formik?.touched?.adverseEffect &&
                          formik?.errors.adverseEffect && (
                            <span className={classes.error}>
                              {formik?.errors.adverseEffect}
                            </span>
                          )}
                      </FormGroup>
                    </div>

                    {formik?.values?.adverseEffect === "YES" && (
                      <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                          <Label for="adverseEffectOption">
                            Reaction Type (Adverse Effect){" "}
                            <span style={{ color: "red" }}> *</span>
                          </Label>

                          <Input
                            type="select"
                            name="adverseEffectOption"
                            id="adverseEffectOption"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values?.adverseEffectOption}
                          >
                            <option value="">Select</option>

                            {covidAdverseEffects?.map((adverseEffects) => (
                              <option
                                value={adverseEffects?.code}
                                key={adverseEffects?.id}
                              >
                                {adverseEffects?.display}
                              </option>
                            ))}
                          </Input>

                          {formik?.touched?.adverseEffectOption &&
                            formik?.errors.adverseEffectOption && (
                              <span className={classes.error}>
                                {formik?.errors.adverseEffectOption}
                              </span>
                            )}
                        </FormGroup>
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label for="vaccineType">
                          Vaccine <span style={{ color: "red" }}> *</span>
                        </Label>
                        <Input
                          type="select"
                          name="vaccineType"
                          id="vaccineType"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values?.vaccineType}
                        >
                          <option value="">Select</option>
                          {vaccines?.map((vaccine) => (
                            <option value={vaccine?.code} key={vaccine?.id}>
                              {vaccine?.name}
                            </option>
                          ))}
                        </Input>

                        {formik?.touched?.vaccineType &&
                          formik?.errors.vaccineType && (
                            <span className={classes.error}>
                              {formik?.errors.vaccineType}
                            </span>
                          )}
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label for="vaccinationDate">
                          Date of vaccination
                          <span style={{ color: "red" }}> *</span>
                        </Label>

                        <Input
                          type="date"
                          name="vaccinationDate"
                          id="vaccinationDate"
                          max={moment(new Date()).format("YYYY-MM-DD")}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values?.vaccinationDate}
                        />
                        {formik?.touched?.vaccinationDate &&
                          formik?.errors.vaccinationDate && (
                            <span className={classes.error}>
                              {formik?.errors.vaccinationDate}
                            </span>
                          )}
                      </FormGroup>
                    </div>

                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label>
                          Location <span style={{ color: "red" }}> *</span>
                        </Label>

                        <Input
                          type="select"
                          name="location"
                          id="location"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values?.location}
                        >
                          <option value="">Select</option>
                          <option value="Facility">Facility</option>
                          <option value="Community">Community</option>
                        </Input>

                        {formik?.touched?.location &&
                          formik?.errors.location && (
                            <span className={classes.error}>
                              {formik?.errors.location}
                            </span>
                          )}
                      </FormGroup>
                    </div>

                    {formik?.values?.location === "Facility" && (
                      <div className="form-group mb-3 col-md-6">
                        <FormGroup>
                          <Label for="vaccinationFacility">
                            Facility Name
                            <span style={{ color: "red" }}> *</span>
                          </Label>

                          <Input
                            type="text"
                            name="vaccinationFacility"
                            id="vaccinationFacility"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values?.vaccinationFacility}
                          />

                          {formik?.touched?.vaccinationFacility &&
                            formik?.errors.vaccinationFacility && (
                              <span className={classes.error}>
                                {formik?.errors.vaccinationFacility}
                              </span>
                            )}
                        </FormGroup>
                      </div>
                    )}

                    <div className="form-group mb-3 col-md-6">
                      <FormGroup>
                        <Label for="batchNumber">
                          Batch Number <span style={{ color: "red" }}> *</span>
                        </Label>

                        <Input
                          type="text"
                          name="batchNumber"
                          id="batchNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values?.batchNumber}
                        />
                        {formik?.touched?.batchNumber &&
                          formik?.errors.batchNumber && (
                            <span className={classes.error}>
                              {formik?.errors.batchNumber}
                            </span>
                          )}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </div>

              {false ? <Spinner /> : ""}

              <br />
              <MatButton
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
              >
                {!false ? (
                  <span style={{ textTransform: "capitalize" }}>Save</span>
                ) : (
                  <span style={{ textTransform: "capitalize" }}>Saving...</span>
                )}
              </MatButton>

              <MatButton
                variant="contained"
                className={classes.button}
                startIcon={<CancelIcon />}
                style={{ backgroundColor: "#992E62" }}
                onClick={() => history.push({ pathname: "/" })}
              >
                <span style={{ textTransform: "capitalize", color: "#fff" }}>
                  Cancel
                </span>
              </MatButton>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCovidVaccination;
