import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { CustomerHeader, CustomerWrapper, LoadingLayout } from '../components'
import { Accordion, Button } from 'flowbite-react'
import CustomerLayout from '../components/layout-components/customer-layout'
import DATA from '../utils/DATA'
import { useRouter } from 'next/router'
import { getAllProduct } from '../services/product.services'
import { addWishList, deleteWishList, getAllWishList } from '../services/wishlist.services'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { toastOptions } from '../styles/modalOption'

const Shop = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState([])
  const [wishListData, setWishListData] = useState([])
  const { state, dispatch } = useAppContext()

  const refreshWishList = async () => {
    const wishlist_result = await getAllWishList(state?.user?._id)
    if (wishlist_result.success)
      setWishListData(wishlist_result?.data)
  }

  const loadHandler = async () => {
    setIsLoading(true)
    //wishlist

    refreshWishList()

    //products
    const products_result = await getAllProduct()
    if (products_result.success)
      setProductData(products_result?.data)


    setIsLoading(false)
  }
  const heartHandler = async (item) => {
    const { product_name, images, _id } = item
    console.log(wishListData)
    let filtered = wishListData.filter(d => d.product_id == _id)
    console.log(filtered)
    if (filtered.length > 0) {
      let selected_wishlist = wishListData.filter(d => d.product_id == item?._id)[0]
      const result = await deleteWishList(selected_wishlist?._id)
      if (result?.success) {
        refreshWishList()
        return toast.success(`Removed to Wishlist`, toastOptions)
      }
    } else {
      const result = await addWishList({
        user_id: state?.user?._id,
        product_id: _id,
        image: images[0],
        title: product_name
      })
      if (result?.success) {
        refreshWishList()
        return toast.success(`Added to Wishlist`, toastOptions)
      }
    }
  }
  useEffect(() => {
    loadHandler()
  }, [])

  return <CustomerLayout hasFetch={true}>
    <CustomerWrapper containerClass="p-4">
      <h2 className='font-bold text-3xl p-4'>All Products</h2>
      <div className='flex flex-col lg:flex-row gap-10'>
        {/* sidebar */}
        <div className='lg:min-w-[20rem]'>
          <Accordion alwaysOpen={false} collapseAll={true}>
            <Accordion.Panel>
              <Accordion.Title>
                FILTER BY
              </Accordion.Title>
              <Accordion.Content>
                Maintenance
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                PRODUCTS
              </Accordion.Title>
              <Accordion.Content>
                Maintenance
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
        {/* main content */}
        <div className='w-full'>
          <LoadingLayout message="No Product listed." loadingState={isLoading} hasContent={productData?.length > 0}>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 mb-10'>
              {productData?.map((item, key) => (
                <div className='relative shadow-md' key={key}>
                  <Button onClick={() => heartHandler(item)} color="light" size="xs" className='bg-black/50 border-0 absolute top-5 right-5 aspect-square'>
                    {!wishListData.filter(d => d.product_id == item?._id).length > 0 ?
                      <AiOutlineHeart className='text-2xl text-red-600' />
                      :
                      <AiFillHeart className='text-2xl text-red-600' />
                    }
                  </Button>
                  <img alt='luffy' src={item?.images[0]} className='rounded-2xl w-full aspect-square object-cover' />
                  <p className="p-2 font-semibold text-md">{item?.name}</p>
                  <p className="p-2 font-semibold text-xl">PHP {item?.price}</p>
                </div>
              ))}
            </div>
          </LoadingLayout>
        </div>
      </div>
    </CustomerWrapper>
  </CustomerLayout>
}

export default Shop
