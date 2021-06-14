import React, {useContext} from 'react'
import Banner from './Banner'
import Header from './Header'
import ProductFeed from './ProductFeed'
import {UserLocation} from '../contexts/UserLocation'
function Home() {
    const [usercoords,setusercoords] = useContext(UserLocation)
    console.log(usercoords);
    return (
        <>
        <Header />
            {/* Banner */}
            <Banner />
            {/* ProductFeed */}
            <ProductFeed />
        </>
    )
}

export default Home
