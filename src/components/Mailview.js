import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { EmailOutlined, Instagram, Star } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BlockIcon from '@material-ui/icons/Block';
import WhatsApp from '@material-ui/icons/WhatsApp';
import Telegram from '@material-ui/icons/Telegram';
import Phone from '@material-ui/icons/Phone';
import { Avatar } from '@material-ui/core';


function rand() {
  return 0;
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
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 6),
  },
}));



function Mailview({open , setOpen,sendername,productname,adjustment,can,cant , whatsappnumber,instaid,telenumber,phonenumber,email,senderimage,message}) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
 
  
    const handleClose = () => {
      setOpen(false);
    };
  
  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>

                <div>
                    <div className="flex space-x-3">
                        <Avatar src={senderimage} className="-ml-12" />
                        <h1 className="text-3xl mb-12">{sendername} is intrested to buy your {productname}</h1>
                    </div>

                    {(adjustment === 0)?<div className= "flex" ><InsertEmoticonIcon /><p>{sendername} is ok with your price.</p></div>:null}
                    {(adjustment === 10)?<div className= "flex space-x-2 " ><SentimentSatisfiedIcon /><p>{sendername} expects 10% discount.</p></div>:null}
                    {(adjustment === 20)?<div className= "flex space-x-2" ><SentimentVeryDissatisfiedIcon /><p>{sendername} expects 20% discount.</p></div>:null}
                    {(adjustment === 30)?<div className= "flex space-x-2" ><MoodBadIcon /><p>{sendername} expects 20% discount.</p></div>:null}

                    <div>
                    {can?<div className= "flex mt-4  space-x-2" ><DirectionsRunIcon /><p>He/She can pick it up</p></div>:null}
                    {cant?<div className= "flex mt-4 space-x-2" ><BlockIcon /><p>{sendername} Cannot pickup.Plan something better</p></div>:null}
                    </div>

                    <div>
                    {!(whatsappnumber === null)?<a href={"tel:" + whatsappnumber}><div className= "flex mt-4 cursor-pointer space-x-2" ><WhatsApp /><p>{whatsappnumber}</p></div></a>:null}
                    {!(instaid === null)?<a href={"https://www.instagram.com/" + instaid}><div className= "flex mt-4  space-x-2" ><Instagram /><p>{instaid}</p></div></a>:null}
                    {!(telenumber === null)?<a href={"tel:" + telenumber}><div className= "flex mt-4  space-x-2" ><Telegram /><p>{telenumber}</p></div></a>:null}
                    {!(phonenumber === null)?<a href={"tel:" + phonenumber}><div className= "flex mt-4  space-x-2" ><Phone /><p>{phonenumber}</p></div></a>:null}
                    {!(email === null)?<a href={"mailto:" + email}><div className= "flex mt-4  space-x-2" ><EmailOutlined /><p>{email}</p></div></a>:null}
                    </div>

                    {!(message === "")?<p className="mt-10" >Message: {message}</p>:null}

                </div>
                
            </div>
        </Modal>
      </div>
    );
}

export default Mailview
