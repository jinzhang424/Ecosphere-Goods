import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SpecialItems from '../components/SpecialItems'
import ClimateFacts from '../components/ClimateFacts'

function HomePage() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <SpecialItems/>
      <ClimateFacts></ClimateFacts>
      <a href="https://lordicon.com/">Icons by Lordicon.com</a>
    </div>
  )
}

export default HomePage
