import { useEffect, useState } from "react"
import Product from "./Product"
import firebase from '../firebase'

function ProductFeed() {
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
    return (
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
    )
}

export default ProductFeed
