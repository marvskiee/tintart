import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import CustomerWrapper from './customer-wrapper'
import { getAllShop } from '../../services/shop.services'
import DATA from '../../utils/DATA'

const FooterLayout = () => {
  const [shopData, setShopData] = useState(null)
  const loadHandler = async () => {
    // fetch shop
    const shop_result = await getAllShop()
    if (shop_result.success) if (shop_result?.data?.length > 0) setShopData(shop_result?.data[0])
  }

  useEffect(() => {
    loadHandler()
  }, [])
  const FooterLinks = ({ data, headings }) => {
    return (
      <div className='w-full flex flex-col gap-4'>
        <p className='underline text-red-700 font-semibold text-lg'>{headings}</p>
        {data.map((item, key) => (
          <Link target="_blank" key={`${headings}-${key}`} href={item?.link || ''}>
            <p className='hover:text-red-700 capitalize transition-colors'>{item?.name}</p>
          </Link>
        ))}
      </div>
    )
  }
  return (
    <CustomerWrapper containerClass='bg-zinc-900 p-4'>
      <div className='text-zinc-100  bg-zinc-900'>
        <div className=' flex justify-between flex-col gap-10 lg:flex-row py-10'>
          <div className='flex flex-col gap-4 w-full'>
            <img alt='logo' src='/images/logo.png' className='w-[20rem]  object-cover' />
            <p>{DATA?.FOOTER.ADDRESS}</p>
            <p>Call Us: {DATA.FOOTER.CONTACT}</p>
            {shopData && <p>E-Mail: {shopData.email}</p>}
          </div>
          <div className='flex gap-10 lg:flex-row flex-col w-full'>
            <FooterLinks data={DATA.FOOTER.LINKS} headings='Links' />
            <FooterLinks
              data={[
                { name: 'Facebook', link: shopData?.facebook_link },
                { name: 'Instagram', link: shopData?.instagram_link },
                { name: 'TikTok', link: shopData?.tiktok_link },
              ]}
              headings='Follow Us'
            />
          </div>
        </div>
        <p className='w-full text-center p-10'>Copyright © 2023 TintArt. All Rights Reserved.</p>
      </div>
    </CustomerWrapper>
  )
}

export default FooterLayout
