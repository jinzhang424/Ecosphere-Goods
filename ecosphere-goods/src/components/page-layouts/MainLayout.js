import React from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <main><Outlet/></main>
      <Footer/>
    </div>
  )
}

export default MainLayout
