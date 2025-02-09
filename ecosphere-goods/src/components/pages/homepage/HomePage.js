import React from 'react'
import Hero from '../components/page-components/homepage/Hero'
import SpecialItems from '../components/page-components/homepage/SpecialItems'
import ClimateFacts from '../components/page-components/homepage/ClimateFacts'

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
