import moment from "moment";

// The patient API returns ISO dates (YYYY-MM-DD); DD-MM-YYYY is still
// accepted for callers that pre-format. Parsing is strict so a date in one
// format is never misread as the other.
const DATE_FORMATS = ["YYYY-MM-DD", "DD-MM-YYYY", moment.ISO_8601];

export const parseDate = (value) => {
  if (!value) return null;
  const parsed =
    value instanceof Date || moment.isMoment(value)
      ? moment(value)
      : moment(value, DATE_FORMATS, true);
  return parsed.isValid() ? parsed : null;
};

// Age as "N year(s)", or "N month(s)" under one year, measured at
// referenceDate (e.g. a vaccination date) or today when omitted.
export const calculateAge = (dob, referenceDate) => {
  const birthDate = parseDate(dob);
  const atDate = referenceDate ? parseDate(referenceDate) : moment();
  if (!birthDate || !atDate || atDate.isBefore(birthDate, "day")) return "";

  const years = atDate.diff(birthDate, "years");
  if (years >= 1) {
    return years + " year(s)";
  }
  return atDate.diff(birthDate, "months") + " month(s)";
};

// Age in whole completed years; 0 when the date is missing or invalid.
export const calculateAgeNoText = (dob) => {
  const birthDate = parseDate(dob);
  return birthDate ? Math.max(moment().diff(birthDate, "years"), 0) : 0;
};
