import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MdDashboard } from "react-icons/md";
import "@reach/menu-button/styles.css";
import { Label } from "semantic-ui-react";
import { useQuery } from "react-query";
import { getVaccinatedPatientDataKey } from "../../utils/queryKeys";
import { Link } from "react-router-dom";
import axios from "axios";
import { token, url as baseUrl } from "./../../../api";


export const useFetchVaccinatedPatientData = (query) => {
  const calculate_age = (dob) => {
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

  const { data } = useQuery(
    [getVaccinatedPatientDataKey, query],
    () =>
      axios
        .get(
          `${baseUrl}covid/vaccinated-patients?pageSize=${query.pageSize}&pageNo=${query.page}&searchParam=${query.search}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) =>
          response.data.records.map((row) => ({
            name: row.firstName + " " + row.lastName,
            hospital_number: row.participantId,
            gender: row.gender !== null ? row.gender.display : "",
            age: calculate_age(row.dob),
            count: (
              <Label color="blue" size="mini">
                {row.vaccinationStatus}
              </Label>
            ),
            actions: (
              <div>
                <Link
                  to={{
                    pathname: "/patient-history",
                    state: { patientObj: row },
                  }}
                >
                  <ButtonGroup
                    variant="contained"
                    aria-label="split button"
                    style={{
                      backgroundColor: "rgb(153, 46, 98)",
                      height: "30px",
                      width: "215px",
                    }}
                    size="large"
                  >
                    <Button
                      color="primary"
                      size="small"
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      style={{ backgroundColor: "rgb(153, 46, 98)" }}
                    >
                      <MdDashboard />
                    </Button>
                    <Button style={{ backgroundColor: "rgb(153, 46, 98)" }}>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#fff",
                          fontWeight: "bolder",
                        }}
                      >
                        Patient Dashboard
                      </span>
                    </Button>
                  </ButtonGroup>
                </Link>
              </div>
            ),
          }))
        )
  );

  return data

};
