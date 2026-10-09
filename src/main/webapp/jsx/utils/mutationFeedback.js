const IMMUNIZATION_LABELS = {
  ROUTINE_IMMUNIZATION: "Routine Immunization",
  TETANUS_IMMUNIZATION: "Tetanus Immunization",
  COVID_IMMUNIZATION: "COVID-19 Vaccination",
};

export const getImmunizationLabel = (immunizationType) =>
  IMMUNIZATION_LABELS[immunizationType] || "Immunization";

// Best human-readable reason for a failed request. Spring's default error
// body leaves `message` empty and puts the reason in `error`; the security
// filter nests it under `apierror`; network failures have no response.
export const getErrorMessage = (error) => {
  const data = error?.response?.data;
  return (
    data?.message ||
    data?.apierror?.message ||
    data?.error ||
    error?.message ||
    "Unknown error"
  );
};
