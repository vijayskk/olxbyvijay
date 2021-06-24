import React, {useContext, useState} from 'react'
import Banner from './Banner'
import Header from './Header'
import ProductFeed from './ProductFeed'
import {UserLocation} from '../contexts/UserLocation'
import {auth} from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Welcome from './Welcome'

function Home() {
    const [user] = useAuthState(auth)
    const [usercoords,setusercoords] = useContext(UserLocation)
    const [welcomescreenstate, setwelcomescreenstate] = useState(true)
    var component
    // if (user) {
    //   if (user.metadata.creationTime === user.metadata.lastSignInTime) {
    //      component = <h1>new one</h1>
    //   }
    // }
    
    return (
        <>
        <Header />
        {welcomescreenstate?<div>
        {(user && (user.metadata.creationTime === user.metadata.lastSignInTime))?<Welcome setwelcomescreenstate={setwelcomescreenstate} login={false} warning={""} />:null}
        {!user? <Welcome setwelcomescreenstate={setwelcomescreenstate} login={true} warning={"Please login to dont show this again"} />:null}
        </div>:null}
            {component}
            {/* Banner */}
            <Banner />
            
            {/* ProductFeed */}
            <ProductFeed usercoords={usercoords} />
        </>
    )
}

export default Home
