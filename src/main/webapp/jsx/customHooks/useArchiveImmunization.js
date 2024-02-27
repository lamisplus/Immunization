import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { queryClient } from "../utils/queryClient";
import { archiveImmunzation } from "../services/archiveImmunization";

export const useArchiveImmunization = () => {
  const history = useHistory();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: archiveImmunzation,
    onSuccess: () => {
      toast.success("Immunization deleted successful.");
      queryClient.invalidateQueries()
      queryClient.refetchQueries();
      history.push({
        pathname: "/",
      });
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
