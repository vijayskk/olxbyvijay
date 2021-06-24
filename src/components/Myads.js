import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useContext } from 'react'
import {useAuthState } from 'react-firebase-hooks/auth'
import firebase,{auth} from '../firebase'
import Product from './Product'


function Myads() {
    const [user] = useAuthState(auth)
    const [products, setproducts] = useState([])
    useEffect(()=>{
        try {
            firebase.firestore().collection('ads').get().then((snapshot)=>{
                const allpost = snapshot.docs.map((product)=>{
                    return {
                        ...product.data(),
                        id:product.id
                    }
                })
                console.log(allpost); 
                setproducts(allpost);
            })   
        } catch (error) {
            console.log(error);
        }

    },[])
    return (
        <>
        <Header />
        <div className="max-w-7xl mx-auto">
        
        <h1>My Ads</h1>
        {user.uid}
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
            {
                products.map((obj)=>{
                    if (obj.selleraccount === user.uid) {
                        console.log(obj.selleraccount);
                        return (
                        
                            <Product
                                key={obj.id}
                                adId={obj.adId}
                                itemname={obj.name}
                                price={obj.price}
                                category={obj.category}
                                date={obj.createdDate}
                                description={obj.description}
                                image={obj.images}
                                coords={obj.coords}
                                location={obj.location}
                                sellername={obj.sellername}
                                sellerphone={obj.sellerphone}
                                selleremail={obj.selleremail}
                                selleraltphone={obj.selleraltphone}
                                selleraddress={obj.selleraddress}
                                selleraccount={obj.selleraccount}
                            />
                                
                        )
                    }


                })
            }


            
        </div>
        </div>
        </>
    )
}

export default Myads
