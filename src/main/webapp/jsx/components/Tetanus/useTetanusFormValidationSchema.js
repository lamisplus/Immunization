import { useFormik } from "formik";
import * as yup from "yup";

export const useTetanusFormValidationSchema = (onSubmit) => {
  const tetanusIntialValues = {
    vaccineType: "",
    vaccinationDate: "",
  };

  const tetanusFormValidationSchema = yup.object({
    vaccineType: yup.string().required("This field is required"),

    vaccinationDate: yup.date().when("vaccineType", {
      is: (vaccineType) => vaccineType !== "",
      then: yup.date().required("This field is required"),
      otherwise: yup.date(),
    }),
    vaccinationResult: yup.string().when("vaccineType", {
      is: (vaccineType) => vaccineType !== "",
      then: yup.string().required("This field is required"),
      otherwise: yup.string(),
    }),
  });

  const formik = useFormik({
    initialValues: tetanusIntialValues,
    onSubmit,
    validationSchema: tetanusFormValidationSchema,
  });
  return { formik };
};
