import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";
import { parseDate } from "../../utils/calculateAge";

export const useImmunizationFormValidationSchema = (
  onSubmit,
  { dateOfBirth } = {}
) => {
  const immunizationFormIntialValues = {
    vaccineType: [],
    vaccineDetail: "",
    missedVaccine: "",
    missedVaccineType: [],
    vaccinationDate: "",
  };

  const birthDate = parseDate(dateOfBirth);

  const ImmunizationFormInitialSchema = yup.object({
    vaccineType: yup
      .array()
      .of(yup.string())
      .min(1, "This field is required")
      .required("This field is required"),
    vaccinationDate: yup
      .string()
      .required("This field is required")
      .test("not-future", "Vaccination date cannot be in the future", (value) =>
        !value || !moment(value, "YYYY-MM-DD", true).isAfter(moment(), "day")
      )
      .test("not-before-birth", "Vaccination date cannot be before the date of birth", (value) =>
        !value || !birthDate || !moment(value, "YYYY-MM-DD", true).isBefore(birthDate, "day")
      ),
    vaccineDetail: yup.string().required("This field is required"),
    missedVaccine: yup.string().required("This field is required"),
    missedVaccineType: yup.array().of(yup.string()).when("missedVaccine", {
      is: (missedVaccine) => missedVaccine === "yes",
      then: yup.array().of(yup.string()).min(1, "Select at least one missed vaccine"),
      otherwise: yup.array().of(yup.string()),
    }),
  });

  const formik = useFormik({
    initialValues: immunizationFormIntialValues,
    onSubmit,
    validationSchema: ImmunizationFormInitialSchema,
  });
  return { formik };
};
