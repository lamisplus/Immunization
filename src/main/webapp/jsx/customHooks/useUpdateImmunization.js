import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../utils/queryClient";
import { updateImmunization } from "../services/updateImmunization";
import {
  getErrorMessage,
  getImmunizationLabel,
} from "../utils/mutationFeedback";

export const useUpdateImmunization = (formik, props) => {

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateImmunization,
    onSuccess: (_data, variables) => {
      toast.success(
        `${getImmunizationLabel(variables?.data?.immunizationType)} updated successfully.`
      );
      formik.resetForm();
      queryClient.invalidateQueries()
      queryClient.refetchQueries()
      props.setActiveContent({ ...props.activeContent, route: "patient-vaccination-history" });
    },
    onError: (error, variables) => {
      toast.error(
        `${getImmunizationLabel(variables?.data?.immunizationType)} could not be updated: ${getErrorMessage(error)}`
      );
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
};
