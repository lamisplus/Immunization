import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import axios from "axios";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import { forwardRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {  Card,CardBody,} from 'reactstrap';
import Button from "@material-ui/core/Button";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-widgets/dist/css/react-widgets.css';
import { makeStyles } from '@material-ui/core/styles'
//import { useHistory } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import {FaSyringe, FaUserEdit, FaShare} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {Menu,MenuList,MenuButton,MenuItem,} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { Label } from 'semantic-ui-react'
import Vaccination from './../Vaccination/AddViccination'
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import moment from "moment";
import Transfer from './../Transfer/Transfer'
//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
    error: {
        color: "#f85032",
        fontSize: "11px",
    },
    success: {
        color: "#4BB543 ",
        fontSize: "11px",
    }, 
}))



const Patients = (props) => {
    
    const [patientList, setPatientList] = useState([])
    const [patientObj, setpatientObj] = useState([])
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [transferModal, setTransferModal] = useState(false);
    const Transfertoggle = () => setTransferModal(!transferModal);

    useEffect(() => {
        patients()
      }, []);
        ///GET LIST OF Patients
        async function patients() {
            axios
                .get(`${baseUrl}covid/patients`,
                { headers: {"Authorization" : `Bearer ${token}`} }
                )
                .then((response) => {
                    //console.log(response.data)
                    setPatientList(response.data.filter((x)=> x.current_status==="5"));
                })
                .catch((error) => {    
                });        
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
                return age_now + " year(s)";
        };

    const loadVaccinationModal =(row)=> {
        setpatientObj({...patientObj, ...row});
            setModal(!modal)
    }
    const loadTransferModal =(row)=> {
        setpatientObj({...patientObj, ...row});
            setTransferModal(!transferModal)
    }
    const VaccinationStatusIcon = (patient)=>{
        //patient.first_name + " "  + patient. last_name,
        if(patient.vaccination_status===""){
            return (<><Icon name='dot circle outline' color="yellow"/>{ patient.first_name + " "  + patient. last_name}</> )
        }else if(patient.vaccination_status==="1"){
            return (<><Icon name='dot circle outline' color="blue"/>{ patient.first_name + " "  + patient. last_name}</> )
        }else if(patient.vaccination_status==="2"){
            return (<><Icon name='dot circle outline' color="green"/>{ patient.first_name + " "  + patient. last_name}</> )
        }else {
            return (<><Icon name='dot circle outline' color="red"/>{ patient.first_name + " "  + patient. last_name}</> )
        }
    }
    const VaccinationStatus = (patient)=>{
        //console.log(patient)
        if(patient.vaccination_status===null){
            return (<><Label color="yellow" size="mini">Not Vaccinated</Label></> )
        }else if(patient.vaccination_status==="1"){
            return (<><Label color="teal" size="mini">Parlly Vaccinated</Label></> )
        }else if(patient.vaccination_status==="2"){
            return (<><Label color="green" size="mini">Fully Vaccinated</Label></> )
        }else {
            return ""
        }
    }
    const CurrentStatus = (currentStatus)=>{
        if(currentStatus==="4"){
            return (<Label color="blue" size="mini">admitted</Label>);
        }else if(currentStatus==="5"){
            return (<Label color="olive" size="mini">ICU</Label>);
        }else if(currentStatus==="6"){
            return (<Label color="teal" size="mini">Discharge</Label>);
        }else if(currentStatus==="7"){
            return (<Label color="red" size="mini">Dead</Label>);
        }else {
            return   (<Label color="green" size="mini">Active</Label>);
        }

    }


  return (
    <div>
       <Card>
         <CardBody>

         <Link to={"register-patient"} >
            <Button
                variant="contained"
                color="primary"
                className=" float-end ms-2"
                startIcon={<FaUserPlus size="10"/>}

            >
                <span style={{ textTransform: "capitalize" }}>New Patient</span>
            </Button>
            </Link>        
        <br/><br/>
       
            <MaterialTable
            icons={tableIcons}
              title="Find ICU Patient "
              columns={[
              // { title: " ID", field: "Id" },
                {
                  title: "Patient Name",
                  field: "name",
                },
                { title: "Hospital Number", field: "hospital_number", filtering: false },
                { title: "Address", field: "address", filtering: false },
                { title: "Phone Number", field: "phone_number", filtering: false },
               
                { title: "Age", field: "age", filtering: false },
                { title: "Vaccination Status", field: "v_status", filtering: false },
                { title: "Status", field: "status", filtering: false },        
                { title: "Actions", field: "actions", filtering: false }, 
              ]}
              data={ patientList.map((row) => ({
                  //Id: manager.id,
                    name: VaccinationStatusIcon(row),
                    hospital_number: row.participant_id,
                    address: row.address,
                    phone_number:  row.phone,
                   
                    age: (row.dob === 0 ||
                        row.dob === undefined ||
                        row.dob === null ||
                        row.dob === "" )
                          ? 0
                          : calculate_age(moment(row.dob).format("DD-MM-YYYY")),
                    v_status:  VaccinationStatus(row),
                    status: CurrentStatus(row.current_status) 
                            ,
                    actions:
            
                    <div>
                    <Menu>
                        <MenuButton style={{ backgroundColor:"#3F51B5", color:"#fff", border:"2px solid #3F51B5", borderRadius:"4px", }}>
                          Actions <span aria-hidden>▾</span>
                        </MenuButton>
                            <MenuList style={{ color:"#000000 !important"}} >
                                <MenuItem  style={{ color:"#000 !important"}}>                      
                                    <Link
                                        to={{pathname: "/patient-dashboard", state: { patientObj: row  }}}>
                                        <MdDashboard size="15" color="black" />{" "}<span style={{color: '#000'}}>Patient Dashboard</span>
                                  </Link>                               
                                  </MenuItem>
                                  <MenuItem style={{ color:"#000 !important"}}>
                                        <Link
                                            to={{
                                              pathname: "/edit-patient",
                                              state: { patientObj: row  }
                                            }}>
                                        <FaUserEdit size="15" color="black" />{" "}<span style={{color: '#000'}}>Edit Patient</span>                   
                                      </Link>
                                  </MenuItem>                                      
                                  <MenuItem style={{ color:"#000 !important"}}  onClick={() => loadTransferModal(row)}>
                                     
                                        <FaShare size="15"  />{" "}
                                        <span style={{color: '#000'}}>Transfer</span>
                                                                    
                                  </MenuItem>
                                  <MenuItem style={{ color:"#000 !important"}} onClick={() => loadVaccinationModal(row)}>
                                     
                                        <FaSyringe size="15"  />{" "}
                                        <span style={{color: '#000'}}>Vaccination</span>
                                                                   
                                  </MenuItem>
                                  
                          </MenuList>
                    </Menu>
                  </div>
                  
                  }))}
            
                        options={{
                          headerStyle: {
                              //backgroundColor: "#9F9FA5",
                              color: "#000",
                          },
                          searchFieldStyle: {
                              width : '200%',
                              margingLeft: '250px',
                          },
                          filtering: false,
                          exportButton: false,
                          searchFieldAlignment: 'left',
                          pageSizeOptions:[10,20,100],
                          pageSize:10,
                          debounceInterval: 400
                      }}
            />
    
        </CardBody>
       </Card>
      <Vaccination toggle={toggle} showModal={modal} patientObj={patientObj} loadVaccinationaModal={loadVaccinationModal}/>
      <Transfer  toggle={Transfertoggle} showModal={transferModal} patientObj={patientObj} />
    </div>
  );
}

export default Patients;


