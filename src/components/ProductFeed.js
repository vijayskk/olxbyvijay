import { useContext, useEffect, useState } from "react"
import Product from "./Product"
import firebase from '../firebase'
import { UserLocation } from "../contexts/AppContext"
import ProductSpecial from "./ProductSpecial"

function ProductFeed({usercoords}) {
    const [products, setproducts] = useState([])
    useEffect(()=>{
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
    },[])
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
    return (
        <>
        {!(usercoords[0] === 0 && usercoords[1] === 0)?<div className="bg-gray-200 mt-6 rounded-2xl" >
        <h1 className="text-4xl pl-4 pt-4">Deals near you</h1>    
        <div className="grid grid-flow-row-dense md:grid-cols-2 bg-gray-200 rounded-2xl lg:grid-cols-3 xl:grid-cols-4  mx-auto" >
        
        {   
            products.map((obj)=>{
                const productdistance = getDistanceFromLatLonInKm(usercoords[0],usercoords[1],obj.coords[0],obj.coords[1])
                console.log(productdistance);
                if(productdistance < 10){
                    return (
                        <>
                        
                        <ProductSpecial
                            key={obj.id}
                            fbid={obj.id}
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
                        </>
                    )
                }


            })
        }


        
    </div>
    </div>:null}
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
            {
                products.map((obj)=>{
                    
                    return (
                        
                        <Product
                            key={obj.id}
                            fbid={obj.id}
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

                })
            }


            
        </div>
        </>
    )
}

export default ProductFeed
