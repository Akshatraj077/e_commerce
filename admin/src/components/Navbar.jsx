import React from 'react'
import {assets} from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
        <img className='w-[max(10%,80px)] ' src={assets.logo} alt="" />
        <button onClick={() => setToken('')} className='bg-gray-600 rounded-full text-white px-5 py-2 sm:px-7 sm:py-2 text-xs sm:text-sm cursor-pointer'>Logout</button>
    </div>
  )
}

export default NavBar