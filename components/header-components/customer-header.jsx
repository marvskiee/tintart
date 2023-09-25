import Image from 'next/image'
import React, { useState } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import TextInput from '../input-components/text-input'
import { Button } from 'flowbite-react'
import Link from 'next/link'

const CustomerHeader = props => {
  const [menuBar, setMenuBar] = useState(false)
  const links = [
    { name: 'home', link: '/' },
    { name: 'shop & customization', link: '/shop' },
    { name: 'partnership', link: '/partnership' },
    { name: 'faqs', link: '/faqs' },
    { name: 'about us', link: '/about' },
  ]
  const router = useRouter();
  console.log(router.pathname)
  return (
    <div className='z-50 sticky top-0'>
      <div className=' bg-slate-900 p-4 gap-4 flex flex-col'>
        <div className='flex md:items-center items-center gap-2 justify-between max-w-[80rem] w-full mx-auto'>
          <div className=' items-center gap-4 flex'>
            <Button
              size='large'
              color='dark'
              className='lg:hidden block p-2'
              onClick={() => setMenuBar(!menuBar)}
            >
              <GiHamburgerMenu color='white' />
            </Button>
            <Image src={'/images/logo.png'} alt='logo' width={100} height={100} />
          </div>
          <div className='order-2 md:order-3 flex gap-3 items-center'>
            <Button size='large' color='dark' className='p-2'>
              <BiSolidUser className='text-white' />
            </Button>

            <span className='bg-white h-5 w-[.1rem]'></span>
            <Button size='large' color='dark' className='p-2'>
              <FaShoppingCart className='text-white' />
            </Button>
          </div>
        </div>
        <div className='max-w-[80rem] mx-auto w-full'>
          <div className='flex items-center order-3 md:order-2 w-full'>
            <TextInput
              placeholder={'Search...'}
              className='w-full sm:min-w-[20rem] rounded-tr-none rounded-br-none'
            />
            <Button size='lg' className='rounded-tl-none rounded-bl-none ' color='failure'>
              <FaSearch className='text-md text-white' />
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`bg-slate-900 lg:bg-white -z-10 lg:border-0 border-b absolute lg:static w-full mx-auto ${
          menuBar ? 'translate-y-0 ' : '-translate-y-[20rem]'
        } lg:translate-y-0`}
      >
        <div className='max-w-[80rem]  flex-col flex lg:flex-row lg:flex items-center justify-evenly mx-auto'>
          {links.map((item, key) => (
            <Link
              href={item?.link}
              className={`text-lg text-white lg:text-slate-900 whitespace-nowrap h-full block w-full flex-grow-0 lg:text-center text-left gap-4 cursor-pointer transition-colors delay-75 border-b-2 border-transparent hover:border-white lg:hover:border-slate-500 p-4 uppercase font-bold ${router.pathname == item?.link && "border-white lg:border-black"}`}
              key={key}
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerHeader
