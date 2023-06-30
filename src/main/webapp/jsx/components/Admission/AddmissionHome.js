import React,{useState, useEffect} from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import { Link } from 'react-router-dom'
//import ButtonMui from "@material-ui/core/Button";
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";

import { url as baseUrl } from "./../../../api";
import { token as token } from "./../../../api";
import { Grid,  Label, Segment, Icon, List, Button, Image } from "semantic-ui-react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useHistory } from "react-router-dom";
//import {  Button } from "react-bootstrap";
import InclusionCriteria from './InclusionCriteria';
import Demographic from './Demograhic';
import Viccination from './Vaccination';
import  Comorbitie from './Comorbitie';
import  VitalSign from './VitalSign';
import  ReInfection from './ReInfection';
import ChronicMedication from './ChronicMedication';
import  Medication from './Medication';
import  SignsSymptoms from './SignsSymptons';
import  SupportiveCare from './SupportiveCare';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '20.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

let resultData=""

function AddmissionHome(props) {
    let history = useHistory();
    const { classes } = props;
    const patientObjValue = history.location && history.location.state ? history.location.state.patientObj : {}
    const [patientObj, setpatientObj] = useState(patientObjValue)
    const [inclusionCriteriaModal, setInclusionCriteriaModal] = useState(false);
    const inclusionCriteriaToggle = () => setInclusionCriteriaModal(!inclusionCriteriaModal);
    const [demographicModal, setDemographicModal] = useState(false);
    const demographicToggle = () => setDemographicModal(!demographicModal);
    const [viccinationModal, setViccinationModal] = useState(false);
    const ViccinationToggle = () => setViccinationModal(!viccinationModal);
    const [comorbitieModal, setComorbitieModal] = useState(false);
    const ComorbitieToggle = () => setComorbitieModal(!comorbitieModal);
    const [vitalSignModal, setVitalSignModal] = useState(false);
    const VitalSignToggle = () => setVitalSignModal(!vitalSignModal);
    const [reInfectionModal, setReinfectionModal] = useState(false);
    const ReinfectionToggle = () => setReinfectionModal(!reInfectionModal);
    const [signsSymptomsModal, setSignsSymptomsModal] = useState(false);
    const SignsSymptomsToggle = () => setSignsSymptomsModal(!signsSymptomsModal);
    const [medicationModal, setMedicationModal] = useState(false);
    const MedicationToggle = () => setMedicationModal(!medicationModal);
    const [chronicMedicationModal, setChronicMedicationModal] = useState(false);
    const ChronicMedicationToggle = () => setChronicMedicationModal(!chronicMedicationModal);
    const [supportiveCareModal, setSupportiveCareModal] = useState(false);
    const SupportiveCareToggle = () => setSupportiveCareModal(!supportiveCareModal);
    const [vaccinationHistory, setVaccinationHistory] = useState([])
    const [inclusionHistory, setInclusionHistory] = useState([])
    const [demograhicHistory, setDemographicHistory] = useState([])
    const [vitalHistory, setVitalHistory] = useState([])
    const [comobitieHistory, setComobitieHistory] = useState([])
    const [reinfectionHistory, setReinfectionHistory] = useState([])
    const [signsSymptomsHistory, setSignsSymptomsHistory] = useState([])
    const [chronicMedicationHistory, setChronicMedicationHistory] = useState([])
    const [medicationHistory, setMedicationHistory] = useState([])
    const [supportiveCarenHistory, setSupportiveCareHistory] = useState([])

    const loadInclusionCriteriaModal =()=> {
          setInclusionCriteriaModal(!inclusionCriteriaModal)
    }
    const DemographicModal =()=> {
      setDemographicModal(!demographicModal)
    }
    const ViccinationModal =()=> {
      setViccinationModal(!viccinationModal)
    }
    const VitalSignModal =()=> {
      setVitalSignModal(!vitalSignModal)
    }
    const ComorbitieModal =()=> {
      setComorbitieModal(!comorbitieModal)
    }
    const ReInfectionModal =()=> {
      setReinfectionModal(!reInfectionModal)
    }
    const SignsSymptomsModal =()=> {
      setSignsSymptomsModal(!signsSymptomsModal)
    }
    const ChronicMedicationModal =()=> {
      setChronicMedicationModal(!chronicMedicationModal)
    }
    const MedicationModal =()=> {
      setMedicationModal(!medicationModal)
    }
    const SupportiveCareModal =()=> {
      setSupportiveCareModal(!supportiveCareModal)
    }
    useEffect(() => {
        getVaccinationHistory()
        getInclusionHistory()
        getDemographicHistory()
        getVitalsHistory()
        getComobitieHistory()
        getReinfectionHistory()
        getSignsSymptomsHistory()
        getChronicMedicationHistory()
        getMedicationHistory()
        getSupportiveCareHistory()
    },[])
    const getVaccinationHistory = (category) => {
      axios
        .get(`${baseUrl}covid/encounters/${patientObj.id}/VACCINATION_STATUS`,
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
        .then((response) => {
            setVaccinationHistory(response.data)
        })
        .catch((error) => {    
        }); 
        //return resultData
    }
    const getInclusionHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/INCLUSION_CRITERIA`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setInclusionHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getDemographicHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/DEMOGRAPHICS`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setDemographicHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getVitalsHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/ADMISSION_VITAL_SIGNS`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setVitalHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getComobitieHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/COMORBIDITIES`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setComobitieHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getReinfectionHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/REINFECTION`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setReinfectionHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getChronicMedicationHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/CHRONIC_MEDICATION`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setChronicMedicationHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getSignsSymptomsHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/SIGNS_AND_SYMPTOMS`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setSignsSymptomsHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getMedicationHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/MEDICATION`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setMedicationHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }
    const getSupportiveCareHistory = () => {
        axios
            .get(`${baseUrl}covid/encounters/${patientObj.id}/SUPPORTIVE_CARE`,
                { headers: {"Authorization" : `Bearer ${token}`} }
            )
            .then((response) => {
                setSupportiveCareHistory(response.data)
            })
            .catch((error) => {
            });
        //return resultData
    }

  return (
    <div className={classes.root}>
      <Card >
        <CardContent>
       
            {/* Sematic Ui Card */}
            <Grid centered columns={2} padded>
                <Grid.Column>
                <Segment raised>
                <Label as='a' color='blue'  ribbon>
                        INCLUSION CRITERIA 
                        
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() =>loadInclusionCriteriaModal()}/>
                    <List divided verticalAlign='middle'>
                    {inclusionHistory!=="" && inclusionHistory.map((value) => (
                          <>
                            <List.Item>
                              <List.Content floated='right'>
                              <Label>
                                View
                              </Label>
                              </List.Content>
                              <Icon name='info circle'  />
                                <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                            </List.Item>
                          </>
                    ))
                    }
                    </List>
                </Segment>
                </Grid.Column>

                <Grid.Column>
                <Segment>
                    <Label as='a' color='orange' ribbon='left'>
                        DEMOGRAPHICS 
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => DemographicModal()}/>
                        <List divided verticalAlign='middle'>
                            {demograhicHistory!=="" && demograhicHistory.map((value) => (
                                <>
                                <List.Item>
                                <List.Content floated='right'>
                            <Label>
                            View
                            </Label>
                            </List.Content>
                            <Icon name='info circle'  />
                            <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                        </List.Item>
                        </>
                    ))
                    }
                    </List>
                </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment raised>
                    <Label as='a' color='brown' ribbon>
                    VACCINATION 
                    </Label>
                        <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => ViccinationModal()}/>
                            <List divided verticalAlign='middle'>
                                {vaccinationHistory!=="" && vaccinationHistory.map((value) => (
                                    <>
                                    <List.Item>
                                    <List.Content floated='right'>
                                <Label>
                                View
                                </Label>
                                </List.Content>
                                <Icon name='info circle'  />
                                <List.Content>Date Vaccinated   {"  " +value.visit_date}</List.Content>
                                </List.Item>
                                </>
                        ))
                        }
                        </List>
                </Segment>
                </Grid.Column>

                <Grid.Column>
                <Segment>
                    <Label as='a' color='pink' ribbon='left'>
                        VITAL SIGNS 
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => VitalSignModal()}/>
                        <List divided verticalAlign='middle'>
                                {vitalHistory!=="" && vitalHistory.map((value) => (
                                    <>
                                    <List.Item>
                                    <List.Content floated='right'>
                                    <Label>
                                    View
                                    </Label>
                                </List.Content>
                                <Icon name='info circle'  />
                                <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                                </List.Item>
                                </>
                            ))
                            }
                        </List>
                </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment raised>
                    <Label as='a' color='purple' ribbon>
                    CO-MORBIDITIE
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => ComorbitieModal()}/>
                        <List divided verticalAlign='middle'>
                            {comobitieHistory!=="" && comobitieHistory.map((value) => (
                                <>
                                <List.Item>
                                <List.Content floated='right'>
                            <Label>
                            View
                            </Label>
                            </List.Content>
                            <Icon name='info circle'  />
                            <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                            </List.Item>
                            </>
                            ))
                            }
                        </List>
                </Segment>
                </Grid.Column>

                <Grid.Column>
                <Segment>
                    <Label as='a' color='violet' ribbon='left'>
                    REINFECTION
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => ReInfectionModal()}/>
                        <List divided verticalAlign='middle'>
                            {reinfectionHistory!=="" && reinfectionHistory.map((value) => (
                                <>
                                <List.Item>
                                <List.Content floated='right'>
                            <Label>
                            View
                            </Label>
                            </List.Content>
                            <Icon name='info circle'  />
                            <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                        </List.Item>
                        </>
                        ))
                        }
                        </List>
                </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment raised>
                    <Label as='a' color='teal' ribbon>
                    SIGNS AND SYMPTOMS
                   
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => SignsSymptomsModal()}/>
                        <List divided verticalAlign='middle'>
                            {signsSymptomsHistory!=="" && signsSymptomsHistory.map((value) => (
                                <>
                                <List.Item>
                                <List.Content floated='right'>
                            <Label>
                            View
                            </Label>
                            </List.Content>
                            <Icon name='info circle'  />
                            <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                        </List.Item>
                        </>
                    ))
                    }
                    </List>
                </Segment>
                </Grid.Column>

                <Grid.Column>
                <Segment>
                    <Label as='a' color='green' ribbon='left'>
                    CHRONIC MEDICATION 
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => ChronicMedicationModal()}/>
                        <List divided verticalAlign='middle'>
                            {chronicMedicationHistory!=="" && chronicMedicationHistory.map((value) => (
                                <>
                                <List.Item>
                                <List.Content floated='right'>
                            <Label>
                            View
                            </Label>
                            </List.Content>
                            <Icon name='info circle'  />
                            <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                        </List.Item>
                        </>
                    ))
                    }
                    </List>
                </Segment>
                </Grid.Column>
                <Grid.Column>
                <Segment raised>
                    <Label as='a' color='olive' ribbon>
                    MEDICATION  
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1" style={{cursor: 'pointer'}} onClick={() => MedicationModal()}/>
                        <List divided verticalAlign='middle'>
                            {medicationHistory!=="" && medicationHistory.map((value) => (
                                <>
                                <List.Item>
                                <List.Content floated='right'>
                            <Label>
                            View
                            </Label>
                            </List.Content>
                            <Icon name='info circle'  />
                            <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                        </List.Item>
                        </>
                    ))
                    }
                    </List>
                </Segment>
                </Grid.Column>

                <Grid.Column>
                <Segment>
                    <Label as='a' color='yellow' ribbon='left'>
                    SUPPORTIVE CARE 
                    </Label>
                    <Icon name='plus' size='small' className=" float-end ms-1"  style={{cursor: 'pointer'}} onClick={() => SupportiveCareModal()}/>
                        <List divided verticalAlign='middle'>
                            {supportiveCarenHistory!=="" && supportiveCarenHistory.map((value) => (
                                <>
                                <List.Item>
                                <List.Content floated='right'>
                            <Label>
                            View
                            </Label>
                            </List.Content>
                            <Icon name='info circle'  />
                            <List.Content>Encounter Date   {"  " +value.visit_date}</List.Content>
                        </List.Item>
                        </>
                    ))
                    }
                    </List>
                </Segment>
                </Grid.Column>
            </Grid>

         </CardContent>
      </Card>

      <InclusionCriteria toggle={inclusionCriteriaToggle} showModal={inclusionCriteriaModal} patientObj={patientObj} getInclusionHistory={getInclusionHistory}/>
      <Demographic toggle={demographicToggle} showModal={demographicModal} patientObj={patientObj} getDemographicHistory={getDemographicHistory}/>
      <Viccination toggle={ViccinationToggle} showModal={viccinationModal} patientObj={patientObj} getVaccinationHistory={getVaccinationHistory}/>
      <VitalSign toggle={VitalSignToggle} showModal={vitalSignModal} patientObj={patientObj} getVitalsHistory={getVitalsHistory}/>
      <Comorbitie toggle={ComorbitieToggle} showModal={comorbitieModal} patientObj={patientObj} getComobitieHistory={getComobitieHistory}/>
      <ReInfection toggle={ReinfectionToggle} showModal={reInfectionModal} patientObj={patientObj} getReinfectionHistory={getReinfectionHistory}/>
      <ChronicMedication toggle={ChronicMedicationToggle} showModal={chronicMedicationModal} patientObj={patientObj} getChronicMedicationHistory={getChronicMedicationHistory}/>
      <Medication toggle={MedicationToggle} showModal={medicationModal} patientObj={patientObj} getMedicationHistory={getMedicationHistory} />
      <SignsSymptoms toggle={SignsSymptomsToggle} showModal={signsSymptomsModal} patientObj={patientObj} getSignsSymptomsHistory={getSignsSymptomsHistory}/>
      <SupportiveCare toggle={SupportiveCareToggle} showModal={supportiveCareModal} patientObj={patientObj} getSupportiveCareHistory={getSupportiveCareHistory} />
    </div>
  );
}



export default withStyles(styles)(AddmissionHome);
