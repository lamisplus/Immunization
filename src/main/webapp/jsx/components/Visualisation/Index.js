import React, { Fragment } from "react";
// BS
import { Dropdown, Nav, Tab } from "react-bootstrap";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
// images
import SummaryView from './DashboardAnalytics/SummaryView/Index';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {NewlyEnrolledArtBySex} from './DashboardAnalytics/SummaryView/Highcharts/NewlyEnrolledArtBySex';

const options = {
  chart: {
    type: 'column'
},

title: {
    text: 'Viral Load Cascade among new patients eligible after 6 months'
},

subtitle: {
    text: ''
},

legend: {
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical'
},

xAxis: {
    categories: ['Number Eligble', 'Number of Sample Collected', 'Number Tested', 'Number Suppressed'],
    labels: {
        x: -10
    }
},

yAxis: {
    allowDecimals: false,
    title: {
        text: 'Amount'
    }
},

series: [{
    name: 'Number Eligble',
    data: [20, 40, 30, 3]
}, {
    name: 'Number of Sample Collected',
    data: [62, 41, 22, 22]
}, {
    name: 'Number Tested',
    data: [200, 45, 30,20]
}, {
  name: 'Number Suppressed',
  data: [40, 40, 10, 90]
}],

responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
            },
            yAxis: {
                labels: {
                    align: 'left',
                    x: 0,
                    y: -5
                },
                title: {
                    text: null
                }
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            }
        }
    }]
}
}
const options2 = {
  chart: {
    type: 'column'
},

title: {
    text: 'Viral Load Cascade among patients currently on ART eligible after 12 months of last VL result'
},

subtitle: {
    text: ''
},

legend: {
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical'
},

xAxis: {
    categories: ['Number Eligble', 'Number of Sample Collected', 'Number Tested', 'Number Suppressed'],
    labels: {
        x: -10
    }
},

yAxis: {
    allowDecimals: false,
    title: {
        text: 'Amount'
    }
},

series: [{
    name: 'Number Eligble',
    data: [200, 40, 30, 3]
}, {
    name: 'Number of Sample Collected',
    data: [62, 41, 22, 22]
}, {
    name: 'Number Tested',
    data: [2000, 450, 300,200]
}, {
  name: 'Number Suppressed',
  data: [40, 40, 100, 90]
}],

responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal'
            },
            yAxis: {
                labels: {
                    align: 'left',
                    x: 0,
                    y: -5
                },
                title: {
                    text: null
                }
            },
            subtitle: {
                text: null
            },
            credits: {
                enabled: false
            }
        }
    }]
}
}
const Widget = () => {
  return (
    <Fragment>     
      <div className="row">
       <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-primary text-danger">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                </span>
                <div className="media-body">
                  <p className="mb-1">NEWLY DIAGNOSED HIV+</p>
                  <h4 className="mb-0">3280</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-warning text-warning">
                <i class="fa fa-heartbeat" aria-hidden="true"></i>
                </span>
                <div className="media-body">
                  <p className="mb-1">CURRENT ON ART</p>
                  <h4 className="mb-0">2570</h4>
                  {/* <span className="badge badge-warning">+3.5%</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body  p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-danger text-danger">
                <i class="fa fa-compress" aria-hidden="true"></i>
                </span>
                <div className="media-body">
                  <p className="mb-1">VIRALLY SUPPRESSED</p>
                  <h4 className="mb-0">50</h4>
                  {/* <span className="badge badge-danger">-3.5%</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card">
            <div className="card-body p-4">
              <div className="media ai-icon">
                <span className="me-3 bgl-success text-success">
                <i class="fa fa-users" aria-hidden="true"></i>
                </span>
                <div className="media-body">
                  <p className="mb-1">CURRENTLY ACTIVE</p>
                  <h4 className="mb-0">2340</h4>
                  {/* <span className="badge badge-success">-3.5%</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SummaryView />
        <div className="col-xl-6 col-xxl-4 col-lg-6 col-sm-6">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          />
        </div>
        <div className="col-xl-6 col-xxl-4 col-lg-6 col-sm-6">
          <HighchartsReact
            highcharts={Highcharts}
            options={options2}
          />
        </div>
        
      </div>
    </Fragment>
  );
};

export default Widget;
