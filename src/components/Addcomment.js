import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import { useState } from 'react'
import firebase, {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useContext } from 'react'
import { Commentrefresh } from '../contexts/ProductViewContext'


function Addcomment({adId}) {
    const [commentrefresh, setcommentrefresh] = useContext(Commentrefresh)
    const [user] = useAuthState(auth)
    const [inputcomment, setinputcomment] = useState()
    const [commenterror, setcommenterror] = useState("")
    const commentpost = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        console.log(inputcomment);
        const commentdata = {
            adId: adId,
            commentername:user.displayName,
            commenteruid:user.uid,
            comment:inputcomment,
            date:today,
            reply:false
        }
        firebase.firestore().collection("comments").add(commentdata).then(()=>{
            console.log("comment added");
            setcommenterror("comment added")
            setcommentrefresh(commentrefresh + 1)
        })
    }
    return(
        <div className="w-1/2 m-2  ">
            <div className="relative border border-gray-400 p-4 mb-2">
                <h1 className="mb-2 text-2xl font-bold">Add a Comment?</h1>
                <p>Here you can post a comment.Your name and comments are always visible to others. The seller can reply to it.</p>
                <div className="border-2 mt-4 rounded-lg flex items-center w-2/3 border-black">
                    <input type="text" placeholder="Enter your comment" className="m-2 p-2 flex-grow focus:outline-none" onChange={(e) => { setinputcomment(e.target.value) }} />
                    <Button className="focus:outline-none" onClick={commentpost}>Post</Button>
                </div>
                <p className="pt-2">{commenterror}</p>
            </div>
        </div>
    )
}

export default Addcomment
