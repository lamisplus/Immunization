export const calculateAge = (dob, noText) => {
    const today = new Date();
    const birthDate = new Date(dob); // create a date object directlyfrom`dob1`argument
    let age_now = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (age_now <= 0 && m < 0 && today.getDate() < birthDate.getDate()) {
      age_now--;
    }

    if (age_now === 0) {
      return m + " month(s)";
    }
    return age_now + " year(s)";
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