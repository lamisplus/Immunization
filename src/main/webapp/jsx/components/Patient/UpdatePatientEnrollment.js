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
        maxWidth: 752,
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
    console.log(props)
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
     const [objValues, setObjValues] = useState({id:"", uniqueId: "",dateOfRegistration:"",entryPointId:"", facilityName:"",statusAtRegistrationId:"",dateConfirmedHiv:"",sourceOfReferrerId:"",enrollmentSettingId:"",pregnancyStatusId:"",dateOfLpm:"",tbStatusId:"",targetGroupId:"",ovc_enrolled:"",ovcNumber:"",
     householdNumber:"", referredToOVCPartner:"", dateReferredToOVCPartner:"",
     referredFromOVCPartner:"", dateReferredFromOVCPartner:"",
     careEntryPointOther:""});
     const [carePoints, setCarePoints] = useState([]);
     const [sourceReferral, setSourceReferral] = useState([]);
     const [hivStatus, setHivStatus] = useState([]);
     const [enrollSetting, setEnrollSetting] = useState([]);
     const [tbStatus, setTbStatus] = useState([]);
     const [kP, setKP] = useState([]);
     const [pregnancyStatus, setPregnancyStatus] = useState([]);
     //set ro show the facility name field if is transfer in 
     const [transferIn, setTransferIn] = useState(false);
     // display the OVC number if patient is enrolled into OVC 
     const [ovcEnrolled, setOvcEnrolled] = useState(false);
     //Input fields to hidden base on some conditions
     const [hideTargetGroup, setHideTargetGroup]= useState("false");
    
    const locationState = location.state;
    let patientId = null;
    let patientObj = {};
    patientId = locationState ? locationState.patientId : null;
    patientObj = locationState ? locationState.patientObj : {}; 
    //status for hospital Number 
    const [hospitalNumStatus, setHospitalNumStatus]= useState(false);
    const [hospitalNumStatus2, setHospitalNumStatus2]= useState(false);
    
    useEffect(() => { 
        loadGenders();
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
            const contacts = patientObj.contact ? patientObj.contact : [];
            //setContacts(contacts.contact);
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
            const hospitalNumber = identifiers.identifier.find(obj => obj.type == 'HospitalNumber');
            const phone = contactPoint.contactPoint.find(obj => obj.type == 'phone');
            const email = contactPoint.contactPoint.find(obj => obj.type == 'email');
            const altphone = contactPoint.contactPoint.find(obj => obj.type == 'altphone');
            const country = address && address.address && address.address.length > 0 ? address.address[0] : null;
            //setValue('dob', format(new Date(patientObj.dateOfBirth), 'yyyy-MM-dd'));
            basicInfo.dob=patientObj.dateOfBirth
            basicInfo.firstName=patientObj.firstName
            basicInfo.dateOfRegistration=patientObj.dateOfRegistration
            basicInfo.middleName=patientObj.otherName
            basicInfo.lastName=patientObj.surname
            basicInfo.hospitalNumber=hospitalNumber ? hospitalNumber.value : ''
            basicInfo.maritalStatusId=patientObj.maritalStatus.id
            basicInfo.employmentStatusId=patientObj.employmentStatus.id
            basicInfo.genderId=patientObj.gender ? patientObj.gender.id : null
            basicInfo.sexId=patientObj.sex 
            basicInfo.educationId=patientObj.education.id
            basicInfo.phoneNumber=phone && phone.value ? phone.value : ""
            basicInfo.altPhonenumber= altphone && altphone.value ? altphone.value : ""
            basicInfo.email=email && email.value ? email.value : ""
            basicInfo.address=country && country.city ? country.city : ""
            basicInfo.landmark=country.line[0]
            basicInfo.countryId=country.countryId
            setStateByCountryId(country.countryId); 
            getProvincesId(country.stateId)
            basicInfo.stateId=country.stateId
            basicInfo.district=country.district
            setObjValues(patientObj.enrollment)
            const patientAge=calculate_age(moment(patientObj.dateOfBirth).format("DD-MM-YYYY"))
            basicInfo.age=patientAge
            setfemaleStatus(patientObj.sex==='Female'? true : false)
            basicInfo.ninNumber=patientObj.ninNumber

        }
        if(basicInfo.dateOfRegistration < basicInfo.dob){
            alert('Date of registration can not be earlier than date of birth')
        }
        
    }, [patientObj, patientId, basicInfo.dateOfRegistration]);

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
    
     //fetch province
     const getProvinces = e => {
            const stateId = e.target.value;
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
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age_now--;
            }
            basicInfo.age=age_now
            //setBasicInfo({...basicInfo, age: age_now});        
        } else {
            setBasicInfo({...basicInfo, age:  ""});
        }
        setBasicInfo({...basicInfo, dob: e.target.value});
        
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
            
            const currentDate = new Date();
            currentDate.setDate(15);
            currentDate.setMonth(5);
            const estDob = moment(currentDate.toISOString());
            const dobNew = estDob.add((e.target.value * -1), 'years');
            //setBasicInfo({...basicInfo, dob: moment(dobNew).format("YYYY-MM-DD")});
            basicInfo.dob =moment(dobNew).format("YYYY-MM-DD")

        }
        setBasicInfo({...basicInfo, age: e.target.value});
    }
    //End of Date of Birth and Age handling 
    //Handle Input Change for Basic Infor
    const handleInputChangeBasic = e => {        
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
        if(e.target.name==='hospitalNumber' && e.target.value!==''){
            async function getCharacters() {
                const hosiptalNumber=e.target.value
                const response = await axios.post(`${baseUrl}patient/exist/hospital-number`, hosiptalNumber,
                        { headers: {"Authorization" : `Bearer ${token}`, 'Content-Type': 'text/plain'} }
                    );
                if(response.data!==true){
                    setHospitalNumStatus(false)
                    setObjValues ({...objValues,  uniqueId: e.target.value});
                    setHospitalNumStatus2(true)
                }else{
                    setHospitalNumStatus(false)
                    setHospitalNumStatus2(true)
                }
            }
            getCharacters();
            }  
             
    } 
    //Function to show relatives 
    const handleAddRelative = () => {
        setShowRelative(true);
    };
    //Function to cancel the relatives form
    const handleCancelSaveRelationship = () => {
        setShowRelative(false);
    }
    const handleCancel =()=>{
        history.push({ pathname: '/' });
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
            temp.targetGroupId = objValues.targetGroupId ? "" : "Target group is required."
            temp.dateConfirmedHiv = objValues.dateConfirmedHiv ? "" : "date confirm HIV is required."
            temp.sourceOfReferrerId = objValues.sourceOfReferrerId ? "" : "Source of referrer is required."
            temp.enrollmentSettingId = objValues.enrollmentSettingId ? "" : "Enrollment Setting Number  is required."
            temp.tbStatusId = objValues.tbStatusId ? "" : "TB status is required."    
            temp.statusAtRegistrationId = objValues.statusAtRegistrationId ? "" : "Status at Registration is required."  
            temp.entryPointId = objValues.entryPointId ? "" : "Care Entry Point is required." 
            temp.dateOfRegistration = objValues.dateOfRegistration ? "" : "Date of Registration is required."  
            temp.uniqueId = objValues.uniqueId ? "" : "Unique ID is required."
            
                setErrors({ ...temp })
        return Object.values(temp).every(x => x == "")
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const getSexId=  genders.find((x)=> x.display===basicInfo.sexId)//get patient sex ID by filtering the request
        basicInfo.sexId=getSexId.id
         if(validate()){
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
            try {
                const patientForm = {
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
                    genderId: basicInfo.genderId,
                    sexId:basicInfo.sexId,
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
                    ninNumber: basicInfo.ninNumber
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
                patientDTO.person=patientForm;
                patientDTO.hivEnrollment=objValues;
                const response = await axios.put(`${baseUrl}hiv/patient/${patientObj.id}`, patientDTO, { headers: {"Authorization" : `Bearer ${token}`} });
                toast.success("Patient Updated successful");
                history.push('/');
            } catch (error) {                
                if(error.response && error.response.data){
                    let errorMessage = error.response.data && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage); 
                }
            }
        }

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
        setObjValues ({...objValues,  [e.target.name]: e.target.value});
        if(e.target.name ==="entryPointId" ){
            if(e.target.value==="21"){
                setTransferIn(true)
            }else{
                setTransferIn(false)
            }
        }
        if(e.target.name ==="pregnancyStatusId" ){
            console.log(e.target.value)
            if(e.target.value==="72"){
                setTransferIn(true)
            }else{
                setTransferIn(false)
            }
        }                  
    }    
    
    const checkPhoneNumber=(e, inputName)=>{
        const limit = 10;
            setRelatives({...relatives,  [inputName]: e.slice(0, limit)});     
    }
    const checkPhoneNumberBasic=(e, inputName)=>{
        const limit = 10;

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


    return (
        <>
            <ToastContainer autoClose={3000} hideProgressBar />
            <Card className={classes.cardBottom}>
                <CardContent>
                <Link
                    to={{
                        pathname: "/patient-history",
                        state: { patientObj: patientObj  }
                    }}
                >
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
                                    <h5 className="card-title" style={{color:'#fff'}}>Edit User Information</h5>
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
                                                        id="dateOfRegistration"
                                                        value={basicInfo.dateOfRegistration}
                                                        onChange={handleInputChangeBasic}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        //disabled={locationState.actionType==='update'? false : true}
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
                                                        disabled={locationState.actionType==='update'? false : true}
                                                    />
                                                   {errors.hospitalNumber !=="" ? (
                                                    <span className={classes.error}>{errors.hospitalNumber}</span>
                                                    ) : "" }
                                                    {errors.hospitalNumber !=="" ? (
                                                    <span className={classes.error}>{errors.hospitalNumber}</span>
                                                    ) : "" }
                                                    {hospitalNumStatus===true ? (
                                                        <span className={classes.error}>{"Hospital number already exist"}</span>
                                                    ) : "" }
                                                    {hospitalNumStatus2===true ? (
                                                        <span className={classes.success}>{"Hospital number is OK."}</span>
                                                    ) :""}
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
                                                        value={Math.floor(Math.random() * 1094328)}
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
                                                        //disabled={locationState.actionType==='update'? false : true}
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
                                                        //disabled={locationState.actionType==='update'? false : true}
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
                                                        //disabled={locationState.actionType==='update'? false : true}
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
                                                            //disabled={locationState.actionType==='update'? false : true}
                                                            
                                                        >
                                                            <option value={""}>Select</option>
                                                            {genders.map((gender, index) => (
                                                            <option key={gender.id} value={gender.display}>{gender.display}</option>
                                                            ))}
                                                        </select>
                                                        {errors.sexId !=="" ? (
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
                                                                //disabled={locationState.actionType==='update'? false : true}
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
                                                                //disabled={locationState.actionType==='update'? false : true}
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
                                                        max={today}
                                                        value={basicInfo.dob}
                                                        onChange={handleDobChange}
                                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                                        //disabled={locationState.actionType==='update'? false : true}
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
                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                        //disabled={locationState.actionType==='update'? false : true}
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
                                                    <Label for="patientId">National Identity Number (NIN)  </Label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="nin"
                                                        id="nin"
                                                        value={basicInfo.ninNumber}
                                                        //onChange={handleInputChangeBasic}
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
                                                    //disabled={locationState.actionType==='update'? false : true}
                                                    
                                                />
                                                {errors.phoneNumber !=="" ? (
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
                                                    //disabled={locationState.actionType==='update'? false : true}
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
                                                    //disabled={locationState.actionType==='update'? false : true}
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
                                                    //disabled={locationState.actionType==='update'? false : true}
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
                                                    //disabled={locationState.actionType==='update'? false : true}
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
                                                    //disabled={locationState.actionType==='update'? false : true}
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
                                                    //disabled={locationState.actionType==='update'? false : true}
                                                   
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
                                                    //disabled={locationState.actionType==='update'? false : true}
                                                    
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
                                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                                                            //disabled={locationState.actionType==='update'? false : true}
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
                                    <h5 className="card-title"  style={{color:'#fff'}}>HIV Enrollment</h5>
                                </div>

                                <div className="card-body">
                                <div className="row">
                                
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label for="uniqueId">Unique ID No  * </Label>
                                    <Input
                                        type="text"
                                        name="uniqueId"
                                        id="uniqueId"
                                        onChange={handleInputChange}
                                        value={objValues.uniqueId}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        disabled
                                        
                                    />
                                    {errors.uniqueId !=="" ? (
                                    <span className={classes.error}>{errors.uniqueId}</span>
                                    ) : "" }
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label for="dateOfRegistration">Date of Enrollment * </Label>
                                    <Input
                                        type="date"
                                        name="dateOfRegistration"
                                        id="dateOfRegistration"
                                        min={basicInfo.dateOfRegistration}
                                        max= {moment(new Date()).format("YYYY-MM-DD") }
                                        onChange={handleInputChange}
                                        value={objValues.dateOfRegistration}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                        
                                    />
                                    {errors.dateOfRegistration !=="" ? (
                                    <span className={classes.error}>{errors.dateOfRegistration}</span>
                                    ) : "" }
                                    </FormGroup>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label for="entryPointId">Care Entry Point * </Label>
                                <Input
                                    type="select"
                                    name="entryPointId"
                                    id="entryPointId"
                                    onChange={handleInputChange}
                                    value={objValues.entryPointId}
                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                    //disabled={locationState.actionType==='update'? false : true}
                                    
                                >
                                <option value=""> </option>                  
                                {carePoints.map((value) => (
                                    <option key={value.id} value={value.id}>
                                        {value.display}
                                    </option>
                                ))}
                                </Input>
                                {errors.entryPointId !=="" ? (
                                    <span className={classes.error}>{errors.entryPointId}</span>
                                    ) : "" }
                                </FormGroup>
                                
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                {transferIn===true ? 
                                    (
                                        <FormGroup>
                                        <Label >Facility Name</Label>
                                        <Input
                                            type="text"
                                            name="facilityName"
                                            id="facilityName"
                                            onChange={handleInputChange}
                                            value={objValues.facilityName}  
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            //disabled={locationState.actionType==='update'? false : true}
                                        />
                                        </FormGroup>
                                    ):""}
                                </div>
                                
                                <div className="form-group mb-3 col-md-6">
                                <FormGroup>
                                <Label >HIV Status at Registration *</Label>
                                <Input
                                    type="select"
                                    name="statusAtRegistrationId"
                                    id="statusAtRegistrationId"
                                    onChange={handleInputChange}
                                    value={objValues.statusAtRegistrationId}
                                    style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                    //disabled={locationState.actionType==='update'? false : true}
                                    
                                >
                                <option value=""> Select</option>                  
                                {hivStatus.map((value) => (
                                    <option key={value.id} value={value.id}>
                                        {value.display}
                                    </option>
                                ))}
                                </Input>
                                {errors.statusAtRegistrationId !=="" ? (
                                    <span className={classes.error}>{errors.statusAtRegistrationId}</span>
                                    ) : "" }
                                </FormGroup>
                                </div>

                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >Date of Confirmed HIV Test *</Label>
                                    <Input
                                        type="date"
                                        name="dateConfirmedHiv"
                                        id="dateConfirmedHiv"
                                        min={basicInfo.dob}
                                        max={objValues.dateOfRegistration}
                                        onChange={handleInputChange}
                                        value={objValues.dateConfirmedHiv}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                        
                                    /> 
                                    {errors.dateConfirmedHiv !=="" ? (
                                        <span className={classes.error}>{errors.dateConfirmedHiv}</span>
                                        ) : "" } 
                                    </FormGroup>
                                </div>
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >Source of Referral *</Label>
                                    <Input
                                        type="select"
                                        name="sourceOfReferrerId"
                                        id="sourceOfReferrerId"
                                        value={objValues.sourceOfReferrerId}
                                        onChange={handleInputChange}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                        
                                    >
                                        <option value="">Select </option>                 
                                            {sourceReferral.map((value) => (
                                                <option key={value.id} value={value.id}>
                                                    {value.display}
                                                </option>
                                            ))}
                                    </Input>
                                    {errors.sourceOfReferrerId !=="" ? (
                                        <span className={classes.error}>{errors.sourceOfReferrerId}</span>
                                        ) : "" }
                                    </FormGroup>
                                </div>
                                
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >Enrollment Setting *</Label>
                                    <Input
                                        type="select"
                                        name="enrollmentSettingId"
                                        id="enrollmentSettingId"
                                        value={objValues.enrollmentSettingId}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        onChange={handleInputChange}
                                        //disabled={locationState.actionType==='update'? false : true}
                                        >
                                        <option value=""> Select</option>

                                            {enrollSetting.map((value) => (
                                                <option key={value.id} value={value.id}>
                                                    {value.display}
                                                </option>
                                            ))}
                                    </Input>
                                    {errors.enrollmentSettingId !=="" ? (
                                        <span className={classes.error}>{errors.enrollmentSettingId}</span>
                                        ) : "" }
                                    </FormGroup>
                                </div>
                                {(femaleStatus && basicInfo.age > 9) && (
                                    <>
                                   
                                    <div className = "form-group mb-3 col-md-6" >
                                        <FormGroup>
                                        <Label> Pregnancy </Label>
                                        <Input
                                            type = "select"
                                            name = "pregnancyStatusId"
                                            id = "pregnancyStatusId"
                                            value = {objValues.pregnancyStatusId}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            onChange = {handleInputChange}  
                                            //disabled={locationState.actionType==='update'? false : true}                                      
                                        >
                                        < option value = "" >Select </option>
                                        {pregnancyStatus.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                        </Input>                                                                        
                                    </FormGroup>  
                                    </div>
                                    {objValues.pregnancyStatusId!=='72' && (
                                    <>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Date of LMP </Label>                                    
                                        <Input
                                            type="date"
                                            name="dateOfLpm"
                                            id="dateOfLpm"
                                            max={today}
                                            onChange={handleInputChange}
                                            value={objValues.dateOfLpm}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            //disabled={locationState.actionType==='update'? false : true}
                                        />  
                                            
                                        </FormGroup>
                                    </div>
                                    </>
                                    )}
                                    </>
                                )}
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >TB Status * </Label>
                                    <Input
                                        type="select"
                                        name="tbStatusId"
                                        id="tbStatusId"
                                        value={objValues.tbStatusId}
                                        onChange={handleInputChange}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                        >
                                        <option value=""> Select</option>
                                            {tbStatus.map((value) => (
                                                <option key={value.id} value={value.id}>
                                                    {value.display}
                                                </option>
                                            ))}

                                    </Input>
                                    {errors.tbStatusId !=="" ? (
                                        <span className={classes.error}>{errors.tbStatusId}</span>
                                        ) : "" }
                                    </FormGroup>
                                </div>
                                {hideTargetGroup==="false" ? (
                                <div className="form-group mb-3 col-md-6">
                                    <FormGroup>
                                    <Label >Target Group *</Label>
                                    <Input
                                        type="select"
                                        name="targetGroupId"
                                        id="targetGroupId"
                                        value={objValues.targetGroupId}
                                        onChange={handleInputChange}
                                        style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                        //disabled={locationState.actionType==='update'? false : true}
                                        >
                                        <option value=""> Select</option>                    
                                                {kP.map((value) => (
                                                    <option key={value.id} value={value.id}>
                                                        {value.display}
                                                    </option>
                                                ))}
                                    </Input>
                                    {errors.targetGroupId !=="" ? (
                                        <span className={classes.error}>{errors.targetGroupId}</span>
                                        ) : "" }
                                    </FormGroup>
                                </div>
                                ) : ""}
                                <div className="form-group mb-3 col-md-3">
                                    
                                    <div className="form-check custom-checkbox ml-1 ">
                                        <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="ovc_enrolled"
                                        id="ovc_enrolled"                                        
                                        onChange={handleCheckBox}
                                        //disabled={locationState.actionType==='update'? false : true}
                                        />
                                        <label
                                        className="form-check-label"
                                        htmlFor="basic_checkbox_1"
                                        >
                                        Enrolled into OVC?
                                        </label>
                                    </div>
                                </div>
                                {basicInfo.age <=14 && (
                                <div className="form-group mb-3 col-md-3">
                                    
                                    <div className="form-check custom-checkbox ml-1 ">
                                        <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="ovc_enrolled"
                                        id="ovc_enrolled"                                        
                                        onChange={handleCheckBox}
                                        />
                                        <label
                                        className="form-check-label"
                                        htmlFor="basic_checkbox_1"
                                        >
                                        Enrolled into OVC?
                                        </label>
                                    </div>
                                </div>
                                )}
                                {/* <div className="form-group mb-3 col-md-3">
                                    {ovcEnrolled===true ? 
                                        (
                                        <FormGroup>
                                        <Label >OVC Number</Label>
                                        <Input
                                            type="text"
                                            name="ovcNumber"
                                            id="ovcNumber"
                                            required={ovcEnrolled}
                                            onChange={handleInputChange}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            value={objValues.ovcNumber}
                                            
                                        />
                                        </FormGroup>
                                        )
                                        :
                                        ""
                                    }
                                </div> */}
                                
                                {ovcEnrolled===true && 
                                (
                                <>        
                                <div className="row">
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Household Unique Number</Label>
                                        <Input
                                            type="text"
                                            name="householdNumber"
                                            id="householdNumber"
                                            required={ovcEnrolled}
                                            onChange={handleInputChange}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            value={objValues.householdNumber}
                                            
                                        />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6"></div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Referred To OVC Partner</Label>
                                        <Input
                                            type="text"
                                            name="referredToOVCPartner"
                                            id="referredToOVCPartner"
                                            required={ovcEnrolled}
                                            onChange={handleInputChange}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            value={objValues.referredToOVCPartner}
                                            
                                        />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Date Referred To OVC Partner</Label>
                                        <Input
                                            type="date"
                                            name="dateReferredToOVCPartner"
                                            id="dateReferredToOVCPartner"
                                            min={basicInfo.dob}
                                            max={objValues.dateOfRegistration }
                                            onChange={handleInputChange}
                                            value={objValues.dateReferredToOVCPartner}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            
                                        /> 
                                        {/* {errors.dateConfirmedHiv !=="" ? (
                                            <span className={classes.error}>{errors.dateConfirmedHiv}</span>
                                            ) : "" }  */}
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Referred From OVC Partner</Label>
                                        <Input
                                            type="text"
                                            name="referredFromOVCPartner"
                                            id="referredFromOVCPartner"
                                            required={ovcEnrolled}
                                            onChange={handleInputChange}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            value={objValues.referredFromOVCPartner}
                                            
                                        />
                                        </FormGroup>
                                    </div>
                                    <div className="form-group mb-3 col-md-6">
                                        <FormGroup>
                                        <Label >Date Referred From OVC Partner</Label>
                                        <Input
                                            type="date"
                                            name="dateReferredFromOVCPartner"
                                            id="dateReferredFromOVCPartner"
                                            min={basicInfo.dob}
                                            max={objValues.dateOfRegistration }
                                            onChange={handleInputChange}
                                            value={objValues.dateReferredFromOVCPartner}
                                            style={{border: "1px solid #014D88", borderRadius:"0.2rem"}}
                                            
                                        /> 
                                        {/* {errors.dateConfirmedHiv !=="" ? (
                                            <span className={classes.error}>{errors.dateConfirmedHiv}</span>
                                            ) : "" }  */}
                                        </FormGroup>
                                    </div>
                                </div>
                                </>
                                )}
                            
                            </div>
                                </div>
                            </div>
                            {/* END OF HIV ENROLLEMENT FORM */}
                            {saving ? <Spinner /> : ""}

                            <br />

                            {locationState.actionType ==='update' ?
                            (
                                <>
                                    <MatButton
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        onClick={handleSubmit}
                                        style={{backgroundColor:'#014d88',fontWeight:"bolder"}}
                                    >
                                        {!saving ? (
                                            <span style={{ textTransform: "capitalize" }}>Update</span>
                                        ) : (
                                            <span style={{ textTransform: "capitalize" }}>Updating...</span>
                                        )}
                                    </MatButton>
            
                                    <MatButton
                                        variant="contained"
                                        className={classes.button}
                                        startIcon={<CancelIcon />}
                                        onClick={handleCancel}
                                        style={{backgroundColor:'#992E62'}}
                                    >
                                        <span style={{ textTransform: "capitalize", color:"#fff" }}>Cancel</span>
                                    </MatButton>
                            </>
                            ):""}
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default UserRegistration