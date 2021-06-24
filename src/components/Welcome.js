import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header'


function Welcome({warning , login,setwelcomescreenstate}) {
    const history = useHistory()
    const handleClose = () =>{
        setwelcomescreenstate(false)
    } 
    const handleLogin = () =>{
        history.push('/login')
    }
    return (
        <div className="w-full">
    
        <div className="border-2 mx-4 mt-10 mb-10 md:mx-0 md:mt-32  welcomebg absolute z-50 rounded-2xl border-black ">

            <div className="py-12 bg-white rounded-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                <img src="olx-logo-new.png"  className="tracking-wide w-32 mx-auto"/>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    A better way to sell your good old things
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                    Here you can sell or buy used products
                </p>
                </div>

                <div className="mt-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Simplicity loaded</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                        Our systems are quiete simple to use,with a few clicks you can earn from your old things and you can find better secondhand deals.
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Select your location first</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                        Please choose your location from the selector located at the top left corner.
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Make your deal</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                        if you wants to buy a product,you can simply send an olx mail with the 'I need this!' button.Then the seller can contact you via selected methods
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Find it before the clock</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                        We are using algolia search engine which finds your desired product blazing fast.In the search result page you can also sort by your location. 
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Report An ad if needed</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                        If the seller made you annoying,feel free to report him.Also keep your manners if you are a seller.
                    </dd>
                    </div>

                    <div className="relative">
                    <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Anything went wrong?</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">
                        You can simply talk to our customer service anytime and report your problem.Also feel free to support us
                    </dd>
                    </div>
                </dl>
                
                </div>
                
            </div>
            <p className="pl-10 pt-4 -mb-6 text-lg italic md:inline hidden font-light " >{warning}</p>
            <button className="float-right mr-6 bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white rounded-xl  -mt-2 focus:outline-none" onClick={handleClose}>Close</button>
            {login?<button className="float-right mr-6 bg-blue-600 hover:bg-blue-500 px-4 py-2 text-white rounded-xl -mt-2 focus:outline-none" onClick={handleLogin}>Login or Signup</button>:null}
            </div>
            
        </div>
        </div>
    )
}

export default Welcome
