import React, { useMemo, useState } from "react";
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
import { getPatientDataKey } from "../../utils/queryKeys";
import { fetchAllPatients } from "../../services/fetchAllPatients";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { MdDashboard } from "react-icons/md";
import { calculateAge } from "../../utils/calculateAge";
import { getHospitalNumber, getPatientName, getPatientSex } from "../../utils";
import { remoteTableLoader } from "../../utils/remoteTable";

//Date Picker package
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

const toRow = (row) => ({
    name: getPatientName(row),
    hospital_number: getHospitalNumber(row),
    gender: getPatientSex(row),
    age: calculateAge(row?.dob || row?.dateOfBirth),

    actions: (
      <div>
        <Link
          to={{
            pathname: "/patient-vaccination-history",
            route: "patient-vaccination-history",
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
});

const PatientList = (props) => {
  const [showPPI, setShowPPI] = useState(true);
  const handleCheckBox = (e) => {
    if (e.target.checked) {
      setShowPPI(false);
    } else {
      setShowPPI(true);
    }
  };

  // Paged and searched by the patient API (pageNo/pageSize/searchParam).
  const loadPage = useMemo(
    () =>
      remoteTableLoader({
        queryKey: getPatientDataKey,
        fetchPage: fetchAllPatients,
        toPage: (response, params) => ({
          data: (response?.records || []).map(toRow),
          page: response?.currentPage ?? params.page,
          totalCount: response?.totalRecords ?? 0,
        }),
      }),
    []
  );

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Find Patient"
        columns={[
          {
            title: "Patient Name",
            field: "name",
            hidden: showPPI,
          },
          {
            title: "Hospital Number",
            field: "hospital_number",
            filtering: false,
          },

          { title: "Sex", field: "gender", filtering: false },
          { title: "Age", field: "age", filtering: false },

          { title: "Actions", field: "actions", filtering: false },
        ]}
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
        data={loadPage}
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
          pageSize: 10,
          debounceInterval: 400,
        }}
      />
    </div>
  );
};

export default PatientList;
