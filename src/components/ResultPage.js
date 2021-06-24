import React, { useState,useContext } from 'react'
import { useEffect } from 'react'
import Header from './Header'
import Product from "./Product"
import algoliasearch from 'algoliasearch'
import {Commentrefresh} from '../contexts/ProductViewContext'
import { FormControlLabel,Switch } from '@material-ui/core'
import {UserLocation} from '../contexts/UserLocation'


function ResultPage() {
    const [commentrefresh, setcommentrefresh] = useContext(Commentrefresh)
    const [usercoords,setusercoords] = useContext(UserLocation)
    const [results, setresults] = useState([])
    const [category, setcategory] = useState("")
    const searchClient = algoliasearch("JQZ7F2IQ02","6afe702c9967eb384fa40fded07f815c");
    const [locationfilter, setlocationfilter] = useState(false);
    const [locationfilterdisable, setlocationfilterdisable] = useState(false)
    const searchIndex = searchClient.initIndex('ads')
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
    useEffect(async()=>{
        var url_string = window.location.href
        var url = new URL(url_string);
        var searchterm = url.searchParams.get("searchterm");
        var category = url.searchParams.get("category");
        console.log(searchterm);
        try {
            const tempresult = await searchIndex.search(searchterm);
            setresults(tempresult.hits)
            setcategory(category)
        } catch (error) {
            console.log(error);
            setresults([])
        }
    },[commentrefresh])

    return (
        <>
        <Header />
        <div className="max-w-7xl mx-auto">
        
        <FormControlLabel
        className="mt-4"
        control={
          <Switch
            disabled={(usercoords[0] === 0 && usercoords[1] === 0)}
            checked={locationfilter}
            onChange={(e)=>{setlocationfilter(e.target.checked)}}
            name="checkedB"
            color="primary"
          />
        }
        label="Sort by location"
        
      />
      {locationfilter?

      
        <div>
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
                {
                    results.map((obj)=>{
                        const productdistance = getDistanceFromLatLonInKm(usercoords[0],usercoords[1],obj.coords[0],obj.coords[1])
                        console.log(productdistance);
                        if(productdistance < 10){
                        return (
                            
                            <Product
                                key={obj.id}
                                fbid={obj.objectID}
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
        </div>:null}

        <div>
            {(results.length !== 0)?<h1 className="font-light text-xl md:text-4xl pt-4 ml-2" >Found {results.length} Ads from {category} Globaly</h1>:<h1 className="font-light text-xl md:text-4xl pt-4 ml-2" >No Ads Found</h1>}
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  mx-auto">
                {
                    results.map((obj)=>{

                        return (
                            
                            <Product
                                key={obj.id}
                                fbid={obj.objectID}
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
        </div>
        </div>
        </>
    )
}

export default ResultPage
