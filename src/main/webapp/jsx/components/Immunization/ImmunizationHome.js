import React, { useState, useEffect } from 'react'
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
//import  './patient.css'
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
                    opv2:"",
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
                    comments:"",
                    missedVaccine:"",
            
            
                }

            )
            const [basicInfo, setBasicInfo]= useState(
                {
                    dateOfChildVisit:"",
                    childName:"",
                    childCardNo:"",
                    followUpAddress:"",
                    sexId:"",
                    phoneNumber:"",
                    birthdate:"",
                    //dob:""
 
                }
            )
            //console.log(basicInfo)
            
            const userDetail = props.location && props.location.state ? props.location.state.user : null;
            const [errors, setErrors] = useState({})
            const classes = useStyles();
            const [ageDisabled,setAgeDisabled]=useState(true);
            const [open, setOpen] = React.useState(false)
            const toggle = () => setOpen(!open);
            const [selectedOption, setSelectedOption]=useState("")
            const [birthdate, setBirthdate] = useState('');
            const dropdownOptions = [{
                value: "yes",
                name: 'Yes',
            }, {name: 'No',
                value: "no"}]
                const calculateAgeInDays = () => {
                    const today = new Date();
                    const birthDate = new Date(birthdate);
                    const timeDiff = today - birthDate;
                    const daysOld = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                    const days = daysOld/7
                   checking(parseInt(days))
                    return parseInt(days);

                };
                function checking(daysOld) {
                    let vaccine = [];
                
                    if (daysOld === 0 || daysOld <= 2) {
                        vaccine.push("hepB0");
                        
                    }
                    if (daysOld <= 2) {
                        vaccine.push("opv0");
                    }
                    if (daysOld <= 44) {
                        vaccine.push("bcg");
                    }
                    if (daysOld >= 6 && daysOld <= 92) {
                        vaccine.push("opv1","penta1","pcv1","rota1");
                    }
                    if (daysOld >= 10 && daysOld <= 92) {
                        vaccine.push("opv2","penta2","pcv2","rota2");
                    }
                    if (daysOld >= 14 && daysOld <= 92) {
                        vaccine.push("opv3","penta3","pcv3","rota3");
                    }
                    if (daysOld >= 14 && daysOld <= 44) {
                        vaccine.push("ipv");
                    }
                    if (daysOld >= 24 && daysOld <= 44) {
                        vaccine.push("vitaminA1");
                    }
                    if (daysOld >= 48 && daysOld <= 92) {
                        vaccine.push("vitaminA2");
                    }
                    if (daysOld >= 36 && daysOld <= 44) {
                        vaccine.push("measles1");
                    }
                    if (daysOld >= 36 && daysOld <= 92) {
                        vaccine.push("yellowFever");
                    }
                    if (daysOld >= 36 && daysOld <= 44) {
                        vaccine.push("menA");
                    }
                    if (daysOld >= 72 && daysOld <= 92) {
                        vaccine.push("measles2");
                    }
                    if (daysOld >= 432 && daysOld >= 528) {
                        vaccine.push("Hpv9yrs");
                    }
                    

                    //console.log(vaccine)
                    return vaccine; 
                }
                
 
            const handleBirthdateChange = (event) => {
                setBirthdate(event.target.value);
              };
              const handleDobChange = (e) =>{
                setBasicInfo({...basicInfo, [e.target.name]: e.target.value })
              }
            const handleDropdownChange= e => {
               // console.log(e.target.value)
                setErrors({...temp, [e.target.name]:""})
                setImmunizationDetail ({...immunizationDetail,  [e.target.name]: e.target.value});
            
            }
            // const handleDropdownChange = (event) => {
            //     setImmunizationDetail ({...immunizationDetail,  [e.target.name]: e.target.value});
            //   };
            // const handleDateOfBirthChange = (e) => {
            //     if (e.target.value === "Actual") {
            //         setAgeDisabled(true);
            //     } else if (e.target.value === "Estimated") {
            //         setAgeDisabled(false);
            //     }
            // }
            // const handleAgeChange = (e) => {
            //     const ageNumber = e.target.value.replace(/\D/g, '')
            //     if (!ageDisabled && ageNumber) {  

            //         // const currentDate = new Date();
            //         // currentDate.setDate(15);
            //         // currentDate.setMonth(5);
            //         // const estDob = moment(currentDate.toISOString());
            //         // const dobNew = estDob.add((ageNumber * -1), 'years');
            //         //setBasicInfo({...basicInfo, dob: moment(dobNew).format("YYYY-MM-DD")});

            //         //.childDob =moment(daysOld).format("YYYY-MM-DD")
            //     }
            //     //setBasicInfo({...basicInfo, age: Math.abs(e.target.value)});
            // }
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
                                                <FormGroup>                                 
                                                    <Label>Date Of Child Visit</Label>
                                                        <input
                                                            className="form-control"
                                                            type="date"
                                                            name="dateOfChildVisit"
                                                            id="dateOfChildVisit"
                                                            value={basicInfo.dateOfChildVisit}
                                                             onChange={handleDobChange}          
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        /> 
                                                </FormGroup>              
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label>Child's Name </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="childName"
                                                        value={basicInfo.childName}
                                                        id="childName"
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />  
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label >Child's Card No </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="childCardNo"
                                                        value={basicInfo.childCardNo}
                                                        id="childCardNo"
                                                     onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />   
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                    <FormGroup>
                                                        <Label >Follow Up Address  <span style={{ color:"red"}}> *</span></Label>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="followUpAddress"
                                                            id="followUpAddress"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.followUpAddress} 
                                                            style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                        />
                                                        {errors.followUpAddress !=="" ? (
                                                                <span className={classes.error}>{errors.followUpAddress}</span>
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
                                                                 onChange={handleInputChangeBasic}
                                                                value={basicInfo.sexId}
                                                                style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            >
                                                                <option value={""}>Select</option>
                                                                <option value={"male"}>Male</option>
                                                                <option value={"female"}>Female</option>
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
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            name="phoneNumber"
                                                            id="phoneNumber"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.phoneNumber} 
                                                            style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                        />
                                                    </InputGroup>
                                                    {errors.phoneNumber !=="" ? (
                                                            <span className={classes.error}>{errors.phoneNumber}</span>
                                                    ) : "" }
                                                    </FormGroup>
                                            </div>                      
                                            <div className="form-group mb-3 col-md-2">
                                                    {/* <FormGroup>
                                                        <Label>Date Of Birth <span style={{ color:"red"}}> *</span></Label>
                                                        <div className="radio">
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    value="Actual"
                                                                    name="dateOfBirth"
                                                                    defaultChecked
                                                                    onChange={(e) => handleDateOfBirthChange(e)}
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
                                                                    
                                                                    onChange={(e) => handleDateOfBirthChange(e)}
                                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                /> Estimated
                                                            </label>
                                                        </div>
                                                    </FormGroup> */}
                                            </div>
                                            <div className='row'>
                                            <div className="form-group mb-3 col-md-3">
                                                <FormGroup>
                                                    <Label>Date OF Birth </Label>
                                                    <input
                                                         className="form-control"
                                                         type="date"
                                                         name="dob"  
                                                         id="dob"
                                                        //max={basicInfo.dateOfRegistration==="" ? moment(new Date()).format("YYYY-MM-DD") : basicInfo.dateOfRegistration}
                                                        value={basicInfo.Birthdate}
                                                        onChange={handleBirthdateChange}
                                                  
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                </FormGroup>
                                            </div> 
                                            <div className="form-group mb-2 col-md-2">
                                                <FormGroup>
                                                    <div >
                                                    <Label>Age</Label>
                                                    {/* <input
                                                         //type="number"
                                                        // name="age"                                                       
                                                        // className="form-control"                                                        
                                                        // id="age"
                                                        //min="5"
                                                        //value={basicInfo.birthdate}
                                                        //disabled={ageDisabled}
                                                        //onChange={handleAgeChange}
                                                        
                                                        //placeholder={`${calculateAgeInDays()} days old.`}
                                                        //style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    /> */}
                                                    {birthdate && (
                                                            <p>
                                                         {calculateAgeInDays()} week(s) Old.
                                                            </p>
                                                        )} 
                                                        </div>
                                                        
                                                   
                                                </FormGroup>

                                            </div>
                                            </div>
                                            <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder', borderRadius:"0.2rem"}}>
                                            <h5 className="card-title"  style={{color:'#fff'}}>Antigens </h5>
                                             </div>
                                            { calculateAgeInDays() >= 0 && calculateAgeInDays() <= 2 &&
                                             (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> Hep B.O</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="hepB0" 
                                                    value={immunizationDetail.hepB0}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>
                                            </div> )}
                                            {  calculateAgeInDays() <= 2 &&(
                                                <div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> OPV 0</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="opv0"
                                                    value={immunizationDetail.opv0}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div> )}
                                            {  calculateAgeInDays() <= 44 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> BCG </Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="bcg"
                                                    value={immunizationDetail.bcg}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            { calculateAgeInDays() >=6 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> OPV 1</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="opv1"
                                                    value={immunizationDetail.opv1}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            { calculateAgeInDays() >= 6 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> Penta 1</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="penta1"
                                                    value={immunizationDetail.penta1}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 6 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> PCV 1</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="pcv1"
                                                    value={immunizationDetail.pcv1}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 6 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> ROTA 1</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="rota1"
                                                    value={immunizationDetail.rota1}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 10 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> OPV 2</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="opv2"
                                                    value={immunizationDetail.opv2}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 10 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> PENTA 2</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="penta2"
                                                    value={immunizationDetail.penta2}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 10 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> PCV 2</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="pcv2"
                                                    value={immunizationDetail.pcv2}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 10 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> ROTA 2</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="rota2"
                                                    value={immunizationDetail.rota2}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 14 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> OPV 3</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="opv3"
                                                    value={immunizationDetail.opv3}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 14 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> PENTA 3</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="penta3"
                                                    value={immunizationDetail.penta3}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 14 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> PCV 3</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="pcv3"
                                                    value={immunizationDetail.pcv3}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 14 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> ROTA 3</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="rota3"
                                                    value={immunizationDetail.rota3}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 14 && calculateAgeInDays() <= 44 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> IPV</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="ipv"
                                                    value={immunizationDetail.ipv}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 24 && calculateAgeInDays() <= 44 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> VITAMIN A1(100,000IU)</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="vitaminA1"
                                                    value={immunizationDetail.vitaminA1}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 48 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> VITAMIN A2(200,000IU)</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="vitaminA2"
                                                    value={immunizationDetail.vitaminA2}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 36 && calculateAgeInDays() <= 44 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> Measle 1</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="measle1"
                                                    value={immunizationDetail.measle1}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 36 && calculateAgeInDays() <= 92 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> Men A</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="menA"
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                            {calculateAgeInDays() >= 36 && calculateAgeInDays() <= 44 &&
                                            (<div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> Measle 2R</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="measle2"
                                                    value={immunizationDetail.measle2}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                           {calculateAgeInDays() >= 72 && calculateAgeInDays() <= 92 &&
                                           ( <div className="form-group mb-4 col-md-4">
                                                <FormGroup>
                                                    <Label> HPV (9years to 14 years)</Label>
                                                    <select
                                                    className="form-control"
                                                    type="text"
                                                    name="hpv9yrs"
                                                    value={immunizationDetail.hpv9yrs}
                                                    onChange={handleDropdownChange}
                                                    >
                                                    <option value="">Have You Taken The Vaccination</option>
                                                    {dropdownOptions.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                        
                                                    ))}
                                                    </select>
                                                </FormGroup>

                                            </div>)}
                                           
                                           <div className="form-group mb-6 col-md-6">
                                                <FormGroup>
                                                    <Label> Comment </Label>
                                                    <input
                                                    className="form-control"
                                                    type="text"
                                                    name="comment"
                                                    //onChange={handleImmunizationDetail}
                                                    value={immunizationDetail.comment}
                                                    />
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-6 col-md-6">
                                                <FormGroup>
                                                    <Label>Have you missed any previous vaccine</Label>
                                                     <Input
                                                        type="select"
                                                        name="missedVaccine"
                                                        id="missedVaccine"
                                                        value={immunizationDetail.missedVaccine}
                                                        //onChange={handleInputChangeAttempt}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.25rem"}}
                                                    >
                                                        <option value=""> Select </option>
                                                        <option value="yes"> Yes </option>
                                                        <option value="no"> No</option> 

                                            </Input>
                                                </FormGroup>
                                            </div>
                                        { immunizationDetail.missedVaccine === 'yes' && (
                                            <div>
                                             ANTIGENMISSED 
                                            </div>

                                        )}

                                            
                                                            
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
