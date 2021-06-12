import React from 'react'
import Header from './Header'

function Viewproduct() {
    return (
        <>
        <Header />
        <div className="w-full">
            <div className="flex">
                <div className="h-96 w-2/3 m-2 bg-gray-600">image</div>
                <div className="h-96 w-1/3 m-2 " >
                    <div className="bg-yellow-500">price</div>
                    <div className="bg-pink-500">seller</div>
                    <div className="bg-blue-500">posted in</div>
                </div>
            </div>
            <div className="w-2/3 m-2 lg:-ml-2 bg-yellow-700">
                details
            </div>

        </div>
        </>
    )
}

export default Viewproduct
