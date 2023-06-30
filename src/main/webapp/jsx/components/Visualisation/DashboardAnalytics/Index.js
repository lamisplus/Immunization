import React, {useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { MdDashboard , MdFileUpload} from "react-icons/md";
import { GiTestTubes,GiFiles, GiDrippingTube } from "react-icons/gi";
import { GoGraph} from "react-icons/go";

import { VscGraph} from "react-icons/vsc";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import {getQueryParams} from "components/Utils/PageUtils";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import SummaryView from './SummaryView/Index';
import {Link} from "react-router-dom";


//Dtate Picker package
Moment.locale("en");
momentLocalizer();

const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: "20px",
    fontWeight: "bold",
    padding: "5px",
    paddingBottom: "10px",
  },
  inforoot: {
    margin: "5px",
  },

  dropdown: {
    marginTop :"50px"
   
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  downmenu: {
    display: 'flex'
    },
}));






function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={5}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}
function HomePage(props) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const urlIndex = getQueryParams("tab", props.location.search); 
  const urlTabs = urlIndex !== null ? urlIndex : props.location.state ;
  useEffect ( () => {
    switch(urlTabs){  
      case "collect-sample": return setValue(1)
      case "sample-verification": return setValue(2)
      case "test-result": return setValue(3)
      // case "radiology": return setValue(4)
      case "dispatched-sample-list" : return setValue(4)

      default: return setValue(0)
    }
  }, [urlIndex]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


/*Tab Dropdown   */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
// Second Menu
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

/*Tab Dropdown   */



  return (
    <>
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="secondary"
          textColor="inherit"
          aria-label="scrollable force tabs example"
        >
            
          <Tab className={classes.title} label="Summary View" icon={<MdDashboard />} {...a11yProps(0)}/>          
          <Tab className={classes.title} label="Analytics" icon={<GoGraph />} {...a11yProps(1)} 
          aria-controls="fade-menu" aria-haspopup="true" onMouseOver={handleClick} />
          <Tab className={classes.title} label="Others" icon={<VscGraph style={{ color:'#fff'}}/>} {...a11yProps(2)} onMouseOver={handleClick2}/>

      </Tabs>
      </AppBar>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        className={classes.dropdown}
        onMouseLeave={handleClose}     
        >
        <MenuItem >
          <Link to={{pathname: "/monitoring"}} >
            Monitoring
          </Link>        
        </MenuItem>
        <MenuItem >
          <Link to={{pathname: "/quality-care"}} >
            Quality of Care
         </Link> 
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={{pathname: "/case-base-survillance"}} >
            Case-Base Surveillance
          </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={{pathname: "/biometric-tracker"}} >
            Biometeric Tracker
          </Link>  
        </MenuItem>
        <MenuItem onClick={handleClose}>        
          <Link to={{pathname: "/clinical-cascade"}} >
            Clinical Cascade
          </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>          
          <Link to={{pathname: "/commodity-management"}} >
            Commodity Managment
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to={{pathname: "/mortality-surveillance"}} >
            Mortality Surveillance
          </Link>          
        </MenuItem>
        <MenuItem onClick={handleClose}>
        
          <Link to={{pathname: "/recency-testing"}} >
            Recency Testing
          </Link>
        </MenuItem>
      </Menu>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={open2}
        onClose={handleClose2}
        TransitionComponent={Fade}
        className={classes.dropdown}
        onMouseLeave={handleClose2}     
      >
        <MenuItem >
          <Link to={{pathname: "/tableau"}} >
            Tableau
          </Link>        
        </MenuItem>
        <MenuItem >
          <Link to={{pathname: "/power-bi"}} >
            Power BI
         </Link> 
        </MenuItem>
        <MenuItem >
          <Link to={{pathname: "/other-bi"}} >
            Others
         </Link> 
        </MenuItem>
    </Menu>

      
      <TabPanel value={value} index={0}>
          <SummaryView />
      </TabPanel>
      <TabPanel value={value} index={1}>
          
      </TabPanel>
      <TabPanel value={value} index={2}>
          
      </TabPanel>
      <TabPanel value={value} index={3}>
         
      </TabPanel>
      {/* <TabPanel value={value} index={4}>
          <RadiologyTestSearch />
      </TabPanel> */}
      <TabPanel value={value} index={4}>
        
      </TabPanel>
        
     </div> 
    </>
  );
}



export default HomePage;
