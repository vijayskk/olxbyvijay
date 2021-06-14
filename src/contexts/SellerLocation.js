import React ,{useState,createContext} from 'react'

export const SellerLocation = createContext()

export const SellerLocationProvider = (props)=>{
    const [sellerlocation, setsellerlocation] = useState("");
    return(
        <SellerLocation.Provider value={[sellerlocation, setsellerlocation]}>
            {props.children}
        </SellerLocation.Provider>
    )
}

export const SellerCoords = createContext()

export const SellerCoordsProvider = (props)=>{
    const [sellercoords, setsellercoords] = useState([0,0]);
    return(
        <SellerCoords.Provider value={[sellercoords, setsellercoords]}>
            {props.children}
        </SellerCoords.Provider>
    )
}