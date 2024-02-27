import React, { Fragment} from "react";
import VaccinationHistory from './../Vaccination/VaccinationHistory'


const RecentHistory = (props) => {



  return (
    <Fragment>
      
      <div className="row">
        <VaccinationHistory patientObj={props.patientObj}/>
      </div>
      
    </Fragment>
  );
};

export default RecentHistory;
