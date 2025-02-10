import React from 'react'

const SaleBanner = () => {
  return (
    <div className="bg-dark-brown pt-48 pb-24 relative">
        <div className='mr-auto ml-auto rounded-3xl w-10/12 h-80 bg-cover bg-center bg-tint bg-blend-multiply'
          style={{ 
            backgroundImage: "url('https://cdn.prod.website-files.com/63ff7c6ecc83f9ec7ffe916b/67103d8084525c8a632a5cb3_663e61f0badefabc0ce64961_sustainableproducts-ezgif.com-png-to-webp-converter.webp')",
          }}
        />
        <h1 className="absolute top-40 left-24 m-16 text-off-white text-LHeader font-header">Get 15% off in our upcoming sale!</h1>
    </div>
  )
}

export default SaleBanner
