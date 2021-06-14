import React,{useState,useContext} from 'react'
import ReactMapGL ,{Marker} from 'react-map-gl'
import {SellerLocation,SellerCoords} from '../contexts/SellerLocation'
const axios = require('axios');


function Selllocationdrawer({setdrawerview , setselectedlocation}) {
    const [querydata, setquerydata] = useState("Search for the place");
    const [sellerlocation, setsellerlocation] = useContext(SellerLocation);
    const [sellercoords, setsellercoords] = useContext(SellerCoords);
    const searchLocation = (word) =>{
        const apikey = "pk.eyJ1IjoidmlqYXlza2siLCJhIjoiY2twcWcxY283MzRmajJxbXdsa3FwODg3NiJ9.Uqv_gS4gAaCjXtMaaZ0jBg"
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${word}.json?autocomplete=true&types=place&access_token=${apikey}`).then((data)=>{
            if (data.data.features.length) {
                setquerydata(data.data.features[0].place_name);
                setviewport({
                    latitude: data.data.features[0].geometry.coordinates[1],
                    longitude: data.data.features[0].geometry.coordinates[0],
                    width: '100%',
                    height:'40%',
                    zoom : 10,
                })
            }else{
                setquerydata("No Places Found");
            }

        })
    }
    const [viewport, setviewport] = useState({
        latitude: 0,
        longitude: 0,
        width: '100%',
        height:'40%',
        zoom : 10,
    })
    return (
        <>
        <div className="z-50 border-2 border-black rounded-md absolute top-10 w-60 h-64 bg-white overflow-y-scroll drawerscroll">
            <ReactMapGL mapStyle={"mapbox://styles/vijayskk/ckpqo11wo24jk17o3fqjdt5h3"} onViewportChange={(newviewport)=>{setviewport(newviewport)}} {...viewport} mapboxApiAccessToken={"pk.eyJ1IjoidmlqYXlza2siLCJhIjoiY2twcWcxY283MzRmajJxbXdsa3FwODg3NiJ9.Uqv_gS4gAaCjXtMaaZ0jBg"}>
                    <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 -mt-6 -ml-3 w-8" fill="none" viewBox="0 0 24 24" stroke="red">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Marker>
                </ReactMapGL>
                <div className="">
                    <input type="text" placeholder="Search for location" className="focus:outline-none mt-2 h-10 pl-2 rounded-lg bg-gray-200" onChange={(e)=>{
                        if (e.target.value) {
                            searchLocation(e.target.value)
                        }
                        else{
                         setquerydata("Search for the place")   
                        }
                    }} />
                    <div className="h-10 items-center flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 ml-2 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="cursor-pointer pl-2" onClick={()=>{
                            setselectedlocation(querydata)
                            setsellerlocation(querydata)
                            setsellercoords([viewport.latitude , viewport.longitude])
                            setdrawerview(false);
                        }}>{querydata}</p>
                        
                    </div>
                    <div className="h-10 items-center flex">
                        <p className="pl-8 pt-10 text-sm font-light italic ">Please leave space after words</p>
                    </div>
                   
                    
                    
                   
                </div>
            </div>
        </>
    )
}

export default Selllocationdrawer
