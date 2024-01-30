import React, { useState, useEffect } from "react";
import axios from "axios";
import {Dropdown, Menu } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import { url as baseUrl, token } from "../../../api";


const useStyles = makeStyles((theme) => ({
    navItemText: {
        padding: theme.spacing(2),
    },
}));

function SubMenu(props) {
    const classes = useStyles();
    let gender=""
    const patientObjs = props.patientObj ? props.patientObj : {}
    const [activeItem, setActiveItem] =  useState("recent-history")
    //const patientCurrentStatus=props.patientObj && props.patientObj.currentStatus==="Died (Confirmed)" ? true : false ;
    const [patientObj, setpatientObj] = useState(patientObjs)
    const [genderType, setGenderType] = useState()
    //console.log(patientObj)
    useEffect(() => {
        Observation();
    }, [props.patientObj]);
     //Get list of RegimenLine
     const Observation =()=>{
        axios
            .get(`${baseUrl}observation/person/${props.patientObj.id}`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                const observation = response.data
                const mental= observation.filter((x)=> x.type==='mental health')
                const evaluation= observation.filter((x)=> x.type==='initial evaluation')
                

            })
            .catch((error) => {
            //console.log(error);
            });
        
        }


    
    const loadVaccination = (row) =>{
        props.setActiveContent({...props.activeContent, route:'vaccination'})
    }
    const loadIcu = (row) =>{
        props.setActiveContent({...props.activeContent, route:'icu'})
    }
    const loadAddmission = (row) =>{
        props.setActiveContent({...props.activeContent, route:'addmission'})
    }
    const onClickDischarge = (row) =>{        
        props.setActiveContent({...props.activeContent, route:'discharge'})
    }
    const onClickHome = (row) =>{        
        props.setActiveContent({...props.activeContent, route:'recent-history'})
    }
    const onClickImmunization = (row) =>{   
        setActiveItem('immunization')     
        props.setActiveContent({...props.activeContent, route:'immunization-patient'})
    }
    const onClickTetanus = (row) =>{   
        setActiveItem('tetanus')     
        props.setActiveContent({...props.activeContent, route:'tetanus-patient'})
    }
    const loadPatientHistory = ()=>{
        //setActiveItem('history')
        props.setActiveContent({...props.activeContent, route:'patient-history'})
    }


    return (
         <div>
            <Menu size="large" color={"black"} inverted >
                <Menu.Item onClick={() => onClickHome()} > Home</Menu.Item>  
                <Menu.Item onClick={() => onClickImmunization()} > Immunization</Menu.Item>   
                <Menu.Item onClick={() => onClickTetanus()} > Tetanus </Menu.Item> 
{/* 
                 <Menu.Item onClick={() => loadVaccination()} >Vaccination</Menu.Item>
                 <Menu.Item onClick={() => loadAddmission()} >Addmission</Menu.Item>
                <Menu.Item onClick={() => loadIcu()} >Patient ICU</Menu.Item>
                <Menu.Item onClick={() => onClickDischarge()} > Discharg/Death</Menu.Item>
                <Menu.Item onClick={() => loadPatientHistory(patientObj)} >History</Menu.Item>                     */}
            </Menu>             
        </div>
    );
}



export default SubMenu;
