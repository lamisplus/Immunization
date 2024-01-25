import React, { useState } from 'react'
import axios from "axios";
import MatButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import {FormGroup, Label, Spinner,Input,Form, InputGroup} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee, faEdit, faTrash, } from '@fortawesome/free-solid-svg-icons'
import * as moment from 'moment';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-widgets/dist/css/react-widgets.css";
import {Link, useHistory, useLocation} from "react-router-dom";
import {TiArrowBack} from 'react-icons/ti'
import {FaPlus, FaAngleDown} from 'react-icons/fa'
import {token, url as baseUrl } from "../../../api";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import  './patient.css'
import {  Modal } from "react-bootstrap";
import "react-widgets/dist/css/react-widgets.css";
import { DateTimePicker } from "react-widgets";


library.add(faCheckSquare, faCoffee, faEdit, faTrash);

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
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
        width: 300,
    },
    button: {
        margin: theme.spacing(1),
    },
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
        "& .card-title":{
            color:'#fff',
            fontWeight:'bold'
        },
        "& .form-control":{
            borderRadius:'0.25rem',
            height:'41px'
        },
        "& .card-header:first-child": {
            borderRadius: "calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0"
        },
        "& .dropdown-toggle::after": {
            display: " block !important"
        },
        "& select":{
            "-webkit-appearance": "listbox !important"
        },
        "& p":{
            color:'red'
        },
        "& label":{
            fontSize:'14px',
            color:'#014d88',
            fontWeight:'bold'
        }
    },
    demo: {
        backgroundColor: theme.palette.background.default,
    },
    inline: {
        display: "inline",
    },
    error:{
        color: '#f85032',
        fontSize: '12.8px'
    },  
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    },
}));


