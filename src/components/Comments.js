import React, { useEffect } from 'react'
import { Avatar, Button } from '@material-ui/core'
import { useState } from 'react'
import firebase, {auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import Comment from './Comment'
import { useContext } from 'react'
import { Commentrefresh } from '../contexts/ProductViewContext'

function Comments({adId,selleraccount}) {
    const [commentrefresh, setcommentrefresh] = useContext(Commentrefresh)
    const [user] = useAuthState(auth)
    const [comments, setcomments] = useState([])
    useEffect(()=>{
        firebase.firestore().collection('comments').get().then((snapshot)=>{
            const allcomment = snapshot.docs.map((comment)=>{
                return {
                    ...comment.data(),
                    id:comment.id
                }
            })
            console.log(allcomment);
            setcomments(allcomment);
        })
    },[commentrefresh])
    return (
        <div className="w-full md:w-1/2 m-2  ">
        <div className="relative border min-h-full border-gray-400 p-4 mb-2">
            <h1 className="mb-4 text-2xl font-bold">Comments</h1>
            {

                comments.map((obj)=>{

     
                        if (obj.adId === adId) {
                            return (
                                <Comment
                                fbid={obj.id}
                                adId={obj.adId}
                                comment={obj.comment}
                                commentername={obj.commentername}
                                date={obj.date}
                                reply={obj.reply}
                                selleraccount={selleraccount}
                                />
                            
                            )
                        }
                    

                    

                })
            }
            <h1 className="z-0 text-gray-500 bottom-2 absolute">End of comments :-(</h1>
        </div>
    </div>
    )
    

}

export default Comments
