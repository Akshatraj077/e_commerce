import React from 'react'
import Title from '../components/Title'
import NewsLetter from '../components/NewsLetter'
import {assets} from '../assets/assets'

const About = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'}/>
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img src={assets.about_img} className='w-full md:max-w-[450px]' alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus accusantium deserunt ratione maiores expedita nemo excepturi nihil explicabo commodi dolore, ipsa doloremque ipsum officiis consequuntur debitis esse ex rem illo molestiae. Vitae ea omnis repudiandae fugiat, ab, dolorem nesciunt, quasi dignissimos dolore quaerat optio! Voluptates tempore asperiores quasi perspiciatis explicabo.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, voluptatem pariatur dolore ipsum cupiditate in voluptatum molestiae quos explicabo rerum expedita suscipit aspernatur mollitia facilis, labore quasi dolor, rem magni.</p>
            <b className='text-gray-700'>Our Mission</b>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam, porro a vitae quis voluptatibus expedita laboriosam fugit magni molestias voluptatum!</p>
          </div>
        </div>

        <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border flex flex-col px-10 md:px-16 py-8 sm:py-20 gap-5'>
            <b>Quality Assurance</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam porro sunt ex vitae deleniti, quibusdam ea aperiam eius ab!</p>
          </div>
          <div className='border flex flex-col px-10 md:px-16 py-8 sm:py-20 gap-5'>
            <b>Convinience</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam porro sunt ex vitae deleniti, quibusdam ea aperiam eius ab!</p>
          </div>
          <div className='border flex flex-col px-10 md:px-16 py-8 sm:py-20 gap-5'>
            <b>Exceptional Customer Service</b>
            <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam porro sunt ex vitae deleniti, quibusdam ea aperiam eius ab!</p>
          </div>
        </div>

        <NewsLetter />
    </div>
  )
}

export default About