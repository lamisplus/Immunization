import * as moment from "moment";

export const determineClientImmunization = (dateOfBirth) => {
  const startDate = moment(dateOfBirth);
  const endDate = moment();
  const clientAgeInWeeks = endDate.diff(startDate, "weeks");
  const clientAgeInMonths = endDate.diff(startDate, "months");
  const clientAgeInYears = endDate.diff(startDate, "years");

  if (clientAgeInWeeks < 6) {
    //if client is less than six weeks
    return "IMMUNIZATION_VACCINE_AT_BIRTH";
  } else if (clientAgeInWeeks >= 6 && clientAgeInWeeks < 10) {
    // if client is 6 weeks or above but still less than 10 weeks
    return "IMMUNIZATION_VACCINE_AT_6 WEEKS";
  } else if (clientAgeInWeeks >= 10 && clientAgeInWeeks < 14) {
    // if client is 10 weeks or above but still less than 14 weeks
    return "IMMUNIZATION_VACCINE_AT_10 WEEKS";
  } else if (clientAgeInWeeks >= 14 && clientAgeInMonths < 6) {
    // if client is 14 weeks or above but still less than 6 months
    return "IMMUNIZATION_VACCINE_AT_14 WEEKS";
  } else if (clientAgeInMonths >= 6 && clientAgeInMonths < 9) {
    // if client is 6 months or above but still less than 9 months
    return "IMMUNIZATION_VACCINE_AT_6 MONTHS";
  } else if (clientAgeInMonths >= 9 && clientAgeInMonths < 15) {
    // if client is 9 months or above but still less than 15 months
    return "IMMUNIZATION_VACCINE_AT_9 MONTHS";
  } else if (clientAgeInMonths >= 15 && clientAgeInYears < 9) {
    // if client is 15 months or above but still less than 9 years
    return "IMMUNIZATION_VACCINE_AT_15 MONTHS";
  } else if (clientAgeInYears >= 9) {
    // if client is 9 years or above
    return "IMMUNIZATION_VACCINE_AT_9 YEARS";
  }
  return "ROUTINE_IMMUNIZATION_VACCINE_TYPE";
};
