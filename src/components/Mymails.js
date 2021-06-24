import React, { useState } from 'react'
import Header from './Header'
import firebase,{auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { Refresh } from '@material-ui/icons'
import { Avatar, Fab, IconButton, LinearProgress, ListItemIcon, ListItemText } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import Mailview from './Mailview'

function Mymails() {
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
    const [user] = useAuthState(auth)
    const [mails, setmails] = useState([])
    const [mailrefresh, setmailrefresh] = useState(1)
    const [mailloading, setmailloading] = useState(false)
    useEffect(()=>{
        setmailloading(true)
        firebase.firestore().collection('mailbox').get().then((snapshot)=>{
            const allmail = snapshot.docs.map((mail)=>{
                return {
                    ...mail.data(),
                    id:mail.id
                }
            })
            console.log(allmail);
            setmails(allmail);
            setmailloading(false)
        })
    },[mailrefresh])
    return (
        <div className="max-w-7xl mx-auto">
        <Header />
        <div>
            
            {mailloading?<LinearProgress />:null} 
            <div className="p-4 mb-2">
                <Fab className="focus:outline-none" onClick={()=>{setmailrefresh(mailrefresh + 1)}} variant="extended">
                <Refresh />
                    Refresh
                </Fab>
            </div>
            <h1 className="font-light text-xl md:text-4xl pt-4 ml-2" >Inbox</h1>
            <div>
                {
                    mails.map((obj)=>{
                        const title = obj.sendername +" is intrested in "+ obj.productname +" 🎉💘"
                        if(obj.to === user.uid)
                        return (
                            <div className="border mb-2 rounded-lg border-black" >
                                <ListItem onClick={()=>{setOpen(true)}} button>
                                    <ListItemIcon>
                                        <Avatar src={obj.senderimage} />
                                    </ListItemIcon>
                                    <ListItemText primary={title} />
                                </ListItem>
                                <Mailview open={open} setOpen={setOpen}
                                sendername={obj.sendername}
                                productname={obj.productname}
                                adjustment={obj.adjustmentrange}
                                can={obj.icanstate}
                                cant={obj.icantstate}
                                whatsappnumber={obj.whatsappnumber}
                                instaid={obj.instaid}
                                telenumber={obj.telenumber}
                                phonenumber={obj.phonenumber}
                                email={obj.email}
                                senderimage={obj.senderimage}
                                message={obj.message}
                                />
                            </div>
                        )
                    })
                }


            </div>
        </div>
        </div>
    )
}

export default Mymails
