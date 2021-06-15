import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


function Banner() {
    return (
        <div className="mt-2 max-w-screen-xl mx-auto">
            <Carousel stopOnHover={false} showThumbs={false} showStatus={false} emulateTouch={true} interval={2000} infiniteLoop={true} autoPlay={true}>
                <div>
                    <img src="banner1.png" alt="imagehere" />
                   
                </div>
                <div>
                    <img src="banner1.png" alt="imagehere"  />
                   
                </div>
                <div>
                    <img src="banner1.png" alt="imagehere"  />
                   
                </div>
            </Carousel>
        </div>

    )
}

export default Banner
