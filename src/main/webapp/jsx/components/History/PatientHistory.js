import React, { Fragment, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-widgets/dist/css/react-widgets.css";
import { getVaccinatedPatientDataKey } from "../../utils/queryKeys";
import { queryClient } from "../../utils/queryClient";
import { fetchPatientVaccinationHistory } from "../../services/fetchPatientVaccinationHistory";
import { useQuery } from "react-query";
// import { useArchiveImmunization } from "../../customHooks/useArchiveImmunization";
import { Card, Accordion } from "react-bootstrap";

const RecentHistory = (props) => {
  

  const [query] = useState({
    page: 0,
    pageSize: 20,
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

  const {data:recentActivities} = useQuery(
    [getVaccinatedPatientDataKey, query],
    () => fetchPatientVaccinationHistory(query),
    {
      onSuccess: () => prefetchNextPage(),
    }
  );

  
  // const {mutate} = useArchiveImmunization();

 

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
                              true
                                ? ""
                                : "collapsed"
                            } accordion-header-info`}
                            // onClick={() =>
                            //   setActiveAccordionHeaderShadow(
                            //     activeAccordionHeaderShadow === 1 ? -1 : i
                            //   )
                            // }
                          >
                            <span className="accordion-header-icon"></span>
                            <span className="accordion-header-text">
                              Visit Date : <span className="">{data.date}</span>{" "}
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
                                              index % 2 === 0
                                                ? "media me-2 media-info"
                                                : "media me-2 media-success"
                                            }
                                          >
                                            {/* {ActivityName(activity.name)} */}
                                          </div>
                                          <div className="media-body">
                                            <h5 className="mb-1">
                                              {activity.name === "Chronic Care"
                                                ? "Care and Support"
                                                : activity.name}
                                            </h5>
                                            <small className="d-block">
                                              {activity.date}
                                            </small>
                                          </div>
                                          
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RecentHistory;
