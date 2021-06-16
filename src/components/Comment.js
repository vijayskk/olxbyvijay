import React, { useContext } from 'react'
import { Avatar, Button } from '@material-ui/core'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import firebase,{auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { Commentrefresh } from '../contexts/ProductViewContext'


function Comment({commentername,adId,comment,date,fbid,reply,selleraccount}) {
    const [replyinput, setreplyinput] = useState("")
    const [commentrefresh, setcommentrefresh] = useContext(Commentrefresh)

        const [user] = useAuthState(auth)
        const useStyles = makeStyles((theme) => ({
            typography: {
            padding: theme.spacing(2),
            },
        }));
        const classes = useStyles();
        const [anchorEl, setAnchorEl] = React.useState(null);
      
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
      
        const handleClose = () => {
          setAnchorEl(null);
        };
        const handlereply = () =>{
            try {
                firebase.firestore().collection("comments").doc(fbid).update({reply:replyinput}).then(()=>{
                    setcommentrefresh(commentrefresh + 1)
                    handleClose();
                })
            } catch (error) {
                console.log(error);
            }
        }


        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
    const [replypopupstate, setreplypopupstate] = useState(false)
    return (
        <>
                    <div className="mb-6 relative bg-gray-300 p-2 z-10 rounded-lg ">
                        <div className="flex ">
                            <Avatar>{commentername[0]}</Avatar>
                            <p className="pl-2 uppercase text-lg">{commentername}</p>
                        </div>
                        <div>
                            <p className="pl-12 -mt-3">{comment}</p>
                        </div>
                        {reply?
                        <div className="pl-12 font-extralight">Seller Replied: {reply}</div>
                        :null}
                        {(selleraccount === user.uid)?
                            <div className="absolute top-0 right-0 h-full "><Button className="h-full focus:outline-none" onClick={handleClick}>{reply?<p>Edit Reply</p>:<p>Reply</p>}</Button></div>
                        :null}

                        
                    </div>
                    <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
          {/* ............reply box........... */}

                <div className="p-5">
                   <p>Reply to {commentername}:</p> 
                   <div className="border-2 mt-4 rounded-lg flex items-center w-full border-black">
                    <input type="text" placeholder="Enter your reply" className="m-2 p-2 flex-grow flex-shrink min-w-0 focus:outline-none" onChange={(e)=>{setreplyinput(e.target.value)}} />
                    <Button className="focus:outline-none" onClick={()=>{handlereply();}} >Post</Button>
                </div>
                </div>

          {/* ......................... */}
      </Popover>
                    
    
        </>
    )
}

export default Comment
