import axios from "axios";
import React, { useState, useEffect } from "react";
import MatButton from "@material-ui/core/Button";
import {

  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import { Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
//import { FaArrowLeft } from "react-icons/fa";
import { TiArrowBack } from 'react-icons/ti'
import { url as baseUrl } from "./../../../api";
import 'react-toastify/dist/ReactToastify.css';
import { token as token } from "./../../../api";
import { useHistory } from "react-router-dom";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const useStyles = makeStyles(theme => ({
  button: {
      margin: theme.spacing(1)
  },
  error: {
      color: "#f85032",
      fontSize: "12.8px",
  },
}))

const EditPatient = (props) => {
   
  let history = useHistory();
  const patientObj = history.location && history.location.state ? history.location.state.patientObj : {}
  const classes = useStyles();

  const [values, setValues] = useState(history.location && history.location.state ? history.location.state.patientObj : {});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValues(patientObj)
  }, [history.location.state.patientObj]);
  const handleInputChange = e => {
    setValues ({...values,  [e.target.name]: e.target.value});
  }
  console.log(values)
      /*****  Validation */
      const validate = () => {
        let temp = { ...errors };
        temp.dob = values.dob
            ? ""
            : "this field is required";
            temp.first_name = values.first_name
            ? ""
            : "this field is required";
            temp.last_name = values.last_name
            ? ""
            : "this field is required";
            temp.gender = values.gender
            ? ""
            : "this field is required";
            temp.participant_id = values.participant_id
            ? ""
            : "this field is required";
            setErrors({
                ...temp,
            });
            return Object.values(temp).every((x) => x === "");
        };

        const handleSubmit = (e) => {
          console.log(values)
          e.preventDefault();
                if (validate()) {      
                        setSaving(true);
                        axios.post(`${baseUrl}covid/patients`,values,
                         { headers: {"Authorization" : `Bearer ${token}`}},
                        
                        )
                            .then(response => {
                                setSaving(false);
                                toast.success("Patient Register Successful");
                                history.push("/")
    
                            })
                            .catch(error => {
                                setSaving(false);
                                toast.error("Something went wrong");
                            });
                };
            }


  return (
    <>
    <ToastContainer autoClose={3000} hideProgressBar />
       
        <Card className={classes.cardBottom}>
        <CardContent>
            <Link
                  to ={{pathname: "/" }}
            >
              <Button
                variant="contained"
                color="primary"
                className=" float-right ms-1"
                startIcon={<TiArrowBack />}
              >
                <span style={{ textTransform: "capitalize" }}>Back </span>
              </Button>
            </Link>
            <br />
          
          <br />
      <ToastContainer autoClose={3000} hideProgressBar />
      
      <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Basic Information </h5>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form >
                  <div className="row">
                
                    <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label for="participant_id">Patient ID * </Label>
                          <Input
                            type="text"
                            name="participant_id"
                            id="participant_id"
                            onChange={handleInputChange}
                            value={values.participant_id}
                            required
                          />
                          {errors.participant_id !=="" ? (
                            <span className={classes.error}>{errors.participant_id}</span>
                        ) : "" }
                        </FormGroup>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                      <Label for="first_name">First Name *</Label>
                      <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        onChange={handleInputChange}
                        value={values.first_name}
                        required
                      />
                      {errors.first_name !=="" ? (
                            <span className={classes.error}>{errors.first_name}</span>
                        ) : "" }
                      </FormGroup>
                    </div>
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                      <Label >Middle Name</Label>
                      <Input
                        type="text"
                        name="mid_name"
                        id="mid_name"
                        onChange={handleInputChange}
                        value={values.mid_name}
                        required
                      />
                      </FormGroup>
                    </div>
                    
                    <div className="form-group mb-3 col-md-4">
                      <FormGroup>
                      <Label >Last Name *</Label>
                      <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        onChange={handleInputChange}
                        value={values.last_name}
                        required
                      />
                      {errors.last_name !=="" ? (
                            <span className={classes.error}>{errors.last_name}</span>
                        ) : "" }
                      </FormGroup>
                    </div>
                   </div>
                   <div className="row">
                    <div className="form-group mb-3 col-md-4">
                        <FormGroup>
                          <Label >Date of Birth*</Label>
                          <DateTimePicker
                              time={false}
                              name="dateRegistration"
                              id="dateRegistration"
                              value={values.regDate}
                              onChange={value1 =>
                                setValues({ ...values, dob: moment(value1).format("YYYY-MM-DD") })
                              }
                              defaultValue={new Date(new Date(moment(values.dob, "YYYY-MM-DD").format("MM/DD/YYYY") ))}
                                  max={new Date()}
                          />
                              {values.dob ==="Invalid date" ? (
                                  <span className={classes.error}>{"This field is required"}</span>
                              ) : "" }
                              {errors.dob !=="" ? (
                            <span className={classes.error}>{errors.dob}</span>
                        ) : "" }
                        </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                        <FormGroup>
                          <Label >Gender *</Label>
                          <Input
                            type="select"
                            name="gender"
                            id="gender"
                            value={values.gender}
                            onChange={handleInputChange}
                            required
                            >
                              <option value=""> Please Select</option>
                            <option value="1"> Male</option>
                            <option value="2"> Female</option>
                        </Input>
                        {errors.gender !=="" ? (
                            <span className={classes.error}>{errors.gender}</span>
                        ) : "" }
                        </FormGroup>
                    </div>
                    
                    <div className="form-group  col-md-4">
                        <FormGroup>
                          <Label >Phone Number *</Label>
                          <Input
                            type="number"
                            name="phone"
                            id="phone"
                            onChange={handleInputChange}
                            value={values.phone}
                            required
                          />
                        </FormGroup>
                    </div>
                    <div className="form-group  col-md-4">
                        <FormGroup>
                          <Label >Address</Label>
                          <Input
                            type="textarea"
                            name="address"
                            id="address"
                            onChange={handleInputChange}
                            value={values.address}
                            required
                          />
                        </FormGroup>
                    </div>
                   </div>
                
                  {saving ? <Spinner /> : ""}
              <br />
             
                <MatButton
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
              >
                {!saving ? (
                  <span style={{ textTransform: "capitalize" }}>Save</span>
                ) : (
                  <span style={{ textTransform: "capitalize" }}>Saving...</span>
                )}
              </MatButton>
              <Link
                  to ={{pathname: "/" }}
              >
              <MatButton
                variant="contained"
                className={classes.button}
                startIcon={<CancelIcon />}
                
              >
                <span style={{ textTransform: "capitalize" }}>Cancel</span>
              </MatButton>
              </Link>
                </form>
              </div>
            </div>
            
          </div>
        </div>
        </CardContent>
        </Card>
    </>
  );
};



export default EditPatient