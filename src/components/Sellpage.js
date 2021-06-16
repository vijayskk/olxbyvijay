import React, { useContext, useState } from 'react'
import Header from './Header'
import { BrowserRouter as Router,useHistory} from 'react-router-dom' 
import Selllocationpicker from './Selllocationpicker';
import {SellerCoords,SellerLocation} from '../contexts/SellerLocation'
import Button from '@material-ui/core/Button';
import emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';
import { useForm } from 'react-hook-form'
import firebase,{storage,auth} from '../firebase'
import { Carousel } from 'react-responsive-carousel';
import { UserLocation } from '../contexts/UserLocation';
import {useAuthState} from 'react-firebase-hooks/auth'


init("user_fm349qWlPJEXaS89wDWdN");
var otpGenerator = require('otp-generator')
function Sellpage() {
    var adId
    const [user] = useAuthState(auth)
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [sellerlocation, setsellerlocation] = useContext(SellerLocation);
    const [sellercoords, setsellercoords] = useContext(SellerCoords);
    const [selleremail, setselleremail] = useState()
    const [sellerOtp, setsellerOtp] = useState()
    const [formerror, setformerror] = useState("")
    const [confirmedemail, setconfirmedemail] = useState()
    const [emailsendstatus, setemailsendstatus] = useState("Enter email and click 'SEND CODE'");
    const [sendbtnstatus, setsendbtnstatus] = useState(true)
    const [image1state, setimage1state] = useState("Upload image")
    const [image2state, setimage2state] = useState("Upload image")
    const [image3state, setimage3state] = useState("Upload image")
    const [image1, setimage1] = useState()
    const [image2, setimage2] = useState()
    const [image3, setimage3] = useState()
    const [image4, setimage4] = useState()
    const [sellbtnstate, setsellbtnstate] = useState(true)
    if (!user) {
        history.push('/login')
    }
    const getCode = () =>{
        setemailsendstatus("Please wait...Sending")
        setsendbtnstatus(false)
        setInterval(()=>{setsendbtnstatus(true);},60000)
        var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets:false });       
        setsellerOtp(otp)
        console.log(otp);
        setconfirmedemail(selleremail)
        // emailjs.send("service_ododzue","template_huww71t",{
        //     vcode: otp,
        //     email: selleremail,
        //     }).then(()=>{
        //         setsellerOtp(otp)
        //         setconfirmedemail(selleremail)
        //         setemailsendstatus("Code Sent! Check your inbox and spambox")
        //     })

    }   
    const onSubmit =async(data)=>{
        
        if(sellercoords[0] === 0 && sellercoords[1] === 0){
            setformerror("Please Chose a location")
        }else if(data.category === "notchose"){
            setformerror("Please Chose a category")
        }else if(!(data.sellerphone.length === 10)){
            setformerror("Please check your mobile number")
        }else if(!(data.selleraltphone.length === 10)){
            setformerror("Please check your Alternate mobile number")
        }else if(!(data.vcode === sellerOtp)){
            setformerror("Incorrect Verification Code")
        }
        else{
            setsellbtnstate(false)
            setformerror("Please Wait....")
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            var firstimage
            var secondimage
            var thirdimage
            var fourthimage
            today = mm + '/' + dd + '/' + yyyy;
            adId = otpGenerator.generate(10, { upperCase: false, specialChars: false, alphabets:false });
            try {
                await storage.ref(`images/${adId}first.jpg`).put(image1).then(({ref})=>{
                    ref.getDownloadURL().then((url)=>{
                        firstimage = url
                    })
                });
                await storage.ref(`images/${adId}second.jpg`).put(image2).then(({ref})=>{
                    ref.getDownloadURL().then((url)=>{
                        secondimage = url
                    })
                });
                await storage.ref(`images/${adId}third.jpg`).put(image3).then(({ref})=>{
                    ref.getDownloadURL().then((url)=>{
                        thirdimage= url
                    })
                });
                await storage.ref(`images/${adId}fourth.jpg`).put(image4).then(({ref})=>{
                    ref.getDownloadURL().then((url)=>{
                        fourthimage= url
                    })
                });
            } catch (error) {
                console.log(error);
                setsellbtnstate(true)
                setformerror("Something went wrong,cant submit..")
            }
            const adData = {
                adId:adId,
                name:data.name,
                price:data.price,
                category:data.category, 
                description:data.description,
                location:sellerlocation,
                coords:sellercoords,
                selleraccount:user.uid,
                selleremail: confirmedemail,
                sellername:data.sellername,
                sellerphone:data.sellerphone,
                selleraltphone:data.selleraltphone,
                selleraddress:data.selleraddress,
                createdDate: today,
                images:[firstimage,secondimage]
            }
            console.log(adData);
            try {
                firebase.firestore().collection('ads').add(adData).then(()=>{
                    history.push('/')
                }) 
            } catch (error) {
                console.log(error);
                setsellbtnstate(true)
                setformerror("Something went wrong,cant submit..")
            }
  
        }
    }
    return (
        <>
        <Header />
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl uppercase p-2 pt-6 font-extrabold">Item Details</h1>
        <div className="w-full">
            <div className="md:flex"> 
                <div className="h-96 relative mx-10 md:mx-0 md:w-1/2 m-2 border-2 overflow-hidden border-black rounded-b-2xl ">
                    <div className="h-72">
                        <Carousel stopOnHover={false} preventMovementUntilSwipeScrollTolerance={false} showThumbs={false} showStatus={false} emulateTouch={true} interval={500} infiniteLoop={true} autoPlay={true}>
                                    <div>
                                        <img src={image1?URL.createObjectURL(image1):"noimage.png"} alt="imagehere" width="550px" height="300px" />

                                    </div>
                                    <div>
                                        <img src={image2?URL.createObjectURL(image2):"noimage.png"} alt="imagehere" width="550px" height="300px" />

                                    </div>

                        </Carousel>
                    </div>
                    <div className="h-20 items-center flex w-full absolute bottom-0 border-2 border-black rounded-2xl">
                        <input type="file" id="image1" hidden onChange={(e)=>{
                            setimage1state("🏁Uploaded")
                            setimage1(e.target.files[0])
                            
                        }}/>
                        <div className="  w-1/2 flex h-full items-center "><label className="mx-auto bg-blue-600 p-2 rounded-2xl text-white" htmlFor="image1">{image1state}</label></div>
                        <input type="file" id="image2" hidden onChange={(e)=>{
                            setimage2state("🏁Uploaded")
                            setimage2(e.target.files[0])
                        }}/>
                        <div className="  w-1/2 flex h-full items-center "><label className="mx-auto bg-blue-600 p-2 rounded-2xl text-white" htmlFor="image2">{image2state}</label></div>
                       
                    </div>
                </div>
                <div className="h-96 md:w-1/2  " >
                    <div className="m-6 md:m-2"> 
                        

                            <div className="flex relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black">
                                <input placeholder="Item name" className="pl-2 flex sellinput mr-4 focus:outline-none" type="text" required {...register("name")} />
                            </div>

                            <div className="flex relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black">
                                <input placeholder="Expected Price" className="pl-2 sellinput mr-4 focus:outline-none" type="number" required {...register("price")}  />
                            </div>


                            <textarea name="" className="mx-2 p-2 focus:outline-none border-2 border-black" placeholder="A quick description" id="" style={{width:"97%"}} cols="25" rows="5" required {...register("description")} ></textarea>
                            <Selllocationpicker />
                            <select placeholder="Select an item" className="flex p-2 bg-white relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black" name="" id="" required {...register("category")} >
                            <option value="notchose" default>Select a category</option>
                                <option value="cars">Cars</option>
                                <option value="bikes">Bikes</option>
                                <option value="home appliances">Home Appliances</option>
                                <option value="mobile">Mobile Phones</option>
                                <option value="electronics">Electronics</option>
                            </select>
                       
                    </div>
                    
                </div>
            </div>


        </div>
        <div className="border-gray-500 border-2 mt-4"></div>
        <div className="w-full mx-6 md:mx-0">
            <h1 className="-ml- md:-ml-0 text-4xl uppercase p-2 pt-6 font-extrabold">Personal Details</h1>
            products.data          <div className=" flex pl-2 mr-10 md:w-1/3 relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black">
                                
                                <input placeholder="Full Name" className="pl-2 flex sellinput mr-4 focus:outline-none" type="text" required {...register("sellername")} />
                            </div>
                            <div className="flex mt-6 pl-2  mr-10 md:mr-0 md:w-1/3 relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black">
                                +91
                                <input placeholder="Mobile number" className="pl-2 flex sellinput mr-4 focus:outline-none" type="number" required {...register("sellerphone")} />
                            </div>
                            <div className="flex mt-6 pl-2 mr-10 md:w-1/3 relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black">
                                +91
                                <input placeholder="Alternate Phone number" className="pl-2 flex sellinput mr-4 focus:outline-none" type="number" required {...register("selleraltphone")} />
                            </div>
                            <div className="flex mt-6 pl-2 mr-10 md:w-1/2 relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black">
                                
                                <input placeholder="Email Address" onChange={(e)=>{
                                    setselleremail(e.target.value)
                                }} className="md:pl-2 flex sellinput mr-4 focus:outline-none" type="email" />
                                <Button disabled={!sendbtnstatus} onClick={getCode} className="w-52 focus:outline-none md:w-32"  color="primary"><p>SEND CODE</p></Button>
                            </div>
                            <p className="pl-2 text-red-400">{emailsendstatus}</p>
                            <div className="flex mt-6 pl-2 w-3/4 md:w-1/3 relative border-2 h-10 m-2 rounded-sm items-center flex-grow  border-black">
                                OLX-
                                <input placeholder="Verification Code" className="pl-2 flex sellinput mr-4 focus:outline-none" type="number" required {...register("vcode")} />
                            </div>
                            <textarea name="" className="mt-6 mx-2 md:w-1/2 p-2 focus:outline-none border-2 border-black" placeholder="Home Address" id=""  cols="25" rows="5" required {...register("selleraddress")} ></textarea>

        </div>
        {formerror}
        <div className="w-full"><button disabled={!sellbtnstate} className="w-1/2 md:w-full mx-4 h-10 mb-10 text-2xl mt-10 text-white focus:outline-none bg-green-800">Sell</button></div>
        </form>
        </>
    )
}

export default Sellpage
