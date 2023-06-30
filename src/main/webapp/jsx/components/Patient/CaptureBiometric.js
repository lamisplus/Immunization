import React, { useState, useEffect, useRef } from "react";
import {Modal,ModalHeader, ModalBody,Form,
        Row,Label,Card,CardBody,Col, FormGroup,CardHeader, Input
        } from "reactstrap";

import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import SaveIcon from "@material-ui/icons/Save";
import MatButton from "@material-ui/core/Button";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import { Button2, Icon, List } from 'semantic-ui-react'
import {ToastContainer, toast} from "react-toastify";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import axios from "axios";
import {token, url as baseUrl} from "../../../api";

import { green, red } from '@mui/material/colors';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
//import SaveIcon from '@mui/icons-material/Save';
// import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
// import CancelIcon from '@mui/icons-material/Cancel';
// import ModalImage from "react-modal-image";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardBottom: {
        marginBottom: 20,
    },
    Select: {
        height: 45,
        width: 350,
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",
    },
    error: {
        color: "#f85032",
        fontSize: "12.8px",
    },
}));

let checkUrl=""

const CaptureBiometric = (props) => {
    const classes = useStyles()
    const biometricDevices = props.biometricDevices
    const patientID= props && props.patientId ? props.patientId : ""
    
    const [objValues, setObjValues]= useState({biometricType: "FINGERPRINT", patientId:patientID, templateType:"", device:""})
    const [fingerType, setFingerType] = useState([]);
    const [devices, setDevices] = useState(props.biometricDevices);
    const [loading, setLoading] = React.useState(false);
    const [showCapture, setshowCapture] = React.useState(false);
    const [tryAgain, setTryAgain] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [errors, setErrors] = useState({});
   // const [responseImage, setResponseImage] = useState("")
    const [capturedFingered, setCapturedFingered]= useState([])
     console.log(biometricDevices)
    const buttonSx = {
      ...(success && {
        bgcolor: green[500],
        '&:hover': {
          bgcolor: green[700],
        },
      }),
    };


    useEffect(() => {      
        TemplateType();
        if(objValues.device===""){
            setshowCapture(false)
        }
        
      }, []);
     //Get list of Finger index
     const TemplateType =()=>{
        axios
           .get(`${baseUrl}application-codesets/v2/BIOMETRIC_CAPTURE_FINGERS`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
               setFingerType(response.data);
           })
           .catch((error) => {
           });
       
     }

     //check if device is plugged or not 
     const checkDevice = e =>{
        const deviceName =e.target.value;
        const selectedDevice=biometricDevices.find((x)=> x.name ===deviceName )
        checkUrl= selectedDevice.url===null? baseUrl : selectedDevice.url
        console.log(checkUrl)
        setObjValues({...objValues, device:deviceName})
        axios
           .get(`${checkUrl}biometrics/secugen/boot?reader=${deviceName}`,
               { headers: {"Authorization" : `Bearer ${token}`} }
           )
           .then((response) => {
            if(response.data.errorType ==="ERROR"){
                toast.error(response.data.errorName + " is not plug");
                //setshowCapture(true)
            }else{
                setshowCapture(true)
            }
           })
           .catch((error) => {
           });
     }
     // handle the input changes 

     const handleInputChange = e => {        
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
    }
    //form validation 
    const validate = () => {
        let temp = { ...errors }
        temp.templateType = objValues.templateType ? "" : "This field is required"
        temp.device = objValues.device ? "" : "This field is required"
        setErrors({
            ...temp
            })    
        return Object.values(temp).every(x => x == "")
    }
    //to capture  selected index finger 
    const captureFinger = (e) => {        
        e.preventDefault();
        if(validate()){
            axios.post(`${checkUrl}biometrics/secugen/enrollment?reader=SG_DEV_AUTO`,objValues,
            { headers: {"Authorization" : `Bearer ${token}`}},           
            )
              .then(response => {
                  setLoading(true);
                  if(response.data.type ==="ERROR"){                   
                    setLoading(false);
                    setTryAgain(true);
                    window.setTimeout(() => {
                        setTryAgain(false);
                      }, 5000);
                    toast.error(response.data.message.ERROR);
                  }else{
                    const templateType= response.data.templateType
                    setTryAgain(false);
                    setSuccess(true)
                    window.setTimeout(() => {
                        setSuccess(false)
                        setLoading(false);                        
                      }, 5000);
                                        
                    setCapturedFingered([...capturedFingered, response.data])
                    fingerType.splice(templateType, 1);
                    setFingerType([...fingerType]);
                  }
                  //toast.success("Record save successful");
              })
              .catch(error => {                 
              });
        }
    }

    //Save Biometric capture
    const saveBiometrics = (e) => {        
        e.preventDefault();
        if(capturedFingered.length > 1){
            const capturedObj= capturedFingered[capturedFingered.length - 1]
            axios.post(`${baseUrl}biometrics/templates`,capturedObj,
            { headers: {"Authorization" : `Bearer ${token}`}},           
            )
              .then(response => {
                toast.success("Biometric save successful");
                setCapturedFingered([])
                props.setPatientBiometricStatus(true)
                props.togglestatus()
            })
            .catch(error => {
                toast.error("Something went wrong");
            });
        }else{
            
            toast.error("You can't save less than 2 finger");
        }
  }  
    
 // console.log(capturedFingered)

    return (
        <div >
            <Card >
                <CardBody>
                    <Modal isOpen={props.modalstatus} toggle={props.togglestatus} className={props.className} size="lg">
                        <Form >
                            <ModalHeader toggle={props.togglestatus}>capture Biometric</ModalHeader>
                            <ModalBody>
                                <Card>
                                {/* <CardHeader>
                                    Capture Biometrics
                                </CardHeader> */}
                                    <CardBody>
                                    <Row form>
                                    <ToastContainer />
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for='device'>Select Device </Label>
                                                <Input
                                                    type="select"
                                                    name="device"
                                                    id="device"
                                                    onChange={checkDevice}
                                                    value={objValues.device}
                                                    required
                                                >
                                                <option value="">Select Device </option>
                                                {biometricDevices.map(({ id, name }) => (
                                                    <option key={id} value={name}>
                                                        {name}
                                                    </option>
                                                ))}
                                              
                                            </Input>
                                            {errors.device !=="" ? (
                                                <span className={classes.error}>{errors.device}</span>
                                            ) : "" }
                                            </FormGroup>
                                        </Col>
                                        {showCapture ? (
                                        <>
                                            <Col md={4}>
                                            <FormGroup>
                                                <Label for='device'>Select Finger</Label>
                                                <Input
                                                    type="select"
                                                    name="templateType"
                                                    id="templateType"
                                                    onChange={handleInputChange}
                                                    value={objValues.templateType}
                                                    required
                                                >
                                                <option value="">Select Finger </option>

                                                {fingerType.map((value) => (
                                                    <option key={value.id} value={value.display}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                            </Input>
                                            {errors.templateType !=="" ? (
                                                <span className={classes.error}>{errors.templateType}</span>
                                            ) : "" }
                                            </FormGroup>
                                        </Col>
                                        

                                        <Col md={4}>
                                        
                                        <MatButton
                                            type='button'
                                            variant='contained'
                                            color='primary'
                                            onClick={captureFinger}
                                            className={'mt-4'}
                                            startIcon={<FingerprintIcon />}
                                        >
                                            Capture Finger
                                        </MatButton>

                                        </Col>
                                        <br/>
                                        
                                        </>
                                        )
                                        :
                                        ""
                                        }
                                        {/* <img width='500' height='200' src={responseImage}/> */}
                                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                                       
                                     {loading && (
                                        <>
                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ m: 1, position: 'relative' }}>
                                                <Fab
                                                aria-label="save"
                                                color="secondary"
                                                sx={buttonSx}
                                                
                                                >
                                                {success ? <CheckIcon /> : <FingerprintIcon />}
                                                </Fab>
                                                {loading && (
                                                <CircularProgress
                                                    size={68}
                                                    sx={{
                                                    color: green[500],
                                                    position: 'absolute',
                                                    top: -6,
                                                    left: -6,
                                                    zIndex: 1,
                                                    }}
                                                />
                                                )}
                                            </Box>
                                            <Typography variant="h6" gutterBottom component="div">
                                            {success ?` your  ${objValues.templateType} Finger captured.` : `Please place your  ${objValues.templateType} Finger on scanner.`}
                                            </Typography>
                                        </Box>
                                        </>
                                        )
                                        } 
                                        {tryAgain && (
                                        <>
                                        

                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ m: 1, position: 'relative' }}>
                                                <Fab
                                                aria-label="save"
                                                color="secondary"
                                                sx={buttonSx}
                                                
                                                >
                                                 <FingerprintIcon />
                                                </Fab>
                                                {tryAgain && (
                                                <CircularProgress
                                                    size={68}
                                                    sx={{
                                                    color: red[500],
                                                    position: 'absolute',
                                                    top: -6,
                                                    left: -6,
                                                    zIndex: 1,
                                                    }}
                                                />
                                                )}
                                            </Box>
                                            <Typography variant="h6" gutterBottom component="div">
                                            Click to Recapture Again
                                            </Typography>
                                        </Box>
                                        </>
                                        )
                                        } 
                                        {/*  */}
                                        </Col>
                                       
                                            
                                        </Row>

                                    <Row>
                                 {capturedFingered.length >=1 ? (  
                                     <>                               
                                    <Col md={12} >
                                        <h3>Captured Fingerprints</h3>
                                    </Col>
                                    <Col md={12} style={{marginTop:"20px"}}>
                                        <List celled horizontal>
                                            {capturedFingered.map((x) => (
                                                <List.Item>
                                                    {/* <List.Header><Icon name='cancel'  color='red' /> </List.Header> */}
                                                    <List.Content> <FingerprintIcon style={{color:"#2E7D32", fontSize: 40}}/>{x.templateType}</List.Content>
                                                </List.Item>
                                            ))}

                                        </List>

                                    </Col>
                                    {/* <Col md={6} style={{marginTop:"20px"}}>
                                        <List celled horizontal>
                                            {[1,2,3].map((x) => (
                                                <List.Item>
                                                    <List.Header><Icon name='checkmark' color='green'/> </List.Header>
                                                    <List.Content > <FingerprintIcon style={{color:"#2E7D32", fontSize: 40}} /> Finger Type</List.Content>
                                                </List.Item>
                                            ))}

                                        </List>

                                    </Col> */}
                                    <br/><br/><br/><br/><br/><br/>
                                        <Col md={12} >
                                            <MatButton
                                                type='button'
                                                variant='contained'
                                                color='primary'
                                                onClick={saveBiometrics}
                                                // className={classes.button}
                                                startIcon={<SaveIcon/>}
                                            >
                                                Save Capture
                                            </MatButton>
                                        </Col>
                                    </> 
                                    )
                                        :
                                        ""
                                    }
                                    </Row>
                                    </CardBody>
                                </Card>
                            </ModalBody>
                        </Form>

                    </Modal>
                </CardBody>
            </Card>
        </div>
    );
};

export default CaptureBiometric;
