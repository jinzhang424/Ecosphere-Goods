import React from 'react'

const AboutUsSection = ({ img, heading, bodyText, orientation, borderBottom }) => {
    const rightOriented = orientation === 'right'

    return (
        <section className='pt-20 pl-36 pr-36'>
            <div className={`grid grid-cols-2 w-full gap-8 pb-20 ${borderBottom && 'border-b-2 border-dark-brown border-opacity-20'}`}>
                <img 
                    className={`object-cover object-center max-h-96 w-full ${rightOriented && 'row-start-1 col-start-2'}`}
                    src={img} 
                    alt="" 
                />
                
                <div className='flex flex-col gap-4'>
                    <header className={`font-bold text-header text-dark-brown ${rightOriented && 'row-start-1 col-start-1'}`}>{heading}</header>
                    <p>{bodyText}</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUsSection
