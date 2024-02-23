import { useFormik } from "formik";
import * as yup from "yup";

export const useImmunizationFormValidationSchema = (onSubmit) => {
  const immunizationFormIntialValues = {
    vaccineType: "",
    vaccineDetail: "",
    missedVaccine: "",
    missedVaccineType: "",
    vaccinationDate: ""
  };

  const ImmunizationFormInitialSchema = yup.object({
    vaccineType: yup.string().required("This field is required"),
    vaccinationDate: yup.string().required("This field is required"),
    vaccineDetail: yup.string().required("This field is required"),
    missedVaccine: yup.string().required("This field is required"),
    missedVaccineType: yup.string().when("missedVaccine", {
      is: (missedVaccine) => missedVaccine === "yes",
      then: yup.string().required("This field is required"),
      otherwise: yup.string(),
    }),
  });

  const formik = useFormik({
    initialValues: immunizationFormIntialValues,
    onSubmit,
    validationSchema: ImmunizationFormInitialSchema,
  });
  return { formik };
};
