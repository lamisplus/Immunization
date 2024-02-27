import { useMutation } from "react-query";
import { saveImmunization } from "../services/saveImmunization";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { queryClient } from "../utils/queryClient";

export const useSaveImmunization = (formik) => {
  const history = useHistory();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: saveImmunization,
    onSuccess: () => {
      toast.success("Routine Immunization saved successful.");
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
