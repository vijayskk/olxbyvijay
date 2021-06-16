import React from 'react'
import { useState } from 'react'
import {GoogleLoginButton , FacebookLoginButton , AppleLoginButton} from 'react-social-login-buttons'
import {useHistory} from 'react-router-dom'
import { useForm } from "react-hook-form";
import {provider,auth} from '../firebase'


function Signup() {


    const signInwithgoogle = () => {
        auth.signInWithPopup(provider).catch(alert).then(()=>{
            handleHome();
        })
        }
        

    
    const history = useHistory();
    const handleLogin = () =>{
        history.push('/login')
    }
    const handleHome = () =>{
        history.push('/')
    }

    return (
        <div>
            <div className="relative w-96 md:border-2 border-black rounded-md mx-auto mt-16">
                <img className="w-36 mx-auto mt-6" src="olx-logo-new.png" alt="" srcset="" />
                <div className="p-6 mt-6">
                    
                     <div onClick={signInwithgoogle} className="mb-6 focus:outline-none"><GoogleLoginButton ><span>Signup With Google</span></GoogleLoginButton></div>
                </div>
                
                <a onClick={handleLogin} className="italic ml-2 mb-2 pb-4 hover:text-blue-700 cursor-pointer">Login instead?</a>
            </div>
        </div>
    )
}

export default Signup
