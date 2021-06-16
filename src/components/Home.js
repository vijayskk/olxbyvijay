import React, {useContext} from 'react'
import Banner from './Banner'
import Header from './Header'
import ProductFeed from './ProductFeed'
import {UserLocation} from '../contexts/UserLocation'
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function Home() {
    const [user] = useAuthState(auth)
    const [usercoords,setusercoords] = useContext(UserLocation)
    console.log(usercoords);
    var component
    if (user) {
     if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        component = <h1>new one</h1>
     }
    }

    return (
        <>
        <Header />
            {/* Banner */}
            <Banner />
            {component}
            {/* ProductFeed */}
            <ProductFeed />
        </>
    )
}

export default Home
