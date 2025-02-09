import React from 'react'
import Navbar from '../components/Layout/Navbar'
import Footer from '../components/Layout/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main><Outlet/></main>
      <Footer/>
    </div>
  )
}

export default MainLayout
