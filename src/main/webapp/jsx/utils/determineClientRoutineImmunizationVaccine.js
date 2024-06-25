export const determineClientImmunization = (dateOfBirth) => {
  const startDate = new Date(dateOfBirth);
  const endDate = new Date();

  // Calculate age in milliseconds
  const diffInMilliseconds = endDate - startDate;

  // Calculate exact age in weeks
  const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
  const clientAgeInWeeks = Math.floor(diffInMilliseconds / millisecondsInWeek);

  // Calculate exact age in months
  let clientAgeInMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  clientAgeInMonths -= startDate.getMonth();
  clientAgeInMonths += endDate.getMonth();
  if (endDate.getDate() < startDate.getDate()) {
    clientAgeInMonths -= 1;
  }

  // Calculate exact age in years
  let clientAgeInYears = endDate.getFullYear() - startDate.getFullYear();
  if (endDate.getMonth() < startDate.getMonth() || 
      (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())) {
    clientAgeInYears -= 1;
  }

  console.log(clientAgeInWeeks, clientAgeInMonths)

  if (clientAgeInWeeks < 6) {
    return "IMMUNIZATION_VACCINE_AT_BIRTH";
  } else if (clientAgeInWeeks >= 6 && clientAgeInWeeks < 10) {
    return "IMMUNIZATION_VACCINE_AT_6_WEEKS";
  } else if (clientAgeInWeeks >= 10 && clientAgeInWeeks < 14) {
    return "IMMUNIZATION_VACCINE_AT_10_WEEKS";
  } else if (clientAgeInWeeks >= 14 && clientAgeInMonths < 6) {
    return "IMMUNIZATION_VACCINE_AT_14_WEEKS";
  } else if (clientAgeInMonths >= 6 && clientAgeInMonths < 9) {
    return "IMMUNIZATION_VACCINE_AT_6_MONTHS";
  } else if (clientAgeInMonths >= 9 && clientAgeInMonths < 15) {
    return "IMMUNIZATION_VACCINE_AT_9_MONTHS";
  } else if (clientAgeInMonths >= 15 && clientAgeInYears < 9) {
    return "IMMUNIZATION_VACCINE_AT_15_MONTHS";
  } else if (clientAgeInYears >= 9) {
    return "IMMUNIZATION_VACCINE_AT_9_YEARS";
  }
  return "ROUTINE_IMMUNIZATION_VACCINE_TYPE";
};
