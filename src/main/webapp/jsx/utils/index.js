export const getPhoneNumber = (identifier) => {
    const identifiers = identifier;
    const phoneNumber = identifiers.contactPoint.find(
      (obj) => obj.type === "phone"
    );
    return phoneNumber ? phoneNumber.value : "";
  };
  
  export const getAddress = (identifier) => {
    const identifiers = identifier;
    const address = identifiers.address.find((obj) => obj.city);
    const houseAddress =
      address && address.line[0] !== null ? address.line[0] : "";
    const landMark =
      address && address.city && address.city !== null ? address.city : "";
    return address ? houseAddress + " " + landMark : "";
  };
  
  export const getLastName = (obj) => {
    if (obj && obj.lastName) {
      return obj.lastName;
    } else if (obj && obj.surname) {
      return obj.surname;
    } else if (obj && obj.otherName) {
      return obj.otherName;
    } else {
      return "";
    }
  };
  
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
  
  export const calculateAge = (dob) => {
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
  
  export const generateRandomString = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };