export const calculateAge = (dob) => {
  var today = new Date();
  var dateParts = dob.split("-");
  var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]); // Correct the order of date parts
  var birthDate = new Date(dateObject); // Create a Date object directly from the 'dob' argument
  var age_years = today.getFullYear() - birthDate.getFullYear();
  var age_months = today.getMonth() - birthDate.getMonth();
  if (age_months < 0 || (age_months === 0 && today.getDate() < birthDate.getDate())) {
      age_years--;
      age_months = 12 + age_months; // Adjust months if negative
  }
  if (age_years === 0) {
      return age_months + " month(s)";
  }
  return age_years + " year(s)";
};


  export const calculateAgeNoText = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob); // create a date object directlyfrom`dob1`argument
    let age_now = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (age_now <= 0 && m < 0 && today.getDate() < birthDate.getDate()) {
      age_now--;
    }

    if (age_now === 0) {
      return m;
    }
    return age_now;
  };