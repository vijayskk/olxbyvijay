import React from 'react'
import algoliasearch from 'algoliasearch'
import { useState } from 'react';
import ResultDrawer from './ResultDrawer';
import { useHistory } from 'react-router-dom'


function AllSearchBox() {
    const history = useHistory()
    const searchClient = algoliasearch("JQZ7F2IQ02","6afe702c9967eb384fa40fded07f815c");
    const searchIndex = searchClient.initIndex('ads')
    const [searchterm, setsearchterm] = useState("")
    const [resultboxstate, setresultboxstate] = useState(false)
    const [result, setresult] = useState([])
    var resultbox

    const handleSearch = async(searchterm) =>{
        try {
            const tempresult = await searchIndex.search(searchterm);
            setresult(tempresult.hits)
        } catch (error) {
            console.log(error);
            setresult([])
        }
        

    }
    const handleallresults = () =>{
        const searchcategory="Search"
        history.push(`/search?searchterm=${searchterm}&category=${searchcategory}`)
    }
    if(resultboxstate){
        resultbox = <ResultDrawer result={result} handleallresults={handleallresults} />
    }else{
        resultbox = null
    }
    return (
        
        <div className="flex relative border-2 h-10 m-2 w-60 min-w-0 rounded-sm items-center flex-grow  border-black">
            {resultbox}
                <input placeholder="Search "  className="pl-2 searchinput mr-4 focus:outline-none" type="text" onChange={(e)=>{
                    if (e.target.value !== "") {
                        setresultboxstate(true)
                        setsearchterm(e.target.value)
                        handleSearch(searchterm);
                    }else{
                        setresultboxstate(false)
                        setsearchterm(e.target.value)
                    }
                }}  onFocus={()=>{
                    if (searchterm !== "") {
                        setresultboxstate(true)
                    }
                    }} onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            handleallresults();
                        }
                    }} />

            
            <div className="md:inline absolute right-0 hidden ml-2 min-w-6  h-10 w-10 p-2 bg-gray-900 " onClick={handleallresults}>
            <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            </div>


        </div>
    )
}
 
export default AllSearchBox
