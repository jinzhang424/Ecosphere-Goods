import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SpecialItems from '../components/SpecialItems'
import ClimateFacts from '../components/ClimateFacts'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <div>
      <Hero/>
      <SpecialItems/>
      <ClimateFacts/>
    </div>
  )
}

export default HomePage
