import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../utils/queryClient";
import { archiveImmunzation } from "../services/archiveImmunization";
import { getErrorMessage } from "../utils/mutationFeedback";

export const useArchiveImmunization = (props) => {


  const { mutate, isLoading, isError } = useMutation({
    mutationFn: archiveImmunzation,
    onSuccess: () => {
      toast.success("Immunization deleted successfully.");
      queryClient.invalidateQueries()
      queryClient.refetchQueries();
      props.setActiveContent({ ...props.activeContent, route: "patient-vaccination-history" });

    },

    onError: (error) => {
      toast.error(`Immunization could not be deleted: ${getErrorMessage(error)}`);
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
};
