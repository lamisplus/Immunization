import React, {useState, useEffect} from 'react';
import { Modal, ModalHeader, ModalBody,Form,InputGroup,
Row,Col, Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
import MatButton from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
// import { Alert } from 'reactstrap';
// import { Spinner } from 'reactstrap';
import axios from "axios";
import { toast} from "react-toastify";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
//import { useHistory } from "react-router-dom";
import moment from "moment";

let getAge =""
const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    cardBottom: {
        marginBottom: 20
    },
    Select: {
        height: 45,
        width: 350
    },
    button: {
        margin: theme.spacing(1)
    },

    root: {
        '& > *': {
            margin: theme.spacing(1)
        }
    },
    input: {
        display: 'none'
    }, 
    error:{
        color: '#f85032',
        fontSize: '12.8px'
    }, 
}))

const Vaccination = (props) => {
    const [errors, setErrors] = useState({})
    const patientObj = props.patientObj;
    const classes = useStyles()
    let temp = { ...errors }
    const [covidEffect, setCovidEffect] = useState([]);
    const [vaccine, setVaccine] = useState([]);
    const [objValues, setObjValues] = useState(
        {  
            adverseEffect: "",
            batchNumber: "",
            doseNumber: "",
            location: "",
            patientId: patientObj.id,
            vaccinationFacility: "",
            vaccine: "",
            vaccineDate: ""
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        VACCINE();
        COVID_ADVERSE_EFFECT();
        if(props.records && props.records!==null){
            setObjValues(props.records)
        }       
    }, [props.records]);
    //covid/codeset?category=VACCINE
    const VACCINE = () => {
        axios
        .get(`${baseUrl}covid/codeset?category=VACCINE`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then((response) => {
            //console.log(response.data);
            setVaccine(response.data);
        })
        .catch((error) => {
            //console.log(error);
        });

    }
    const COVID_ADVERSE_EFFECT = () => {
        axios
        .get(`${baseUrl}application-codesets/v2/COVID_ADVERSE_EFFECT`,
            { headers: { "Authorization": `Bearer ${token}` } }
        )
        .then((response) => {
            //console.log(response.data);
            setCovidEffect(response.data);
        })
        .catch((error) => {
            //console.log(error);
        });

    }
    const handleInputChange = e => {
        setErrors({...errors, [e.target.name]: ""}) 
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
        if(e.target.name==='location' && objValues.location!=='Facility'){
            objValues.vaccinationFacility=""
            setObjValues ({...objValues,  ['vaccinationFacility']: ""});
            setObjValues ({...objValues,  [e.target.name]: e.target.value});
        }
    }    
    const calculate_age = dob => {
        var today = new Date();
        var dateParts = dob.split("-");
        var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var birthDate = new Date(dateObject); // create a date object directlyfrom`dob1`argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age_now--;
                }
            if (age_now === 0) {
                    return m + " month(s)";
                }
                return age_now;
    };           
    getAge=calculate_age(moment(props.patientObj.dob).format("DD-MM-YYYY"))
    /*****  Validation  */
    const validate = () => {
            //VACCINATION FORM VALIDATION
            temp.vaccine = objValues.vaccine ? "" : "This field is required"
            temp.vaccineDate = objValues.vaccineDate ? "" : "This field is required"
            temp.doseNumber = objValues.doseNumber ? "" : "This field is required"
            temp.location = objValues.location ? "" : "This field is required"
            temp.batchNumber = objValues.batchNumber ? "" : "This field is required"
            temp.adverseEffect = objValues.adverseEffect ? "" : "This field is required"
            
                setErrors({ ...temp })
        return Object.values(temp).every(x => x == "")
    }
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        if(validate()){
            axios.post(`${baseUrl}covid/vaccinations`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
            .then(response => {
                setSaving(false);
                //Clearing the form values
                setObjValues({
                    adverseEffect: "",
                    batchNumber: "",
                    doseNumber: "",
                    location: "",
                    patientId: patientObj.id,
                    vaccinationFacility: "",
                    vaccine: "",
                    vaccineDate: ""
                })
                toast.success("Patient Vaccination Successful");
                props.toggle()
                props.loadPatients()
                //history.push("/")

            })
            .catch(error => {
                setSaving(false);
                toast.error("Something went wrong");
            });
        }
    }
    const CancelPage =()=>{ 
        //Clearing the form values
        setObjValues({
            adverseEffect: "",
            batchNumber: "",
            doseNumber: "",
            location: "",
            patientId: patientObj.id,
            vaccinationFacility: "",
            vaccine: "",
            vaccineDate: ""
        })   
        props.toggle();
    }

  return (      
      <div >
         
              <Modal isOpen={props.showModal} toggle={props.toggle} className={props.className} size="lg">
              <Form >
              <ModalHeader  style={{backgroundColor:"#eeeeee"}}>VACCINATION </ModalHeader>
                <ModalBody> 
                        <Card >
                            <CardBody>
                            <Row >
                            {getAge>=5 ?
                            
                            (
                            <>
                                 
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Vaccine <span style={{ color:"red"}}> *</span></Label>
                                <Input 
                                    type="select"
                                    name="vaccine"
                                    id="vaccine"
                                    onChange={handleInputChange}
                                    value={objValues.vaccine} 
                                >
                                    <option value="" >Select</option>
                                    {vaccine.map((value) => (
                                    <option key={value.id} value={value.id}>
                                        {value.name}
                                    </option>
                                ))}
                                </Input>

                                
                                {errors.vaccine !=="" ? (
                                        <span className={classes.error}>{errors.vaccine}</span>
                                ) : "" }           
                                </FormGroup>
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Batch Number <span style={{ color:"red"}}> *</span></Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="batchNumber"
                                        id="batchNumber"
                                        onChange={handleInputChange}
                                        value={objValues.batchNumber} 
                                    />

                                </InputGroup>
                                {errors.batchNumber !=="" ? (
                                        <span className={classes.error}>{errors.batchNumber}</span>
                                ) : "" }                                         
                                </FormGroup>
                              </div>     
                              <div className="form-group mb-3 col-md-6">
                                      <FormGroup>
                                      <Label >Vaccination Date <span style={{ color:"red"}}> *</span></Label>
                                      <InputGroup> 
                                          <Input 
                                              type="date"
                                              name="vaccineDate"
                                              id="vaccineDate"
                                              onChange={handleInputChange}
                                              value={objValues.vaccineDate} 
                                              max= {moment(new Date()).format("YYYY-MM-DD") }
                                          />

                                      </InputGroup>
                                      {errors.vaccineDate !=="" ? (
                                              <span className={classes.error}>{errors.vaccineDate}</span>
                                      ) : "" }
                                      </FormGroup>
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Vaccination Dosage <span style={{ color:"red"}}> *</span></Label>
                                <InputGroup> 
                                    <Input 
                                        type="number"
                                        name="doseNumber"
                                        id="doseNumber"
                                        onChange={handleInputChange}
                                        value={objValues.doseNumber} 
                                    />

                                </InputGroup>
                                {errors.doseNumber !=="" ? (
                                        <span className={classes.error}>{errors.doseNumber}</span>
                                ) : "" }
                                </FormGroup>
                              </div>                               
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Location <span style={{ color:"red"}}> *</span></Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="location"
                                        id="location"
                                        onChange={handleInputChange}
                                        value={objValues.location} 
                                    >
                                        <option value="" >Select</option>
                                        <option value="Facility" >Facility</option>
                                        <option value="Community" >Community</option>
                                    </Input>
                                </InputGroup> 
                                {errors.location !=="" ? (
                                        <span className={classes.error}>{errors.location}</span>
                                ) : "" }                                        
                                </FormGroup>
                              </div>
                              {objValues.location==='Facility' && (
                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Facility Name <span style={{ color:"red"}}> *</span></Label>
                                <InputGroup> 
                                    <Input 
                                        type="text"
                                        name="vaccinationFacility"
                                        id="vaccinationFacility"
                                        onChange={handleInputChange}
                                        value={objValues.vaccinationFacility} 
                                    >
                                    </Input>
                                </InputGroup> 
                                {errors.vaccinationFacility !=="" ? (
                                        <span className={classes.error}>{errors.vaccinationFacility}</span>
                                ) : "" }                                        
                                </FormGroup>
                              </div>
                              )}

                              <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Adverse Effect </Label>
                                <InputGroup> 
                                    <Input 
                                        type="select"
                                        name="adverseEffect"
                                        id="adverseEffect"
                                        onChange={handleInputChange}
                                        value={objValues.adverseEffect} 
                                    >
                                        <option value="" >Select</option>
                                            {covidEffect.map((value) => (
                                            <option key={value.id} value={value.display}>
                                                {value.display}
                                            </option>
                                        ))}
                                    </Input>

                                </InputGroup>
                                {errors.adverseEffect !=="" ? (
                                        <span className={classes.error}>{errors.adverseEffect}</span>
                                ) : "" }           
                                </FormGroup>
                              </div>    
                                </>
                                )
                                :
                                (
                                <>
                                    <p><h4>The Age is less than 5</h4></p>
                                </>
                                )
                                }                   
                            </Row>
                                <br/>
                                <br/>                               
                            <MatButton
                            type='submit'
                            variant='contained'
                            color='primary'
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={handleSubmit}
                            disabled={getAge<5 || saving ?"true":""}
                            style={{backgroundColor:'#014d88',fontWeight:"bolder"}}
                            >   
                            {saving?"Saving" : "Save"} 
                            </MatButton>
                            <MatButton
                            variant='contained'
                            color='default'
                            onClick={()=>CancelPage()}
                            style={{backgroundColor:'#992E62', color:"#fff"}}
                            className={classes.button}
                            startIcon={<CancelIcon />}
                            >
                            Cancel
                            </MatButton>
                        </CardBody>
                    </Card> 
                    </ModalBody>
        
                </Form>
      </Modal>
    </div>
  );
}

export default Vaccination;
