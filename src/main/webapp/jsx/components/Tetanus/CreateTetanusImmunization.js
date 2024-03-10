import React from "react";
import MatButton from "@material-ui/core/Button";
import { Card, Form, FormGroup, Input, Label } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckSquare,
  faCoffee,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { useHistory } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import "react-widgets/dist/css/react-widgets.css";
import { useQuery } from "react-query";
import { useTetanusFormValidationSchema } from "./useTetanusFormValidationSchema";
import { fetchRoutineImmunizationVaccine } from "../../services/fetchRoutineImmunizationVaccine";
import moment from "moment";
import { useSaveImmunization } from "../../customHooks/useSaveImmunization";

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

const CreateTetanusImmunizationTetanus = (props) => {
  const history = useHistory();

  const classes = useStyles();

  const { data: tetanusVaccines, isLoading } = useQuery(
    ["TETANUS_VACCINE"],
    () => fetchRoutineImmunizationVaccine("TETANUS_VACCINE")
  );

  const handleSubmit = async () => {
    Object.keys(formik?.initialValues).forEach((fieldName) => {
      formik?.setFieldTouched(fieldName, true);
    });
    const errorObj = await formik.validateForm();
    const isValid = Object.keys(errorObj).length === 0;

    const payload = {
      immunizationType: "TETANUS_IMMUNIZATION",
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

  const { formik } = useTetanusFormValidationSchema(handleSubmit);
  const { mutate } = useSaveImmunization(formik, props);

  return (
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
                  Tetanus
                </h5>
              </div>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="form-group mb-3 col-md-6">
                  <FormGroup>
                    <Label>
                      Type of vaccine {isLoading && "Loading vaccine ..."}
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <Input
                      type="select"
                      name="vaccineType"
                      id="vaccineType"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values?.vaccineType}
                      disable={isLoading}
                    >
                      <option>Select</option>
                      {!isLoading &&
                        tetanusVaccines?.map((vacc) => (
                          <option  value={vacc?.code} key={vacc?.id}>
                            {vacc?.name || vacc?.display}
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

                {formik?.values?.vaccineType !== "" && (
                  <div className="form-group mb-3 col-md-6">
                    <FormGroup>
                      <Label>
                        Vaccination Date
                        <span style={{ color: "red" }}> *</span>
                      </Label>
                      <Input
                        type="date"
                        name="vaccinationDate"
                        id="vaccinationDate"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values?.vaccinationDate}
                        {...{
                          max: moment(new Date()).format("YYYY-MM-DD"),
                        }}
                      />

                      {formik?.touched?.vaccinationDate &&
                        formik?.errors.vaccinationDate && (
                          <span className={classes.error}>
                            {formik?.errors.vaccinationDate}
                          </span>
                        )}
                    </FormGroup>
                  </div>
                )}
              </div>
            </div>

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
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateTetanusImmunizationTetanus;
