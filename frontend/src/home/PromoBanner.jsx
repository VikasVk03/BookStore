import React from 'react'
import { Link } from 'react-router-dom'
import bookPic from '../assets/awardbooks.png'

const PromoBanner = () => {
  return (
    <div className='mt-16 bg-teal-100 px-4 lg:px-24'>
        <div>
            <div className='md:w-1/2'>
                <h2 className='text-4xl font-bold mb-6 leading-snug'>2025 National Book Awards for Fiction Shortlist</h2>
                    <Link to="/shop" className='mt-8  block' ><button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Get Promo Code</button></Link>
            </div> 3.19.00

            <div>
                <img src={bookPic} alt=""  />
            </div>
        </div>
    </div>
  )
}

export default PromoBanner