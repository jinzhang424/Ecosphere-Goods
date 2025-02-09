import React from 'react'
import FactCard from './FactCard'
import Grocery from '../data/images/Grocery.gif'
import Plant from '../data/images/Plant.gif'
import SolarPanel from '../data/images/SolarPanel.gif'

const ClimateFacts = () => {
  return (
    <div className="flex bg-dark-brown p-24">
        <FactCard img={ Grocery } header='Lorem Ipsum' bodyText='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum'/>
        <FactCard img={ Plant } header='Lorem Ipsum' bodyText='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum' border="border-l-2 border-r-2 border-off-white"/>
        <FactCard img={ Plant } header='Lorem Ipsum' bodyText='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum'/>
        <FactCard img={ Plant } header='Lorem Ipsum' bodyText='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum' border="border-l-2 border-r-2 border-off-white"/>
        <FactCard img={ SolarPanel } header='Lorem Ipsum' bodyText='Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum'/>
    </div>
  )
}

export default ClimateFacts
