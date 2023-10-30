import React from 'react'
import { ContactLayout, CustomerHeader, CustomerWrapper } from '../components'
import CustomerLayout from '../components/layout-components/customer-layout'
import DATA from '../utils/DATA'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

const About = () => {
    return (
        <CustomerLayout>
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
                    <div className='lg:grid-cols-3 grid-cols-1 grid gap-6 md:gap-10 mt-8'>
                        {DATA.ABOUT.map((item, key) => (
                            <div key={"about-" + key} className='text-zinc-900 font-semibold bg-zinc-200 p-4 rounded-lg'>
                                <p>{item?.role}</p>
                                <p className='text-xl'>{item?.first_name}</p>
                                <p className='text-xl'>{item?.last_name}</p>
                                <div className='flex gap-4 my-4'>
                                    <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item.social_media_links[0]}><FaInstagram /></Link>
                                    <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item.social_media_links[1]}><FaTwitter /></Link>
                                    <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item.social_media_links[2]}><FaFacebook /></Link>
                                </div>
                                <img src={item?.image} className='w-full rounded-md aspect-square object-cover' />
                            </div>
                        ))}
                    </div>
                    <ContactLayout title="Contact Us"/>

                </div>

            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default About