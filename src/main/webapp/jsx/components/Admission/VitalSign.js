import React, {useState, useEffect} from 'react';
import { Form,Row, Card,CardBody, FormGroup, Label, Input} from 'reactstrap';
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
import { useHistory } from "react-router-dom";
import {  Modal, Button } from "react-bootstrap";
import moment from "moment";

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
    } 
}))

const VitalSigns = (props) => {

    const patientObj = props.patientObj;
    let history = useHistory();
    const classes = useStyles()
    const [vaccination, setVaccination] = useState([])
    const [values, setValues] = useState([]);
    const [objValues, setObjValues] = useState({category: "",patient_id: "",location: "",questionAnswers: "",visit_date: ""});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        patients()
      }, []);
        ///GET LIST OF Patients
        async function patients() {
            axios
                .get(`${baseUrl}covid/questions-by-category/ADMISSION_VITAL_SIGNS`,
                { headers: {"Authorization" : `Bearer ${token}`} }
                )
                .then((response) => {
                    
                    setVaccination(response.data);
                    //setValues(response.data)
                })
                .catch((error) => {    
                });        
        }
        const handleInputChange = e => {
            setValues ({...values,  [e.target.name]: e.target.value});
          }
          
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();
        const obj = (Object.entries(values).map(([key, value]) => ({
            question_id: key,
            answer: value,
          })))
          objValues.category= 'ADMISSION_VITAL_SIGNS'
          objValues.patient_id= patientObj.id
          objValues.questionAnswers =obj
          objValues.visit_date= moment(new Date()).format("YYYY-MM-DD")

          setSaving(true);
          axios.post(`${baseUrl}covid/encounters`,objValues,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  toast.success("Record save successful");
                  props.getVitalsHistory()
                  props.toggle()
                  //history.push("/")

              })
              .catch(error => {
                  setSaving(false);
                  toast.error("Something went wrong");
              });
          
    }

  return (      
      <div >
         
              <Modal show={props.showModal} toggle={props.toggle} className="fade" size="lg">
              <Form >
             <Modal.Header toggle={props.toggle} style={{backgroundColor:"#eeeeee"}}>
                 Admission Vital Signs
                 <Button
                    variant=""
                    className="btn-close"
                    onClick={props.toggle}
                ></Button>
            </Modal.Header>
                <Modal.Body>
                    
                        <Card >
                            <CardBody>
                                <Row >
                                   
                                 
                                        {vaccination.map((value) => (
                                            <>
                                                <div className="form-group mb-3 col-md-6">
                                                <FormGroup>
                                                    <Label for="role">{value.name}</Label>
                                                    {value.datatype==="date"?
                                                        (
                                                            <Input
                                                            type="date"
                                                            name={value.id}
                                                            id={value.id}
                                                            //value={value.name}
                                                            onChange={handleInputChange}
                                                            required
                                                            >
                                                            
                                                        </Input>
                                                        )
                                                            :
                                                            " "
                                                        }
                                                        {value.datatype==="number"?
                                                        (
                                                            <Input
                                                            type="number"
                                                            name={value.id}
                                                            id={value.id}
                                                            //value={value.name}
                                                            onChange={handleInputChange}
                                                            required
                                                            >
                                                            
                                                        </Input>
                                                        )
                                                            :
                                                            " "
                                                        }
                                                        {value.datatype==="select"?
                                                        (
                                                            <Input
                                                                type="select"
                                                                name={value.id}
                                                                id={value.id}
                                                                //value={values.name}
                                                                onChange={handleInputChange}
                                                                required
                                                                >
                                                                <option value=""> </option>
                                                                {value.responses.map(({ name, id }) => (
                                                                    <option key={id} value={id}>
                                                                    {name}
                                                                    </option>
                                                                ))}
                                                            </Input>
                                                        )
                                                            :
                                                            " "
                                                        }
                                                        
                                                        {value.datatype==="checkbox"?
                                                        (
                                                            <Input
                                                                type="select"
                                                                name={value.id}
                                                                id={value.id}
                                                                //value={values.name}
                                                                onChange={handleInputChange}
                                                                required
                                                                >
                                                                <option value=""> </option>
                                                                {value.responses.map(({ name, id }) => (
                                                                    <option key={id} value={id}>
                                                                    {name}
                                                                    </option>
                                                                ))}
                                                            </Input>
                                                        )
                                                            :
                                                            " "
                                                        }
                                                        
                                                        
                                                </FormGroup>
                                            
                                            </div>
                                            </>
                                        
                                        ))}
                                        
                                             
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
                                             
                                          >   
                                              Save 
                                          </MatButton>
                                           
                                          <MatButton
                                              variant='contained'
                                              color='default'
                                             onClick={props.toggle}
                                              className={classes.button}
                                              startIcon={<CancelIcon />}
                                          >
                                              cancel
                                          </MatButton>
                            </CardBody>
                        </Card> 
                    </Modal.Body>
        
                </Form>
      </Modal>
    </div>
  );
}

export default VitalSigns;
