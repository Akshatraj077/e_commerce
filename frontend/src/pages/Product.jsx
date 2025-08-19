import React, { useContext,useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

  const {productId} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext)
  const [ProductData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = async() => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId])
  

  return ProductData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opcaity-100'>
      {/*product Data */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

          {/*product Images*/}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.5%] w-full'>
              {
                ProductData.image.map((item, index) => (
                  <img onClick={() => setImage(item)} className='w-[24%] sm:mb-3 sm:w-full flex-shrink-0 cursor-pointer' src={item} key={index} alt="" />
                ))
              }
            </div>
            <div className='w-full sm:w-[80%]'>
              <img className='w-full h-auto' src={image} alt="" />
            </div>
          </div>

          {/*product Info*/}
          <div className='flex-1'>
            <h1 className='font-medium text-2xl'>{ProductData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_icon} alt="" />
              <img className='w-3.5' src={assets.star_dull_icon} alt="" />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-4 text-3xl font-medium'>{currency}{ProductData.price}</p>
            <p className='mt-4 text-gray-500 md:w-4/5'>{ProductData.description}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {
                  ProductData.sizes.map((item, index) => (
                    <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : 'border-none'}`} key={index}>{item}</button>
                  ))
                }
              </div>
            </div>
            <button onClick={() => addToCart(ProductData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
            <hr className='sm:w-4/5 mt-8' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 '>
              <p>100% ORIGINAL PRODUCT</p>
              <p>COD AVAILABLE ON THIS PRODUCT</p>
              <p>EASY RETURN AND EXCHANGE AVAILABLE</p>
            </div>
          </div>

        </div>

        {/*Description & review*/}
        <div className='mt-20'>
          <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Reviews (122)</b>     
          </div>
          <div className='flex flex-col gap-4 text-sm border px-6 py-6 text-gray-500'>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa numquam autem modi tempora. Dolorem omnis incidunt aliquid, suscipit magnam ullam architecto nihil cum officiis blanditiis? Porro dolorem veritatis alias quia, sunt ab corporis minima dolore magni voluptas, eum possimus incidunt iure consectetur? Nostrum voluptatem fuga cum! Qui assumenda voluptas incidunt animi sit cum inventore exercitationem pariatur. Labore neque error molestiae?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur at in expedita, omnis itaque similique molestias amet voluptatum veritatis earum.</p>
          </div>
        </div>

        {/*Related Products*/}

        <RelatedProducts category={ProductData.category} subCategory={ProductData.subCategory}/>

    </div>
  ) : <div className='bg-red-300'>Product Not Found</div>
}

export default Product