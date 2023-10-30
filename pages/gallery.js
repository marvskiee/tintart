import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper, DynamicFetchLayout } from '../components'
import { Button } from 'flowbite-react'
import { getAllGallery } from '../services/gallery.services'

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const loadHandler = async () => {
    const result = await getAllGallery();
    if (result.success) {
      setData(result.data)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    loadHandler()
  }, [])
  return (
    <CustomerLayout>
      <CustomerWrapper>
        <div className='flex flex-col lg:flex-row px-4 py-10'>
          <div className='w-full flex items-center justify-between'>
            <h2 className='text-3xl font-semibold'>TintArt Gallery</h2>
            <Button color="dark">Upload</Button>
          </div>
        </div>
        {isLoading ?
          <p className='text-center py-10'>Please wait while we load the data.</p>
          :
          data?.length > 0 ?
            <div className='grid grid-cols-4 gap-4'>
              {
                data.map((item, key) => (
                  <div key={"gallery-item-" + key} className='flex flex-col gap-4'>
                    <img src={item?.image} className='aspect-square w-full ' />
                    <p className='font-semibold'>{item?.artist}</p>
                  </div>
                ))
              }
            </div>
            : <p className='text-center py-10'>There's no picture in our gallery.</p>
        }
      </CustomerWrapper>
    </CustomerLayout>
  )
}

export default Gallery