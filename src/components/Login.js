import React from 'react'
import { useState } from 'react'
import {GoogleLoginButton , FacebookLoginButton , AppleLoginButton} from 'react-social-login-buttons'
import {useHistory} from 'react-router-dom'
import {useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import {provider,auth} from '../firebasegoogle'

function Login() {
    const {logIn , currentUser} = useAuth()
    const { register, handleSubmit } = useForm();
    const [error, seterror] = useState("")
    const [loading, setloading] = useState(false)
    async function onSubmit(data){
        setloading(true)
        try{
            await logIn(data.email,data.pass)
            handleHome()
        } catch {
            seterror("Failed to Login")
            setloading(false)
        }
        
    }
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
    const [emaildraw, setemaildraw] = useState(false)
    if (emaildraw) {
        component= <div className="">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <input className="flex p-2 rounded-md border-2 border-black focus:border-red-500 focus:outline-none mb-2 mx-auto" type="email" placeholder="Email" required {...register("email")}/>
                        <input className="flex p-2 rounded-md border-2 border-black focus:border-red-500 focus:outline-none mb-2 mx-auto" type="password" placeholder="Password" required {...register("pass")}/>
                        <p className="flex pl-16 mb-6  font-bold">{error}</p>
                        <button disabled={loading} type="submit" className="flex p-2 w-30 bg-black text-white hover:bg-green-700 mb-6 rounded-md border-2 border-black focus:border-red-500 focus:outline-none  mx-auto">Log in Now</button>
                        </form>
                    </div>
    }
    return (
        <div>
            <div className="relative min-w-0 w-96 md:border-2 border-black rounded-md mx-auto mt-16">
                <img className="w-36 mx-auto mt-6" src="olx-logo-new.png" alt="" srcset="" />
                <div className="p-6 mt-6">
                     <div onClick={signInwithgoogle} className="mb-6 focus:outline-none"><GoogleLoginButton ><span>Login With Google</span></GoogleLoginButton></div>
                     <div className="mt-6 focus:outline-none"><AppleLoginButton onClick={()=>{setemaildraw(true)}} iconSize="0px"  ><span className="ml-4">Login With Email/Password</span></AppleLoginButton></div>
                </div>
                {component}
                <a onClick={handleSignup} className="italic ml-2 mb-2 pb-4 hover:text-blue-700 cursor-pointer">Create an Account?</a>
            </div>
        </div>
    )
}

export default Login