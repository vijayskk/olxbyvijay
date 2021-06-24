
import Currency from 'react-currency-formatter'
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ProductView } from '../contexts/ProductViewContext';
import { useContext } from 'react';


function ProductSpecial({fbid,adId,itemname,price,category,date,description,image,coords,location,sellerphone,sellername,selleremail,selleraltphone,selleraddress,selleraccount}) {
    const [productview, setproductview] = useContext(ProductView)
    let history = useHistory();
    const handleviewpage = ()=>{
        setproductview({fbid,adId,itemname,price,category,date,description,image,coords,location,sellerphone,sellername,selleremail,selleraltphone,selleraddress,selleraccount})
        history.push(`/product`)
    }
    return (
        <Router>
         
        <div className="product bg-gray-200" onClick={handleviewpage}>
            <div className="border relative border-gray-400 h-80 rounded-sm">
                <div className="z-30 absolute bg-yellow-600 uppercase text-xs rounded-lg text-white p-1 left-2 top-2">featured</div>
                <div className="absolute right-2 top-2 z-30"><FavoriteIcon style={{color:"#f51d5e"}} /></div>
                <div className="h-40"><img className="mx-auto mt-5 mb-4" src={image[0]} alt="" width="200px"/></div>

                <div className="w-full h-auto border-l-8 rounded-lg border-yellow-500">
                    <h1 className="ml-2 text-2xl font-extrabold">₹ {price}</h1>
                    <h1 className="ml-2 font-normal text-lg truncate capitalize">{itemname}</h1>
                    <h1 className="ml-2 line-clamp-1 font-light">{description}</h1>
                    <h1 className="absolute bottom-0 right-0 pr-1 pb-1 pt-3 font-extralight ">{date}</h1>

                </div>
            </div>
        </div>
       
        </Router>
    )
}

export default ProductSpecial
