import React from 'react'
import Banner from './Banner'
import Header from './Header'
import ProductFeed from './ProductFeed'

function Home() {
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
