import { useFormik } from "formik";
import * as yup from "yup";

export const useCovidVaccinationFormValidationSchema = (onSubmit) => {
  const covidFirstVaccinationInitialValue = {
    workInHealthSector: "",
    knownMedicalCondition: "",
    medicalCondition: "",
    adverseEffect: "",
    adverseEffectOption: "",
    vaccineType: "",
    vaccinationDate: "",
    location: "",
    vaccinationFacility: "",
    batchNumber: "",
    vaccinationDosage: ""
  };

  const covidFirstVaccValidationSchema = yup.object({
    workInHealthSector: yup.string().required("This field is required"),
    vaccinationDosage: yup.string().required("This field is required"),

    knownMedicalCondition: yup.string().required("This field is required"),

    medicalCondition: yup.string().when("knownMedicalCondition", {
      is: (knownMedicalCondition) =>
        knownMedicalCondition?.toLowerCase() === "yes",
      then: yup.string().required("This field is required"),
      otherwise: yup.string(),
    }),

    adverseEffect: yup.string().required("This field is required"),

    adverseEffectOption: yup.string().when("adverseEffect", {
      is: (adverseEffect) => adverseEffect?.toLowerCase() === "yes",
      then: yup.string().required("This field is required"),
      otherwise: yup.string(),
    }),

    vaccineType: yup.string().required("This field is required"),

    vaccinationDate: yup.date().required("This field is required"),

    location: yup.string().required("This field is required"),

    vaccinationFacility: yup.string().when("location", {
      is: (location) => location?.toLowerCase() === "facility",
      then: yup.string().required("This field is required"),
      otherwise: yup.string(),
    }),

    batchNumber: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: covidFirstVaccinationInitialValue,
    onSubmit,
    validationSchema: covidFirstVaccValidationSchema,
  });
  return { formik };
};
