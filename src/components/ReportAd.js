import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Checkbox, FormControlLabel, LinearProgress, TextField } from '@material-ui/core';
import { findAllByDisplayValue } from '@testing-library/react';
import firebase,{auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useHistory} from 'react-router'
import emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';
import * as EmailValidator from 'email-validator';
init("user_he7TD4y2nD53TNR2MMMDJ");


function rand() {
  return 0
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function ReportAd({open,setOpen , adId , productname , fbid , sellername , selleremail }) {
    const [user] = useAuthState(auth)
    const history = useHistory()
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [reportloading, setreportloading] = useState(false)
    const [itemisfraud, setitemisfraud] = useState(null)
    const [cantcontact, setcantcontact] = useState(null)
    const [misbehave, setmisbehave] = useState(null)
    const [other, setother] = useState(null)
    const [submiteremail, setsubmiteremail] = useState()
    const [message, setmessage] = useState("No message")
    const [reporterror, setreporterror] = useState("")

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const submitReport = () =>{
      const emailvalid = EmailValidator.validate(submiteremail);
      if (itemisfraud === null && cantcontact === null && misbehave === null && other === null) {
        setreporterror("Please select atleast one")
      }
      else if (!emailvalid){
        setreporterror("Email is invalied") 
      }       
      else{

        console.log("test");
        setreporterror("")
        setreportloading(true)
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const reportData = {
            adId,
            productname,
            fbid,
            sellername,
            sellername,
            selleremail,
            submitername:user.displayName,
            submiteremail,
            itemisfraud,
            cantcontact,
            misbehave,
            other,
            message,
            date:today
        }
        console.log(reportData);
        firebase.firestore().collection('reports').add(reportData).then(()=>{
          // emailjs.send("service_33x8hg9","template_3ztufoq",{...reportData}).then(()=>{
          //   setreportloading(false)
          //   setreporterror("Reported")
          //   setInterval(()=>{history.push('/');},500)
          // }).catch((err)=>{
          //   if (err){
          //     console.log(err);
          //   }
          // });
            setreportloading(false)
            setreporterror("Reported")
            setInterval(()=>{handleClose();},500)
        })
      }
    }

    
    return (
        <div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
                <h1 className="text-2xl py-4">Are you sure to report this ad?</h1>
                <p>The ad will be checked and removed by the authority</p>
                        <FormControlLabel
                                    control={<Checkbox   onChange={(e)=>{

                                        if (e.target.checked) {
                                          setitemisfraud("The Ad is Fraud")
                                        }else{
                                          setitemisfraud(null)
                                        }
                                    }} name="ican" />}
                                    label="Item is Fraud"
                                />
                        <FormControlLabel
                            control={<Checkbox  onChange={(e)=>{

                              if (e.target.checked) {
                                setcantcontact("User Cant Contact seller")
                              }else{
                                setcantcontact(null)
                              }
                            }} name="ican" />}
                            label="Cant Contact"
                        />
                                                <FormControlLabel
                            control={<Checkbox  onChange={(e)=>{

                              if (e.target.checked) {
                                setmisbehave("Seller misbehaves to user")
                              }else{
                                setmisbehave(null)
                              }
                            }} name="ican" />}
                            label="Mis-behavior"
                        />
                                                <FormControlLabel
                            control={<Checkbox  onChange={(e)=>{

                              if (e.target.checked) {
                                setother("Other problem")
                              }else{
                                setother(null)
                              }
                            }} name="ican" />}
                            label="Not in the list"
                        />
                        <div className="mb-4 mt-6 w-full"><TextField className="mb-2 w-full" id="outlined-basic" label="Enter your contact email" variant="outlined" onChange={(e)=>{setsubmiteremail(e.target.value)}} /></div>
                                        <TextField
                            onChange={(e)=>{setmessage(e.target.value)}}
                            id="outlined-multiline-static"
                            label="Any other Statements?"
                            multiline 
                            rows={4}
                            className="w-full mt-2"
                            defaultValue=""
                            variant="outlined"
                    />
                    <p className="pt-2 pb-2 text-red-500">{reporterror}</p>
                {reportloading?<LinearProgress className="mt-2" />:null}
                <button onClick={submitReport} className="w-full bg-red-500 focus:outline-none text-white text-lg py-2 mt-4 rounded-lg hover:bg-red-600">Report ad</button>

            </div>
          </Modal>
        </div>
      );
}

export default ReportAd
