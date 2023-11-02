import React, { useEffect, useState } from 'react'
import { ContactLayout, CustomerHeader, CustomerWrapper, LoadingLayout } from '../components'
import CustomerLayout from '../components/layout-components/customer-layout'
import DATA from '../utils/DATA'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'
import { getAllShop } from '../services/shop.services'
import { getAllGallery } from '../services/gallery.services'

const About = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    useEffect(() => {
        loadHandler()
    }, [])

    const filteredObjects = (result) => {
        let temp = result?.map(({
            name,
            logo,
            artwork_title,
            facebook_link,
            instagram_link,
            tiktok_link, image
        }) => (
            {
                name,
                logo,
                facebook_link,
                instagram_link,
                tiktok_link,
                image,
                role: artwork_title ? "Artist" : "Merchant"
            }
        ))
        return temp
    }
    const loadHandler = async () => {
        let tempData = []
        const shop_result = await getAllShop()


        const gallery_result = await getAllGallery()
        if (gallery_result.success) {
            let temp = []
            if (gallery_result.data.length > 2)
                temp = gallery_result.data?.slice(0, 2)
            if (temp.length > 0) {
                tempData = [...tempData, ...filteredObjects(temp)]
            }
        }
        if (shop_result.success) {
            if (shop_result.data.length > 0) {
                console.log(tempData)
                tempData = [tempData[0], ...filteredObjects(shop_result.data.slice(0, 1)), tempData[1]]
            }
        }
        console.log(tempData)
        setData(tempData)
        setIsLoading(false)
    }
    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='flex flex-row relative overflow-hidden'>
                    <div className='bg-rose-300/40 w-full absolute z-10 flex items-center justify-center h-full'>
                        <p
                            data-replace='{ "tranzinc-y-12": "tranzinc-y-0" }'
                            className='transform transition-all tranzinc-y-12 ease-out whitespace-pre text-center duration-500 relative font-bold lg:text-5xl text-2xl text-zinc-900'>Unleash your {"\n"}
                            Creativity on Quality {"\n"}
                            Merchandise</p>
                    </div>
                    <div className='w-full'>
                        <img src="./images/about1.png" className='w-full flex-shrink object-cover' />
                    </div>
                    <div className='w-full'>
                        <img src="./images/about2.png" className='w-full flex-shrink object-cover' />
                    </div>
                    <div className='w-full'>
                        <img src="./images/about3.png" className='w-full flex-shrink object-cover' />
                    </div>
                </div>
                <div className='p-6 lg:p-16 rounded-lg'>
                    <p className='font-bold text-2xl my-4'>About TintArt</p>
                    <p className='py-2'>Welcome to TintArt, your one-stop destination for personalized and unique merchandise. At TintArt, we believe in the power of personal expression and creativity. We are passionate about providing you with a platform  to bring your imagination to life on high quality t-shirts, eye-catching photocards, and sturdy Sintra boards.</p>
                    <p className='font-bold text-2xl my-4'>Our Mission</p>
                    <p className='py-2'>Our mission at TintArt is to empower individials to unleash their creativity by offering an array of customizable merchandise. We aim to provide a seamless and enjoyable customization experience that allows you to express yourself, create lasting memories, and share your uniqueness with the world.</p>
                    <p className='py-2'>Join us TintArt and let your creativity shine. Create, customize, and make a statement with our personalized merchandise.</p>
                    <LoadingLayout
                        message="" loadingState={isLoading} hasContent={data?.length > 0}
                    >
                        <div className='flex items-center justify-center gap-6 md:gap-10 my-8'>
                            {data.map((item, key) => (
                                <div key={"about-" + key} className={`max-w-[20rem] text-zinc-900 font-semibold border bg-zinc-100 shadow-md p-4 rounded-lg ${key == 0 && ""}`}>
                                    <p>{item?.role}</p>
                                    <p className='text-xl'>{item?.name}</p>
                                    <div className='flex gap-4 my-4'>
                                        <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item?.facebook_link || ""}><FaInstagram /></Link>
                                        <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item?.instagram_link || ""}><FaTwitter /></Link>
                                        <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item?.tiktok_link || ""}><FaFacebook /></Link>
                                    </div>
                                    <img src={item?.image || item?.logo} className='max-w-[15rem] w-full rounded-md aspect-square object-cover' />
                                </div>
                            ))}
                        </div>
                    </LoadingLayout>
                    <ContactLayout title="Contact Us" />

                </div>

            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default About