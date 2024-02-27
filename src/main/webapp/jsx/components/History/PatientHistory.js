import React, { Fragment, useState, useEffect } from "react";
// BS
import { Dropdown } from "react-bootstrap";
/// Scroll
import { makeStyles } from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
//import { Link } from "react-router-dom";
import axios from "axios";
import { url as baseUrl, token } from "../../../api";
import { Alert } from "react-bootstrap";
import { Card, Accordion } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import { getVaccinatedPatientDataKey } from "../../utils/queryKeys";
import { queryClient } from "../../utils/queryClient";
import { fetchPatientVaccinationHistory } from "../../services/fetchPatientVaccinationHistory";
import { useQuery } from "react-query";
import { useArchiveImmunization } from "../../customHooks/useArchiveImmunization";



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bolder",
  },
}));
const RecentHistory = (props) => {
  const classes = useStyles();
  const [vitaLoad, setViralLoad] = useState([]);
  const [refillList, setRefillList] = useState([]);
  const [clinicVisitList, setClinicVisitList] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [loadingLab, setLoadingLab] = useState(true);
  const [toggleFacSelect, settoggleFacSelect] = useState(false);

  const [loadingPharmacy, setLoadingPharmacy] = useState(true);
  const [notToBeUpdated, setNotToBeUpdated] = useState([
    "eac",
    "eac-session",
    "client-tracker",
  ]);
  let history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = useState(false);
  const [record, setRecord] = useState(null);
  const [query] = useState({
    page: 0,
    pageSize: 20,
    search: "",
    id: props?.patientObj?.id,
  });

 
  
 
  const ActivityName = (name) => {
    if (name === "COVID_IMMUNIZATION") {
      return "CI";
    } else if (name === "TETANUS_IMMUNIZATIOn") {
      return "TI";
    } else if (name === "ROUTINE_IMMUNIZATION") {
      return "RI";
    
    } else {
      return "IM";
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

  const { mutate } = useArchiveImmunization();


  const redirectLink = () => {
    props.setActiveContent({ ...props.activeContent, route: "recent-history" });
  };
  const LoadModal = (row) => {
    toggle();
    setRecord(row);
  };

  return (
    <Fragment>
      

      <div className="row">
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header  border-0 pb-0">
              <h4 className="card-title">
                <b>Recent Activities</b>{" "}
              </h4>
            </div>
            <div className="card-body">
              {loadingRecent === false ? (
                <>
                  <PerfectScrollbar
                    style={{ height: "370px" }}
                    id="DZ_W_Todo1"
                    className="widget-media dz-scroll ps ps--active-y"
                  >
                    <Accordion
                      className="accordion accordion-header-bg accordion-header-shadow accordion-rounded "
                      defaultActiveKey="0"
                    >
                      <>
                        {recentActivities.map((data, i) => (
                          <div className="accordion-item" key={i}>
                            <Accordion.Toggle
                              as={Card.Text}
                              eventKey={`${i}`}
                              className={`accordion-header ${
                                activeAccordionHeaderShadow === 1
                                  ? ""
                                  : "collapsed"
                              } accordion-header-info`}
                              onClick={() =>
                                setActiveAccordionHeaderShadow(
                                  activeAccordionHeaderShadow === 1 ? -1 : i
                                )
                              }
                            >
                              <span className="accordion-header-icon"></span>
                              <span className="accordion-header-text">
                                Visit Date :{" "}
                                <span className="">{data.date}</span>{" "}
                              </span>
                              <span className="accordion-header-indicator"></span>
                            </Accordion.Toggle>
                            <Accordion.Collapse
                              eventKey={`${i}`}
                              className="accordion__body"
                            >
                              <div className="accordion-body-text">
                                <ul className="timeline">
                                  {data.activities &&
                                    data.activities.map((activity, index) => (
                                      <>
                                        <li>
                                          <div className="timeline-panel">
                                            <div
                                              className={
                                                index % 2 == 0
                                                  ? "media me-2 media-info"
                                                  : "media me-2 media-success"
                                              }
                                            >
                                              {ActivityName(activity.name)}
                                            </div>
                                            <div className="media-body">
                                              <h5 className="mb-1">
                                                {activity.name ===
                                                "Chronic Care"
                                                  ? "Care and Support"
                                                  : activity.name}
                                              </h5>
                                              <small className="d-block">
                                                {activity.date}
                                              </small>
                                            </div>
                                            {!notToBeUpdated.includes(
                                              activity.path
                                            ) ? (
                                              <Dropdown className="dropdown">
                                                <Dropdown.Toggle
                                                  variant=" light"
                                                  className="i-false p-0 btn-info sharp"
                                                >
                                                  <svg
                                                    width="18px"
                                                    height="18px"
                                                    viewBox="0 0 24 24"
                                                    version="1.1"
                                                  >
                                                    <g
                                                      stroke="none"
                                                      strokeWidth="1"
                                                      fill="none"
                                                      fillRule="evenodd"
                                                    >
                                                      <rect
                                                        x="0"
                                                        y="0"
                                                        width="24"
                                                        height="24"
                                                      />
                                                      <circle
                                                        fill="#000000"
                                                        cx="5"
                                                        cy="12"
                                                        r="2"
                                                      />
                                                      <circle
                                                        fill="#000000"
                                                        cx="12"
                                                        cy="12"
                                                        r="2"
                                                      />
                                                      <circle
                                                        fill="#000000"
                                                        cx="19"
                                                        cy="12"
                                                        r="2"
                                                      />
                                                    </g>
                                                  </svg>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="dropdown-menu">
                                                  {activity.viewable && (
                                                    <Dropdown.Item
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        LoadViewPage(
                                                          activity,
                                                          "view"
                                                        )
                                                      }
                                                    >
                                                      View
                                                    </Dropdown.Item>
                                                  )}
                                                  {activity.viewable && (
                                                    <Dropdown.Item
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        LoadViewPage(
                                                          activity,
                                                          "update"
                                                        )
                                                      }
                                                    >
                                                      Update
                                                    </Dropdown.Item>
                                                  )}
                                                  {activity.deletable && (
                                                    <Dropdown.Item
                                                      className="dropdown-item"
                                                      to="/widget-basic"
                                                      onClick={() =>
                                                        LoadModal(
                                                          activity,
                                                          "delete"
                                                        )
                                                      }
                                                    >
                                                      Delete
                                                    </Dropdown.Item>
                                                  )}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        </li>
                                      </>
                                    ))}
                                </ul>
                              </div>
                            </Accordion.Collapse>
                          </div>
                        ))}
                      </>
                    </Accordion>
                  </PerfectScrollbar>
                </>
              ) : (
                <>
                  <p>Loading please wait...</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h4 className="card-title">
                <b>Laboratory Orders</b>
              </h4>
            </div>
            <div className="card-body">
              {loadingLab === false ? (
                <>
                  <PerfectScrollbar
                    style={{ height: "370px" }}
                    id="DZ_W_TimeLine"
                    className="widget-timeline dz-scroll height370 ps ps--active-y"
                  >
                    <ul className="timeline">
                      {vitaLoad.length > 0 ? (
                        <>
                          {vitaLoad.map((test, index) => (
                            <>
                              <li key={index}>
                                <div
                                  className={labStatus(test.labTestOrderStatus)}
                                ></div>
                                <span
                                  className="timeline-panel text-muted"
                                  onClick={() => redirectLink()}
                                  //to=""
                                >
                                  <h6 className="mb-0">
                                    Test Order Date <br />
                                    <strong className="text-primary">
                                      {test.dateOrderBy}
                                    </strong>
                                  </h6>
                                  {test.labTestGroupName !== "others" && (
                                    <h6 className="mb-0">
                                      Test Order <br />
                                      <strong className="text-primary">
                                        {test.labTestGroupName +
                                          " - " +
                                          test.labTestName}
                                      </strong>
                                      .
                                    </h6>
                                  )}
                                  {test.labTestGroupName === "others" && (
                                    <h6 className="mb-0">
                                      Test Order <br />
                                      <strong className="text-primary">
                                        {test.labTestName +
                                          " - " +
                                          test.viralLoadIndicationName}
                                      </strong>
                                      .
                                    </h6>
                                  )}

                                  <h6 className="mb-0">
                                    Status <br />
                                    <strong className="text-primary">
                                      {test.labTestOrderStatusName}
                                    </strong>
                                    .
                                  </h6>
                                  {test.labTestOrderStatusName ===
                                    "Result Reported" && (
                                    <>
                                      <h6 className="mb-0">
                                        Date Result Reported <br />
                                        <strong className="text-primary">
                                          {test.dateResultReported}
                                        </strong>
                                        .
                                      </h6>
                                      <h6 className="mb-0">
                                        Result <br />
                                        <strong className="text-primary">
                                          {test.result}
                                        </strong>
                                        .
                                      </h6>
                                    </>
                                  )}
                                </span>
                              </li>
                            </>
                          ))}
                        </>
                      ) : (
                        <Alert
                          variant="info"
                          className="alert-dismissible solid fade show"
                        >
                          <p>No Laboratory Test Order Yet</p>
                        </Alert>
                      )}
                    </ul>
                  </PerfectScrollbar>
                </>
              ) : (
                <>
                  <p>Loading please wait...</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-4">
          <div className="card">
            <div className="card-header border-0 pb-0">
              <h3 className="card-title">
                <b>Refill Summary</b>
              </h3>
            </div>
            <div className="card-body">
              {loadingPharmacy === false ? (
                <>
                  <PerfectScrollbar
                    style={{ height: "370px" }}
                    id="DZ_W_TimeLine1"
                    className="widget-timeline dz-scroll style-1 height370 ps ps--active-y"
                  >
                    <ul className="timeline">
                      {refillList && refillList.length > 0 ? (
                        <>
                          {refillList.map((regimen, index) => (
                            <>
                              <li key={index}>
                                <div
                                  className={
                                    index % 2 == 0
                                      ? "timeline-badge info"
                                      : "timeline-badge success"
                                  }
                                ></div>
                                <span
                                  className="timeline-panel text-muted"
                                  onClick={() => redirectLink()}
                                  //to=""
                                >
                                  <h6 className="mb-0">
                                    Regimen
                                    {regimenName(
                                      regimen && regimen.extra
                                        ? regimen.extra.regimens
                                        : null
                                    )}
                                  </h6>
                                  <strong className="text-teal">
                                    Refill Duration
                                    <br />
                                    {regimen.refillPeriod}
                                  </strong>
                                  <br />
                                  <strong className="text-black">
                                    Visit Date
                                    <br />
                                    {regimen.visitDate}
                                  </strong>
                                  <br />
                                  <strong className="text-warning">
                                    Next Appointment
                                    <br />
                                    {regimen.nextAppointment}
                                  </strong>
                                </span>
                              </li>
                            </>
                          ))}
                        </>
                      ) : (
                        <Alert
                          variant="info"
                          className="alert-dismissible solid fade show"
                        >
                          <p>No Pharmacy Drug Refill</p>
                        </Alert>
                      )}
                    </ul>
                  </PerfectScrollbar>
                </>
              ) : (
                <>
                  <p>Loading please wait...</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={open}
        toggle={toggle}
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
            Are you Sure you want to delete{" "}
            <b>
              {record && record.name === "Chronic Care"
                ? "Care and Support"
                : record && record.name}
            </b>
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
            onClick={toggle}
            style={{ backgroundColor: "#014d88", color: "#fff" }}
            disabled={saving}
          >
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default RecentHistory;