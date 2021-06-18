import React,{useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from '../firebase'
import { ProductView ,ProductViewProvider } from '../contexts/ProductViewContext'
import { useEffect } from 'react'



function Resultitem({name,image,fbid}) {
    var moredetails
    const history = useHistory()
    const [productview , setproductview] = useContext(ProductView)

    return (
        <ProductViewProvider>
        <div className="p-2 truncate flex space-x-2 bg-gray-100 rounded-lg mb-2" onClick={()=>{

        }}>
            <img src={image} className="w-10 " alt="" srcset="" />
            <p>{name}</p>
        </div>
        </ProductViewProvider>
    )
}

export default Resultitem
