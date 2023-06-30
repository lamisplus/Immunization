import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table';
import axios from "axios";
import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import { forwardRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import "react-widgets/dist/css/react-widgets.css";
import { toast} from "react-toastify";

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
import 'react-toastify/dist/ReactToastify.css';
import 'react-widgets/dist/css/react-widgets.css';
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from "react-router-dom";
import "@reach/menu-button/styles.css";

import { Dropdown,Button, Menu, Icon } from 'semantic-ui-react'


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



const PatientnHistory = (props) => {
    const [recentActivities, setRecentActivities] = useState([])
    const [loading, setLoading] = useState(true)
    let history = useHistory();
    let patientHistoryObject = []
    useEffect(() => {
        PatientHistory()
      }, [props.patientObj.id]);
        ///GET LIST OF Patients
        const PatientHistory =()=>{
            setLoading(true)
            axios
               .get(`${baseUrl}prep/activities/patients/${props.patientObj.personId}?full=true`,
                   { headers: {"Authorization" : `Bearer ${token}`} }
               )
               .then((response) => {
                setLoading(false)                       
                    setRecentActivities(response.data[0].activities)
                })

               .catch((error) => {
               //console.log(error);
               });
           
          }
    
    const LoadViewPage =(row,action)=>{
        
        if(row.path==='prep-eligibility'){        
            props.setActiveContent({...props.activeContent, route:'prep-screening', id:row.id, actionType:action})

        }else if(row.path==='prep-enrollment'){
            props.setActiveContent({...props.activeContent, route:'prep-registration', id:row.id, actionType:action})

        }else if(row.path==='prep-clinic'){//prep-commencement 
            props.setActiveContent({...props.activeContent, route:'consultation', id:row.id, actionType:action})

        }else if(row.path==='prep-commencement'){
            props.setActiveContent({...props.activeContent, route:'prep-commencement', id:row.id, actionType:action})

        }else{

        }
        
    }
    const LoadDeletePage =(row)=>{
        
        if(row.path==='Mental-health'){        
            //props.setActiveContent({...props.activeContent, route:'mental-health-view', id:row.id})
            axios
            .delete(`${baseUrl}observation/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            });  
        }else if(row.path==='Art-commence'){
            //props.setActiveContent({...props.activeContent, route:'art-commencement-view', id:row.id})
            axios
            .delete(`${baseUrl}hiv/art/commencement/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            });

        }else if(row.path==='Clinical-evaluation'){
            //props.setActiveContent({...props.activeContent, route:'adult-clinic-eveluation-view', id:row.id})
            axios
            .delete(`${baseUrl}observation/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            });

        }else if(row.path==='eac1'){
            //props.setActiveContent({...props.activeContent, route:'first-eac-history', id:row.id})
            axios
            .delete(`${baseUrl}observation/eac/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            });  
        }
        else if(row.path==='eac2'){
            //props.setActiveContent({...props.activeContent, route:'second-eac-history', id:row.id})
            axios
            .delete(`${baseUrl}observation/eac/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            });  
        }
        else if(row.path==='eac3'){
            //props.setActiveContent({...props.activeContent, route:'completed-eac-history', id:row.id})
            axios
            .delete(`${baseUrl}observation/eac/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            });  
        }else if(row.path==='hiv-enrollment'){
            axios
            .delete(`${baseUrl}hiv/enrollment/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            });  
            //props.setActiveContent({...props.activeContent, route:'mental-health-history', id:row.id})
        }else if(row.path==='pharmacy'){
            //props.setActiveContent({...props.activeContent, route:'mental-health-history', id:row.id})
            //props.setActiveContent({...props.activeContent, route:'pharmacy', id:row.id, activeTab:"home", actionType:"update", obj:row})
            axios
            .delete(`${baseUrl}art/pharmacy/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            }); 

        }else if(row.path==='clinic-visit'){
            //props.setActiveContent({...props.activeContent, route:'mental-health-history', id:row.id})
            axios
            .delete(`${baseUrl}hiv/art/clinic-visit/${row.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                toast.success("Record Deleted Successfully");
                PatientHistory()
            })
            .catch((error) => {
                if(error.response && error.response.data){
                    let errorMessage = error.response.data.apierror && error.response.data.apierror.message!=="" ? error.response.data.apierror.message :  "Something went wrong, please try again";
                    toast.error(errorMessage);
                  }
                  else{
                    toast.error("Something went wrong. Please try again...");
                  }
            }); 
        }else{

        }
        
    }


  return (
    <div>
        
    <br/>
       
            <MaterialTable
            icons={tableIcons}
              title="Patient History "
              columns={[
                { title: "Name", field: "name" },
                {
                  title: "Encounter Date",
                  field: "date",
                },               
                // { title: "Status", field: "status", filtering: false },        
                { title: "Actions", field: "actions", filtering: false }, 
              ]}
              isLoading={loading}
              data={recentActivities && recentActivities.map((row) => ({
                   name: row.name,
                   date: row.date,
                   actions:
            
                    <div>
                        <Menu.Menu position='right'  >
                        <Menu.Item >
                            <Button style={{backgroundColor:'rgb(153,46,98)'}} primary>
                            <Dropdown item text='Action'>

                            <Dropdown.Menu style={{ marginTop:"10px", }}>
                                {row.viewable && ( <Dropdown.Item onClick={()=>LoadViewPage(row, 'view')}> <Icon name='eye' />View  </Dropdown.Item>)}
                                {row.viewable && ( <Dropdown.Item  onClick={()=>LoadViewPage(row, 'update')}><Icon name='edit' />Edit</Dropdown.Item>)}
                                {row.viewable && ( <Dropdown.Item  onClick={()=>LoadDeletePage(row, 'delete')}> <Icon name='trash' /> Delete</Dropdown.Item>)} 
                            </Dropdown.Menu>
                        </Dropdown>
                            </Button>
                        </Menu.Item>
                        </Menu.Menu>
                  </div>
                  
                  }))}
            
                        options={{
                          headerStyle: {
                              backgroundColor: "#014d88",
                              color: "#fff",
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
         
    </div>
  );
}

export default PatientnHistory;


