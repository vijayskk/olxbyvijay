import { Avatar, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Header from './Header'
import CallIcon from '@material-ui/icons/Call';
import {useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ReactMapGL ,{Marker} from 'react-map-gl'
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import { useEffect } from 'react';
import firebase from '../firebase'
import { idText } from 'typescript';
import { useContext } from 'react';
import { ProductView } from '../contexts/ProductViewContext';
function Viewproduct() {
    window.onbeforeunload = function() {
        alert("Are you sure?")
    }
    const [productview, setproductview] = useContext(ProductView)
    const history = useHistory()
    const handlelogin = () =>{
        history.push('/login')
    }
    const handlehome = () =>{
        history.push('/')
    }
    const {currentUser} = useAuth()
    const [viewport, setviewport] = useState({
        width: '100%',
        height:'100%',
        zoom : 10,
    })  
    if (!(productview === "nodata")) {

        return (
            <>
            <Header />
            <div className="w-full">
                <div className="flex">
                    <div className="h-76 w-1/2 m-2 bg-gray-200">
                        <Carousel dynamicHeight={false} stopOnHover={false} preventMovementUntilSwipeScrollTolerance={false} showThumbs={true} showStatus={false} emulateTouch={true} interval={1100} infiniteLoop={true} autoPlay={false}>
                                            <div>
                                                <img src={productview.image[0]?productview.image[0]:'noimage.png'} alt="Not Found"   />
    
                                            </div>
                                            <div>
                                                <img src={productview.image[1]?productview.image[1]:'noimage.png'} alt="Not Found"  />
    
                                            </div>
                                            <div>
                                                <img src={productview.image[2]?productview.image[2]:'noimage.png'} alt="Not Found"  />
    
                                            </div>
                        </Carousel>
                        </div>
                        <div className="h-96 w-1/3 m-2 " >
                            <div className="relative border border-gray-400 p-4 mb-2">
                                <h1 className="text-2xl font-bold">₹ {productview.price}</h1>
                                <h1 className=" font-normal text-lg truncate capitalize">{productview.itemname}</h1>
                                <h1 className=" line-clamp-1 font-light pb-12">{productview.description}</h1>
                                <h1 className="absolute bottom-4 left-4 font-extralight">{productview.location}</h1>
                                <h1 className="absolute bottom-4 right-4 font-extralight">{productview.date}</h1>
                            </div>
                            <div className="relative border border-gray-400 p-4 mb-2">
                                <h1 className="text-2xl" >Seller Information</h1>
                                <div className="pt-2 flex items-center"><Avatar className="mr-2">{productview.selleremail[0]}</Avatar>{productview.sellername}</div>
                                <div className="pt-3 flex items-center"><CallIcon className="mx-2" />
                                    {currentUser ? <p>+91 {productview.sellerphone}</p> : <p>+91 xxxxx-xxxxx</p>}
                                </div>
                                <div className="pt-3 flex items-center"><CallIcon className="mx-2" />
                                    {currentUser ? <p>+91 {productview.selleraltphone}</p> : <p>+91 xxxxx-xxxxx</p>}
                                </div>
                                <div className="pt-3 flex items-center"><MailOutlineIcon className="mx-2" />
                                    {currentUser ? <p>{productview.selleremail}</p> : null}
                                </div>
                                {!currentUser ? <p className="pl-3 pt-2 italic hover:text-blue-500 cursor-pointer underline font-light" onClick={handlelogin}>Login to view</p> : null}
                            </div>
                            <div className="relative border border-gray-400 p-4 mb-2">
                                <h1 className="text-2xl" >Posted In</h1>
                                <h1 className="text-sm font-light pt-2" >{productview.location}</h1>
                                <div className="z-40 relative pt-2 mb-4 rounded-xl w-full h-64 bg-white  ">
                                    <ReactMapGL mapStyle={"mapbox://styles/vijayskk/ckpqo11wo24jk17o3fqjdt5h3"} {...viewport} latitude={productview.coords[0]} longitude={productview.coords[1]} mapboxApiAccessToken={"pk.eyJ1IjoidmlqYXlza2siLCJhIjoiY2twcWcxY283MzRmajJxbXdsa3FwODg3NiJ9.Uqv_gS4gAaCjXtMaaZ0jBg"} />
                                </div>
                            </div>
                            <div className="w-full mb-10 relative">
                                <h1 className="text-lg  font-bold">AD ID {productview.adId}</h1>
                                <button className="absolute -mt-6 float-right focus:outline-none right-0" variant="primary">REPORT THIS AD</button>
                            </div>
                            
    
                        </div>
                    </div>
                    <div className="w-1/2 m-2  ">
                        <div className="relative border border-gray-400 p-4 mb-2">
                            <h1 className="text-2xl font-bold">Description</h1>
                            <p>{productview.description}</p>
                        </div>
                    </div>
    
            </div>
            </>
        )
    }else{
        handlehome();
        return null
    }


}

export default Viewproduct
