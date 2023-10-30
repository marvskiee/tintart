import React from 'react'
import { CustomerHeader, CustomerWrapper } from '../components'
import { Button } from 'flowbite-react'
import { BiShoppingBag } from 'react-icons/bi'
import Image from 'next/image'
import CustomerLayout from '../components/layout-components/customer-layout'
import DATA from '../utils/DATA'
import { FaArrowRight } from 'react-icons/fa'

const Home = () => {
  const DUMMY_TEXT = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius arcu convallis, ullamcorper ligula vel, placerat risus. Nunc luctus, ex at tempus vehicula, mauris augue ullamcorper magna, non lobortis libero dui non mi. Mauris nec faucibus metus, non tincidunt ligula. Aliquam erat volutpat. Vivamus ullamcorper quam sit amet vehicula venenatis. Aliquam erat volutpat.
  `

  return (
    <CustomerLayout>
      <CustomerWrapper containerClass="p-6 lg:p-16 bg-zinc-100">
        <div className='flex flex-col-reverse lg:flex-row gap-10 items-center my-4'>
          <div className='flex flex-col gap-4 w-full'>
            <h2 className='font-bold text-4xl'>Customize your very own merchandise!</h2>
            <h3 className=' text-lg'>Have you ever wanted to create and wear your own designs on your shirts? Be able to show your feelings through your art? Try our very own customization and print your own designs now!</h3>
            <div>
              <Button color="failure" size="lg" className='font-bold'>
                Start Customizing
                <FaArrowRight color='white' className='ml-2 text-xl' />
              </Button>
            </div>
          </div>
          <div className='flex w-full items-center justify-center'>
            <div className='lg:flex-shrink-0 aspect-square lg:max-h-[20rem]'>
              <img src="/images/about1.png" className='object-cover w-full h-full rounded-xl' />
            </div>
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="p-6 lg:p-16">
        <div className='flex flex-col gap-10 min-h-[40rem] items-center justify-center my-4'>
          <h2 className='font-semibold text-center w-full uppercase text-4xl'>Featured Products</h2>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-10 '>
            {
              DATA.FEATURED_PROJECT.slice(0, 4).map((item, key) => (
                <div key={`project-${key}`}>
                  <img src={item.image} className='w-full aspect-square rounded-xl' />
                  <div className='p-2'>
                    <p className='font-semibold text-lg text-center'>{item?.title}</p>
                    <p className=' text-lg text-center'>PHP {item?.price}</p>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='w-full'>
            <Button color="failure" className='mx-auto' size="lg">View All Products</Button>
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="bottom-0 text-white p-6 lg:p-16 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500 to-red-800">
        <div className='flex flex-col gap-4 my-4'>
          <h2 className='font-semibold text-3xl'>BULK ORDERS?</h2>
          <p className='lg:text-lg'>{DUMMY_TEXT} </p>
          <div className='mr-auto'>
            <Button color="failure" className=' mx-auto border border-white' size="lg">Contact Us</Button>
          </div>
        </div>
      </CustomerWrapper>
      <CustomerWrapper containerClass="p-6 lg:p-16">
        <div className='my-16 grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-10'>
          {
            DATA.FEATURED_PROJECT.slice(0, 5).map((item, key) => (
              <div key={`artist-${key}`} className="">
                <img src={item?.image} className={`rounded-xl ${key == 2 && " lg:scale-125"}`} />
              </div>
            ))
          }
        </div>
        <div className='mx-auto'>
          <Button color="failure" className=' mx-auto' size="lg">View Gallery</Button>
        </div>
      </CustomerWrapper>
    </CustomerLayout>
  )
}

export default Home
