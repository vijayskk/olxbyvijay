import React from 'react'
import { useState } from 'react'
import {GoogleLoginButton , FacebookLoginButton , AppleLoginButton} from 'react-social-login-buttons'
import {useHistory} from 'react-router-dom'
import {provider,auth} from '../firebase'

function Login() { 
    const signInwithgoogle = () => {
        auth.signInWithPopup(provider).catch(alert).then(()=>{
            handleHome();
        })
    };
    
    const history = useHistory();
    const handleSignup = () =>{
        history.push('/signup')
    }
    const handleHome = () =>{
        history.push('/')
    }
    var component

    return (
        <div>
            <div className="relative min-w-0 w-96 md:border-2 border-black rounded-md mx-auto mt-16">
                <img className="w-36 mx-auto mt-6" src="olx-logo-new.png" alt="" srcset="" />
                <div className="p-6 mt-6">
                     <div onClick={signInwithgoogle} className="mb-6 focus:outline-none"><GoogleLoginButton ><span>Login With Google</span></GoogleLoginButton></div>
                     
                </div>
                <a onClick={handleSignup} className="italic ml-2 mb-2 pb-4 hover:text-blue-700 cursor-pointer">Create an Account?</a>
                <button className="float-right mr-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white rounded-xl -mt-6 focus:outline-none" onClick={handleHome} >Skip Signin</button>
            </div>
        </div>
    )
}

export default Login