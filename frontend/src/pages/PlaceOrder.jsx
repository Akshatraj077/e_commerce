import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets, products } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('COD')
  const {products, delivery_fee, token, backendURL, navigate, getCartAmount, CartItems, setCartItems} = useContext(ShopContext)
  const [FormData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipCode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data, [name]:value}))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {

      let orderItems = []
      for(const items in CartItems){
        for(const item in CartItems[items]){
          if(CartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = CartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      let orderData = {
        address: FormData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch(method){
        case 'COD':
          const response = await axios.post(backendURL + '/Api/Order/Place', orderData, {headers: {token}})
          if(response.data.success){
            setCartItems({})
            navigate('/Orders')
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'Razorpay':
          toast.info('Online payment integration in progress until then please use COD!', {autoClose: 10000})
          break;
          
        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col w-full gap-4 sm:max-w-[480px]'>

        <div className='text-xl my-3 sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>

        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={FormData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='lastName' value={FormData.lastName} type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <input required onChange={onChangeHandler} name='email' value={FormData.email} type="email" placeholder='Email ID' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        <input required onChange={onChangeHandler} name='street' value={FormData.street} type="text" placeholder='Street, House no.' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={FormData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='state' value={FormData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipCode' value={FormData.zipCode} type="number" placeholder='ZipCode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
          <input required onChange={onChangeHandler} name='country' value={FormData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>
        </div>
        <input required onChange={onChangeHandler} name='phone' value={FormData.phone} type="number" placeholder='Phone-Number' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'/>

      </div>

      {/* Right Side */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* Payment Method */}
          <div className='flex gap-3 flex-col sm:flex-row'>
            <div onClick={() => {setMethod('Razorpay')}} className='flex items-center cursor-pointer border gap-3 p-2 px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'Razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
            </div>
            <div onClick={() => {setMethod('COD')}} className='flex items-center cursor-pointer border gap-3 p-2 px-3'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'COD' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>

        </div>
      </div>

    </form>
  )
}

export default PlaceOrder