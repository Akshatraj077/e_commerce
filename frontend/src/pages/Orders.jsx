import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

  const {backendURL, token, currency} = useContext(ShopContext)
  const [OrderData, setOrderData] = useState([])

  const loadOrderData = async (e) => {
    try {
      if(!token){
        return null
      }

      const response = await axios.post(backendURL + '/Api/Order/ListOrder',{}, {headers:{token}})
      if(response.data.success){
        const letAllOrderItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            letAllOrderItem.push(item)
          })
        })
        setOrderData(letAllOrderItem.reverse());
      }
      

    } catch (error) {
      
    }
  }

  useEffect(() => {
    loadOrderData()
  },[token])

  return (
    <div className='border-t pt-16'>
        <div className='text-2xl'>
          <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

        <div>
          {
            OrderData.map((item, index) => (
              <div key={index} className='py-4 border-t border-b flex flex-col text-gray-700 md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img src={item.image[0]} className='w-16 sm:w-20 ' alt="" />
                  <div>
                    <p className='text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 text-base mt-1 text-gray-700'>
                      <p>{currency}{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-1'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                    <p className='mt-1'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                  </div>
                </div>
                <div className='flex justify-between md:w-1/2'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{item.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>TRACK ORDER</button>
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default Orders