import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { BiSolidUser } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useRouter } from 'next/router'
import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import TextInput from '../input-components/text-input'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import DATA from '../../utils/DATA'
import { useAppContext } from '../../context/AppContext'
import { getUser } from '../../services/auth.services'
import { getAllProduct } from '../../services/product.services'

const CustomerHeader = props => {
  const [search, setSearch] = useState('')
  const [menuBar, setMenuBar] = useState(false)
  const [data, setData] = useState([])
  const router = useRouter()
  const loadHandler = async () => {
    if (search.length > 0) {
      const { success, data } = await getAllProduct()
      if (success) {
        let filtered = data?.filter(d => d.is_archived == false && d.is_sold_out == false)
        if (filtered.length > 0) setData(filtered)
      }
    }
  }
  const filteredData = data?.filter(
    d =>
      d.product_name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.merchandise.toLowerCase().includes(search.toLowerCase())
  )
  console.log(filteredData)
  const { state, dispatch } = useAppContext()
  useEffect(() => {
    const load = async () => {
      if (!state.isAuth) {
        const res = await getUser()
        await dispatch({ type: 'SET_USER', value: res?.data })
      }
    }
    load()
    loadHandler()
  }, [state.isAuth, search])

  const SearchComponents = ({ search, filteredData }) => {
    console.log(search)
    return (
      <>
        {search?.trim().length > 0 && (
          <div className='w-full bg-white absolute top-[3rem] z-20 rounded-md border'>
            {filteredData?.length > 0 ? (
              <ul
                className=' py-2 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdownDefaultButton'
              >
                {filteredData?.map((item, key) => (
                  <li
                    key={item?._id}
                    className='cursor-pointer hover:bg-slate-200 flex w-full items-center justify-between p-4'
                    onClick={() => router.push('/shop/product/' + item?._id)}
                  >
                    <img
                      src={item?.images[0]}
                      className='object-cover w-20 rounded-md aspect-square'
                    />
                    <div className='flex w-full justify-between items-center'>
                      <div className='p-2'>
                        <p className=''>{item?.product_name}</p>
                        <p className=''>{item?.merchandise}</p>
                        <p className='font-semibold'>{item?.price}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='p-4 text-center'>Product not found.</p>
            )}
          </div>
        )}
      </>
    )
  }
  return (
    <>
      <div className='z-50 sticky top-0'>
        <div className=' bg-zinc-900 p-4 gap-4 lg:gap-0 flex flex-col'>
          <div className='flex md:items-center items-center gap-4 justify-between max-w-[80rem] w-full mx-auto'>
            <div className=' items-center gap-4 flex'>
              <Button
                size='large'
                color='dark'
                className='lg:hidden block p-2'
                onClick={() => setMenuBar(!menuBar)}
              >
                <GiHamburgerMenu color='white' />
              </Button>
              <img src={'/images/logo.png'} alt='logo' width={100} height={100} className='' />
            </div>
            <div className='hidden relative lg:flex w-full'>
              <div className={` flex items-center order-3 md:order-2 w-full `}>
                <TextInput
                  placeholder={'Search...'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className='w-full sm:min-w-[20rem] rounded-tr-none rounded-br-none'
                />
                <Button size='lg' className='rounded-tl-none rounded-bl-none ' color='failure'>
                  <FaSearch className='text-md text-white' />
                </Button>
              </div>
              <SearchComponents filteredData={filteredData} search={search}></SearchComponents>
            </div>
            <div className='order-2 md:order-3 flex gap-3 items-center'>
              <Link href='/profile'>
                <Button size='large' color='dark' className='p-2'>
                  <BiSolidUser className='text-white' />
                </Button>
              </Link>

              <span className='bg-white h-5 w-[.1rem]'></span>
              <Link href='/cart'>
                <Button size='large' color='dark' className='p-2'>
                  <FaShoppingCart className='text-white' />
                </Button>
              </Link>
            </div>
          </div>
          <div className='max-w-[80rem] mx-auto w-full'>
            <div className='lg:hidden relative flex w-full'>
              <div className={` flex items-center order-3 md:order-2 w-full `}>
                <TextInput
                  placeholder={'Search...'}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className='w-full sm:min-w-[20rem] rounded-tr-none rounded-br-none'
                />
                <Button size='lg' className='rounded-tl-none rounded-bl-none ' color='failure'>
                  <FaSearch className='text-md text-white' />
                </Button>
              </div>
              <SearchComponents filteredData={filteredData} search={search}></SearchComponents>
            </div>
          </div>
        </div>
        <div
          className={`bg-zinc-900 lg:bg-white -z-10 lg:border-0 border-b absolute lg:static w-full mx-auto ${
            menuBar ? 'block' : 'hidden'
          } lg:block`}
        >
          <div className='max-w-[80rem]  flex-col flex lg:flex-row lg:flex items-center justify-evenly mx-auto'>
            {DATA.FOOTER.LINKS.map((item, key) => (
              <Link
                href={item?.link}
                className={` text-white lg:text-zinc-900 whitespace-nowrap h-full block w-full flex-grow-0 lg:text-center text-left cursor-pointer transition-colors delay-75 border-b-2 border-transparent hover:border-white lg:hover:border-zinc-500 p-2 px-4 uppercase font-semibold ${
                  router.pathname.split('/')[1] == item?.link.split('/')[1] &&
                  'border-white lg:border-black'
                }`}
                key={key}
              >
                {item?.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerHeader
