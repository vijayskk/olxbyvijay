import React,{createContext,useState} from 'react'

export const ProductView = createContext()

export const ProductViewProvider = (props)=>{
    const [productview, setproductview] = useState({})
    return (
        <ProductView.Provider value={[productview, setproductview]}>
            {props.children}
        </ProductView.Provider>
    )
}
