import React from 'react'
import { useContext ,useState , useEffect} from 'react'
import {auth} from '../firebase'
const AuthContext = React.createContext()   


export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvoider({children}){

    const [currentUser, setcurrentUser] = useState()
    const [loading, setloading] = useState(true)
    function signUp(email,password){
       return auth.createUserWithEmailAndPassword(email,password)
    }

    function logIn(email,password){
        return auth.signInWithEmailAndPassword(email,password)
     }

     function logOut(){
        auth.signOut();
     }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            setcurrentUser(user)
            setloading(false)
        })
        return unsubscribe
    },[])


    const value = {
        currentUser,
        signUp,
        logIn,
        logOut
    }
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}