const Tetanus =(props)=>{
 
            const [clientDetails, setClientDetails] =useState(
                {
                    dateOfClientVisit:"",
                    clientCardNo:"",
                    clientDob:"",
                    clientName:"",
                    clientFollowUpAddress:"",
                    clientPhoneNumber:""
                }
            )
            const [basicInfo, setBasicInfo]= useState(
                {
                    nameOfHealthFacility:"",
                    ward:"",
                    lga:"",
                    state:"",
                    date:"",
                    facilityType:""

    
                }
            )
            const [tetanusDiphtheria, setTetanusDiphtheria]= useState(
                {
                    basicInfo:"",
                    td1:"",
                    td2:"",
                    td3:"",
                    td4:"",
                    td5:"", 
                    comment:""
                }
            )
            const [objValues, setObjValues] = useState([]);
            const userDetail = props.location && props.location.state ? props.location.state.user : null;
            const [errors, setErrors] = useState({})
            const [patientDTO, setPatientDTO]= useState({"personInfo":"", })
            
            const history = useHistory();
            const [saving, setSaving] = useState(false);
            const [open, setOpen] = React.useState(false)
            const toggle = () => setOpen(!open);
            const [showContactCard, setShowContactCard] = useState(true);
            const onClickContactCard =() =>{
                setShowContactCard(!showContactCard)
              }
            const [selectedOption, setSelectedOption] = useState('');
            const dropdownOptions = [{
                id: 1,
                name: 'P',
            }, {name: 'NP',
                id: 2}];
            const handleDropdownChange = (event) => {
              setSelectedOption(event.target.value);
            };  
            const handleCancel =()=>{
                history.push({ pathname: '/' });
            }

            const classes = useStyles();
            
            const handleInputChangeBasic = e => {  
                setErrors({...temp, [e.target.name]:""})      
                setBasicInfo ({...basicInfo,  [e.target.name]: e.target.value}); 
                // if(e.target.name==='firstName' && e.target.value!==''){
                //     const name = alphabetOnly(e.target.value)
                //     setBasicInfo ({...basicInfo,  [e.target.name]: name});
                // }
                // if(e.target.name==='lastName' && e.target.value!==''){
                //     const name = alphabetOnly(e.target.value)
                //     setBasicInfo ({...basicInfo,  [e.target.name]: name});
                // }
                // if(e.target.name==='middleName' && e.target.value!==''){
                //     const name = alphabetOnly(e.target.value)
                //     setBasicInfo ({...basicInfo,  [e.target.name]: name});
                // }
                // if(e.target.name==='ninNumber' && e.target.value!==''){
                //     const ninNumberValue = checkNINLimit(e.target.value)
                //     setBasicInfo ({...basicInfo,  [e.target.name]: ninNumberValue});
                // }
                // if(e.target.name==='hospitalNumber' && e.target.value!==''){
                // async function getHosiptalNumber() {
                //     const hosiptalNumber=e.target.value
                //     const response = await axios.post(`${baseUrl}patient/exist/hospital-number`, hosiptalNumber,
                //             { headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'text/plain'} }
                //         );
                //     if(response.data!==true){
                //         setHospitalNumStatus(false)
                //         errors.hospitalNumber=""
                //         setObjValues ({...objValues,  uniqueId: e.target.value});
                //         setHospitalNumStatus2(true)
                //     }else{
                //         errors.hospitalNumber=""
                //         toast.error("Error! Hosiptal Number already exist");
                //         setHospitalNumStatus(true)
                //         setHospitalNumStatus2(false)
                //     }
                // }
                // getHosiptalNumber();
                // } 
                        
            } 
            const handleInputChangeClientDetails = e =>{
                setErrors({...temp, [e.target.name]:""})
                setClientDetails({...clientDetails, [e.target.name]:e.target.value});
            }
            
            let temp = { ...errors }
            const validate = () => {
        
                temp.nameOfHealthFacility = basicInfo.nameOfHealthFacility ? "" : "Name of Health Facility is required"
                temp.ward = basicInfo.ward ? "" : "Ward  is required."
                temp.lga = basicInfo.lga ? "" : "Local Government Area is required."
                temp.state = basicInfo.state ? "" : "State is required."
                temp.date = basicInfo.date ? "" : "Date of Registration is required."
                temp.facilityType = basicInfo.facilityType ? "" : "Facility Type is required."
 
                //VACCINATION FORM VALIDATION
                //temp.td1 = tetanusDiphtheria.td1 ? "" : "This field is required"
                //temp.td2 = tetanusDiphtheria.td2 ? "" : "This field is required"
                //temp.td3 = tetanusDiphtheria.td3 ? "" : "This field is required"
                //temp.td4 = tetanusDiphtheria.td4 ? "" : "This field is required"
                //temp.td5 = tetanusDiphtheria.td5 ? "" : "This field is required"
                //temp.comment = tetanusDiphtheria.comment ? "" : "This field is required"
            
                    setErrors({ ...temp })
            return Object.values(temp).every(x => x == "")
        }
            const handleSubmit = async (e)=>{
                e.preventDefault(); 
                tetanusDiphtheria.basicInfo=objValues
                    if(validate()){
                        // setSaving(true)
                        const tetanusDiphtheria ={
                            td1:"",
                            td2:"",
                            td3:"",
                            td4:"",
                            td5:"", 
                            comment:""

                        }
                        const basicInfo = {
                            tetanusDiphtheria:[""],
                            nameOfHealthFacility:"",
                            ward:"",
                            lga:"",
                            state:"",
                            date:"",
                            facilityType:""
                        }

                        setSaving(true);
                        
                        
                    }
                    try {patientDTO.person=basicInfo;
                        console.log(basicInfo)
                    //patientDTO.vaccinationEnrollment=objValues;
                    const response = await axios.post(`${baseUrl}covid/enrollments`, patientDTO, { headers: {"Authorization" : `Bearer ${token}`} });
                    toast.success("Patient Register successful", {position: toast.POSITION.BOTTOM_CENTER});
                    setSaving(false)
                    history.push('/');
                    }catch (error) {   
                        setSaving(false)             
                        if(error.response && error.response.data){
                            let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                            if(error.response.data.apierror && error.response.data.apierror.message!=="" && error.response.data.apierror && error.response.data.apierror.subErrors[0].message!==""){
                                toast.error(error.response.data.apierror.message + " : " + error.response.data.apierror.subErrors[0].field + " " + error.response.data.apierror.subErrors[0].message, {position: toast.POSITION.BOTTOM_CENTER});
                            }else{
                                toast.error(errorMessage, {position: toast.POSITION.BOTTOM_CENTER});
                            }
                        }
                        else{
                            toast.error("Something went wrong. Please try again...", {position: toast.POSITION.BOTTOM_CENTER});
                        }
                    }
                    


            }


            return(
                <>
                  <Link
                        to={{
                            pathname: "/",
                            state: 'users'
                        }}>
                        <Button
                            variant="contained"
                            color="primary"
                            className=" float-end mr-10 pr-10"
                            style={{backgroundColor:'#014d88',fontWeight:"bolder", margingRight:"-40px"}}
                            startIcon={<TiArrowBack />}
                        >
                            <span style={{ textTransform: "capitalize", color:'#fff' }}>Back </span>
                        </Button>
                    </Link>
                    <br/> <br/>

                    {/* <Card className={classes.root}> */}
                        <CardContent>
                            <div className='col-xl-12 col-lg-12'>
                                <Form>
                                <div className="card">
                                    <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                        <h5 className="card-title" style={{color:'#fff'}}>{userDetail===null ? "Basic Information" : "Edit User Information"}</h5>
                                    </div>

                                <div className="card-body">
                                    <div className="basic-form">
                                    
                                        <div className="row">
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="firstName">Name Of Health Facility <span style={{ color:"red"}}> *</span></Label>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="nameOfHealthFacility"
                                                        id="nameOfHealthFacility"
                                                        value={basicInfo.nameOfHealthFacility}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                    {errors.nameOfHealthFacility !=="" ? (
                                                    <span className={classes.error}>{errors.firstName}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>

                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label>Ward</Label>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="ward"
                                                        id="ward"
                                                        value={basicInfo.ward}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label>LGA <span style={{ color:"red"}}> *</span></Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="lga"
                                                        id="lga"
                                                        value={basicInfo.lga}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                   {errors.lga !=="" ? (
                                                    <span className={classes.error}>{errors.lastName}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <div className={"row"}>

                                                <div className="form-group mb-3 col-md-3">
                                                    <FormGroup>
                                                        <Label>Date</Label>
                                                        <input
                                                            className="form-control"
                                                            name="date"
                                                            type='date'
                                                            id="date"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.date}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            max= {moment(new Date()).format("YYYY-MM-DD") }
                                                        >
                                                        </input>
                                                        
                                                    </FormGroup>
                                                </div>

                                                <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>Facility Type </Label>
                                                        <Input
                                                            className="form-control"
                                                            name="facilityType"
                                                            type='select'
                                                            id="facilityType"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.facilityType}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        >
                                                             <option value="" >Select</option>
                                                            <option value="Facility" >Private</option>
                                                            <option value="Community" >Public</option>
                                                        </Input>
                                                        {errors.facilityType !=="" ? (
                                                        <span className={classes.error}>{errors.facilityType}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                                </div>
                                        
                                        </div>
                                    </div>
                                </div>
                                </div>
                                    <div className="card">
                                        <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder', borderRadius:"0.2rem"}}>
                                            <h5 className="card-title"  style={{color:'#fff'}}> National Health Management Information System Child Immunization Register</h5>
                                        </div>

                                        <div className="card-body">
                                            <div className="row">
                                                <div className="form-group mb-3 col-md-4">                                    
                                                
                                                        <Label>Date Of Client Visit</Label>
                                                            <input
                                                                className="form-control"
                                                                type="date"
                                                                name="dateOfClientVisit"
                                                                id="dateOfClientVisit"
                                                                value={clientDetails.dateOfClientVisit}
                                                                onChange={handleInputChangeClientDetails}          
                                                                style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            />          
                                                
                                                </div>
                                            <div className="form-group mb-3 col-md-4">
                                            <FormGroup>
                                                <Label>Client Card No </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="clientCardNo"
                                                        id="clientCardNo"
                                                        value={clientDetails.clientCardNo}
                                                        onChange={handleInputChangeClientDetails}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />                 
                                            </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label>Client Name </Label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="clientName"
                                                            value={clientDetails.clientName}
                                                            id="childCardNo"
                                                            onChange={handleInputChangeClientDetails}
                                                            style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                        />     
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label >Client Date Of Birth <span style={{ color:"red"}}> *</span></Label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        name="clientDob"
                                                        id="clientDob"
                                                        onChange={handleInputChangeClientDetails}
                                                        value={clientDetails.clientDob} 
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                    {errors.clientDob !=="" ? (
                                                        <span className={classes.error}>{errors.vaccine}</span>
                                                ) : "" }           
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label> Client Follow Up Address<span style={{ color:"red"}}> *</span></Label>
                                                    <input
                                                            className="form-control"
                                                            type='text'
                                                            name="clientFollowUpAddress"
                                                            id="clientFollowUpAddress"
                                                            onChange={handleInputChangeClientDetails}
                                                            value={clientDetails.clientFollowUpAddress}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        >
                                                        </input>
                                                        {errors.clientFollowUpAddress !=="" ? (
                                                            <span className={classes.error}>{errors.sexId}</span>
                                                            ) : "" }
                                                </FormGroup>
                                            </div>
                                             <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label > Client Phone Number <span style={{ color:"red"}}> *</span></Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="clientPhoneNumber"
                                                        id="clientPhoneNumber"
                                                        onChange={handleInputChangeClientDetails}
                                                        value={clientDetails.clientPhoneNumber} 
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                {errors.clientPhoneNumber !=="" ? (
                                                        <span className={classes.error}>{errors.vaccineDate}</span>
                                                ) : "" }
                                                </FormGroup>
                                             </div>
                                           

                                                            
                                            </div>

                                        </div> 
                                    </div>
                                    <div className="card">
                                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                                    <h5 className="card-title" style={{color:'#fff'}}>Tetanus Diphtheria </h5>
                                                    {showContactCard===false  ? (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickContactCard}><FaPlus /></span></>) :  (<><span className="float-end" style={{cursor: "pointer"}} onClick={onClickContactCard}><FaAngleDown /></span> </>)}
                                                </div>
                                                    {showContactCard && (
                                                    <div className="card-body">
                                                        <div className={"row"}>
                                                            <div className="form-group  col-md-4">
                                                                <FormGroup>
                                                                    <Label>TD 1 <span style={{ color:"red"}}> *</span></Label>
                                                                    <select
                                                                        className="form-control"
                                                                        type="dropdown"
                                                                        name="tp1"
                                                                        id="tp1"
                                                                        value={tetanusDiphtheria.selectedOption}
                                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        onChange={handleDropdownChange}
                                                                        >
                                                                        <option value="">Select</option>
                                                                        {dropdownOptions.map((value, index) => (
                                                                            <option key={index} value={value.id}>
                                                                                {value.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.tp1 !=="" ? (
                                                                        <span className={classes.error}>{errors.tp1}</span>
                                                                        ) : "" }
                                                                    
                                                                </FormGroup>
                                                            </div>

                                                            <div className="form-group col-md-4">
                                                            <FormGroup>
                                                                    <Label>TD 2 <span style={{ color:"red"}}> *</span></Label>
                                                                    <select
                                                                        className="form-control"
                                                                        type="dropdown"
                                                                        name="tp2"
                                                                        id="tp2"
                                                                        value={tetanusDiphtheria.selectedOption}
                                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        onChange={handleDropdownChange}
                                                                        >
                                                                        <option value="">Select</option>
                                                                        {dropdownOptions.map((value, index) => (
                                                                            <option key={index} value={value.id}>
                                                                                {value.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.tp1 !=="" ? (
                                                                        <span className={classes.error}>{errors.tp1}</span>
                                                                        ) : "" }
                                                                    
                                                                </FormGroup>
                                                            </div>

                                                            <div className="form-group col-md-4">
                                                            <FormGroup>
                                                                    <Label>TD 3 <span style={{ color:"red"}}> *</span></Label>
                                                                    <select
                                                                        className="form-control"
                                                                        type="dropdown"
                                                                        name="tp3"
                                                                        id="tp3"
                                                                        value={tetanusDiphtheria.selectedOption}
                                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        onChange={handleDropdownChange}
                                                                        >
                                                                        <option value="">Select</option>
                                                                        {dropdownOptions.map((value, index) => (
                                                                            <option key={index} value={value.id}>
                                                                                {value.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.tp3 !=="" ? (
                                                                        <span className={classes.error}>{errors.tp1}</span>
                                                                        ) : "" }
                                                                    
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="form-group  col-md-4">
                                                            <FormGroup>
                                                                    <Label>TD 4 <span style={{ color:"red"}}> *</span></Label>
                                                                    <select
                                                                        className="form-control"
                                                                        type="dropdown"
                                                                        name="tp4"
                                                                        id="tp4"
                                                                        value={tetanusDiphtheria.selectedOption}
                                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        onChange={handleDropdownChange}
                                                                        >
                                                                        <option value="">Select</option>
                                                                        {dropdownOptions.map((value, index) => (
                                                                            <option key={index} value={value.id}>
                                                                                {value.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.tp4 !=="" ? (
                                                                        <span className={classes.error}>{errors.tp4}</span>
                                                                        ) : "" }
                                                                    
                                                                </FormGroup>
                                                            </div>

                                                            <div className="form-group  col-md-4">
                                                            <FormGroup>
                                                                    <Label>TD 5 <span style={{ color:"red"}}> *</span></Label>
                                                                    <select
                                                                        className="form-control"
                                                                        type="dropdown"
                                                                        name="tp5"
                                                                        id="tp5"
                                                                        value={tetanusDiphtheria.selectedOption}
                                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        onChange={handleDropdownChange}
                                                                        >
                                                                        <option value="">Select</option>
                                                                        {dropdownOptions.map((value, index) => (
                                                                            <option key={index} value={value.id}>
                                                                                {value.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {errors.tp5 !=="" ? (
                                                                        <span className={classes.error}>{errors.tp5}</span>
                                                                        ) : "" }
                                                                    
                                                                </FormGroup>
                                                            </div>

                                                            <div className="form-group  col-md-4">
                                                                <FormGroup>
                                                                    <Label>Comment <span style={{ color:"red"}}> *</span></Label>
                                                                    <input
                                                                        className="form-control"
                                                                        type="text"
                                                                        name="comment"
                                                                        id="comment"
                                                                        value={tetanusDiphtheria.selectedOption}
                                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        onChange={handleInputChangeBasic}
                                                                     />
                                                                   
                                                                    {errors.comment !=="" ? (
                                                                        <span className={classes.error}>{errors.comment}</span>
                                                                        ) : "" }
                                                                </FormGroup>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    )}
                                            </div>
                                    <br />
                            <MatButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                onClick={handleSubmit}
                                //disabled={disabledAgeBaseOnAge}
                                style={{backgroundColor:'#014d88',fontWeight:"bolder"}}
                            >
                                {!saving ? (
                                    <span style={{ textTransform: "capitalize" }}>Save</span>
                                ) : (
                                    <span style={{ textTransform: "capitalize" }}>Saving...</span>
                                )}
                            </MatButton>
    
                            <MatButton
                                variant="contained"
                                className={classes.button}
                                startIcon={<CancelIcon />}
                                style={{backgroundColor:'#992E62'}}
                                onClick={handleCancel}
                            >
                                <span style={{ textTransform: "capitalize", color:"#fff" }}>Cancel</span>
                            </MatButton>
                        </Form>
                    </div>
                </CardContent>
                    {/* </Card> */}
            <Modal show={open} toggle={toggle} className="fade" size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static">
             <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                Notification!
            </Modal.Title>
            </Modal.Header>
                {/* <Modal.Body>
                    <h4>Are you Sure of the Age entered?</h4>
                    
                </Modal.Body> */}
            <Modal.Footer>
                <Button onClick={toggle} style={{backgroundColor:"#014d88", color:"#fff"}}>Yes</Button>
            </Modal.Footer>
            </Modal>
                               </> 
                               //</Form>
                            //</div>
                        //</CardContent>
                    //</Card>
                //</>
            )
            }

export default Tetanus
