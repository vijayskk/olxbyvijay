import React from 'react'
import {useState} from 'react'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Selllocationdrawer from './Selllocationdrawer';

function Selllocationpicker() {
    
    const [selectedlocation, setselectedlocation] = useState("Select a Location")
    const [drawerview, setdrawerview] = useState(false)
    
    return (

       
     
        <div className="flex relative border-2 h-10 m-2 w-60 rounded-sm items-center  border-black" >
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
            <p className="cursor-pointer truncate mr-7 w-16 sm:w-28 md:w-auto" onClick={()=>{setdrawerview(true)}}>{selectedlocation}</p>
            <div className="absolute right-0 ">
            {!drawerview?<IconButton className="focus:outline-none" onClick={()=>{setdrawerview(true)}}><ArrowDownwardIcon /></IconButton>:null}
              {drawerview?<IconButton className="focus:outline-none" onClick={()=>{setdrawerview(false)}}><ArrowUpwardIcon /></IconButton>:null}
              
            </div>
            {drawerview?<Selllocationdrawer setdrawerview={setdrawerview} setselectedlocation={setselectedlocation} />:null}
        </div>
       

    )
}

export default Selllocationpicker
