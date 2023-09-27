import React from 'react'
import DATA from '../../utils/DATA'
import Link from 'next/link'
import CustomerWrapper from './customer-wrapper'

const FooterLayout = () => {
  const FooterLinks = ({ data, headings }) => {
    return (
      <div className='w-full flex flex-col gap-4'>
        <p className='underline text-red-700 font-semibold text-lg'>{headings}</p>
        {data.map((item, key) => (
          <Link key={`${headings}-${key}`} href={item?.link}>
            <p className='hover:text-red-700 capitalize transition-colors'>{item?.name}</p>
          </Link>
        ))}
      </div>
    )
  }
  return (
    <CustomerWrapper containerClass='bg-slate-900 p-4'>
      <div className='text-slate-100  bg-slate-900'>
        <div className=' flex justify-between flex-col gap-10 lg:flex-row py-10'>
          <div className='flex flex-col gap-4 w-full'>
            <img alt='logo' src='./images/logo.png' className='w-[20rem]  object-cover' />
            <p>{DATA.FOOTER.ADDRESS}</p>
            <p>Call Us: {DATA.FOOTER.CONTACT}</p>
            <p>E-Mail: {DATA.FOOTER.EMAIL}</p>
          </div>
          <div className='flex gap-10 lg:flex-row flex-col w-full'>
            <FooterLinks data={DATA.FOOTER.LINKS} headings='Links' />
            <FooterLinks data={DATA.FOOTER.FOLLOWUS} headings='Follow Us' />
          </div>
        </div>
        <p className='w-full text-center p-10'>Copyright © 2023 TintArt. All Rights Reserved.</p>
      </div>
    </CustomerWrapper>
  )
}

export default FooterLayout
