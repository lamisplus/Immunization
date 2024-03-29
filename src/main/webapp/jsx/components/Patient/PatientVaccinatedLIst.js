import React, { useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import "semantic-ui-css/semantic.min.css";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import "@reach/menu-button/styles.css";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import { getVaccinatedPatientDataKey } from "../../utils/queryKeys";
import { useQuery } from "react-query";
import { fetchAllVaccinatedPatients } from "../../services/fetchAllVaccinatedPatients";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MdDashboard } from "react-icons/md";
import { Label } from "semantic-ui-react";
import { calculateAge } from "../../utils/calculateAge";
import { queryClient } from "../../utils/queryClient";
import moment from "moment";


Moment.locale("en");
momentLocalizer();

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const PatientVaccinatedList = (props) => {
  const [showPPI, setShowPPI] = useState(true);
  const [query, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
    search: "",
  });
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setShowPPI(false);
    } else {
      setShowPPI(true);
    }
  };

  const prefetchNextPage = async () => {
    const nextPage = query.page + 1;
    // Use the same query key as in the useQuery hook
    const queryKey = [
      getVaccinatedPatientDataKey,
      { ...query, page: nextPage },
    ];
    await queryClient.prefetchQuery(queryKey, () =>
      fetchAllVaccinatedPatients({ ...query, page: nextPage })
    );
  };

  const { data, isLoading, refetch } = useQuery(
    [getVaccinatedPatientDataKey, query],
    () => fetchAllVaccinatedPatients(query),
    {
      onSuccess: () => prefetchNextPage(),
    }
  );
  console.log(data)


  function removeDuplicatePatients(array) {
    const uniqueMap = new Map();

    if (array) {
      // Iterate through the array
      array.forEach((item) => {
        // Use patientId as key in the map
        uniqueMap.set(item.patientId, item);
      });

      // Convert the map back to an array of objects
      const uniqueArray = Array.from(uniqueMap.values());

      return uniqueArray;
    }

    return [];
  }

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Find Patient"
        components={{
          Toolbar: (props) => (
            <div>
              <div className="form-check custom-checkbox  float-left mt-4 ml-3 ">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="showPP!"
                  id="showPP"
                  value="showPP"
                  checked={showPPI === true ? false : true}
                  onChange={handleCheckBox}
                  style={{
                    border: "1px solid #014D88",
                    borderRadius: "0.25rem",
                  }}
                />
                <label className="form-check-label" htmlFor="basic_checkbox_1">
                  <b style={{ color: "#014d88", fontWeight: "bold" }}>
                    SHOW PII
                  </b>
                </label>
              </div>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        columns={[
          {
            title: "Patient Name",
            field: "firstName",
            hidden: showPPI,
          },
          {
            title: "Hospital Number",
            field: "participantId",
            filtering: false,
          },
          {
            title: "Sex",
            field: "gender",
            filtering: false,
          },
          {
            title: "Age",
            field: "age",
            filtering: false,
          },

          {
            title: "Vaccination Status",
            field: "vaccinationStatus",
            filtering: false,
          },
          {
            title: "Actions",
            field: "actions",
            filtering: false,
          },
        ]}
        data={
<<<<<<< HEAD
          !isLoading &&  data && data?.content ?
          removeDuplicatePatients( data?.content)?.map?.((row) => ({
=======
          data &&
          removeDuplicatePatients?.(data?.content) &&
          removeDuplicatePatients?.(data?.content)?.length !== 0 &&
          removeDuplicatePatients(data?.content)?.map?.((row) => ({
>>>>>>> 01db469d07a83427ee0c4d3c149c9f742c0140ab
            firstName:
              row?.uniqueImmunizationData?.patientDto?.firstName +
                " " +
                row?.uniqueImmunizationData?.patientDto?.surname ||
              row?.uniqueImmunizationData?.patientDto?.otherName,
            participantId:
              row?.uniqueImmunizationData?.patientDto?.identifier
                ?.identifier?.[0]?.value,

            gender: row?.uniqueImmunizationData?.patientDto?.sex,
            age: calculateAge(
<<<<<<< HEAD
              moment(row?.uniqueImmunizationData?.patientDto?.dob || row?.uniqueImmunizationData?.patientDto?.dateOfBirth).format("DD-MM-YYYY")
=======
              row?.uniqueImmunizationData?.patientDto?.dateOfBirth
>>>>>>> 01db469d07a83427ee0c4d3c149c9f742c0140ab
            ),
            vaccinationStatus: (
              <Label color="blue" size="mini">
                {"Vaccinated"}
              </Label>
            ),
            actions: (
              <div>
                <Link
                  to={{
                    pathname: "/patient-vaccination-history",
                    state: {
                      patientObj: row?.uniqueImmunizationData?.patientDto,
                    },
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
                          fontSize: "10px",
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
<<<<<<< HEAD
          })): []
=======
          }))
>>>>>>> 01db469d07a83427ee0c4d3c149c9f742c0140ab
        }
        totalCount={data?.totalElements}
        isLoading={isLoading}
        page={data?.pageNumber}
        options={{
          headerStyle: {
            backgroundColor: "#014d88",
            color: "#fff",
          },
          searchFieldStyle: {
            width: "200%",
            margingLeft: "250px",
          },
          filtering: false,
          paging: true,
          exportButton: false,
          searchFieldAlignment: "left",
          pageSizeOptions: [10, 20, 100],
          pageSize: query?.pageSize || 10,
          debounceInterval: 400,
        }}
        onChangePage={(newPage) => {
          setQueryParams((prevFilters) => ({ ...prevFilters, page: newPage }));
          refetch(query);
        }}
        onChangeRowsPerPage={(newPageSize) => {
          setQueryParams((prevFilters) => ({
            ...prevFilters,
            pageSize: newPageSize,
          }));
          refetch(query);
        }}
      />
    </div>
  );
};

export default PatientVaccinatedList;
