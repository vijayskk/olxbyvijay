import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Checkbox, FormControlLabel, Grid, Input, LinearProgress, Slider,TextField,Typography } from '@material-ui/core';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import TelegramIcon from '@material-ui/icons/Telegram';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import firebase,{auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as EmailValidator from 'email-validator';



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



function Mailsection({sellername , adId , selleraccount , productname}) {
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


    
    const [user] = useAuthState(auth)
    const [whatsappstate, setwhatsappstate] = useState(false)
    const [instastate, setinstastate] = useState(false)
    const [telestate, settelestate] = useState(false)
    const [call, setcall] = useState(false)
    const [emailstate, setemailstate] = useState(false)
    const [whatsappnumber, setwhatsappnumber] = useState(null)
    const [instaid, setinstaid] = useState(null)
    const [telenumber, settelenumber] = useState(null)
    const [phonenumber, setphonenumber] = useState(null)
    const [email, setemail] = useState(null)
    const [contacterror, setcontacterror] = useState("")
    const [icanstate, seticanstate] = useState(null)
    const [icantstate, seticantstate] = useState(null)
    const [canerror, setcanerror] = useState("")
    const [inputerror, setinputerror] = useState("")
    const [message, setmessage] = useState("")
    const [adjustmentrange, setadjustmentrange] = useState(0)
    const [sendloading, setsendloading] = useState(false)
    const [sendstatus, setsendstatus] = useState(false)
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    
    const handlesend =()=>{
        const emailvalid = EmailValidator.validate(email);
        if (icanstate === null || icantstate === null) {
            setcanerror("Please Select One")
        }else if (whatsappstate === false && instastate === false && telestate === false && call === false  && emailstate === false ){
            setcontacterror("Please select atleast one")
        }else if (whatsappnumber === "" || instaid === "" || telenumber === "" || phonenumber === "" || email === ""){
            setinputerror("Some fields are empty")
        }else if (whatsappstate === true && whatsappnumber.length !== 10){
            setinputerror("Number must be 10 digit") 
        }
        else if (telestate === true && telenumber.length !== 10){
            setinputerror("Number must be 10 digit") 
        }else if (call === true && phonenumber.length !== 10){
            setinputerror("Number must be 10 digit") 
        }
        else if (!emailvalid && email !==null){
            setinputerror("Email is invalied") 
        }       
        else{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        const mailData = {
            adjustmentrange,
            icanstate,
            icantstate,
            whatsappnumber,
            instaid,
            telenumber,
            phonenumber,
            email,
            sendername:user.displayName,
            message,
            date:today,
            adId,
            to:selleraccount,
            from:user.uid,
            senderimage:user.photoURL,
            productname

        } 
        setsendloading(true)
        try {
            firebase.firestore().collection('mailbox').add(mailData).then(()=>{
                handleClose();
                setsendstatus(true)
            })
        } catch (error) {
            console.log(error);
        }
    }
    }


    function valuetext(value) {
        return `${value}%`;
      }
    
    const marks = [
        {
          value: 10,
          label: '10%',
        },
        {
            value: 0,
            label: '0%',
          },
        {
          value: 20,
          label: '20%',
        },
        {
          value: 30,
          label: '30%',
        },

      ];
    return (
    <div className="relative border border-gray-400 p-4 mb-2">
        <h1 className="mb-2 text-2xl font-bold">Need this item??</h1>
        <p>Here you can send a wanted mail to {sellername} by just filling a form and giving some information...</p>
        <button className="w-full bg-blue-500 focus:outline-none text-white text-lg py-1 mt-2 rounded-lg hover:bg-blue-600" disabled={sendstatus} onClick={handleOpen}>{!sendstatus?<p>I need this!</p>:<p>Mail Sent🏁</p>}</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
                <div style={modalStyle} className={classes.paper}>
                    <Typography id="continuous-slider" gutterBottom>
                        Negotiation Range
                    </Typography>
                <Slider 
                    value={adjustmentrange}
                    min={0}
                    step={10} 
                    id="continuous-slider"
                    max={30}
                    onChange={(e,newValue)=>{setadjustmentrange(newValue)}}
                    valueLabelDisplay="auto"
                    aria-labelledby="non-linear-slider"
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    marks={marks}
                    />
                <div className="flex mt-6">
                        <FormControlLabel
                            control={<Checkbox checked={icanstate} onChange={(e)=>{
                                seticanstate(e.target.checked)
                                seticantstate(false)
                                if (!e.target.checked) {
                                seticantstate(true)    
                                }
                            }} name="ican" />}
                            label="I can pickup item"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={icantstate} onChange={(e)=>{
                                seticantstate(e.target.checked)
                                seticanstate(false)
                                if (!e.target.checked) {
                                    seticanstate(true)    
                                    }
                            }} name="ican" />}
                            label="Need courrier service"
                        />
                       
                </div>
                <p className="text-red-500 mt-2 animate-bounce" >{canerror}</p>
                <h1 className="mt-10 text-xl">Contact me in   (Pick anything)</h1>
                <div className="pl-2">
                    <FormControlLabel className="flex w-full"
                    control={<Checkbox checked={whatsappstate} icon={<WhatsAppIcon />} checkedIcon={<WhatsAppIcon />} onChange={(e)=>{
                        if(e.target.checked){
                            setwhatsappstate(true)
                            setwhatsappnumber("")
                        }else{
                            setwhatsappstate(false)
                            setwhatsappnumber(null)
                        }
                    }} name="checkedH" />}
                    label="Whatsapp" 
                    />
                    <FormControlLabel className="flex w-full"
                    control={<Checkbox checked={instastate} icon={<InstagramIcon />} checkedIcon={<InstagramIcon />} onChange={(e)=>{
                        if(e.target.checked){
                            setinstastate(true)
                            setinstaid("")
                        }else{
                            setinstastate(false)
                            setinstaid(null)
                        }
                    }} name="checkedH" />}
                    label="Instagram" 
                    />
                    <FormControlLabel  className="flex w-full"
                    control={<Checkbox checked={telestate} icon={<TelegramIcon />} checkedIcon={<TelegramIcon />} onChange={(e)=>{
                        if(e.target.checked){
                            settelestate(true)
                            settelenumber("")
                        }else{
                            settelestate(false)
                            settelenumber(null)
                        }
                    }} name="checkedH" />}
                    label="Telegram" 
                    />
                    <FormControlLabel className="flex w-full"
                    control={<Checkbox checked={call} icon={<PhoneIcon />} checkedIcon={<PhoneIcon />} onChange={(e)=>{
                        if(e.target.checked){
                            setcall(true)
                            setphonenumber("")
                        }else{
                            setcall(false)
                            setphonenumber(null)
                        }
                    }} name="checkedH" />}
                    label="Call me" 
                    />
                    <FormControlLabel className="flex w-full"
                    control={<Checkbox checked={emailstate} icon={<MailOutlineIcon />} checkedIcon={<MailOutlineIcon />} name="checkedH" onChange={(e)=>{
                        if(e.target.checked){
                            setemailstate(true)
                            setemail("")
                        }else{
                            setemailstate(false)
                            setemail(null)
                        }
                    }} />}
                    label="Via email" 
                    />
                </div>
                <p className="text-red-500 mt-2 animate-bounce" >{contacterror}</p>


                <h1 className="mt-10 text-xl">My Details</h1>
                <div className="pl-2">
                    
{  whatsappstate?       <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <WhatsAppIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={(e)=>{setwhatsappnumber(e.target.value)}} id="input-with-icon-grid" label="Whatsapp number" />
                            </Grid>
                        </Grid>:null}

{instastate?        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <InstagramIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={(e)=>{setinstaid(e.target.value)}} id="input-with-icon-grid" label="Instagram id" />
                            </Grid>
                        </Grid>:null}

{telestate?         <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <TelegramIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={(e)=>{settelenumber(e.target.value)}} id="input-with-icon-grid" label="Telegram number" />
                            </Grid>
                        </Grid>:null}

{call?              <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <PhoneIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={(e)=>{setphonenumber(e.target.value)}} id="input-with-icon-grid" label="Mobile number" />
                            </Grid>
                        </Grid>:null}


{emailstate?        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item>
                                <MailOutlineIcon />
                            </Grid>
                            <Grid item>
                                <TextField onChange={(e)=>{setemail(e.target.value)}} id="input-with-icon-grid" label="Email id" />
                            </Grid>
                        </Grid>:null}

                    
                </div>
                <p className="text-red-500 mt-2 animate-bounce" >{inputerror}</p>


                <h1 className="mt-10 text-xl">Any messages?</h1>
                <div className="p-4"> 
                <TextField
                    onChange={(e)=>{setmessage(e.target.value)}}
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline 
                    rows={4}
                    className="w-full"
                    defaultValue=""
                    variant="outlined"
                    />
                </div>
                {sendloading?<LinearProgress />:null}
                <button disabled={sendloading} onClick={handlesend} className="w-full bg-blue-500 focus:outline-none text-white text-lg py-1 mt-2 rounded-lg hover:bg-blue-600">Send</button>

                </div>
      </Modal>
    </div>
    )
}

export default Mailsection
