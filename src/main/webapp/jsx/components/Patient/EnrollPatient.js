import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {format} from 'date-fns';
import MatButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import {FormGroup, Label, Spinner,Input,Form} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
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
import {useForm} from "react-hook-form";
import {token, url as baseUrl } from "../../../api";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { getValue } from "@syncfusion/ej2-base";
import  './patient.css'
// import Form from 'react-bootstrap/Form';
import {  Modal } from "react-bootstrap";



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
        flexGrow: 1,
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
        },
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
    }
}));


const UserRegistration = (props) => {
    const [basicInfo, setBasicInfo]= useState(
            {
                active: true,
                address: [],
                contact: [],
                contactPoint: [],
                dateOfBirth: "",
                deceased: false,
                deceasedDateTime: null,
                firstName: "",
                genderId: "",
                identifier: "",
                otherName: "",
                maritalStatusId: "",
                educationId: "",
                employmentStatusId:"",
                dateOfRegistration: "",
                isDateOfBirthEstimated: null,
                age:"",
                phoneNumber:"",
                altPhonenumber:"",
                dob:"",
                countryId:"",
                stateId:"",
                district:"",
                landmark:"",
                sexId:"",
                ninNumber:""

            }
    )
    const [relatives, setRelatives]= useState(
                { 
                    address:"",
                    phone:"",
                    firstName: "",
                    email: "",
                    relationshipId: "",
                    lastName: "",
                    middleName: ""
                }
        )

    const [today, setToday] = useState(new Date().toISOString().substr(0, 10).replace('T', ' '));
    const [contacts, setContacts] = useState([]);
    const [saving, setSaving] = useState(false);
    const [disabledAgeBaseOnAge, setDisabledAgeBaseOnAge] = useState(false);
    const [ageDisabled, setAgeDisabled] = useState(true);
    const [showRelative, setShowRelative] = useState(false);
    const [editRelative, setEditRelative] = useState(null);
    const [genders, setGenders]= useState([]);
    const [maritalStatusOptions, setMaritalStatusOptions]= useState([]);
    const [educationOptions, setEducationOptions]= useState([]);
    const [occupationOptions, setOccupationOptions]= useState([]);
    const [relationshipOptions, setRelationshipOptions]= useState([]);
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [errors, setErrors] = useState({})
    const [topLevelUnitCountryOptions, settopLevelUnitCountryOptions]= useState([]);
    const [patientDTO, setPatientDTO]= useState({"person":"", "hivEnrollment":""})
    const userDetail = props.location && props.location.state ? props.location.state.user : null;
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
     //HIV INFORMATION
     const [femaleStatus, setfemaleStatus]= useState(false)
     //const [values, setValues] = useState([]);
     const [objValues, setObjValues] = useState({
        dateEnrolled: "",
        dateOfLastHivNegativeTest: "",
        dateReferredForPrep: "",
        extra: {},
        hivTestingPoint: "",
        prepRiskType: "",
        personDto:{},
        personId: 0,
        prepSupporter: "",
        uniqueClientId: "",
        ancUnique:""
    });
     const [carePoints, setCarePoints] = useState([]);
     const [sourceReferral, setSourceReferral] = useState([]);
     const [hivStatus, setHivStatus] = useState([]);
     const [enrollSetting, setEnrollSetting] = useState([]);
     const [tbStatus, setTbStatus] = useState([]);
     const [kP, setKP] = useState([]);
     const [newSex, setNewSex] = useState([]);
     const [pregnancyStatus, setPregnancyStatus] = useState([]);
     //set ro show the facility name field if is transfer in 
     const [transferIn, setTransferIn] = useState(false);
     // display the OVC number if patient is enrolled into OVC 
     const [ovcEnrolled, setOvcEnrolled] = useState(false);
     //Input fields to hidden base on some conditions
     const [hideTargetGroup, setHideTargetGroup]= useState("false");
     const [open, setOpen] = React.useState(false)
     const toggle = () => setOpen(!open);
    const locationState = location.state;
    let patientId = null;
    let patientObj = {};
    patientId = locationState ? locationState.patientId : null;
    patientObj = locationState ? locationState.patientObj : {}; 

    useEffect(() => { 
        loadGenders();
        getSex();
        loadMaritalStatus();
        loadEducation();
        loadOccupation();
        loadRelationships();
        loadTopLevelCountry();        
        CareEntryPoint();
        SourceReferral();
        HivStatus();
        EnrollmentSetting();
        TBStatus();
        KP();
        PregnancyStatus();
        GetCountry();
        if(patientObj){

            const contacts =patientObj && patientObj.contact ? patientObj.contact : [];
            //setContacts(patientObj.contacts);
            let newConatctsInfo=[]
            //Manipulate relatives contact  address:"",
            const actualcontacts=contacts.contact && contacts.contact.length>0 && contacts.contact.map((x)=>{ 
                const contactInfo = 
                    { 
                        address:x.address.line[0],
                        phone:x.contactPoint.value,
                        firstName:x.firstName,
                        email: "",
                        relationshipId: x.relationshipId,
                        lastName: x.surname,
                        middleName: x.otherName
                    }
                newConatctsInfo.push(contactInfo)
            })
            setContacts(newConatctsInfo);
            const identifiers = patientObj.identifier;
            const address = patientObj.address;
            const contactPoint = patientObj.contactPoint;
            const hospitalNumber = identifiers.identifier.find(obj => obj.type === 'HospitalNumber');
            const phone = contactPoint.contactPoint.find(obj => obj.type === 'phone');
            const email = contactPoint.contactPoint.find(obj => obj.type === 'email');
            const altphone = contactPoint.contactPoint.find(obj => obj.type === 'altphone');
            const country = address && address.address && address.address.length > 0 ? address.address[0] : null;
            //const getSexId=  genders.length>0 && genders.find((x)=> x.display===patientObj.sex)//get patient sex ID by filtering the request
            //console.log(newSex)
            //setValue('dob', format(new Date(patientObj.dateOfBirth), 'yyyy-MM-dd'));
            basicInfo.dob=patientObj.dateOfBirth
            basicInfo.firstName=patientObj.firstName
            basicInfo.dateOfRegistration=patientObj.dateOfRegistration
            basicInfo.middleName=patientObj.otherName
            basicInfo.lastName=patientObj.surname
            basicInfo.hospitalNumber=hospitalNumber && hospitalNumber ? hospitalNumber.value : ''
            setObjValues ({...objValues,  uniqueId: hospitalNumber ? hospitalNumber.value : ''});
            basicInfo.maritalStatusId=patientObj && patientObj.maritalStatus ? patientObj.maritalStatus.id : ""
            basicInfo.employmentStatusId=patientObj && patientObj.employmentStatus ? patientObj.employmentStatus.id :""
            basicInfo.genderId=patientObj && patientObj.gender ? patientObj.gender.id : null
            //basicInfo.sexId=patientObj.sex
            basicInfo.educationId=patientObj && patientObj.education ? patientObj.education.id : ""
            basicInfo.phoneNumber=phone && phone.value ? phone.value :""
            basicInfo.altPhonenumber= altphone && altphone.value ? altphone.value :""
            basicInfo.email=email && email.value ? email.value :""
            basicInfo.address=country  && country.city ? country.city :""
            basicInfo.landmark=country.line && country.line.length>0 ? country.line[0]: ""
            basicInfo.countryId=country && country.countryId  ? country.countryId  :""
            setStateByCountryId(country.countryId); 
            getProvincesId(country && country.stateId  ? country.stateId  :"")
            basicInfo.stateId=country && country.stateId  ? country.stateId  :""
            basicInfo.district=country && country.district ? country.district :""
            const patientAge=calculate_age(moment(patientObj.dateOfBirth).format("DD-MM-YYYY"))
            basicInfo.age=patientAge
            setfemaleStatus(patientObj.sex==='Female'? true : false)
            if(patientObj.age<=14){
                setOvcEnrolled(true)
            }
            basicInfo.ninNumber=patientObj.ninNumber

        }
        if(basicInfo.dateOfRegistration < basicInfo.dob){
            alert('Date of registration can not be earlier than date of birth')
        }
        
    }, [patientObj, patientId, basicInfo.dateOfRegistration]);
    //Get list of Source of Referral
    const getSex =()=>{
        axios
        .get(`${baseUrl}application-codesets/v2/SEX`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            //console.log(response.data);
            const getSexId=  response.data.find((x)=> x.display===patientObj.sex)//get patient sex ID by filtering the request
            basicInfo.sexId=getSexId.display
        })
        .catch((error) => {
        //console.log(error);
        });        
}
    const loadGenders = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/SEX`, { headers: {"Authorization" : `Bearer ${token}`} });
            setGenders(response.data);
        } catch (e) {
            
        }
    }, []);
    const loadMaritalStatus = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/MARITAL_STATUS`, { headers: {"Authorization" : `Bearer ${token}`} });
            setMaritalStatusOptions(response.data);
        } catch (e) {
        }
    }, []);
    const loadEducation = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/EDUCATION`, { headers: {"Authorization" : `Bearer ${token}`} });
            setEducationOptions(response.data);
        } catch (e) {

        }
    }, []);
    const loadOccupation = useCallback(async () => {
        try {
            const response = await axios.get(`${baseUrl}application-codesets/v2/OCCUPATION`, { headers: {"Authorization" : `Bearer ${token}`} });
            setOccupationOptions(response.data);
        } catch (e) {

        }
    }, []);
    const loadRelationships = useCallback(async () => {
      try {
          const response = await axios.get(`${baseUrl}application-codesets/v2/RELATIONSHIP`, { headers: {"Authorization" : `Bearer ${token}`} });
          setRelationshipOptions(response.data);
      } catch (e) {
      }
    }, []);
    const loadTopLevelCountry = useCallback(async () => {
        const response = await axios.get(`${baseUrl}organisation-units/parent-organisation-units/0`, { headers: {"Authorization" : `Bearer ${token}`} });
        settopLevelUnitCountryOptions(response.data);
    }, []);
    const loadOrganisationUnitsByParentId = async (parentId) => {
        const response = await axios.get(`${baseUrl}organisation-units/parent-organisation-units/${parentId}`, { headers: {"Authorization" : `Bearer ${token}`} });
        return response.data;
    };

    //Country List
      const GetCountry =()=>{
        axios
        .get(`${baseUrl}organisation-units/parent-organisation-units/0`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            setCountries(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });        
    }
     //Get States from selected country
     const getStates = e => {
        const getCountryId =e.target.value;

            setStateByCountryId(getCountryId); 
            setBasicInfo({ ...basicInfo, countryId: getCountryId });
    };
    //Get list of State
    function setStateByCountryId(getCountryId) {
        axios
        .get(`${baseUrl}organisation-units/parent-organisation-units/${getCountryId}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            setStates(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });  
    }
    //Calculate Date of birth 
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
                return age_now ;
    };
     //fetch province
     const getProvinces = e => {
            const stateId = e.target.value;
            setErrors({...errors, [e.target.name]: ""})
            setBasicInfo({ ...basicInfo, stateId: e.target.value });
            axios
            .get(`${baseUrl}organisation-units/parent-organisation-units/${stateId}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setProvinces(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });  
    };
    function getProvincesId(getStateId) {
        axios
        .get(`${baseUrl}organisation-units/parent-organisation-units/${getStateId}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            setProvinces(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });  
    }
    //Date of Birth and Age handle 
    const handleDobChange = (e) => {
        if (e.target.value) {
            const today = new Date();
            const birthDate = new Date(e.target.value);
            let age_now = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if(m<18){
                alert("The child is less than 18months")
                setDisabledAgeBaseOnAge(true)
            }else{
                setDisabledAgeBaseOnAge(false)
            }
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
            basicInfo.age=age_now
            //setBasicInfo({...basicInfo, age: age_now});        
        } else {
            setBasicInfo({...basicInfo, age:  ""});
        }
        setBasicInfo({...basicInfo, dob: e.target.value});
        if(basicInfo.age!=='' && basicInfo.age>=60){
            toggle()
        }
    }
    const handleDateOfBirthChange = (e) => {
        if (e.target.value == "Actual") {
            setAgeDisabled(true);
        } else if (e.target.value == "Estimated") {
            setAgeDisabled(false);
        }
    }
    const handleAgeChange = (e) => {
        if (!ageDisabled && e.target.value) {
            if(e.target.value!=='' && e.target.value>=60){
                toggle()
            }
            if(e.target.value <=1){
                setDisabledAgeBaseOnAge(true)
            }else{
                setDisabledAgeBaseOnAge(false)
            }
            const currentDate = new Date();
            currentDate.setDate(15);
            currentDate.setMonth(5);
            const estDob = moment(currentDate.toISOString());
            const dobNew = estDob.add((e.target.value * -1), 'years');
            //setBasicInfo({...basicInfo, dob: moment(dobNew).format("YYYY-MM-DD")});
            basicInfo.dob =moment(dobNew).format("YYYY-MM-DD")

        }
        setBasicInfo({...basicInfo, age: Math.abs(e.target.value)});
    }
    //End of Date of Birth and Age handling 
     /*****  Validation  */
     const validate = () => {
        let temp = { ...errors }
            temp.firstName = basicInfo.firstName ? "" : "First Name is required"
            temp.hospitalNumber = basicInfo.hospitalNumber ? "" : "Hospital Number  is required."
            //temp.middleName = basicInfo.middleName ? "" : "Middle is required."
            //temp.landmark = basicInfo.landmark ? "" : "This field is required."
            temp.lastName = basicInfo.lastName ? "" : "Last Name  is required."
            temp.sexId = basicInfo.sexId ? "" : "Sex is required."
            temp.dateOfRegistration1 = basicInfo.dateOfRegistration ? "" : "Date of Registration is required."
            temp.educationId = basicInfo.educationId ? "" : "Education is required."
            temp.address = basicInfo.address ? "" : "Address is required."
            temp.phoneNumber = basicInfo.phoneNumber ? "" : "Phone Number  is required."
            temp.countryId = basicInfo.countryId ? "" : "Country is required."    
            temp.stateId = basicInfo.stateId ? "" : "State is required."  
            temp.district = basicInfo.district ? "" : "Province/LGA is required." 
            //HIV FORM VALIDATION
            temp.uniqueClientId = objValues.uniqueClientId ? "" : "Unique ID is required."
            temp.dateEnrolled = objValues.dateEnrolled ? "" : "Date enrolled is required." 
            temp.dateOfLastHivNegativeTest = objValues.dateOfLastHivNegativeTest ? "" : "date of last HIV test is required." 
            temp.dateReferredForPrep = objValues.dateReferredForPrep ? "" : "Date referred is required." 
            temp.hivTestingPoint = objValues.hivTestingPoint ? "" : "Hiv test point is required." 
            temp.prepRiskType = objValues.prepRiskType ? "" : "PrEp risk type is required." 
            temp.prepSupporter = objValues.prepSupporter ? "" : "PrEp supporter is required." 
            
                setErrors({ ...temp })
        return Object.values(temp).every(x => x == "")
    }
    //Handle Input Change for Basic Infor
    const handleInputChangeBasic = e => { 
        setErrors({...errors, [e.target.name]: ""})        
        setBasicInfo ({...basicInfo,  [e.target.name]: e.target.value}); 
        //manupulate inpute fields base on gender/sex 
        if(e.target.name==='sexId' && e.target.value==='Female') {
            setfemaleStatus(true)
        }
        if(e.target.name==='firstName' && e.target.value!==''){
            const name = alphabetOnly(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: name});
        }
        if(e.target.name==='lastName' && e.target.value!==''){
            const name = alphabetOnly(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: name});
        }
        if(e.target.name==='middleName' && e.target.value!==''){
            const name = alphabetOnly(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: name});
        }
        if(e.target.name==='ninNumber' && e.target.value!==''){
            const ninNumberValue = checkNINLimit(e.target.value)
            setBasicInfo ({...basicInfo,  [e.target.name]: ninNumberValue});
        }
                   
    } 
    
    const checkNINLimit=(e)=>{
        const limit = 11;        
        const acceptedNumber= e.slice(0, limit)
        return  acceptedNumber   
    }
    //Function to show relatives 
    const handleAddRelative = () => {
        setShowRelative(true);
    };
    //Function to cancel the relatives form
    const handleCancelSaveRelationship = () => {
        setShowRelative(false);
    }

    /*****  Validation  Relationship Input*/
    const validateRelatives = () => {
        let temp = { ...errors }
            temp.firstName = relatives.firstName ? "" : "First Name is required"
            temp.lastName = relatives.lastName ? "" : "Last Name  is required."
            temp.relationshipId = relatives.relationshipId ? "" : "Relationship Type is required."  
                setErrors({ ...temp })
        return Object.values(temp).every(x => x == "")
    }
    //Function to add relatives 
    const handleSaveRelationship = (e) => {
        if(validateRelatives()){
            setContacts([...contacts, relatives])
        }

    }
    const handleDeleteRelative = (index) => {
        contacts.splice(index, 1);
        setContacts([...contacts]);
    };
    const handleEditRelative = (relative, index) => {
        setRelatives(relative)
        setShowRelative(true);
        contacts.splice(index, 1); 
    };   
    const getRelationship = (relationshipId) => {
        const relationship = relationshipOptions.find(obj => obj.id == relationshipId);
        return relationship ? relationship.display : '';
    };
    const handleInputChangeRelatives = e => {        
        setRelatives ({...relatives,  [e.target.name]: e.target.value});               
    }
    
    const alphabetOnly=(value)=>{
        const result = value.replace(/[^a-z]/gi, '');
        return result
    }
   
    const CareEntryPoint =()=>{
            axios
                .get(`${baseUrl}application-codesets/v2/POINT_ENTRY`,
                    { headers: {"Authorization" : `Bearer ${token}`} }
                )
                .then((response) => {
                    //console.log(response.data);
                    setCarePoints(response.data);
                })
                .catch((error) => {
                //console.log(error);
                });            
    }
    //Get list of Source of Referral
    const SourceReferral =()=>{
            axios
            .get(`${baseUrl}application-codesets/v2/SOURCE_REFERRAL`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                //console.log(response.data);
                setSourceReferral(response.data);
            })
            .catch((error) => {
            //console.log(error);
            });        
    }
    //Get list of HIV STATUS ENROLLMENT
    const HivStatus =()=>{
        axios
        .get(`${baseUrl}application-codesets/v2/HIV_STATUS_ENROL`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            //console.log(response.data);
            setHivStatus(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });    
    }
    //Get list of HIV STATUS ENROLLMENT
    const EnrollmentSetting =()=>{
        axios
        .get(`${baseUrl}application-codesets/v2/ENROLLMENT_SETTING`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            //console.log(response.data);
            setEnrollSetting(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });    
    }
    //Get list of HIV STATUS ENROLLMENT
    const TBStatus =()=>{
        axios
        .get(`${baseUrl}application-codesets/v2/TB_STATUS`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            //console.log(response.data);
            setTbStatus(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });    
    }
    //Get list of KP
    const KP =()=>{
        axios
        .get(`${baseUrl}application-codesets/v2/TARGET_GROUP`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            //console.log(response.data);
            setKP(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });    
    }
    //Get list of KP
    const PregnancyStatus =()=>{
        axios
        .get(`${baseUrl}application-codesets/v2/PREGANACY_STATUS`,
            { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            //console.log(response.data);
            setPregnancyStatus(response.data);
        })
        .catch((error) => {
        //console.log(error);
        });    
    }
    const handleInputChange = e => { 
        setErrors({...errors, [e.target.name]: ""})       
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
                
    }        
    const checkPhoneNumber=(e, inputName)=>{
        const limit = 10;
            setRelatives({...relatives,  [inputName]: e.slice(0, limit)});     
    }
    const checkPhoneNumberBasic=(e, inputName)=>{
        const limit = 10;
        setErrors({...errors, [inputName]: ""})    
            setBasicInfo({...basicInfo,  [inputName]: e.slice(0, limit)});     
    } 
    //Handle CheckBox 
    const handleCheckBox =e =>{
        if(e.target.checked){
            setOvcEnrolled(true)
        }else{
            setOvcEnrolled(false)
        }
    }
    const handleCancel =()=>{
        history.push({ pathname: '/' });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const getSexId=  genders.find((x)=> x.display===basicInfo.sexId)//get patient sex ID by filtering the request
        basicInfo.sexId=getSexId && getSexId.id ? getSexId.id : ""
        let newConatctsInfo=[]
            //Manipulate relatives contact  address:"",
            const actualcontacts=contacts && contacts.length>0 && contacts.map((x)=>{
                
                const contactInfo = { 
                address: {
                    line: [
                        x.address
                    ],
                },
                contactPoint: {
                    type: "phone",
                    value: x.phone
                },
                firstName: x.firstName,
                fullName: x.firstName + " " + x.middleName + " " + x.lastName,
                relationshipId: x.relationshipId,
                surname: x.lastName,
                otherName: x.middleName
            }
            
            newConatctsInfo.push(contactInfo)
            })
         if(validate()){
            try {
                const patientForm = {
                    id:"",
                    active: true,
                    address: [
                        {
                            "city": basicInfo.address,
                            "countryId": basicInfo.countryId,
                            "district": basicInfo.district,
                            "line": [
                                basicInfo.landmark
                            ],
                            "organisationUnitId": 0,
                            "postalCode": "",
                            "stateId": basicInfo.stateId
                        }
                    ],
                    contact: newConatctsInfo,
                    contactPoint: [],
                    dateOfBirth: basicInfo.dob,
                    deceased: false,
                    deceasedDateTime: null,
                    firstName: basicInfo.firstName,
                    genderId: basicInfo.sexId,
                    sexId: basicInfo.sexId,
                    identifier: [
                        {
                            "assignerId": 1,
                            "type": "HospitalNumber",
                            "value": basicInfo.hospitalNumber
                        }
                    ],
                    otherName: basicInfo.middleName,
                    maritalStatusId: basicInfo.maritalStatusId,
                    surname: basicInfo.lastName,
                    educationId: basicInfo.educationId,
                    employmentStatusId: basicInfo.employmentStatusId,
                    dateOfRegistration: basicInfo.dateOfRegistration,
                    isDateOfBirthEstimated: basicInfo.dateOfBirth == "Actual" ? false : true,
                    ninNumber:basicInfo.ninNumber
                };
                const phone = {
                    "type": "phone",
                    "value": basicInfo.phoneNumber
                };
                if (basicInfo.email) {
                    const email = {
                        "type": "email",
                        "value": basicInfo.email
                    }
                    patientForm.contactPoint.push(email);
                }
                if (basicInfo.altPhonenumber) {
                    const altPhonenumber = {
                        "type": "altphone",
                        "value": basicInfo.altPhonenumber
                    }
                    patientForm.contactPoint.push(altPhonenumber);
                }
                patientForm.contactPoint.push(phone);
                patientForm.id = patientId;
                //objValues.personDto=patientForm;
                objValues.personId=patientId;
                const response = await axios.post(`${baseUrl}prep`, objValues, { headers: {"Authorization" : `Bearer ${token}`} });
                toast.success(" Register save successful");
                history.push('/');
            } catch (error) {                
                let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "An error occured while registering a patient !";
                    toast.error(errorMessage, {
                        position: toast.POSITION.TOP_RIGHT
                    });
            }
        }

    }

    return (
        <>
        <div className="row page-titles mx-0" style={{marginTop:"0px", marginBottom:"-10px"}}>
			<ol className="breadcrumb">
				<li className="breadcrumb-item active"><h4> <Link to={"/"} >PrEP /</Link> Registration</h4></li>
			</ol>
		  </div>
            <ToastContainer autoClose={3000} hideProgressBar />
            <Card className={classes.root}>
                <CardContent>
                    <Link
                        to={{
                            pathname: "/",
                            state: 'users'
                        }}>
                        <Button
                            variant="contained"
                            color="primary"
                            className=" float-end ms-1"
                            style={{backgroundColor:'#014d88',fontWeight:"bolder"}}
                            startIcon={<TiArrowBack />}
                        >
                            <span style={{ textTransform: "capitalize", color:'#fff' }}>Back </span>
                        </Button>
                    </Link>
                    <br />
                    <br />
                    <div className="col-xl-12 col-lg-12">
                        <Form >
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>{userDetail===null ? "Basic Information" : "Edit User Information"}</h5>
                                </div>

                                <div className="card-body">
                                    <div className="basic-form">
                                        <div className="row">
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="dateOfRegistration">Date of Registration* </Label>
                                                    <Input
                                                        className="form-control"
                                                        type="date"
                                                        name="dateOfRegistration"
                                                        min="1983-12-31"
                                                        max= {moment(new Date()).format("YYYY-MM-DD") }
                                                        id="dateOfRegistration"
                                                        value={basicInfo.dateOfRegistration}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        //disabled
                                                    />
                                                   {errors.dateOfRegistration1 !=="" ? (
                                                    <span className={classes.error}>{errors.dateOfRegistration1}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                            
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="patientId">Hospital Number* </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="hospitalNumber"
                                                        id="hospitalNumber"
                                                        value={basicInfo.hospitalNumber}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                        //disabled
                                                    />
                                                   {errors.hospitalNumber !=="" ? (
                                                    <span className={classes.error}>{errors.hospitalNumber}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="patientId">EMR Number* </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="emrNumber"
                                                        id="emrNumber"
                                                        disabled='true'
                                                        value={1094328}
                                                        //onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                   
                                                </FormGroup>
                                            
                                        </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="firstName">First Names *</Label>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="firstName"
                                                        id="firstName"
                                                        value={basicInfo.firstName}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        //disabled
                                                    />
                                                    {errors.firstName !=="" ? (
                                                    <span className={classes.error}>{errors.firstName}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>

                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label>Middle Name</Label>
                                                    <Input
                                                        className="form-control"
                                                        type="text"
                                                        name="middleName"
                                                        id="middleName"
                                                        value={basicInfo.middleName}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        //disabled
                                                    />
                                                </FormGroup>
                                            </div>

                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label>Last Name *</Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="lastName"
                                                        id="lastName"
                                                        value={basicInfo.lastName}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        //disabled
                                                    />
                                                   {errors.lastName !=="" ? (
                                                    <span className={classes.error}>{errors.lastName}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="form-group  col-md-4">
                                                <FormGroup>
                                                    <Label>Sex *</Label>
                                                    <select
                                                            className="form-control"
                                                            name="sexId"
                                                            id="sexId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.sexId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            
                                                        >
                                                            <option value={""}>Select</option>
                                                            {genders.map((gender, index) => (
                                                            <option key={gender.id} value={gender.display}>{gender.display}</option>
                                                            ))}
                                                        </select>
                                                        {(errors.sexId !=="" || errors.sexId !==null) ? (
                                                        <span className={classes.error}>{errors.sexId}</span>
                                                        ) : "" }
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-2 col-md-2">
                                                <FormGroup>
                                                    <Label>Date Of Birth</Label>
                                                    <div className="radio">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                value="Actual"
                                                                name="dateOfBirth"
                                                                defaultChecked
                                                                //disabled
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
                                                                //disabled
                                                                onChange={(e) => handleDateOfBirthChange(e)}
                                                                style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            /> Estimated
                                                        </label>
                                                    </div>
                                                </FormGroup>
                                            </div>

                                            <div className="form-group mb-3 col-md-3">
                                                <FormGroup>
                                                    <Label>Date</Label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        name="dob"
                                                        id="dob"
                                                        min="1940-01-01"
                                                        max={basicInfo.dateOfRegistration}
                                                        value={basicInfo.dob}
                                                        onChange={handleDobChange}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                   
                                                </FormGroup>
                                            </div>

                                            <div className="form-group mb-3 col-md-3">
                                                <FormGroup>
                                                    <Label>Age</Label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="age"
                                                        id="age"
                                                        value={basicInfo.age}
                                                        disabled={ageDisabled}
                                                        onChange={handleAgeChange}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    />
                                                </FormGroup>
                                            </div>
                                        </div>

                                        <div className={"row"}>
{/*                                            {watchShowAge >=0 &&
                                            <>*/}
                                                <div className="form-group mb-3 col-md-3">
                                                    <FormGroup>
                                                        <Label>Marital Status</Label>
                                                        <select
                                                            className="form-control"
                                                            name="maritalStatusId"
                                                            id="maritalStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.maritalStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            //disabled
                                                        >
                                                            <option value={""}>Select</option>
                                                            {maritalStatusOptions.map((maritalStatusOption, index) => (
                                                                <option key={maritalStatusOption.id} value={maritalStatusOption.id}>{maritalStatusOption.display}</option>
                                                            ))}
                                                        </select>
                                                        
                                                    </FormGroup>
                                                </div>

                                                <div className="form-group  col-md-4">
                                                    <FormGroup>
                                                        <Label>Employment Status *</Label>
                                                        <select
                                                            className="form-control"
                                                            name="employmentStatusId"
                                                            id="employmentStatusId"
                                                            onChange={handleInputChangeBasic}
                                                            value={basicInfo.employmentStatusId}
                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                            //disabled
                                                        >
                                                            <option value={""}>Select</option>
                                                            {occupationOptions.map((occupationOption, index) => (
                                                                <option key={occupationOption.id} value={occupationOption.id}>{occupationOption.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.employmentStatusId !=="" ? (
                                                        <span className={classes.error}>{errors.employmentStatusId}</span>
                                                        ) : "" }
                                                    </FormGroup>
                                                </div>

                                            <div className="form-group  col-md-4">
                                                <FormGroup>
                                                    <Label>Education Level *</Label>
                                                    <select
                                                        className="form-control"
                                                        name="educationId"
                                                        id="educationId"
                                                        onChange={handleInputChangeBasic}
                                                        value={basicInfo.educationId}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        //disabled
                                                    >
                                                        <option value={""}>Select</option>
                                                        {educationOptions.map((educationOption, index) => (
                                                            <option key={educationOption.id} value={educationOption.id}>{educationOption.display}</option>
                                                        ))}
                                                    </select>
                                                    {errors.educationId !=="" ? (
                                                    <span className={classes.error}>{errors.educationId}</span>
                                                    ) : "" }
                                                </FormGroup>
                                            </div>
                                            <div className="form-group mb-3 col-md-4">
                                                <FormGroup>
                                                    <Label for="ninNumber">National Identity Number (NIN)  </Label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="ninNumber"
                                                        id="ninNumber"
                                                        value={basicInfo.ninNumber}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88",borderRadius:"0.2rem"}}
                                                    />
                                                   
                                                </FormGroup>
                                            
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Contact Details</h5>
                                </div>

                                <div className="card-body">
                                    <div className={"row"}>
                                        <div className="form-group  col-md-4">
                                            <FormGroup>
                                                <Label>Phone Number *</Label>
                                                <PhoneInput
                                                    containerStyle={{width:'100%',border: "1px solid #014D88"}}
                                                    inputStyle={{width:'100%',borderRadius:'0px'}}
                                                    country={'ng'}
                                                    placeholder="(234)7099999999"
                                                    maxLength={5}
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    value={basicInfo.phoneNumber}
                                                    onChange={(e)=>{checkPhoneNumberBasic(e,'phoneNumber')}}
                                                    
                                                />
                                                {(errors.phoneNumber !=="" || errors.phoneNumber !==null) ? (
                                                    <span className={classes.error}>{errors.phoneNumber}</span>
                                                    ) : "" }
                                            </FormGroup>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <FormGroup>
                                                <Label>Alt. Phone Number</Label>
                                                <PhoneInput
                                                    containerStyle={{width:'100%',border: "1px solid #014D88"}}
                                                    inputStyle={{width:'100%',borderRadius:'0px'}}
                                                    country={'ng'}
                                                    placeholder="(234)7099999999"
                                                    value={basicInfo.altPhonenumber}
                                                    onChange={(e)=>{checkPhoneNumberBasic(e,'altPhonenumber')}}
                                                />

                                            </FormGroup>
                                        </div>

                                        <div className="form-group col-md-4">
                                            <FormGroup>
                                                <Label>Email</Label>
                                                <input
                                                    className="form-control"
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={handleInputChangeBasic}
                                                    value={basicInfo.email}
                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                />
                                               
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="form-group  col-md-4">
                                            <FormGroup>
                                                <Label>Country *</Label>
                                                <select
                                                    className="form-control"
                                                    type="text"
                                                    name="countryId"
                                                    id="countryId"
                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    value={basicInfo.countryId}
                                                    onChange={getStates}
                                                    >
                                                    <option value={""}>Select</option>
                                                    {countries.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.countryId !=="" ? (
                                                    <span className={classes.error}>{errors.countryId}</span>
                                                    ) : "" }
                                            </FormGroup>
                                        </div>

                                        <div className="form-group  col-md-4">
                                            <FormGroup>
                                                <Label>State *</Label>
                                                <select
                                                    className="form-control"
                                                    type="text"
                                                    name="stateId"
                                                    id="stateId"
                                                    value={basicInfo.stateId}
                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    onChange={getProvinces}
                                                    >
                                                    <option value="">Select</option>
                                                    {states.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.stateId !=="" ? (
                                                    <span className={classes.error}>{errors.stateId}</span>
                                                    ) : "" }
                                            </FormGroup>
                                        </div>

                                        <div className="form-group  col-md-4">
                                            <FormGroup>
                                                <Label>Province/District/LGA *</Label>
                                                <select
                                                    className="form-control"
                                                    type="text"
                                                    name="district"
                                                    id="district"
                                                    value={basicInfo.district}
                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    onChange={handleInputChangeBasic}
                                                    >
                                                    <option value="">Select</option>
                                                    {provinces.map((value, index) => (
                                                        <option key={index} value={value.id}>
                                                            {value.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.district !=="" ? (
                                                    <span className={classes.error}>{errors.district}</span>
                                                    ) : "" }
                                            </FormGroup>
                                        </div>
                                    </div>

                                    <div className={"row"}>
                                        <div className="form-group  col-md-4">
                                            <FormGroup>
                                                <Label>Street Address*</Label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={basicInfo.address}
                                                    onChange={handleInputChangeBasic}
                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                   
                                                />
                                               {errors.address !=="" ? (
                                                    <span className={classes.error}>{errors.address}</span>
                                                    ) : "" }
                                            </FormGroup>
                                        </div>

                                        <div className="form-group  col-md-4">
                                            <FormGroup>
                                                <Label>Landmark</Label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    name="landmark"
                                                    id="landmark"
                                                    value={basicInfo.landmark}
                                                    onChange={handleInputChangeBasic}
                                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                    
                                                />
                                                
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder',  borderRadius:"0.2rem"}}>
                                    <h5 className="card-title" style={{color:'#fff'}}>Relationship / Next Of Kin</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {
                                            contacts && contacts.length > 0 && (
                                                <div className="col-xl-12 col-lg-12">
                                                    <table style={{ width: '100%' }} className="mb-3">
                                                        <thead className="mb-3">
                                                        <tr>
                                                            <th>Relationship Type</th>
                                                            <th>Name</th>
                                                            <th>Phone</th>
                                                            <th>Address</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="mb-3">
                                                        {contacts.map((item, index) => {
                                                            return (
                                                                <tr key={item.index} className="mb-3">
                                                                    <td>{ 
                                                                        getRelationship(item.relationshipId) 
                                                                    }</td>
                                                                    <td>{ 
                                                                        item.firstName + " "  + item.middleName + " " + item.lastName
                                                                    }</td>
                                                                    <td>{ 
                                                                            item.phone
                                                                        }</td>
                                                                    <td>{ 
                                                                            item.address
                                                                    }</td>
                                                                    <td>
                                                                        <button type="button"
                                                                                className="btn btn-default btn-light btn-sm editRow"
                                                                                onClick={() => handleEditRelative(item, index)}
                                                                                >
                                                                            <FontAwesomeIcon icon="edit" />
                                                                        </button>
                                                                        &nbsp;&nbsp;
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-danger btn-sm removeRow"
                                                                            onClick={(e) => handleDeleteRelative(index)}
                                                                            >
                                                                            <FontAwesomeIcon icon="trash" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            )
                                        }
                                        <div className="col-xl-12 col-lg-12">
                                            {
                                                showRelative && (
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="form-group mb-3 col-md-3">
                                                                    <FormGroup>
                                                                        <Label for="relationshipType">Relationship Type *</Label>
                                                                        <select
                                                                            className="form-control"
                                                                            name="relationshipId"
                                                                            id="relationshipId"
                                                                            value={relatives.relationshipId}
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                            onChange={handleInputChangeRelatives}
                                                                            >
                                                                            <option value={""}>Select</option>
                                                                            {relationshipOptions.map((relative, index) => (
                                                                                <option key={relative.id} value={relative.id}>{relative.display}</option>
                                                                            ))}
                                                                        </select>
                                                                        {errors.relationshipId !=="" ? (
                                                                        <span className={classes.error}>{errors.relationshipId}</span>
                                                                        ) : "" }
                                                                    </FormGroup>
                                                                </div>

                                                                <div className="form-group mb-3 col-md-3">
                                                                    <FormGroup>
                                                                        <Label for="cfirstName">First Name *</Label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="firstName"
                                                                            value={relatives.firstName}
                                                                            id="firstName"
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                            onChange={handleInputChangeRelatives}
                                                                        />
                                                                       {errors.firstName !=="" ? (
                                                                        <span className={classes.error}>{errors.firstName}</span>
                                                                        ) : "" }
                                                                    </FormGroup>
                                                                </div>

                                                                <div className="form-group mb-3 col-md-3">
                                                                    <FormGroup>
                                                                        <Label>Middle Name</Label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="middleName"
                                                                            id="middleName"
                                                                            value={relatives.middleName}
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                            onChange={handleInputChangeRelatives}
                                                                        />
                                                                        {/* {errors.cmiddleName && <p>{errors.cmiddleName.message}</p>} */}
                                                                    </FormGroup>
                                                                </div>

                                                                <div className="form-group mb-3 col-md-3">
                                                                    <FormGroup>
                                                                        <Label>Last Name *</Label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="lastName"
                                                                            id="lastName"
                                                                            value={relatives.lastName}
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                            onChange={handleInputChangeRelatives}
                                                                        />
                                                                       {errors.lastName !=="" ? (
                                                                        <span className={classes.error}>{errors.lastName}</span>
                                                                        ) : "" }
                                                                    </FormGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="form-group mb-3 col-md-3">
                                                                    <FormGroup>
                                                                        <Label for="contactPhoneNumber">Phone Number</Label>
                                                                        <PhoneInput
                                                                            containerStyle={{width:'100%',border: "1px solid #014D88"}}
                                                                            inputStyle={{width:'100%',borderRadius:'0px'}}
                                                                            country={'ng'}
                                                                            placeholder="(234)7099999999"
                                                                            name="phone"
                                                                            value={relatives.phone}
                                                                            id="phone"
                                                                           
                                                                            onChange={(e)=>{checkPhoneNumber(e.slice(0, 10),'phone')}}
                                                                        />
                                                                    
                                                                    </FormGroup>
                                                                </div>

                                                                <div className="form-group mb-3 col-md-3">
                                                                    <FormGroup>
                                                                        <Label for="contactEmail">Email</Label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="email"
                                                                            id="email"
                                                                            value={relatives.email}
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                            onChange={handleInputChangeRelatives}
                                                                        />
                                                                        {/* {errors.contactEmail && <p>{errors.contactEmail.message}</p>} */}
                                                                    </FormGroup>
                                                                </div>

                                                                <div className="form-group mb-3 col-md-3">
                                                                    <FormGroup>
                                                                        <Label for="contactAddress">Address</Label>
                                                                        <input
                                                                            className="form-control"
                                                                            type="text"
                                                                            name="address"
                                                                            id="address"
                                                                            value={relatives.address}
                                                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                                            onChange={handleInputChangeRelatives}
                                                                        />
                                                                        {/* {errors.contactAddress && <p>{errors.contactAddress.message}</p>} */}
                                                                    </FormGroup>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-1">
                                                                    <MatButton
                                                                        type="button"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        className={classes.button}
                                                                        onClick={handleSaveRelationship}
                                                                    >
                                                                        Add
                                                                    </MatButton>
                                                                </div>

                                                                <div className="col-1">
                                                                    <MatButton
                                                                        type="button"
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        className={classes.button}
                                                                        onClick={handleCancelSaveRelationship}
                                                                    >
                                                                        Cancel
                                                                    </MatButton>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="row"></div>
                                        <MatButton
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<AddIcon />}
                                            onClick={handleAddRelative}
                                            style={{backgroundColor:'#014d88',fontWeight:"bolder"}}
                                        >
                                            Add a Relative/Next Of Kin
                                        </MatButton>
                                    {/* </div> */}
                                </div>
                            </div>
                            {/* Adding HIV ENROLLEMENT FORM HERE */}
                            <div className="card">
                                <div className="card-header" style={{backgroundColor:"#014d88",color:'#fff',fontWeight:'bolder', borderRadius:"0.2rem"}}>
                                    <h5 className="card-title"  style={{color:'#fff'}}>Prep  Enrollment</h5>
                                </div>

                                <div className="card-body">
                            <div className="row">
                            <h2>PrEP Registration </h2>
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label for="uniqueId">Unique Client's ID  * </Label>
                                <Input
                                    type="text"
                                    name="uniqueClientId"
                                    id="uniqueClientId"
                                    onChange={handleInputChange}
                                    value={objValues.uniqueClientId}
                                    required
                                />
                                {errors.uniqueClientId !=="" ? (
                                    <span className={classes.error}>{errors.uniqueClientId}</span>
                                ) : "" }
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label for="">Partner ANC/Unique ART No </Label>
                                <Input
                                    type="text"
                                    name="ancUnique"
                                    id="ancUnique"
                                    onChange={handleInputChange}
                                    value={objValues.ancUnique}
                                    required
                                />
                                {errors.ancUnique !=="" ? (
                                    <span className={classes.error}>{errors.ancUnique}</span>
                                ) : "" }
                                </FormGroup>
                            </div>
                            <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >Date enrolled in PrEP *</Label>
                                <Input
                                    className="form-control"
                                    type="date"
                                    name="dateEnrolled"
                                    id="dateEnrolled"
                                    value={objValues.dateEnrolled}
                                    onChange={handleInputChange}
                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                    //disabled={locationState.actionType==='update'? false : true}
                                />
                                    {errors.dateEnrolled !=="" ? (
                                        <span className={classes.error}>{errors.dateEnrolled}</span>
                                    ) : "" } 
                                </FormGroup>
                            </div>

                                <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label for="entryPointId">PrEP Risk Type*</Label>
                                <Input
                                    type="select"
                                    name="prepRiskType"
                                    id="prepRiskType"
                                    onChange={handleInputChange}
                                    value={objValues.prepRiskType}
                                    required
                                >
                                <option value=""> </option>
                    
                                {carePoints.map((value) => (
                                    <option key={value.id} value={value.code}>
                                        {value.display}
                                    </option>
                                ))}
                               
                                </Input>
                                 {errors.prepRiskType !=="" ? (
                                        <span className={classes.error}>{errors.prepRiskType}</span>
                                    ) : "" }
                                </FormGroup>
                                
                                </div>
                               
                                <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >HIV Testing Point </Label>
                                <Input
                                    type="select"
                                    name="hivTestingPoint"
                                    id="hivTestingPoint"
                                    onChange={handleInputChange}
                                    value={objValues.hivTestingPoint}
                                    required
                                >
                                <option value="Select"> </option>
                    
                                {hivStatus.map((value) => (
                                    <option key={value.id} value={value.code}>
                                        {value.display}
                                    </option>
                                ))}
                               
                                </Input>
                                {errors.hivTestingPoint !=="" ? (
                                        <span className={classes.error}>{errors.hivTestingPoint}</span>
                                    ) : "" }
                                </FormGroup>
                                </div>
                            
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >Date of last HIV Negative test*</Label>
                                    <Input
                                        className="form-control"
                                        type="date"
                                        name="dateOfLastHivNegativeTest"
                                        id="dateOfLastHivNegativeTest"
                                        value={objValues.dateOfLastHivNegativeTest}
                                        onChange={handleInputChange}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                    />
                                     {errors.dateOfLastHivNegativeTest !=="" ? (
                                        <span className={classes.error}>{errors.dateOfLastHivNegativeTest}</span>
                                    ) : "" }   
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >Date Referred for PrEP * </Label>
                                    <Input
                                        className="form-control"
                                        type="date"
                                        name="dateReferredForPrep"
                                        id="dateReferredForPrep"
                                        value={objValues.dateReferredForPrep}
                                        onChange={handleInputChange}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                    />
                                    {errors.dateReferredForPrep !=="" ? (
                                        <span className={classes.error}>{errors.dateReferredForPrep}</span>
                                    ) : "" }
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >PrEP Supporter </Label>
                                    <Input
                                        className="form-control"
                                        type="text"
                                        name="prepSupporter"
                                        id="prepSupporter"
                                        value={objValues.prepSupporter}
                                        onChange={handleInputChange}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                    />
                                    {errors.prepSupporter !=="" ? (
                                        <span className={classes.error}>{errors.prepSupporter}</span>
                                    ) : "" }
                                    </FormGroup>
                                </div>
                                

                            </div>
                            </div>
                            </div>
                            {/* END OF HIV ENROLLEMENT FORM */}
                            {saving ? <Spinner /> : ""}

                            <br />


                            <MatButton
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                                disabled={disabledAgeBaseOnAge}
                                onClick={handleSubmit}
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
                                onClick={handleCancel}
                                style={{backgroundColor:'#992E62'}}
                            >
                                <span style={{ textTransform: "capitalize", color:"#fff"  }}>Cancel</span>
                            </MatButton>
                        </Form>
                    </div>
                </CardContent>
            </Card>
            <Modal show={open} toggle={toggle} className="fade" size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered backdrop="static">
             <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
                Notification!
            </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <h4>Are you Sure of the Age entered?</h4>
                    
                </Modal.Body>
            <Modal.Footer>
                <Button onClick={toggle} style={{backgroundColor:"#014d88", color:"#fff"}}>Yes</Button>
            </Modal.Footer>
            </Modal>
        </>
    );
};

export default UserRegistration