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
import Button from "@material-ui/core/Button";
import { usePatientImmunizationHistory } from "../../customHooks/usePatientImmunizationHistory";
import { useImmunizationNames } from "../../customHooks/useImmunizationNames";
import { describeImmunization } from "../../utils/immunizationDisplay";
import { getImmunizationLabel } from "../../utils/mutationFeedback";
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

  // A patient's whole history is loaded once; the table pages and searches
  // it locally, over the readable values shown in each column.
  const { records, isLoading } = usePatientImmunizationHistory(props?.patientObj?.id);
  const nameLookups = useImmunizationNames();

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

  // The dialog stays open (showing Deleting...) until the request settles.
  const LoadDeletePage = () => {
    mutate(record?.id, {
      onSettled: () => {
        setOpenDeleteModal(false);
        setRecord(null);
      },
    });
  };

  const { mutate, isLoading: isDeleting } = useArchiveImmunization(props);

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
        data={records.map((row) => {
          const summary = describeImmunization(row, nameLookups);
          return {
            immunizationType: summary.typeLabel,
            vaccineType: [summary.vaccines, summary.missedVaccines && `missed: ${summary.missedVaccines}`]
              .filter(Boolean)
              .join("; "),
            vaccinationDate: row?.vaccinationDate || "",
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
          };
        })}
        isLoading={isLoading}
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
            <b>{record && getImmunizationLabel(record?.immunizationType)}</b>
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => LoadDeletePage(record)}
            style={{ backgroundColor: "red", color: "#fff" }}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes"}
          </Button>
          <Button
            onClick={toggleDeleteModal}
            style={{ backgroundColor: "#014d88", color: "#fff" }}
            disabled={isDeleting}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientsVaccinaionHistory;
