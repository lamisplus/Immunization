import React, { useState } from "react";
import { useArchiveImmunization } from "../../customHooks/useArchiveImmunization";
import { fetchPatientVaccinationHistory } from "../../services/fetchPatientVaccinationHistory";
import { getVaccinatedPatientDataKey } from "../../utils/queryKeys";
import { useQuery } from "react-query";
import { Dropdown } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, Accordion } from "react-bootstrap";

import "react-widgets/dist/css/react-widgets.css";

const RecentActivities = (props) => {
  const [query] = useState({
    page: 0,
    pageSize: 20,
    search: "",
    id: props?.patientObj?.id,
  });
  const [activeAccordionHeaderShadow, setActiveAccordionHeaderShadow] =
    useState(0);

  const { data, isLoading } = useQuery(
    [getVaccinatedPatientDataKey, query],
    () => fetchPatientVaccinationHistory(query)
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

  const ActivityName = (name) => {
    if (name === "ROUTINE_IMMUNIZATION") {
      return "RI";
    } else if (name === "COVID_IMMUNIZATION") {
      return "CI";
    } else if (name === "TETANUS_IMMUNIZATION") {
      return "TI";
    } else {
      return "IM";
    }
  };

  return (
    <div className="row">
      <div className="col-xl-12 col-xxl-12 col-lg-12">
        <div className="card">
          <div className="card-header  border-0 pb-0">
            <h4 className="card-title">
              <b>Recent Activities</b>{" "}
            </h4>
          </div>
          <div className="card-body">
            {isLoading === false ? (
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
                      {!isLoading && data?.content?.map?.((data, index) => (
                        <div className="accordion-item" key={index}>
                          <Accordion.Toggle
                            as={Card.Text}
                            eventKey={`${index}`}
                            className={`accordion-header ${
                              activeAccordionHeaderShadow === 1
                                ? ""
                                : "collapsed"
                            } accordion-header-info`}
                            onClick={() =>
                              setActiveAccordionHeaderShadow(
                                activeAccordionHeaderShadow === 1 ? -1 : index
                              )
                            }
                          >
                            <span className="accordion-header-icon"></span>
                            <span className="accordion-header-text">
                              Vaccination Date : <span className="">{data.vaccinationDate}</span>{" "}
                            </span>
                            <span className="accordion-header-indicator"></span>
                          </Accordion.Toggle>
                          <Accordion.Collapse
                            eventKey={`${index}`}
                            className="accordion__body"
                          >
                            <div className="accordion-body-text">
                              <ul className="timeline">
                                
                                      <li>
                                        <div className="timeline-panel">
                                          <div
                                            className={
                                              index % 2 === 0
                                                ? "media me-2 media-info"
                                                : "media me-2 media-success"
                                            }
                                          >
                                            {ActivityName(
                                              data.immunizationType
                                            )}
                                          </div>
                                          <div className="media-body">
                                            <h5 className="mb-1">
                                              { data.immunizationType}
                                            </h5>
                                            <small className="d-block">
                                              {data.vaccinationDate}
                                            </small>
                                          </div>

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
                                              <Dropdown.Item
                                                className="dropdown-item"
                                                onClick={() =>
                                                  LoadViewPage(data, "view")
                                                }
                                              >
                                                View
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                className="dropdown-item"
                                                onClick={() =>
                                                  LoadViewPage(
                                                    data,
                                                    "update"
                                                  )
                                                }
                                              >
                                                Update
                                              </Dropdown.Item>

                                              <Dropdown.Item
                                                className="dropdown-item"
                                                to="/widget-basic"
                                                onClick={() =>
                                                  LoadDeletePage(data)
                                                }
                                              >
                                                Delete
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </div>
                                      </li>
                                  
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
    </div>
  );
};

export default RecentActivities;
