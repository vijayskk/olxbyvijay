import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import {useAuthState} from 'react-firebase-hooks/auth'
import firebase , {auth} from '../firebase'
import { IconButton, LinearProgress, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Commentrefresh } from '../contexts/ProductViewContext'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Mylikes() {
    const [likes, setlikes] = useState([])
    const [user] = useAuthState(auth)
    const [likeloading, setlikeloading] = useState(false)
    const history = useHistory()
    const [commentrefresh, setcommentrefresh] = useContext(Commentrefresh)
    const handlecat = (term,cat)=>{
        setcommentrefresh(commentrefresh + 1)
        history.push(`/search?searchterm=${term}&category=${cat}`)

    }
    useEffect(()=>{
        setlikeloading(true)
        firebase.firestore().collection(user.uid + "likes").orderBy("timestamp" , "desc").get().then((snapshot)=>{
            const alllikes = snapshot.docs.map((like)=>{
                return {
                    ...like.data(),
                    likeid:like.id
                }
            })
            console.log(alllikes);
            setlikes(alllikes);
            setlikeloading(false)
        })
    },[commentrefresh])
    if (!user) {
        history.push('/')
        return null
    }
    return (
        <div>
            <Header />
            <div className="max-w-7xl mx-auto">
            {likeloading?<LinearProgress />:null} 
            {(likes.length === 0)?<h1 className="font-light text-xl md:text-4xl pt-4 ml-2" >No likes yet</h1>:null}
                {
                    likes.map((obj)=>{
                        return (
                            <div className="border mb-2 relative rounded-lg border-black" >
                                <ListItem onClick={()=>{
                                    handlecat(obj.adId,obj.productname)
                                }} button>
                                    <ListItemIcon>
                                        <img src={obj.image?obj.image[0]:null} alt="" width="80px" className="mr-2" />
                                    </ListItemIcon>
                                    <ListItemText primary={obj.productname} />
                                    
                                </ListItem>
                                <div className="absolute right-0 top-0 h-full items-center flex my-auto"><IconButton className="focus:outline-none" onClick={()=>{
                                    try {
                                        firebase.firestore().collection(user.uid + "likes").doc(obj.likeid).delete().then(()=>{
                                            setlikeloading(false)
                                            setcommentrefresh(commentrefresh + 1)
                                        })
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }}><DeleteForeverIcon /></IconButton></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
} 

export default Mylikes
