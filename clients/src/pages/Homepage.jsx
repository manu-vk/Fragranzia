import React, { useContext, useEffect, useState } from 'react'
import MainBanner from '../components/MainBanner.jsx'
import BrandBanner from '../components/BrandBanner.jsx'
import FastService from '../components/FastService.jsx'
import { assets } from '../assets/assets.js'
import FeaturedCard from '../components/FeaturedCard.jsx'
import { AppContext } from '../context/AppContext.jsx'
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom'


const Homepage = () => {

  const { token } = useContext(AuthContext)
  const { products } = useContext(AppContext)
  const [featured, setFeatured] = useState([])
  const [offerZone, setOfferZone] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    setFeatured(products)

    const offerbase = [...products].sort(
      (a, b) => a.offerPrice - b.offerPrice
    )
    setOfferZone(offerbase)

  }, [products])

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [token]);


  return (
    <>
      <title>Fragranzia Home</title>
      <div className='m-5 py-5'>

        <MainBanner />
        <BrandBanner />
        <FastService />

        <div className='mt-23 flex justify-between items-center'>
          <h1 className='sm:text-[20px] md:text-[25px] lg:text-[35px] font-semibold'>Featured<span> Collections</span></h1>

          <div className='flex gap-2'>
            <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100'>
              <img src={assets.leftArrowIcon} alt="" className='w-5 h-5' />
            </button>
            <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100'>
              <img src={assets.rightArrowIcon} alt="" className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-3 sm:p-3 md:gap-5 md:p-5 lg:gap-6 lg:p-6'>
            {featured.slice(1, 6).map(product => (
              <FeaturedCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        <div className='flex justify-center items-center mt-4 text-center lg:text-2xl md:text-[20px] sm:text-sm'>
          <div className='max-w-md px-4'>
            <p>"It's an art. A craft. A science. At Fragranzia, we're in the business of creating memories that last forever through our fragrances."</p>
          </div>
        </div>

        {/* 3 cards */}
        <div className="mainthreecard md:text-2xl md:font-medium lg:text-3xl lg:font-bold mt-22">
          <div className="mainthreecard-box bg-one active">
            <p className='rotate-270'>New Arrivals</p>
          </div>
          <div className="mainthreecard-box bg-two flex">
            <p className='rotate-270'>Limited Edition</p>
          </div>
          <div className="mainthreecard-box bg-three">
            <p className='rotate-270'>Best Sellers</p>
          </div>
        </div>

        <div className='mt-23 flex justify-between items-center'>
          <h1 className='sm:text-[20px] md:text-[25px] lg:text-[35px] font-semibold'>Explore<span> Categories</span></h1>

          <div className='flex gap-2'>
            <p className='text-decoration-line: underline'>See All</p>
          </div>
        </div>

        {/* Categories section */}
        <div className='flex justify-center'>
          <div className='mt-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4'>
            <div className='flex justify-center items-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full shadow-[0_0_3px_#24242453]'>
              <img src={assets.productTwo} alt="" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30' />
            </div>
            <div className='flex justify-center items-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full shadow-[0_0_3px_#24242453]'>
              <img src={assets.productThree} alt="" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30' />
            </div>
            <div className='flex justify-center items-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full shadow-[0_0_3px_#24242453]'>
              <img src={assets.productFour} alt="" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30' />
            </div>
            <div className='flex justify-center items-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full shadow-[0_0_3px_#24242453]'>
              <img src={assets.productFive} alt="" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30' />
            </div>
            <div className='flex justify-center items-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full shadow-[0_0_3px_#24242453]'>
              <img src={assets.productSix} alt="" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30' />
            </div>
            <div className='flex justify-center items-center w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full shadow-[0_0_3px_#24242453]'>
              <img src={assets.productSixteen} alt="" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30' />
            </div>
          </div>
        </div>

        <div className='mt-23 flex justify-between items-center'>
          <h1 className='sm:text-[20px] md:text-[25px] lg:text-[35px] font-semibold'>Offers<span> Zone</span></h1>

          <div className='flex gap-2'>
            <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100'>
              <img src={assets.leftArrowIcon} alt="" className='w-5 h-5' />
            </button>
            <button className='flex justify-center items-center rounded-full shadow-[0_0_3px_#24242453] w-[30px] h-[30px] hover:bg-gray-100'>
              <img src={assets.rightArrowIcon} alt="" className='w-5 h-5' />
            </button>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-3 sm:p-3 md:gap-5 md:p-5 lg:gap-6 lg:p-6'>
            {offerZone.slice(0, 5).map(product => (
              <FeaturedCard key={product._id} product={product} />
            ))}
          </div>
        </div>

        <div className='homeBottomBanner mt-23 flex items-center justify-between w-full lg:h-[264px] rounded-2xl overflow-hidden p-3'>
          <div className='flex flex-col p-5'>
            <h2 className="md:text-4xl text-2xl font-bold">Elegance in Every Bottle</h2>
            <p>Dicover timeless fragrances crafted for every moment</p>
            <button className="w-1/3 cursor-pointer mt-3 p-2 text-white bg-primary rounded-sm hover:bg-primary-dull transition">Shop Now</button>
          </div>
          <div>
            <img src={assets.productTwenteen} alt="" className='w-[370px] rotate-25' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage
