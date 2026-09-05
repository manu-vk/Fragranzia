import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Banner from '../components/Banner'
import { Outlet, useLocation } from 'react-router-dom'

const Layouts = () => {
  const location = useLocation();

  const isProfilePage = [
    '/profile',
    '/address',
    '/wishlist',
    '/orders-history'
  ].includes(location.pathname);

  return (
    <>
      <Navbar />
      <Banner />

      <div
        className={
          isProfilePage
            ? 'px-6 py-6'
            : 'px-6 md:px-16 lg:px-20 xl:px-32'
        }
      >
        <Outlet />
      </div>

      {!isProfilePage && <Footer />}
    </>
  )
}

export default Layouts