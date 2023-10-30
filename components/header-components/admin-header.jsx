import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { TbLogout } from 'react-icons/tb'
import { useRouter } from 'next/router'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import DATA from '../../utils/DATA'

const AdminHeader = props => {
  const [menuBar, setMenuBar] = useState(false)

  const router = useRouter()
  return (
    <>
      <div className='z-50 sticky top-0'>
        <div
          className={`px-4 lg:py-2 py-4 bg-white -z-10 border-b sticky lg:static flex-row flex items-center justify-between`}
        >
          <Button
            size='large'
            color='light'
            className='lg:hidden block p-2'
            onClick={() => setMenuBar(!menuBar)}
          >
            <GiHamburgerMenu color='black' />
          </Button>
          <div
            className={`flex-col left-0 lg:w-auto w-full bg-white absolute top-[72px] lg:static flex lg:flex-row items-center gap-2 ${
              menuBar ? 'flex' : 'hidden'
            } lg:flex`}
          >
            {DATA.ADMIN.HEADER_LINKS.map((item, key) => (
              <Link
                href={item?.link}
                className={`text-zinc-900 whitespace-nowrap h-full block w-full flex-grow-0 lg:text-center text-left gap-4 cursor-pointer transition-colors delay-75 border-transparent text-sm hover:border-white lg:hover:border-zinc-500 p-4 capitalize font-semibold ${
                  router.pathname.split('/')[2] == item?.link.split('/')[2] &&
                  'font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600'
                }`}
                key={key}
              >
                {item?.name}
              </Link>
            ))}
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <img
              src='/images/about1.png'
              className='w-[2.5rem] h-[2.5rem] object-cover rounded-full'
            />
            <div className='flex-col flex'>
              <p className='font-semibold'>John doe</p>
              <p className='text-xs'>johndoe@gmail.com</p>
            </div>
            <Button color='light' size='sm'>
              <TbLogout />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHeader
