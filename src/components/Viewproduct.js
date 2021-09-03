import { Avatar, Button, Checkbox, FormControlLabel, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Header from './Header'
import CallIcon from '@material-ui/icons/Call';
import { useHistory } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ReactMapGL ,{Marker} from 'react-map-gl'
import { useEffect } from 'react';
import firebase, { storage ,auth} from '../firebase'
import { useContext } from 'react';
import { ProductView } from '../contexts/ProductViewContext';
import {useAuthState} from 'react-firebase-hooks/auth'
import Comments from './Comments';
import Addcomment from './Addcomment';
import algoliasearch from 'algoliasearch';
import Mailsection from './Mailsection';
import ReportAd from './ReportAd';
import { FavoriteBorder } from '@material-ui/icons';
import Favorite from '@material-ui/icons/Favorite';
import fb from 'firebase'
function Viewproduct() {
    const [productview, setproductview] = useContext(ProductView)
    const [user] = useAuthState(auth);
    const [likedstate, setlikedstate] = useState(false)
    useEffect(()=>{
        if(user){
            firebase.firestore().collection(user.uid + "likes").get().then((snapshot)=>{
                snapshot.docs.map((like)=>{
                    console.log(like.data());
                    if (like.data().adId === productview.adId) {
                        setlikedstate(true)
                    }
                })
    
            })

        }
    },[])
    const history = useHistory();
    const client = algoliasearch("JQZ7F2IQ02","f44eaae76a180721482cf5357d12831f")
    const index = client.initIndex('ads')
    const [reportadbox, setreportadbox] = useState(false)
    window.onbeforeunload = function() {
        alert("Are you sure?") 
    }
    
    console.log(productview.fbid);
    const [deleteerror, setdeleteerror] = useState("")
    const handlelogin = () =>{
        history.push('/login')
    }
    const handlehome = () =>{
        history.push('/')
    }
    var componentbig
    var componentsmall

    const handleDelete = async()=>{
        setdeleteerror("Deleting..please wait.")
        try {
            await storage.ref().child(`images/${productview.adId}first.jpg`).delete();
            await storage.ref().child(`images/${productview.adId}third.jpg`).delete();
            await storage.ref().child(`images/${productview.adId}fourth.jpg`).delete();
            await storage.ref().child(`images/${productview.adId}second.jpg`).delete().then(()=>{
                firebase.firestore().collection("ads").doc(productview.fbid).delete().then((snap)=>{
                    index.deleteObject(productview.fbid)
                    handlehome();
                })
            })


        } catch (error) {
            console.log(error);
            setdeleteerror("Oops...cant delete")
        }

    }


    const [viewport, setviewport] = useState({
        width: '100%',
        height:'100%',
        zoom : 10,
    })

    
    if (!user) {
        history.push('/login')
        return null
    }
    else if (!(productview === "nodata")) {
        if (user.uid === productview.selleraccount) {
            componentbig = <div className="w-1/2 m-2 hidden md:block ">
                                <div className="relative border border-gray-400 p-4 mb-2">
                                    <h1 className="text-2xl font-bold">Delete ad</h1>
                                    <p>You own this ad.so you can delete it if needed.To delete the ad please click the button below</p>
                                    {deleteerror}
                                    <button onClick={handleDelete} className="w-full bg-red-500 focus:outline-none text-white text-lg py-1 mt-2 rounded-lg hover:bg-red-600">Delete ad</button>
                                </div>
                            </div>
    
            componentsmall =  <div className="relative border block md:hidden border-gray-400 p-4 mb-2">
    
                                <h1 className="text-2xl font-bold">Delete ad</h1>
                                <p>You own this ad.so you can delete it if needed.To delete the ad please click the button below</p>
                                {deleteerror}
                                <button onClick={handleDelete} className="w-full bg-red-500 focus:outline-none text-white text-lg py-1 mt-2 rounded-lg hover:bg-red-600">Delete ad</button>
    
                            </div>
        }else{
            componentsmall = null;
            componentbig = null;
        }
        return (
            <>
            <Header />
            <div className="w-full max-w-7xl mx-auto">
                <div className="inline md:flex">
                    <div className=" md:h-76 w-full md:w-1/2 m-2 bg-gray-200">
                        <Carousel dynamicHeight={false} stopOnHover={false} preventMovementUntilSwipeScrollTolerance={false} showThumbs={true} showStatus={false} emulateTouch={true} interval={1100} infiniteLoop={true} autoPlay={false}>
                                            <div>
                                                <img src={productview.image[0]?productview.image[0]:'noimage.png'} alt="Not Found"   />
    
                                            </div>
                                            <div>
                                                <img src={productview.image[1]?productview.image[1]:'noimage.png'} alt="Not Found"  />
    
                                            </div>
 
                        </Carousel>
                    </div>
                        <div className="h-96 md:w-1/2 ml-4 m-2 " >
                            <div className="relative border border-gray-400 p-4 mb-2">
                                <h1 className="text-2xl font-bold">₹ {productview.price}</h1>
                                <h1 className=" font-normal text-lg truncate capitalize">{productview.itemname}</h1>
                                <h1 className=" line-clamp-1 font-light pb-12">{productview.description}</h1>
                                <h1 className="absolute bottom-4 left-4 font-extralight">{productview.location}</h1>
                                <h1 className="absolute bottom-4 right-4 font-extralight">{productview.date}</h1>
                                <div className="absolute top-2 right-0">
                                    <Checkbox checked={likedstate}  icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" onClick={(e)=>{
                                        if (e.target.checked) {
                                            setlikedstate(true)
                                            firebase.firestore().collection(user.uid + "likes").add({
                                                productname:productview.itemname,
                                                image:productview.image,
                                                adId: productview.adId,
                                                timestamp: fb.firestore.FieldValue.serverTimestamp()
                                            }).then(()=>{
                                                console.log("liked");
                                            })
                                        }
                                    }} />
                                </div>
                            </div>

                            <div className="relative border block md:hidden border-gray-400 p-4 mb-2">

                                    <h1 className="text-2xl font-bold">Description</h1>
                                    <p>{productview.description}</p>

                            </div>


                            <div className="relative border border-gray-400 p-4 mb-2">
                                <h1 className="text-2xl" >Seller Information</h1>
                                <div className="pt-2 flex items-center"><Avatar className="mr-2">{productview.selleremail[0]}</Avatar>{productview.sellername}</div>
                                <div className="pt-3 flex items-center"><CallIcon className="mx-2" />
                                    {user ? <p>+91 {productview.sellerphone}</p> : <p>+91 xxxxx-xxxxx</p>}
                                </div>
                                <div className="pt-3 flex items-center"><CallIcon className="mx-2" />
                                    {user ? <p>+91 {productview.selleraltphone}</p> : <p>+91 xxxxx-xxxxx</p>}
                                </div>
                                <div className="pt-3 flex items-center"><MailOutlineIcon className="mx-2" />
                                    {user ? <p>{productview.selleremail}</p> : null}
                                </div>
                                {!user ? <p className="pl-3 pt-2 italic hover:text-blue-500 cursor-pointer underline font-light" onClick={handlelogin}>Login to view</p> : null}
                            </div>
                            <Mailsection productname={productview.itemname} adId={productview.adId} selleraccount={productview.selleraccount} sellername={productview.sellername} />
                            <div className="relative border border-gray-400 p-4 mb-2">
                                <h1 className="text-2xl" >Posted In</h1>
                                <h1 className="text-sm font-light pt-2" >{productview.location}</h1>
                                <div className="z-40 relative pt-2 mb-4 rounded-xl w-full h-64 bg-white  ">
                                    <ReactMapGL mapStyle={"mapbox://styles/vijayskk/ckpqo11wo24jk17o3fqjdt5h3"} {...viewport} latitude={productview.coords[0]} longitude={productview.coords[1]} mapboxApiAccessToken={"pk.eyJ1IjoidmlqYXlza2siLCJhIjoiY2twcWcxY283MzRmajJxbXdsa3FwODg3NiJ9.Uqv_gS4gAaCjXtMaaZ0jBg"} />
                                </div>
                            </div>

                            {componentsmall}


                            <div className="w-full ml-2 mb-10 relative">
                                <h1 className="text-lg  font-bold">AD ID {productview.adId}</h1>
                                <div className="absolute -mt-11  right-2"><IconButton onClick={()=>{setreportadbox(true)}} ><Button className=" focus:outline-none " variant="primary">REPORT THIS AD</Button></IconButton></div>
                                <ReportAd  open={reportadbox} setOpen={setreportadbox}
                                adId={productview.adId}
                                productname={productview.itemname}
                                fbid={productview.fbid}
                                sellername={productview.sellername}
                                selleremail={productview.selleremail}

                                />
                            </div>
                            
    
                        </div>
                    </div>
                    <div className="w-1/2 m-2 hidden md:block ">
                        <div className="relative border border-gray-400 p-4 mb-2">
                            <h1 className="text-2xl font-bold">Description</h1>
                            <p>{productview.description}</p>
                        </div>
                    </div>
                    {componentbig}
                    {(user && user.uid !== productview.selleraccount)?<Addcomment adId={productview.adId}  />:null}
                    {user?<Comments adId={productview.adId} selleraccount={productview.selleraccount} />:null}
                <div/>
            </div>
            </>
        )
    }else{
        handlehome();
        return null
    }


}

export default Viewproduct
