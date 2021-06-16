import React from 'react'
import LocationPicker from './LocationPicker'
import SearchBox from './SearchBox'
import { BrowserRouter as Router,useHistory} from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from '../firebase'

function Header() {
    const [currentUser] = useAuthState(auth)
    const history = useHistory();
    const handlehistory = () =>{
        history.push('/sell')
    }
    const handlehome = () =>{
        history.push('/')
    }
    const handleSignup = () =>{
        history.push('/signup')
    }
    const handleLogin = () =>{
        history.push('/login')
    }
    const handleMyads = () =>{
        history.push('/myads')
    }
    const handlelogout = () =>{
        auth.signOut()
    }

    return (

        <div>
            <header className="flex h-16 items-center flex-grow xl:px-32 ">
            <img className="md:ml-6 h-10 pr-2 md:mr-2 ml-2 " src = "olx-logo-new.png" alt="OLX" onClick={handlehome}/>
                <LocationPicker />
                <SearchBox />
               {!currentUser?<button onClick={handleLogin} className="focus:outline-none font-extrabold underline md:mx-8 text-sm md:text-lg hidden md:inline">Login</button>:
               <button onClick={handleMyads} className="focus:outline-none font-extrabold underline md:mx-8 text-sm md:text-lg hidden md:inline">Myads</button>
               }
                {!currentUser?<button className="focus:outline-none font-extrabold underline md:mx-4 text-sm md:text-lg hidden md:inline" onClick={handleSignup}>Signup</button> :
                <button onClick={()=>{handlelogout();handleLogin()}} className="focus:outline-none font-extrabold underline md:mx-8 text-sm md:text-lg hidden md:inline">Log Out</button>
                }
                <button onClick={handlehistory} className="hover:border-pink-600  font-bold md:mr-6 border-4 border-yellow-400 mx-2 md-mx-6 my-2 px-2 hidden md:inline rounded-3xl">SELL</button>
                    
                
            </header>
            <div className="h-8 bottomhead  border-b border-gray-200 overflow-scroll items-center flex ">
                <p className="xl:ml-0 ml-4 mr-2 inline md:hidden text-base hover:text-gray-600 font-bold cursor-pointer" onClick={handlehistory}>Sell</p>
                {!currentUser?<p onClick={handleLogin} className="xl:ml-0 ml-4 mr-2 inline md:hidden text-base hover:text-gray-600 font-bold cursor-pointer">Login</p>:
                <p onClick={()=>{handlelogout();handleLogin()}} className="xl:ml-0 ml-4 mr-2 inline md:hidden text-base hover:text-gray-600 font-bold cursor-pointer">LogOut</p>
                }
                {!currentUser?<p className="xl:ml-0 ml-4 mr-2 inline md:hidden text-base hover:text-gray-600 font-bold cursor-pointer" onClick={handleSignup}>Signup</p>:null}
                <p className="xl:ml-0 ml-4 text-base hover:text-gray-600 font-bold cursor-pointer">All</p>
                <p className="mx-6 text-sm hover:text-gray-600 cursor-pointer">Cars</p>
                <p className="mx-6 text-sm hover:text-gray-600 cursor-pointer">Motorcycles</p>
                <p className="mx-6 text-sm hover:text-gray-600 cursor-pointer">Smartphones</p>
                <p className="mx-6 text-sm hover:text-gray-600 cursor-pointer ">Houses&Apartments</p>
                <p className="mx-6 text-sm hover:text-gray-600 cursor-pointer">Scooters</p>
                <p className="mx-6 text-sm hover:text-gray-600 cursor-pointer">Vehicles</p>
                <p className="mx-6 text-sm hover:text-gray-600 cursor-pointer">Houses&Apartments</p>
            </div>
        </div>

    )
}

export default Header
