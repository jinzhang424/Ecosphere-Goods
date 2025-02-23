import React from 'react'

const AboutUsSection = () => {
    return (
        <section className='p-24 pl-32 pr-32'>
            <div className='grid grid-cols-2 w-full border-b-2 border-dark-brown gap-8 pb-24 border-opacity-20'>
                <img 
                    className='object-cover max-h-80 w-full'
                    src="https://images.unsplash.com/photo-1617280254959-d8c68085594b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="" 
                />
                
                <div className='flex flex-col gap-4'>
                    <header className='font-bold text-header text-dark-brown'>About Us</header>
                    <p>At Ecofriendly Goods, we make sustainable living simple. Our eco-friendly, locally sourced products help you reduce waste and shop responsibly. Every purchase supports a greener future!</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUsSection
