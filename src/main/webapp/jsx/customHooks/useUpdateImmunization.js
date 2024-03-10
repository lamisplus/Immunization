import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../utils/queryClient";
import { updateImmunization } from "../services/updateImmunization";

export const useUpdateImmunization = (formik, props) => {

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateImmunization,
    onSuccess: () => {
      toast.success("Routine Immunization updated successful.");
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
