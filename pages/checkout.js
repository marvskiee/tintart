import React from 'react'
import { CustomerLayout } from '../components'
import { BsCheckCircleFill } from 'react-icons/bs'
import Link from 'next/link'
const Checkout = () => {
    return (
        <CustomerLayout>
            <div className='min-h-[40rem] flex-col gap-5 flex items-center justify-center p-4'>
                <div className=' font-extrabold text-4xl flex flex-col items-center justify-center gap-4'>
                    <BsCheckCircleFill className='text-emerald-500 text-6xl' />
                    <span className='text-center w-full'>
                        Checkout Successful!
                    </span>
                </div>
                <p className='text-lg text-center'>Please wait for email confirmation</p>
                <Link href="/">
                    <p className='underline text-md text-center'>BACK TO HOMEPAGE</p>
                </Link>
            </div>
        </CustomerLayout>
    )
}

export default Checkout