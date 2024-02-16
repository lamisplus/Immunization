import { useFormik } from "formik";
import * as yup from "yup";

export const useTetanusFormValidationSchema = (onSubmit) => {
  const tetanusIntialValues = {
    vaccineType: "",
    vaccineResult: "",
  };

  const tetanusFormValidationSchema = yup.object({
    vaccineType: yup.string().required("This field is required"),
    
    vaccineResult: yup.string().when("vaccineType", {
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
