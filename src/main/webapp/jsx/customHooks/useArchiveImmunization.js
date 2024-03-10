import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { queryClient } from "../utils/queryClient";
import { archiveImmunzation } from "../services/archiveImmunization";

export const useArchiveImmunization = (props) => {
 

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: archiveImmunzation,
    onSuccess: () => {
      toast.success("Immunization deleted successful.");
      queryClient.invalidateQueries()
      queryClient.refetchQueries();
      props.setActiveContent({ ...props.activeContent, route: "patient-vaccination-history" });

    },

    onError: () => {
      toast.error("Immunization deletion failed");
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
};
