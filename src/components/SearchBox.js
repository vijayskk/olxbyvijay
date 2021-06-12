import React from 'react'

function SearchBox() {
    return (
        <div className="flex relative border-2 h-10 m-2 w-60 min-w-0 rounded-sm items-center flex-grow  border-black">

            <input placeholder="Search " className="pl-2 searchinput mr-4 focus:outline-none" type="text" />
            <div className="md:inline absolute right-0 hidden ml-2 min-w-6  h-10 w-10 p-2 bg-gray-900 ">
            <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

            </svg>
            </div>


        </div>
    )
}

export default SearchBox
