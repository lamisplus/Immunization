import React, { useState } from "react";
import { Form, Input, Label } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "react-phone-input-2/lib/style.css";
import "react-widgets/dist/css/react-widgets.css";
import { useQuery } from "react-query";
// import { queryClient } from "../../utils/queryClient";
import { determineClientImmunization } from "../../utils/determineClientRoutineImmunizationVaccine";
import { fetchRoutineImmunizationVaccine } from "../../services/fetchRoutineImmunizationVaccine";
import { useImmunizationFormValidationSchema } from "./useImmunizationFormSchema";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import MatButton from "@material-ui/core/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";
import { fetchImmunizationById } from "../../services/fetchImmunizationById";
import { useUpdateImmunization } from "../../customHooks/useUpdateImmunization";

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

const UpdateRoutineImmunization = (props) => {
  const disableInputs = props?.disableInputs;
  const classes = useStyles();
  const clientDateOfBirth =
    props?.patientObj?.dateOfBirth || props?.patientObj?.dob;

  const [queryKey] = useState(determineClientImmunization(clientDateOfBirth));
  const [formInitialValue, setFormInitialValue] = useState(null)
  const { data: vaccines, isLoading } = useQuery([queryKey], () =>
    fetchRoutineImmunizationVaccine(queryKey)
  );

  const { data: missedVaccine, isLoading: isLoadingMissedVaccine } = useQuery(
    ["ROUTINE_IMMUNIZATION_VACCINE_TYPE"],
    () => fetchRoutineImmunizationVaccine("ROUTINE_IMMUNIZATION_VACCINE_TYPE")
  );

  const handleSubmit = async () => {
    Object.keys(formik?.initialValues).forEach((fieldName) => {
      formik?.setFieldTouched(fieldName, true);
    });
    const errorObj = await formik.validateForm();
    const isValid = Object.keys(errorObj).length === 0;

    const payload = {
      immunizationType: "ROUTINE_IMMUNIZATION",
      patientId: props?.patientObj?.id,
      patientUuid: props?.patientObj?.uuid,
      vaccinationDate: formik?.values?.vaccinationDate,
      uniqueImmunizationData: {
        ...formik.values,
       patientDto: props.patientObj
      },
    };

    if (isValid) {
      mutate({ data: payload, id: props?.activeContent?.id });
    }
  };

  const { formik } = useImmunizationFormValidationSchema(handleSubmit);
  const { mutate } = useUpdateImmunization(formik, props);
  const history = useHistory();

  useQuery(
    ["FETCH_IMMUNIZATION_BY_ID", props?.activeContent?.id],
    () => fetchImmunizationById(props?.activeContent?.id),
    {
      onSuccess: (data) => {
        const initialValues = {
          immunizationType: data?.immunizationType,
          vaccinationDate: data?.vaccinationDate,
          vaccineType: data?.uniqueImmunizationData?.vaccineType,
          vaccineDetail: data?.uniqueImmunizationData?.vaccineDetail,
          missedVaccine: data?.uniqueImmunizationData?.missedVaccine,
          missedVaccineType: data?.uniqueImmunizationData?.missedVaccineType,
        };
        if (formInitialValue === null) {
          setFormInitialValue(initialValues)
          formik.setValues(initialValues);
        }
      },
      refetchOnMount: "always",

    }
  );

  return (
    <Card className={classes.root} style={{ marginTop: 20 }}>
      <CardContent>
        <div className="col-xl-12 col-lg-12">
          <Form>
            <div className="card">
              <div
                className="card-header"
                style={{
                  backgroundColor: "#014d88",
                  color: "#fff",
                }}
              >
                <h5 className="card-title" style={{ color: "#fff" }}>
                  {" "}
                  Routine Immunization {`(${props?.activeContent?.actionType})`}
                </h5>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="form-group mb-3 col-md-12">
                    <Label>Date of vaccination</Label>
                    <Input
                      className="form-control"
                      name="vaccinationDate"
                      id="vaccinationDate"
                      type="date"
                      onChange={formik.handleChange}
                      {...{
                        max: moment(new Date()).format("YYYY-MM-DD"),
                      }}
                      disabled={disableInputs}
                      readOnly={disableInputs}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.vaccinationDate}
                    />
                    {formik?.touched?.vaccinationDate &&
                      formik?.errors.vaccinationDate && (
                        <span className={classes.error}>
                          {formik?.errors.vaccinationDate}
                        </span>
                      )}
                  </div>

                  <div className="form-group mb-3 col-md-12">
                    <Label>
                      Type of vaccine {isLoading && "Loading vaccine ..."}
                    </Label>
                    <select
                      className="form-control"
                      name="vaccineType"
                      id="vaccineType"
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.2rem",
                      }}
                      disabled={disableInputs}
                      readOnly={disableInputs}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.vaccineType}
                    >
                      <option value="">Select vaccine type</option>
                      {vaccines?.map((vacc) => (
                        <option key={vacc?.id} value={vacc?.code}>
                          {vacc?.display}
                        </option>
                      ))}
                    </select>

                    {formik?.touched?.vaccineType &&
                      formik?.errors.vaccineType && (
                        <span className={classes.error}>
                          {formik?.errors.vaccineType}
                        </span>
                      )}
                  </div>

                  <div className="form-group mb-3 col-md-12">
                    <Label>Detail of vaccine</Label>
                    <textarea
                      className="form-control"
                      name="vaccineDetail"
                      id="vaccineDetail"
                      disabled={disableInputs}
                      readOnly={disableInputs}
                      style={{
                        height: 150,
                        border: "1px solid #014D88",
                        borderRadius: "0.2rem",
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.vaccineDetail}
                    />
                    {formik?.touched?.vaccineDetail &&
                      formik?.errors.vaccineDetail && (
                        <span className={classes.error}>
                          {formik?.errors.vaccineDetail}
                        </span>
                      )}
                  </div>

                  <div className="form-group mb-3 col-md-12">
                    <Label>Any missed vaccination ?</Label>
                    <select
                      className="form-control"
                      name="missedVaccine"
                      id="missedVaccine"
                      style={{
                        border: "1px solid #014D88",
                        borderRadius: "0.2rem",
                      }}
                      onChange={(e) => {
                        formik.setFieldValue("missedVaccineType", "");
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.missedVaccine}
                      disabled={disableInputs}
                      readOnly={disableInputs}
                    >
                      <option value="">Select option</option>

                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </select>

                    {formik?.touched?.missedVaccine &&
                      formik?.errors.missedVaccine && (
                        <span className={classes.error}>
                          {formik?.errors.missedVaccine}
                        </span>
                      )}
                  </div>

                  {formik?.values?.missedVaccine === "yes" && (
                    <div className="form-group mb-3 col-md-12">
                      <Label>
                        Enter missed vaccine{" "}
                        {isLoadingMissedVaccine && "Loading vaccine ..."}
                      </Label>
                      <select
                        className="form-control"
                        name="missedVaccineType"
                        id="missedVaccineType"
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik?.values?.missedVaccineType}
                        disabled={isLoadingMissedVaccine || disableInputs}
                        readOnly={disableInputs}
                      >
                        <option value="">Select vaccine type</option>
                        {missedVaccine?.map((vacc) => (
                          <option key={vacc?.id} value={vacc?.code}>
                            {vacc?.display}
                          </option>
                        ))}
                      </select>

                      {formik?.touched?.missedVaccineType &&
                        formik?.errors.missedVaccineType && (
                          <span className={classes.error}>
                            {formik?.errors.missedVaccineType}
                          </span>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!disableInputs && (
              <MatButton
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
                onClick={handleSubmit}
              >
                {!isLoading ? (
                  <span style={{ textTransform: "capitalize" }}>Update</span>
                ) : (
                  <span style={{ textTransform: "capitalize" }}>
                    Updating...
                  </span>
                )}
              </MatButton>
            )}
            {!disableInputs && (
              <MatButton
                variant="contained"
                className={classes.button}
                startIcon={<CancelIcon />}
                style={{ backgroundColor: "#992E62" }}
                onClick={() =>
                  history.push({
                    pathname: "/",
                    state: { patientObj: props?.patientObj },
                  })
                }
              >
                <span style={{ textTransform: "capitalize", color: "#fff" }}>
                  Cancel
                </span>
              </MatButton>
            )}
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateRoutineImmunization;
