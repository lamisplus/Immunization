import { useMutation } from "react-query";
import { saveImmunization } from "../services/saveImmunization";
import { toast } from "react-toastify";
import { queryClient } from "../utils/queryClient";
import {
  getErrorMessage,
  getImmunizationLabel,
} from "../utils/mutationFeedback";

export const useSaveImmunization = (formik, props) => {
  const { mutate, isLoading, isError } = useMutation({
    mutationFn: saveImmunization,
    // A retried POST can record the same vaccination twice.
    retry: false,
    onSuccess: (_data, payload) => {
      toast.success(
        `${getImmunizationLabel(payload?.immunizationType)} saved successfully.`
      );
      formik.resetForm();
      queryClient.invalidateQueries()
      queryClient.refetchQueries()
      props.setActiveContent({ ...props.activeContent, route: "patient-vaccination-history" });
    },
    onError: (error, payload) => {
      toast.error(
        `${getImmunizationLabel(payload?.immunizationType)} could not be saved: ${getErrorMessage(error)}`
      );
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
};
