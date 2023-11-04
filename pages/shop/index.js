import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { CustomerHeader, CustomerWrapper, DropdownInput, LoadingLayout, TextInput } from '../../components'
import { Accordion, Button, Label } from 'flowbite-react'
import CustomerLayout from '../../components/layout-components/customer-layout'
import { useRouter } from 'next/router'
import { getAllProduct } from '../../services/product.services'
import { addWishList, deleteWishList, getUserWishList } from '../../services/wishlist.services'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import { getAllCategory } from '../../services/category.services'
import useQuantity from '../../hooks/useQuantity'

const Shop = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [productData, setProductData] = useState([])
  const [wishListData, setWishListData] = useState([])
  const [categoryData, setCategoryData] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const { state, dispatch } = useAppContext()
  const [merchandise, setMerchandise] = useState('')
  const [category, setCategory] = useState('')
  const refreshWishList = async () => {
    const wishlist_result = await getUserWishList(state?.user?._id)
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

    //category
    const category_result = await getAllCategory()
    if (category_result?.success)
      setCategoryData(category_result?.data)


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

  const clearFilterHandler = () => {
    setCategory("")
    setPriceRange({ min: 0, max: 10000 })
    setMerchandise("")
  }

  const filteredProducts = productData?.filter(d =>
    (Number(d.price) >= priceRange.min && Number(d.price) <= priceRange.max) &&
    (d.merchandise.includes(merchandise)) &&
    (d.category.includes(category))
  )
  return <CustomerLayout hasFetch={true}>
    <CustomerWrapper containerClass="p-4">
      <p className='font-semibold text-2xl mb-4'>All Products</p>
      <div className='flex flex-col lg:flex-row gap-10'>
        {/* sidebar */}
        <div className='lg:min-w-[20rem] '>
          <div className='flex shadow-md gap-4 rounded-md flex-col p-4 border'>
            <p className='text-2xl  block font-semibold'>Filter</p>

            <div className='col-span-1 lg:col-span-1'>
              <Label className='capitalize mb-2  block'>Merchandise</Label>
              <DropdownInput
                name='merchandise'
                selected={merchandise}
                item={['T-Shirt', 'Sintra Board', 'Photocard']}
                disabled={isLoading}
                handler={value => setMerchandise(value)}
              />
            </div>
            <div className='col-span-1 lg:col-span-1'>
              <Label className='capitalize mb-2  block'>Category</Label>
              <DropdownInput
                name='category'
                selected={category}
                item={categoryData.map(({ category }) => category)}
                disabled={isLoading}
                handler={value => setCategory(value)}
              />
            </div>
            <div className='col-span-1 lg:col-span-1'>
              <Label className='capitalize mb-2 block'>Min</Label>
              <TextInput
                disabled={isLoading}
                value={priceRange?.min}
                onChange={e => setPriceRange({ ...priceRange, min: e.target.value })}
                type='number'
              />
            </div>
            <div className='col-span-1 lg:col-span-1'>
              <div>
                <Label className='capitalize mb-2 block'>Max</Label>
                <TextInput
                  disabled={isLoading}
                  value={priceRange?.max}
                  onChange={e => setPriceRange({ ...priceRange, max: e.target.value })}
                  type='number'
                />
              </div>
            </div>
            <Button color="failure" className='w-full' onClick={clearFilterHandler}>Clear Filters</Button>
          </div>
        </div>
        {/* main content */}
        <div className='w-full'>
          <LoadingLayout message="No Product listed." loadingState={isLoading} hasContent={filteredProducts?.length > 0}>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 mb-10'>
              {filteredProducts?.map((item, key) => (

                <div className='relative flex-col flex gap-2 cursor-pointer' key={key} >
                  <Button onClick={() => heartHandler(item)} color="light" size="xs" className='bg-black/50 border-0 absolute top-5 right-5 aspect-square'>
                    {!wishListData.filter(d => d.product_id == item?._id).length > 0 ?
                      <AiOutlineHeart className='text-2xl text-red-600' />
                      :
                      <AiFillHeart className='text-2xl text-red-600' />
                    }
                  </Button>
                  <img onClick={() => router.push("/shop/" + item?._id)} alt='luffy' src={item?.images[0]} className='rounded-2xl w-full aspect-square object-cover' />
                  <p onClick={() => router.push("/shop/" + item?._id)} className="px-2 font-semibold text-md">{item?.product_name}</p>
                  <p onClick={() => router.push("/shop/" + item?._id)} className="px-2 font-semibold text-xl">PHP {item?.price}</p>
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
