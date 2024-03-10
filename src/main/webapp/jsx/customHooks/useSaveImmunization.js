import { useMutation } from "react-query";
import { saveImmunization } from "../services/saveImmunization";
import { toast } from "react-toastify";
import { queryClient } from "../utils/queryClient";

export const useSaveImmunization = (formik, props) => {
 

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: saveImmunization,
    onSuccess: () => {
      toast.success("Routine Immunization saved successful.");
      formik.resetForm();
      queryClient.invalidateQueries()
      queryClient.refetchQueries()
      props.setActiveContent({ ...props.activeContent, route: "patient-vaccination-history" });
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
};
