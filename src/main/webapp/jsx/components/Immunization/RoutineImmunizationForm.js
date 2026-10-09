import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Input, Label } from "reactstrap";
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
import { useQuery } from "react-query";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import MatButton from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useImmunizationFormValidationSchema } from "./useImmunizationFormSchema";
import { useSaveImmunization } from "../../customHooks/useSaveImmunization";
import { useUpdateImmunization } from "../../customHooks/useUpdateImmunization";
import { usePatientImmunizationHistory } from "../../customHooks/usePatientImmunizationHistory";
import { fetchImmunizationById } from "../../services/fetchImmunizationById";
import {
  fetchRoutineVaccineCatalog,
  getVaccineName,
  routineVaccineCatalogKey,
} from "../../utils/routineVaccineCatalog";
import {
  getMissedVaccineOptions,
  getReceivedVaccineCodes,
  getRoutineVaccineOptions,
  toCurrentCodes,
} from "../../utils/routineVaccineOptions";

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
  error: {
    color: "#f85032",
    fontSize: "12.8px",
  },
  hint: {
    color: "#6c757d",
    fontSize: "12.8px",
    display: "block",
  },
}));

const selectStyle = { border: "1px solid #014D88", borderRadius: "0.2rem" };

// Create, update and view of a routine immunization record. The vaccines
// offered follow the schedule stage the patient is in on the vaccination
// date; missed vaccines come from earlier stages not yet received.
const RoutineImmunizationForm = ({ mode, patientObj, activeContent, setActiveContent }) => {
  const classes = useStyles();
  const history = useHistory();
  const isCreate = mode === "create";
  const disableInputs = mode === "view";
  const recordId = isCreate ? null : activeContent?.id;
  const dateOfBirth = patientObj?.dateOfBirth || patientObj?.dob;
  const isMale =
    (patientObj?.gender?.display || patientObj?.sex || "").toLowerCase() === "male";

  const { data: catalog, isLoading: isLoadingCatalog } = useQuery(
    routineVaccineCatalogKey,
    fetchRoutineVaccineCatalog
  );
  const { records: patientHistory } = usePatientImmunizationHistory(patientObj?.id);
  const { data: record } = useQuery(
    ["FETCH_IMMUNIZATION_BY_ID", recordId],
    () => fetchImmunizationById(recordId),
    { enabled: !!recordId, refetchOnMount: "always" }
  );
  // Codes stored on the record, kept selectable even if no longer offered.
  const [savedCodes, setSavedCodes] = useState({ vaccineType: [], missedVaccineType: [] });

  const handleSubmit = async () => {
    Object.keys(formik?.initialValues).forEach((fieldName) => {
      formik?.setFieldTouched(fieldName, true);
    });
    const errorObj = await formik.validateForm();
    if (Object.keys(errorObj).length !== 0) return;

    const values = formik.values;
    const payload = {
      immunizationType: "ROUTINE_IMMUNIZATION",
      patientId: patientObj?.id,
      patientUuid: patientObj?.uuid,
      vaccinationDate: values.vaccinationDate,
      uniqueImmunizationData: {
        ...values,
        missedVaccineType: values.missedVaccine === "yes" ? values.missedVaccineType : [],
        patientDto: patientObj,
      },
    };
    if (isCreate) {
      save(payload);
    } else {
      update({ data: payload, id: recordId });
    }
  };

  const { formik } = useImmunizationFormValidationSchema(handleSubmit, { dateOfBirth });
  const { mutate: save, isLoading: isSaving } = useSaveImmunization(formik, {
    activeContent,
    setActiveContent,
  });
  const { mutate: update, isLoading: isUpdating } = useUpdateImmunization(formik, {
    activeContent,
    setActiveContent,
  });
  const isSubmitting = isSaving || isUpdating;
  const { values } = formik;

  // Load the record once the catalog is known, rewriting legacy codes to
  // the current ones so an update stores the same codes a new record would.
  const recordLoaded = useRef(false);
  useEffect(() => {
    if (!record || !catalog || recordLoaded.current) return;
    recordLoaded.current = true;
    const data = record.uniqueImmunizationData || {};
    const vaccineType = toCurrentCodes(catalog, data.vaccineType);
    const missedVaccineType = toCurrentCodes(catalog, data.missedVaccineType);
    setSavedCodes({ vaccineType, missedVaccineType });
    formik.setValues({
      vaccinationDate: record.vaccinationDate || "",
      vaccineType,
      vaccineDetail: data.vaccineDetail || "",
      missedVaccine: data.missedVaccine || "",
      missedVaccineType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [record, catalog]);

  const vaccineOptions = useMemo(
    () =>
      getRoutineVaccineOptions({
        catalog,
        dateOfBirth,
        vaccinationDate: values.vaccinationDate,
        isMale,
        savedCodes: savedCodes.vaccineType,
      }),
    [catalog, dateOfBirth, values.vaccinationDate, isMale, savedCodes.vaccineType]
  );

  const receivedCodes = useMemo(
    () => getReceivedVaccineCodes(patientHistory, recordId),
    [patientHistory, recordId]
  );

  const missedOptions = useMemo(
    () =>
      getMissedVaccineOptions({
        catalog,
        dateOfBirth,
        vaccinationDate: values.vaccinationDate,
        isMale,
        receivedCodes,
        selectedCodes: values.vaccineType,
        savedCodes: savedCodes.missedVaccineType,
      }),
    [catalog, dateOfBirth, values.vaccinationDate, isMale, receivedCodes, values.vaccineType, savedCodes.missedVaccineType]
  );

  // A different vaccination date can move the patient to another stage:
  // drop selections that stage no longer offers.
  useEffect(() => {
    if (!catalog || disableInputs) return;
    const keep = (field, options) => {
      const allowed = new Set(options.map((v) => v.code));
      const current = values[field] || [];
      const kept = current.filter((code) => allowed.has(code));
      if (kept.length !== current.length) formik.setFieldValue(field, kept);
    };
    keep("vaccineType", vaccineOptions.vaccines);
    keep("missedVaccineType", missedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineOptions, missedOptions]);

  const noMissedOptions = missedOptions.length === 0;
  const names = (codes) => (codes || []).map((code) => getVaccineName(catalog, code)).join(", ");

  const stageHint = () => {
    if (!catalog) return null;
    if (vaccineOptions.stageIndex === -1) {
      return values.vaccinationDate && dateOfBirth
        ? "The vaccination date is before the date of birth."
        : !dateOfBirth
        ? "Date of birth unknown: showing every vaccine in the schedule."
        : null;
    }
    return `Schedule stage on this date: ${vaccineOptions.stage.label}`;
  };

  const missedHint = () => {
    if (!noMissedOptions || !catalog) return null;
    if (vaccineOptions.stageIndex === -1) {
      return "Missed vaccines can't be worked out without a date of birth and vaccination date.";
    }
    return "No vaccine from an earlier schedule stage is outstanding for this patient.";
  };

  const fieldError = (field) =>
    formik?.touched?.[field] && formik?.errors?.[field] ? (
      <span className={classes.error}>{formik.errors[field]}</span>
    ) : null;

  const title = isCreate ? "Routine Immunization" : `Routine Immunization (${mode})`;

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
                  {title}
                </h5>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="form-group mb-3 col-md-12">
                    <Label>
                      Date of vaccination
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <Input
                      className="form-control"
                      name="vaccinationDate"
                      id="vaccinationDate"
                      type="date"
                      onChange={formik.handleChange}
                      max={moment().format("YYYY-MM-DD")}
                      min={dateOfBirth ? moment(dateOfBirth).format("YYYY-MM-DD") : undefined}
                      disabled={disableInputs}
                      readOnly={disableInputs}
                      onBlur={formik.handleBlur}
                      value={values.vaccinationDate}
                    />
                    {fieldError("vaccinationDate")}
                    {stageHint() && <span className={classes.hint}>{stageHint()}</span>}
                  </div>

                  <div className="form-group mb-3 col-md-12">
                    <Label>
                      Type of vaccine {isLoadingCatalog && "Loading vaccine ..."}
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <FormControl fullWidth>
                      <Select
                        className="form-control"
                        name="vaccineType"
                        id="vaccineType"
                        multiple
                        displayEmpty
                        style={selectStyle}
                        disabled={disableInputs}
                        value={values.vaccineType || []}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        renderValue={(selected) =>
                          selected?.length ? names(selected) : "Select vaccine type"
                        }
                        MenuProps={MenuProps}
                      >
                        {vaccineOptions.vaccines.map((vacc) => (
                          <MenuItem key={vacc.code} value={vacc.code}>
                            <Checkbox checked={(values.vaccineType || []).indexOf(vacc.code) > -1} />
                            <ListItemText primary={vacc.display} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {fieldError("vaccineType")}
                  </div>

                  <div className="form-group mb-3 col-md-12">
                    <Label>
                      Detail of vaccine
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <textarea
                      className="form-control"
                      name="vaccineDetail"
                      id="vaccineDetail"
                      disabled={disableInputs}
                      readOnly={disableInputs}
                      style={{ height: 150, ...selectStyle }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={values.vaccineDetail}
                    />
                    {fieldError("vaccineDetail")}
                  </div>

                  <div className="form-group mb-3 col-md-12">
                    <Label>
                      Any missed vaccination ?
                      <span style={{ color: "red" }}> *</span>
                    </Label>
                    <select
                      className="form-control"
                      name="missedVaccine"
                      id="missedVaccine"
                      style={selectStyle}
                      onChange={(e) => {
                        formik.setFieldValue("missedVaccineType", []);
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={values.missedVaccine}
                      disabled={disableInputs}
                    >
                      <option value="">Select option</option>
                      <option value={"yes"} disabled={noMissedOptions && values.missedVaccine !== "yes"}>
                        Yes
                      </option>
                      <option value={"no"}>No</option>
                    </select>
                    {fieldError("missedVaccine")}
                    {missedHint() && <span className={classes.hint}>{missedHint()}</span>}
                  </div>

                  {values.missedVaccine === "yes" && (
                    <div className="form-group mb-3 col-md-12">
                      <Label>
                        Missed vaccine(s) given {isLoadingCatalog && "Loading vaccine ..."}
                        <span style={{ color: "red" }}> *</span>
                      </Label>
                      <FormControl fullWidth>
                        <Select
                          className="form-control"
                          name="missedVaccineType"
                          id="missedVaccineType"
                          multiple
                          displayEmpty
                          style={selectStyle}
                          disabled={disableInputs || isLoadingCatalog}
                          value={values.missedVaccineType || []}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          renderValue={(selected) =>
                            selected?.length ? names(selected) : "Select missed vaccine(s)"
                          }
                          MenuProps={MenuProps}
                        >
                          {missedOptions.map((vacc) => (
                            <MenuItem key={vacc.code} value={vacc.code}>
                              <Checkbox
                                checked={(values.missedVaccineType || []).indexOf(vacc.code) > -1}
                              />
                              <ListItemText primary={vacc.display} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {fieldError("missedVaccineType")}
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
                disabled={isSubmitting}
              >
                <span style={{ textTransform: "capitalize" }}>
                  {isCreate
                    ? isSaving
                      ? "Saving..."
                      : "Save"
                    : isUpdating
                    ? "Updating..."
                    : "Update"}
                </span>
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
                    state: { patientObj },
                  })
                }
              >
                <span style={{ textTransform: "capitalize", color: "#fff" }}>Cancel</span>
              </MatButton>
            )}
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoutineImmunizationForm;
