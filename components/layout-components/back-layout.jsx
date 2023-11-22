import Link from 'next/link'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

const BackLayout = ({ href, page }) => {
  return (
    <div className='flex'>
      <Link href={href}>
        <div className='flex items-center p-2 px-4 underline'>
          <IoArrowBack className='mr-1' />
          <p className='font-semibold '>Back to {page}</p>
        </div>
      </Link>
    </div>
  )
}

export default BackLayout
