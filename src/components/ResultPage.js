import React, { useState,useContext } from 'react'
import { useEffect } from 'react'
import Header from './Header'
import Product from "./Product"
import algoliasearch from 'algoliasearch'
import {Commentrefresh} from '../contexts/ProductViewContext'


function ResultPage() {
    const [commentrefresh, setcommentrefresh] = useContext(Commentrefresh)
    const [results, setresults] = useState([])
    const [category, setcategory] = useState("")
    const searchClient = algoliasearch("JQZ7F2IQ02","6afe702c9967eb384fa40fded07f815c");
    const searchIndex = searchClient.initIndex('ads')
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
        {(results.length !== 0)?<h1 className="font-light text-xl md:text-4xl pt-4 ml-2" >Found {results.length} Ads from {category}</h1>:<h1 className="font-light text-xl md:text-4xl pt-4 ml-2" >No Ads Found</h1>}
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
        </>
    )
}

export default ResultPage
