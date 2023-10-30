import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
import React from 'react'

const DynamicFetchLayout = ({ message, path }) => {
  const router = useRouter()
  return (
    <div className='p-4 lg:p-8 rounded-md border flex items-center justify-center flex-col gap-4'>
      <p className='w-full text-xl font-semibold text-center'>{message}</p>
      {path && (
        <Button onClick={() => router.push(path)} color='gray'>
          Go Back
        </Button>
      )}
    </div>
  )
}

export default DynamicFetchLayout
