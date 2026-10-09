export const getHospitalNumber = (obj) => {
  if (obj && obj?.participantId) {
    return obj?.participantId;
  } else {
    const identifiers =
      obj?.identifier?.identifier?.filter?.(
        (obj) => obj?.type === "HospitalNumber"
      ) || [];
    const currentIdentifier = identifiers?.pop?.() || null;

    return currentIdentifier?.value !== null ? currentIdentifier?.value : "";
  }
};

export const getPatientName = (obj) =>
  [obj?.firstName, obj?.otherName, obj?.surname].filter(Boolean).join(" ");

export const getPatientSex = (obj) => obj?.sex || obj?.gender?.display || "";
