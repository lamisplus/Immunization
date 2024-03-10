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
import Button from "@material-ui/core/Button";
import { queryClient } from "../../utils/queryClient";
import { fetchPatientVaccinationHistory } from "../../services/fetchPatientVaccinationHistory";
import { Dropdown, Menu, Icon } from "semantic-ui-react";
import "@reach/menu-button/styles.css";
import { useArchiveImmunization } from "../../customHooks/useArchiveImmunization";

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

const PatientsVaccinaionHistory = (props) => {
  const [showPPI, setShowPPI] = useState(true);
  const [query, setQueryParams] = useState({
    page: 0,
    pageSize: 20,
    search: "",
    id: props?.patientObj?.id,
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
      fetchPatientVaccinationHistory({ ...query, page: nextPage })
    );
  };

  const { data, isLoading, refetch } = useQuery(
    [getVaccinatedPatientDataKey, query],
    () => fetchPatientVaccinationHistory(query),
    {
      onSuccess: () => prefetchNextPage(),
    }
  );

  const LoadViewPage = (row, action) => {
    if (row.immunizationType === "ROUTINE_IMMUNIZATION") {
      props.setActiveContent({
        ...props.activeContent,
        route: "routine-immunization-patient",
        id: row.id,
        actionType: action,
      });
    } else if (row.immunizationType === "TETANUS_IMMUNIZATION") {
      props.setActiveContent({
        ...props.activeContent,
        route: "tetanus-patient",
        id: row.id,
        actionType: action,
      });
    } else {
      props.setActiveContent({
        ...props.activeContent,
        route: "covid-patient",
        id: row.id,
        actionType: action,
      });
    }
  };

  const LoadDeletePage = (row) => {
    mutate(row.id);
  };

  const { mutate } = useArchiveImmunization(props);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title="Patient Vaccination History"
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
            title: "Immunization Type",
            field: "immunizationType",
            filtering: true,
            // hidden: showPPI,
          },
          {
            title: "Vaccine Type",
            field: "vaccineType",
            filtering: false,
            render: (row) => row?.uniqueImmunizationData?.vaccineType,
          },
          {
            title: "Vaccination Date",
            field: "vaccinationDate",
            filtering: false,
            render: (row) => row?.uniqueImmunizationData?.vaccinationDate,
          },

          {
            title: "Actions",
            field: "actions",
            filtering: false,
            render: (row) => (
              <div>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Button
                      style={{ backgroundColor: "rgb(153,46,98)" }}
                      primary
                    >
                      <Dropdown item text="Action">
                        <Dropdown.Menu style={{ marginTop: "10px" }}>
                          <Dropdown.Item
                            onClick={() => LoadViewPage(row, "view")}
                          >
                            {" "}
                            <Icon name="eye" />
                            View{" "}
                          </Dropdown.Item>

                          <Dropdown.Item
                            onClick={() => LoadViewPage(row, "update")}
                          >
                            <Icon name="edit" />
                            Edit
                          </Dropdown.Item>

                          <Dropdown.Item
                            onClick={() => LoadDeletePage(row, "delete")}
                          >
                            {" "}
                            <Icon name="trash" /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Button>
                  </Menu.Item>
                </Menu.Menu>
              </div>
            ),
          },
        ]}
        data={data?.content || []}
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
      />
    </div>
  );
};

export default PatientsVaccinaionHistory;
