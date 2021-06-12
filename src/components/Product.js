
import Currency from 'react-currency-formatter'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Product({id,title,description,price,category,image}) {
    let history = useHistory();
  
    
    return (
        <Router>
         
        <div className="product" >
            
            <p className="absolute top-2 right-2 text-xs italic text-gray-500">{category}</p>
            <img loading="lazy" className="mx-auto" src={image} width={200} />

            <h4 className="my-3 text-xl">{title}</h4>



            <p className="text-xs my-2 line-clamp-2">{description}</p>
            
            <div className="mb-3" >
            <Currency quantity={price*100} currency="INR" pattern="##,### !"  />
            </div>


            <button onClick={()=>{history.push("/product")}} className="mt-auto button">Open</button>

        </div>
       
        </Router>
    )
}

export default Product
