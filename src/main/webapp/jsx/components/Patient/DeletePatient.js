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
    const [transferStatus, setTransferStatus] = useState([])
    const [objValues, setObjValues] = useState({patient_id: "",current_status:""});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        patients()
      }, []);
        ///GET LIST OF Patients
        async function patients() {
            axios
                .get(`${baseUrl}covid/patientstatus/current-status-codeset`,
                { headers: {"Authorization" : `Bearer ${token}`} }
                )
                .then((response) => {
                    
                    setTransferStatus(response.data);
                    //setValues(response.data)
                })
                .catch((error) => {    
                });        
        }
        const handleInputChange = e => {
            setObjValues ({...objValues,  [e.target.name]: e.target.value});
          }
          
    /**** Submit Button Processing  */
    const handleSubmit = (e) => {        
        e.preventDefault();
        
          objValues.patient_id= patientObj.id

          setSaving(true);
          axios.delete(`${baseUrl}covid/patients/${patientObj.id}`,
           { headers: {"Authorization" : `Bearer ${token}`}},
          
          )
              .then(response => {
                  setSaving(false);
                  toast.success("Patient delete successful");
                  props.toggle()
                  props.loadPatients()
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
                 Delete Patient - <b>{patientObj.first_name + " " + patientObj.last_name }</b>
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
                                    <p><b>Are you sure want to delete</b></p>
                                </Row>                                    
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
