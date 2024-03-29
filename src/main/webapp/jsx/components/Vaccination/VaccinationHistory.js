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
import "@reach/menu-button/styles.css";
import { useArchiveImmunization } from "../../customHooks/useArchiveImmunization";
import { Dropdown, Menu, Icon as IconMenu } from "semantic-ui-react";
import { Modal } from "react-bootstrap";

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
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const [record, setRecord] = useState(null);

  const onToggleModal = (row) => {
    toggleDeleteModal();
    setRecord(row);
  };

  const [query, setQueryParams] = useState({
    page: 0,
    pageSize: 10,
    search: "",
    id: props?.patientObj?.id,
  });

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

  const LoadDeletePage = () => {
    toggleDeleteModal();
    mutate(record?.id);
    setRecord(null);
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
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        columns={[
          {
            title: "Immunization Type",
            field: "immunizationType",
            filtering: false,
          },
          {
            title: "Vaccine Type",
            field: "vaccineType",
            filtering: false,
          },
          {
            title: "Vaccination Date",
            field: "vaccinationDate",
            filtering: false,
          },

          {
            title: "Actions",
            field: "actions",
            filtering: false,
          },
        ]}
        data={
          data &&
          data?.content &&
          data?.content?.length !== 0 &&
          data?.content?.map?.((row) => ({
            immunizationType: row?.immunizationType,
            vaccineType: row?.uniqueImmunizationData?.vaccineType,
            vaccinationDate: row?.uniqueImmunizationData?.vaccinationDate || "",
            actions: (
              <div>
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Button
                      style={{
                        backgroundColor: "rgb(153,46,98)",
                        color: "#fff",
                      }}
                      primary
                    >
                      <Dropdown item text="Action">
                        <Dropdown.Menu style={{ marginTop: "10px" }}>
                          <Dropdown.Item
                            onClick={() => LoadViewPage(row, "view")}
                          >
                            <IconMenu name="eye" />
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => LoadViewPage(row, "update")}
                          >
                            <IconMenu name="edit" />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => onToggleModal(row)}>
                            {" "}
                            <IconMenu name="trash" /> Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Button>
                  </Menu.Item>
                </Menu.Menu>
              </div>
            ),
          }))
        }
        totalCount={data?.totalElements}
        isLoading={isLoading}
        page={data?.pagable?.pageNumber}
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

      <Modal
        show={openDeleteModal}
        toggle={toggleDeleteModal}
        className="fade"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Notification!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>
            Are you Sure you want to delete -{" "}
            <b>{record && record?.immunizationType}</b>
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => LoadDeletePage(record)}
            style={{ backgroundColor: "red", color: "#fff" }}
            disabled={isLoading}
          >
            {isLoading === false ? "Yes" : "Deleting..."}
          </Button>
          <Button
            onClick={toggleDeleteModal}
            style={{ backgroundColor: "#014d88", color: "#fff" }}
            disabled={isLoading}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientsVaccinaionHistory;
