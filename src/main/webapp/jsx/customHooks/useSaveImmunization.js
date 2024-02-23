import { useMutation } from "react-query";

export const useSaveImmunization = (mutationFn) => {
  const [mutate, { isLoading, isError }] = useMutation(mutationFn);

  return {
    mutate,
    isLoading,
    isError,
  };
};
