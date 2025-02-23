import React from 'react'
import AboutUsSection from './AboutUsSection'

const AboutUsPage = () => {
    const section1Img = "https://images.unsplash.com/photo-1617280254959-d8c68085594b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const section1Header = "About Us"
    const section1BodyText = "At Ecofriendly Goods, we make sustainable living simple. Our eco-friendly, locally sourced products help you reduce waste and shop responsibly. Every purchase supports a greener future!"

    const section2Img = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const section2Header = "Our Mission"
    const section2BodyText = "We’re committed to making sustainable living simple and accessible. By offering eco-friendly, locally sourced products, we help reduce waste and promote a healthier planet. Every purchase supports a greener future—one step at a time."

    return (
        <div className='border-b-2 border-dark-brown border-opacity-20 bg-off-white'>
            {/**Hero */}
            <div className='flex justify-center items-center bg-dark-brown p w-full overflow-hidden aspect-hero'>
                <header className='absolute text-8xl font-header text-off-white z-10'>About Us</header>

                <div className='inset-0 bg-black opacity-20 h-full'/>

                <img 
                    className='object-cover object-center w-full h-full'
                    src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="" 
                />
            </div>

            <div>
                <AboutUsSection
                    img={section1Img}
                    heading={section1Header}
                    bodyText={section1BodyText}
                    borderBottom={true}
                />

                <AboutUsSection
                    img={section2Img}
                    heading={section2Header}
                    bodyText={section2BodyText}
                    orientation={'right'}
                />
            </div>
        </div>
    )
}

export default AboutUsPage
