import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { queryClient } from "../utils/queryClient";
import { updateImmunization } from "../services/updateImmunization";

export const useUpdateImmunization = (formik) => {
  const history = useHistory();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: updateImmunization,
    onSuccess: () => {
      toast.success("Routine Immunization updated successful.");
      formik.resetForm();
      queryClient.invalidateQueries()
      queryClient.refetchQueries()
      history.push({
        pathname: "/",
      });
    },
  });

  return {
    mutate,
    isLoading,
    isError,
  };
};
