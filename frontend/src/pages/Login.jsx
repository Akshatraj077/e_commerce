import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [CurrentState, setCurrentState] = useState('Sign Up')
  const {token, setToken, backendURL, navigate} = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (CurrentState === 'Login') {

        const response = await axios.post(backendURL + '/Api/User/Login', {email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backendURL + '/Api/User/Register', {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={ onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{CurrentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {CurrentState === 'Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>}
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password?</p>
        {
          CurrentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white px-8 py-2 font-light mt-4'>{CurrentState === 'Login' ? 'Sing In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login