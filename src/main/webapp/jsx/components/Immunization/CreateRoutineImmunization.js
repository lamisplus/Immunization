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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";
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
import { useSaveImmunization } from "../../customHooks/useSaveImmunization";

library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

const CreateRoutineImmunization = (props) => {
  const classes = useStyles();
  const clientDateOfBirth =
    props?.patientObj?.dateOfBirth || props?.patientObj?.dob;

  const isMaleClient =
    (props?.patientObj?.gender?.display || "").toLowerCase() === "male";

  const [queryKey] = useState(determineClientImmunization(clientDateOfBirth));

  const { data: vaccines, isLoading } = useQuery([queryKey], () =>
    fetchRoutineImmunizationVaccine(queryKey)
  );

  // HPV is excluded from male clients. Matching on a case-insensitive
  // substring (rather than a fixed code) so it holds regardless of which
  // age-bucket codeset HPV happens to be returned under.
  const filteredVaccines = vaccines?.filter((vacc) => {
    const isHpv =
      vacc?.code?.toLowerCase()?.includes("hpv") ||
      vacc?.display?.toLowerCase()?.includes("hpv");
    return !(isMaleClient && isHpv);
  });

  // Missed-vaccine options are now age-filtered the same way the main
  // vaccine list already is, instead of the full unfiltered catalog.
  const { data: missedVaccine, isLoading: isLoadingMissedVaccine } = useQuery(
    [queryKey, "MISSED_VACCINE"],
    () => fetchRoutineImmunizationVaccine(queryKey)
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
      mutate(payload);
    }
  };
  const { formik } = useImmunizationFormValidationSchema(handleSubmit);
  const { mutate } = useSaveImmunization(formik, props);
  const history = useHistory();

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
                  Routine Immunization
                </h5>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="form-group mb-3 col-md-12">
                    <Label>Date of vaccination

                    <span style={{ color: "red" }}> *</span>
                    </Label>

                    <Input
                      className="form-control"
                      name="vaccinationDate"
                      id="vaccinationDate"
                      type="date"
                      onChange={formik.handleChange}
                      {...{
                        max: moment(new Date()).format("YYYY-MM-DD"),
                      }}
                      {...{
                        min: moment(
                          new Date(
                            clientDateOfBirth
                          )
                        ).format("YYYY-MM-DD"),
                      }}
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
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <FormControl fullWidth>
                      <Select
                        className="form-control"
                        name="vaccineType"
                        id="vaccineType"
                        multiple
                        displayEmpty
                        style={{
                          border: "1px solid #014D88",
                          borderRadius: "0.2rem",
                        }}
                        value={formik?.values?.vaccineType || []}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        renderValue={(selected) =>
                          selected?.length
                            ? vaccines
                                ?.filter((vacc) => selected.includes(vacc.code))
                                .map((vacc) => vacc.display)
                                .join(", ")
                            : "Select vaccine type"
                        }
                        MenuProps={MenuProps}
                      >
                        {filteredVaccines?.map((vacc) => (
                          <MenuItem key={vacc?.id} value={vacc?.code}>
                            <Checkbox
                              checked={
                                (formik?.values?.vaccineType || []).indexOf(
                                  vacc?.code
                                ) > -1
                              }
                            />
                            <ListItemText primary={vacc?.display} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {formik?.touched?.vaccineType &&
                      formik?.errors.vaccineType && (
                        <span className={classes.error}>
                          {formik?.errors.vaccineType}
                        </span>
                      )}
                  </div>

                  <div className="form-group mb-3 col-md-12">
                    <Label>Detail of vaccine

                    <span style={{ color: "red" }}> *</span>
                    </Label>
                    <textarea
                      className="form-control"
                      name="vaccineDetail"
                      id="vaccineDetail"
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
                    <Label>Any missed vaccination ?

                    <span style={{ color: "red" }}> *</span>
                    </Label>
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
                        <span style={{ color: "red" }}> *</span>
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
                        disabled={isLoadingMissedVaccine}
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

            <MatButton
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SaveIcon />}
              style={{ backgroundColor: "#014d88", fontWeight: "bolder" }}
              onClick={handleSubmit}
            >
              {!isLoading ? (
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

export default CreateRoutineImmunization;