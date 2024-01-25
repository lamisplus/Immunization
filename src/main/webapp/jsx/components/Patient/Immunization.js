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


const Immunization =(props)=>{
 
    
            const [immunizationDetail, setImmunizationDetail] =useState(
                { 
                    hepB0:"",
                    opv0:"",
                    bcg:"",
                    opv1:"",
                    penta1:"",
                    pcv1:"",
                    rota1:"",
                    opv:"",
                    penta2:"",
                    pcv2:"",
                    rota2:"",
                    opv3:"",
                    penta3:"",
                    pcv3:"",
                    rota3:"",
                    ipv:"",
                    vitaminA1:"", 
                    vitaminA2: "",
                    measles1:"",
                    yellowFever:"",
                    menA:"",
                    measles2:"",
                    Hpv9yrs:"",
                    comments:""
            
            
                }

            )
            // const [basicInfo, setBasicInfo]= useState(
            //     {
            //         nameOfHealthFacility:"",
            //         ward:"",
            //         lga:"",
            //         state:"",
            //         date:"",
            //         facilityType:""

    
            //     }
            // )
            const userDetail = props.location && props.location.state ? props.location.state.user : null;
            const [errors, setErrors] = useState({})
            const classes = useStyles();
            const handleImmunizationDetail= e => {
                //console.log(e.target.value)
                setErrors({...temp, [e.target.name]:""})
                setImmunizationDetail ({...immunizationDetail,  [e.target.name]: e.target.value});
            
            }
            // const handleInputChangeBasic = e => {  
            //     setErrors({...temp, [e.target.name]:""})      
            //     setBasicInfo ({...basicInfo,  [e.target.name]: e.target.value}); 
            //     // if(e.target.name==='firstName' && e.target.value!==''){
            //     //     const name = alphabetOnly(e.target.value)
            //     //     setBasicInfo ({...basicInfo,  [e.target.name]: name});
            //     // }
            //     // if(e.target.name==='lastName' && e.target.value!==''){
            //     //     const name = alphabetOnly(e.target.value)
            //     //     setBasicInfo ({...basicInfo,  [e.target.name]: name});
            //     // }
            //     // if(e.target.name==='middleName' && e.target.value!==''){
            //     //     const name = alphabetOnly(e.target.value)
            //     //     setBasicInfo ({...basicInfo,  [e.target.name]: name});
            //     // }
            //     // if(e.target.name==='ninNumber' && e.target.value!==''){
            //     //     const ninNumberValue = checkNINLimit(e.target.value)
            //     //     setBasicInfo ({...basicInfo,  [e.target.name]: ninNumberValue});
            //     // }
            //     // if(e.target.name==='hospitalNumber' && e.target.value!==''){
            //     // async function getHosiptalNumber() {
            //     //     const hosiptalNumber=e.target.value
            //     //     const response = await axios.post(`${baseUrl}patient/exist/hospital-number`, hosiptalNumber,
            //     //             { headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'text/plain'} }
            //     //         );
            //     //     if(response.data!==true){
            //     //         setHospitalNumStatus(false)
            //     //         errors.hospitalNumber=""
            //     //         setObjValues ({...objValues,  uniqueId: e.target.value});
            //     //         setHospitalNumStatus2(true)
            //     //     }else{
            //     //         errors.hospitalNumber=""
            //     //         toast.error("Error! Hosiptal Number already exist");
            //     //         setHospitalNumStatus(true)
            //     //         setHospitalNumStatus2(false)
            //     //     }
            //     // }
            //     // getHosiptalNumber();
            //     // } 
                        
            // }
            const validate = () => {
        
                //temp.nameOfHealthFacility = basicInfo.nameOfHealthFacility ? "" : "Name of Health Facility is required"
                //temp.ward = basicInfo.ward ? "" : "Ward  is required."
                //temp.lga = basicInfo.lga ? "" : "Local Government Area is required."
                //temp.state = basicInfo.state ? "" : "State is required."
                //temp.date = basicInfo.date ? "" : "Date of Registration is required."
                //temp.facilityType = basicInfo.facilityType ? "" : "Facility Type is required."

                temp.hepB0 = immunizationDetail.hepB0 ? "" : "This filled  is required."
                temp.opv0 = immunizationDetail.opv0 ? "" : "This filled  is required."    
                temp.bcg = immunizationDetail.bcg ? "" : "This filled  is required."  
                temp.opv1 = immunizationDetail.opv1 ? "" : "This filled  is required." 
                temp.penta1 = immunizationDetail.penta1 ? "" : "This filled  is required." 
                temp.pcv1 = immunizationDetail.pcv1 ? "" : "This filled  is required." 
                temp.rota1 = immunizationDetail.rota1 ? "" : "This filled  is required." 
                temp.opv = immunizationDetail.opv ? "" : "This filled is required." 
                temp.penta2 = immunizationDetail.penta2 ? "" : "This filled is required." 
                temp.pcv2 = immunizationDetail.pcv2 ? "" : "This filled is required." 
                temp.rota2 = immunizationDetail.rota2 ? "" : "This filled is required."
                temp.opv3 = immunizationDetail.opv3 ? "" : "This filled is required."
                temp.penta3 = immunizationDetail.penta3 ? "" : "This filled is required."
                temp.penta3 = immunizationDetail.rota2 ? "" : "This filled is required."
                temp.pcv3 = immunizationDetail.pcv3 ? "" : "This filled is required." 
                temp.rota3 = immunizationDetail.rota3 ? "" : "This filled is required." 
                temp.vitaminA1 = immunizationDetail.vitaminA1 ? "" : "This filled is required." 
                temp.vitaminA2 = immunizationDetail.vitaminA2 ? "" : "This filled is required." 
                temp.measles1 = immunizationDetail.measles1 ? "" : "This filled is required." 
                temp.menA = immunizationDetail.menA? "" : "This filled is required."
                temp.measles2 = immunizationDetail.measles2? "" : "This filled is required."
                temp.Hpv9yrs = immunizationDetail.Hpv9yrs? "" : "This filled is required."
                temp.comments = immunizationDetail.comments? "" : "This filled is required." 
                
                //VACCINATION FORM VALIDATION
                
                
                    setErrors({ ...temp })
            return Object.values(temp).every(x => x == "")
        } 
            let temp = { ...errors }
            // const handleSubmit = async (e)=>{
            //     e.preventDefault(); 
            //         if(validate()){
            //             setSaving(true)
            //         }


            // }
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

                    <br /><br/>

                    <Card className={classes.root}>
                        <CardContent>
                            <div className='col-xl-12 col-lg-12'>
                                <Form>
                                    {/* <div className="card">
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
                                    </div> */}
                                    <div className="card">
                                        <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder', borderRadius:"0.2rem"}}>
                                            <h5 className="card-title"  style={{color:'#fff'}}> NHMIS TETANUS DIPHTHERIA (TD) REGISTER FOR PREGNANT AND NON PREGNANT WOMEN</h5>
                                        </div>

                                        <div className="card-body">
                                        <div className="row">
                                        <div className="form-group mb-3 col-md-4">                                    
                                        <div className="form-check custom-checkbox ml-1 ">
                                                <Label>Date Of Child Visit</Label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        name="dateOfChildVisit"
                                                        id="dateOfChildVisit"
                                                        //value={basicInfo.dob}
                                                    // onChange={handleDobChange}          
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                            
                                                            
                                        </div>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">

                                        <FormGroup>
                                                    <Label for="knownMedicalCondition">Child's Name </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="childName"
                                                        //value={basicInfo.medicalCondition}
                                                        id="childName"
                                                    // onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                    
                                                </FormGroup>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">

                                            <FormGroup>
                                                <Label for="knownMedicalCondition">Child's Card No </Label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="childCardNo"
                                                    //value={basicInfo.medicalCondition}
                                                    id="childCardNo"
                                                // onChange={handleInputChangeBasic}
                                                    style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                />
                                                
                                            </FormGroup>
                                        </div>

                                        <div className="form-group mb-3 col-md-4">
                                                    <FormGroup>
                                                    <Label >Follow Up Address  <span style={{ color:"red"}}> *</span></Label>
                                                    <Input 
                                                        className="follow-control"
                                                        type="text"
                                                        name="followUpAddress"
                                                        id="followUpAddress"
                                                        //onChange={handleInputChange}
                                                        //value={objValues.vaccine} 
                                                    >

                                                    </Input>

                                                    
                                                    {errors.vaccine !=="" ? (
                                                            <span className={classes.error}>{errors.vaccine}</span>
                                                    ) : "" }           
                                                    </FormGroup>
                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                                            <FormGroup>
                                                                <Label>Sex <span style={{ color:"red"}}> *</span></Label>
                                                                <select
                                                                        className="form-control"
                                                                        name="sexId"
                                                                        id="sexId"
                                                                    // onChange={handleInputChangeBasic}
                                                                        //value={basicInfo.sexId}
                                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                    >
                                                                        <option value={""}>Select</option>
                                                                        {/* {genders.map((gender, index) => (
                                                                        <option key={gender.id} value={gender.id}>{gender.display}</option>
                                                                        ))} */}
                                                                    </select>
                                                                    {errors.sexId !=="" ? (
                                                                <span className={classes.error}>{errors.sexId}</span>
                                                                ) : "" }
                                                            </FormGroup>
                                                        </div>
                                        <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                <Label >Phone Number <span style={{ color:"red"}}> *</span></Label>
                                                <InputGroup> 
                                                    <Input 
                                                        className="form-control"
                                                        type="text"
                                                        name="phoneNumber"
                                                        id="phoneNumber"
                                                        //onChange={handleInputChange}
                                                        //value={objValues.vaccineDate} 
                                                        //max= {moment(new Date()).format("YYYY-MM-DD") }
                                                    />

                                                </InputGroup>
                                                {errors.vaccineDate !=="" ? (
                                                        <span className={classes.error}>{errors.vaccineDate}</span>
                                                ) : "" }
                                                </FormGroup>
                                        </div>
                                                                        
                                        <div className="form-group mb-3 col-md-2">
                                                            <FormGroup>
                                                                <Label>Date Of Birth <span style={{ color:"red"}}> *</span></Label>
                                                                <div className="radio">
                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            value="Actual"
                                                                            name="dateOfBirth"
                                                                            defaultChecked
                                                                            
                                                                            //onChange={(e) => handleDateOfBirthChange(e)}
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        /> Actual
                                                                    </label>
                                                                </div>
                                                                <div className="radio">
                                                                    <label>
                                                                        <input
                                                                            type="radio"
                                                                            value="Estimated"
                                                                            name="dateOfBirth"
                                                                            
                                                                            //onChange={(e) => handleDateOfBirthChange(e)}
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                        /> Estimated
                                                                    </label>
                                                                </div>
                                                            </FormGroup>
                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label>Date </Label>
                                                                <input
                                                                    className="form-control"
                                                                    type="date"
                                                                    name="dob"
                                                                    min="1940-01-01"
                                                                    id="dob"
                                                                    //max={basicInfo.dateOfRegistration==="" ? moment(new Date()).format("YYYY-MM-DD") : basicInfo.dateOfRegistration}
                                                                    //value={basicInfo.dob}
                                                                    //onChange={handleDobChange}
                                                                    
                                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                />
                                                            
                                                            </FormGroup>
                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> Hep B.O</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="hepB0"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.hepB0}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> OPV 0</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="opv0"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.opv0}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> BCG </Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="bcg"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.bcg}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> OPV 1</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="opv1"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.opv1}
                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> Penta 1</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="penta1"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.penta1}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> PCV 1</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="pcv1"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.pcv1}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> ROTA 1</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="rota1"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.rota1}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> OPV 2</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="opv2"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.opv2}
                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> PENTA 2</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="penta2"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.penta2}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> PCV 2</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="pcv2"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.pcv2}
                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> ROTA 2</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="rota2"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.rota2}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> OPV 3</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="opv3"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.opv3}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> PENTA 3</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="penta3"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.penta3}
                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>

                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> PCV 3</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="pcv3"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.pcv3}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> ROTA 3</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="rota3"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.rota3}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> IPV</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="ipv"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.ipv}
                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> VITAMIN A1(100,000IU)</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="vitaminA1"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.vitaminA1}
                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> VITAMIN A2(200,000IU)</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="vitaminA2"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.vitaminA2}
                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> Measle 1</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="measle1"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.measle1}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> Men A</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="menA"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.menA}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> Measle 2r</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="measle2"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.measle2}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> HPV (9years to 14 years)</Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="hpv9yrs"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.hpv9yrs}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        <div className="form-group mb-3 col-md-3">
                                                            <FormGroup>
                                                                <Label> Comment </Label>
                                                                <input
                                                                className="form-control"
                                                                type="text"
                                                                name="comment"
                                                                onChange={handleImmunizationDetail}
                                                                value={immunizationDetail.comment}

                                                                
                                                                />
                                                            </FormGroup>

                                                        </div>
                                                        
                                        </div>

                                        </div>
                                    </div>
                                </Form>
                                
                            </div>
                        </CardContent>
                    </Card>
                </>
            )
            }
            

export default Immunization
