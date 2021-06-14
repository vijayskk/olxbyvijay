import React,{useState,createContext} from 'react'

export const UserLocation = createContext()

export const UserLocationProvider = (props) =>{
    const [usercoords, setusercoords] = useState([0,0]);
    return (
        <UserLocation.Provider value={[usercoords, setusercoords]}>
            {props.children}
        </UserLocation.Provider>
    ) 
} 