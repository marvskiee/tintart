import React from 'react'
import { CustomerHeader, CustomerWrapper } from '../components'
import { Button } from 'flowbite-react'
import { BiShoppingBag } from 'react-icons/bi'
import Image from 'next/image'
import CustomerLayout from '../components/layout-components/customer-layout'
import DATA from '../utils/DATA'

const Home = () => {
  const DUMMY_TEXT = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius arcu convallis, ullamcorper ligula vel, placerat risus. Nunc luctus, ex at tempus vehicula, mauris augue ullamcorper magna, non lobortis libero dui non mi. Mauris nec faucibus metus, non tincidunt ligula. Aliquam erat volutpat. Vivamus ullamcorper quam sit amet vehicula venenatis. Aliquam erat volutpat.
  `

  const ARTIST_DATA = [
    {
      artist_name: "Oda",
    },
    {
      artist_name: "Oda",
    },
    {
      artist_name: "Oda",
    },
    {
      artist_name: "Oda",
    }
  ]
  return (
    <CustomerLayout>
      <CustomerWrapper containerClass="p-6 lg:p-16 bg-slate-100">
        <div className='flex flex-col-reverse lg:flex-row gap-10 items-center my-4'>
          <div className='flex flex-col gap-4'>
            <h2 className='font-extrabold text-4xl uppercase'>Sample Title</h2>
            <h3 className='font-bold text-2xl uppercase'>Sample Subtitle here</h3>
            <p className='lg:text-xl text-md'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius arcu convallis, ullamcorper ligula vel, placerat risus. Nunc luctus, ex at tempus vehicula, mauris augue ullamcorper magna, non lobortis libero dui non mi. Mauris nec faucibus metus, non tincidunt ligula. Aliquam erat volutpat. Vivamus ullamcorper quam sit amet vehicula venenatis. Aliquam erat volutpat. Pellentesque et magna non est consectetur varius. Praesent ac ultricies lorem. Donec nunc ex, aliquam at bibendum ut, sodales ut urna</p>
            <div>
              <Button color="failure" size="lg" className='uppercase font-bold'>
                Shop Now
                <BiShoppingBag color='white' className='ml-2 text-xl' />
              </Button>
            </div>
          </div>
          <div className=' flex-shrink-0 aspect-square lg:max-h-[30rem]'>
            <img src="/images/hero.png" className='object-cover w-full h-full rounded-3xl' />
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="p-6 lg:p-16">
        <div className='flex flex-col gap-10 min-h-[40rem] items-center justify-center my-4'>
          <h2 className='font-extrabold text-center w-full uppercase text-4xl'>Featured Products</h2>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-10 '>
            {
              DATA.FEATURED_PROJECT.map((item, key) => (
                <div key={`project-${key}`}>
                  <img src={item.image} className='w-full aspect-square rounded-3xl' />
                  <div className='p-2'>
                    <p className='font-extrabold text-lg text-center'>{item?.title}</p>
                    <p className='font-semibold text-lg text-center'>PHP {item?.price}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='w-full'>
            <Button color="failure" className='uppercase mx-auto' size="lg">View All Products</Button>
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass=" text-white p-6 lg:p-16 bg-gradient-to-b from-red-900 to-red-600">
        <div className='flex flex-col-reverse lg:flex-row items-center gap-10 my-4'>
          <div className='flex flex-col gap-4'>
            <h2 className='font-extrabold text-4xl uppercase'>Heading</h2>
            <p className='lg:text-xl text-md'>{DUMMY_TEXT} </p>
            <div>
              <Button color="dark" className='font-extrabold' size="lg" outline>TRY NOW</Button>
            </div>
          </div>
          <div className=' flex-shrink-0 aspect-square lg:max-h-[20rem]'>
            <img src="/images/hero.png" className='object-cover w-full h-full rounded-3xl' />
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="p-6 lg:p-16">
        <div className='my-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10'>
          {
            ARTIST_DATA.map((item, key) => (
              <div key={`artist-${key}`}
                className='my-10 flex flex-col pb-4 font-semibold text-md text-center uppercase justify-end relative text-white rounded-3xl w-full aspect-square bg-gradient-to-tl from-red-700 via-red-900 to-red-700'>
                <img src='images/hero.png' className=' aspect-square w-full scale-75 absolute rounded-3xl -top-20' />
                <p>{item?.artist_name}</p>
                <p className='uppercase'>ARTIST</p>
                <p className='underline'>View Profile</p>
              </div>
            ))
          }
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="bottom-0 text-slate-900 p-6 lg:p-16 bg-slate-100">
        <div className='flex flex-col gap-4 my-4'>
          <h2 className='font-extrabold text-3xl'>BULK ORDERS?</h2>
          <p className='lg:text-xl text-md'>{DUMMY_TEXT} </p>
          <div className='mr-auto'>
            <Button color="failure" className='uppercase mx-auto' size="lg">CONTACT US</Button>
          </div>
        </div>
      </CustomerWrapper>
    </CustomerLayout>
  )
}

export default Home
