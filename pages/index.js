import React, { useEffect, useState } from 'react'
import { CustomerHeader, CustomerWrapper, LoadingLayout } from '../components'
import { Button } from 'flowbite-react'
import { BiShoppingBag } from 'react-icons/bi'
import Image from 'next/image'
import CustomerLayout from '../components/layout-components/customer-layout'
import DATA from '../utils/DATA'
import { FaArrowRight } from 'react-icons/fa'
import { getAllGallery } from '../services/gallery.services'
import { getAllProduct } from '../services/product.services'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Home = () => {
  const [galleryData, setGalleryData] = useState([])
  const [productData, setProductData] = useState([])

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const loadHandler = async () => {
    setIsLoading(true)
    // fetch agllery
    const gallery_result = await getAllGallery()
    if (gallery_result.success)
      setGalleryData(gallery_result?.data)
    // fetch products
    const products_result = await getAllProduct()
    if (products_result.success)
      setProductData(products_result?.data.filter(d => d.is_featured))
    setIsLoading(false)

  }
  useEffect(() => {
    loadHandler()
  }, [])
  return (
    <CustomerLayout>
      <CustomerWrapper containerClass="p-6 lg:p-16 bg-zinc-100">
        <div className='flex flex-col-reverse lg:flex-row gap-10 items-center my-4'>
          <div className='flex flex-col gap-4 w-full'>
            <h2 className='font-bold text-4xl'>Customize your very own merchandise!</h2>
            <h3 className=' text-lg'>Have you ever wanted to create and wear your own designs on your shirts? Be able to show your feelings through your art? Try our very own customization and print your own designs now!</h3>
            <div>
              <Button color="failure" size="lg" className='font-bold'>
                <Link href="https://tintartcustomize.vercel.app/" target="_blank">
                  Start Customizing
                </Link>
                <FaArrowRight color='white' className='ml-2 text-xl' />
              </Button>
            </div>
          </div>
          <div className='flex w-full items-center justify-center'>
            <div className='lg:flex-shrink-0 aspect-square lg:max-h-[20rem] lg:min-h-[20rem]'>
              <img src="/images/about1.png" className='object-cover w-full h-full rounded-xl' />
            </div>
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="p-6 lg:p-16">
        <div className='flex flex-col gap-10 min-h-[40rem] items-center justify-center my-4'>
          <h2 className='font-semibold text-center w-full uppercase text-4xl'>Featured Products</h2>
          <LoadingLayout message="There is no product listed!" loadingState={isLoading} hasContent={productData?.slice(0, 4)?.length > 0}>
            <div className='flex items-center justify-center md:flex-row flex-col gap-10 place-items-center '>
              {
                productData?.slice(0, 4).map((item, key) => (
                  <Link href={"/shop/" + item?._id} key={item?._id}>
                    <div className='relative cursor-pointer'>
                      {item?.is_sold_out &&
                        <div className='rounded-md absolute flex items-center justify-center max-w-[20rem] w-full aspect-square top-0 left-0 bg-black/50'>
                          <p className='text-white text-xl font-semibold uppercase'>Sold Out</p>
                        </div>}
                      <img src={item.images[0]} className='max-w-[20rem] shadow-md w-full aspect-square rounded-xl object-cover' />
                      <div className='p-2'>
                        <p className='font-semibold text-lg text-center'>{item?.product_name}</p>
                        <p className=' text-lg text-center'>PHP {item?.price}</p>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </LoadingLayout>
          <div className='w-full'>
            <Button color="failure" className='mx-auto' size="lg" onClick={() => router.push("/shop")}>View All Products</Button>
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="bottom-0 text-white p-6 lg:p-16 bg-gradient-to-t from-red-700 to-red-600">
        <div className='flex flex-col gap-8 my-4 items-center justify-center'>
          <h2 className='font-semibold text-3xl'>BULK ORDERS?</h2>
          <p className='lg:text-xl'>Streamline Your Wholesale Shopping Experience - Hassle-Free Bulk Orders Await!</p>
          <Link href={"/about"}>
            <Button color="failure" className=' mx-auto border border-white' size="lg">Contact Us</Button>
          </Link>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="p-6 lg:p-16">
        <LoadingLayout message="Gallery is Empty." loadingState={isLoading} hasContent={galleryData?.slice(0, 5)?.length > 0}>
          <div className='my-16 flex items-center md:flex-row flex-col justify-center gap-4 lg:gap-10'>
            {
              galleryData?.slice(0, 5).map((item) => (
                <div key={item?._id} className="max-w-[20rem] w-full">
                  <img src={item.image} className='max-w-[20rem] shadow-md w-full aspect-square rounded-xl object-cover' />
                </div>
              ))
            }
          </div>
        </LoadingLayout>
        <div className='mx-auto'>
          <Button color="failure" className=' mx-auto' size="lg" onClick={() => router.push("/gallery")}>View Gallery</Button>
        </div>
      </CustomerWrapper>
    </CustomerLayout >
  )
}

export default Home
