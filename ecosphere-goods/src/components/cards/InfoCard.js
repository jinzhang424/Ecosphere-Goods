import React from 'react'
import { NavLink } from 'react-router-dom'

const InfoCard = ({ img="", header="", bodyText="", border="" }) => {
  return (
    <div className={`p-8 pb-1 ${border} aspect-climateFactCard flex flex-col justify-between`}>
      <div>
        <img src={img} alt="Grocery" className="h-36 w-36"/>
        <div className="text-off-white">
          <h1 className='font-header text-subtitle'>{ header }</h1>
          <br />
          <p className='text-body'>{ bodyText }</p>
        </div>
      </div>

      <NavLink className="text-off-white font-header">Learn More</NavLink>
    </div>
  )
}

export default InfoCard
