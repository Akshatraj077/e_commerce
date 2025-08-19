import React from 'react'
import {NavLink} from 'react-router-dom'
import {assets} from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-2xl'} to={'/Add'}>
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>ADD ITEM</p>
            </NavLink>
            <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-2xl'} to={'/List'}>
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>LISTED ITEMS</p>
            </NavLink>
            <NavLink className={'flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-2xl'} to={'/Orders'}>
                <img className='w-5 h-5' src={assets.parcel_icon} alt="" />
                <p className='hidden md:block'>ORDERS</p>
            </NavLink>

        </div>
    </div>
  )
}

export default Sidebar