import React, { useCallback, useEffect, useState } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { url as baseUrl } from "./../../../api";
import { token } from "./../../../api";
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
import { Card, CardBody } from "reactstrap";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Dropdown, Menu, Icon as IconMenu } from "semantic-ui-react";
import "@reach/menu-button/styles.css";
import { Modal } from "react-bootstrap";
import Vaccination from "./../Vaccination/AddViccination";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";

//Dtate Picker package
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

const PatientVaccinationHistory = (props) => {
  const [vacinationList, setVaccinationList] = useState([]);
  const patientObj = props && props.patientObj ? props.patientObj : [];
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
  const [record, setRecord] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    patients();
  });

  ///GET LIST OF Patient's Vaccinations
  const patients = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseUrl}covid/vaccinations/patients/${patientObj.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setVaccinationList(response.data);
    } catch (error) {
      // Handle the error
    }
  }, [patientObj.id, setVaccinationList]);

  const LoadEditModal = (row) => {
    setRecord(row);
    toggle();
  };
  const LoadDeleteModal = (row) => {
    toggleDeleteModal();
    setRecord(row);
  };
  console.log(record);
  const LoadDeletePage = () => {
    setSaving(true);
    axios
      .delete(`${baseUrl}covid/vaccinations/${record.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Record Deleted Successfully");
        patients();
        toggleDeleteModal();
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        if (error.response && error.response.data) {
          let errorMessage =
            error.response.data.apierror &&
            error.response.data.apierror.message !== ""
              ? error.response.data.apierror.message
              : "Something went wrong, please try again";
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong. Please try again...");
        }
      });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <MaterialTable
            icons={tableIcons}
            title="Patient Vaccination History "
            columns={[
              { title: "Vaccine", field: "vaccine", filtering: false },
              {
                title: "Vaccine Date",
                field: "vaccineDate",
              },

              { title: "Dose Number", field: "doseNumber", filtering: false },
              { title: "Location", field: "location", filtering: false },
              { title: "Batch Number", field: "batchNumber", filtering: false },
              {
                title: "Adverse Effect ",
                field: "adverseEffect",
                filtering: false,
              },
              {
                title: "Vaccination Facility",
                field: "vaccinationFacility",
                filtering: false,
              },
              { title: "Actions", field: "actions", filtering: false },
            ]}
            data={vacinationList.map((row) => ({
              vaccine: row.vaccineName,
              vaccineDate: row.vaccineDate,
              batchNumber: row.batchNumber,
              doseNumber: row.doseNumber,
              location: row.location,
              vaccinationFacility: row.vaccinationFacility,
              adverseEffect: row.adverseEffect,
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
                            <Dropdown.Item onClick={() => LoadEditModal(row)}>
                              <IconMenu name="edit" />
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => LoadDeleteModal(row)}>
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
            }))}
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
              exportButton: false,
              searchFieldAlignment: "left",
              pageSizeOptions: [10, 20, 100],
              pageSize: 10,
              debounceInterval: 400,
            }}
          />
        </CardBody>
      </Card>
      <Vaccination
        toggle={toggle}
        showModal={modal}
        patientObj={props.patientObj}
        loadPatients={patients}
        records={record}
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
            <b>{record && record.batchNumber}</b>
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => LoadDeletePage(record)}
            style={{ backgroundColor: "red", color: "#fff" }}
            disabled={saving}
          >
            {saving === false ? "Yes" : "Deleting..."}
          </Button>
          <Button
            onClick={toggleDeleteModal}
            style={{ backgroundColor: "#014d88", color: "#fff" }}
            disabled={saving}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientVaccinationHistory;
