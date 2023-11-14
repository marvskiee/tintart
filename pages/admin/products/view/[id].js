import React, { useEffect, useRef, useState } from 'react'
import { AdminLayout, CustomerLayout, CustomerWrapper, LoadingLayout, StarLayout, TextInput } from '../../../../components'
import { getOneProduct } from '../../../../services/product.services'
import { useRouter } from 'next/router'
import DATA from '../../../../utils/DATA'
import { Button, Label, Textarea } from 'flowbite-react'
import Link from 'next/link'
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { toastOptions } from '../../../../styles/modalOption'
import { addWishList, deleteWishList, getUserWishList } from '../../../../services/wishlist.services'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../../context/AppContext'
import useQuantity from '../../../../hooks/useQuantity'
import { addCart, getUserCart, updateCart } from '../../../../services/cart.services'
import { addReview, getProductReview } from '../../../../services/review.services'
import { hasBlankValue } from '../../../../services/tools'

const ViewProduct = (props) => {

  const router = useRouter()
  const id = router?.query?.id;

  const [wishListData, setWishListData] = useState([])
  const { state } = useAppContext()
  const { quantity, increment, decrement } = useQuantity(1)
  const [cart, setCart] = useState(null)
  const [data, setData] = useState(null)
  const [review, setReview] = useState([])

  const [isLoading, setIsLoading] = useState({
    fetch: true,
    review: false
  })
  const [primaryImage, setPrimaryImage] = useState(null)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const initialData = {
    comment: "",
    rating: "",
  }
  const [formData, setFormData] = useState(initialData)
  const submitHandler = async () => {
    const hasBlank = hasBlankValue(Object.values(formData))
    if (hasBlank)
      return toast.error("Please fill up the fields!", toastOptions)
    setIsLoading({ ...isLoading, review: true })
    const newData = {
      rating: formData?.rating,
      user: state?.user?._id,
      comment: formData?.comment,
      product_id: id
    }
    const result = await addReview(newData)
    if (result?.success) {
      setFormData(initialData)
      loadReviewHandler()
      toast.success("Review Submitted", toastOptions)
    } else {
      toast.error("Something went wrong!", toastOptions)
    }
    setIsLoading({ ...isLoading, review: false })

  }


  const heartHandler = async (item) => {
    const { product_name, images, _id } = item
    let filtered = wishListData.filter(d => d.product_id == _id)
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
  const loadReviewHandler = async () => {
    const result3 = await getProductReview(id)
    if (result3.success) {
      setReview(result3.data)
    }
  }
  const loadHandler = async () => {
    setIsLoading({ ...isLoading, fetch: true })
    refreshWishList()

    const result1 = await getOneProduct(id)
    const result2 = await getUserCart(state?.user?._id)


    if (result1.success) {
      setData(result1.data)
    }
    if (result2.success) {
      setCart(result2?.data.filter(d => d.product_id?._id == id)[0])
    }
    await loadReviewHandler()
    setIsLoading({ ...isLoading, fetch: false })

  }

  useEffect(() => {
    if (id != undefined) {
      loadHandler();
    }
  }, [id, state?.isAuth])

  const addToCartHandler = async () => {
    if (!(size && color))
      return toast.error("Please select the size and color!", toastOptions)
    else {

      const newData = {
        color,
        size,
        quantity,
        user_id: state?.user?._id,
        product_id: data?._id
      }
      let result;
      if (cart?.color == newData.color && cart?.size == newData.size) {
        result = await updateCart({
          quantity: Number(cart?.quantity) + Number(newData.quantity)
        }, cart?._id)
      } else {
        result = await addCart(newData)
      }
      if (result.success) {
        return toast.success("Product has been added to cart.", toastOptions)
      }
      else {
        return toast.error("Something went wrong!.", toastOptions)
      }
    }

  }

  const refreshWishList = async () => {
    const wishlist_result = await getUserWishList(state?.user?._id)
    if (wishlist_result.success)
      setWishListData(wishlist_result?.data)
  }
  const overall_rating = review?.reduce((accumulator, star) => {
    return Number(accumulator) + Number(star.rating)
  }, 0)
  return (
    <AdminLayout>
      <LoadingLayout message="Product does not exist!" loadingState={isLoading?.fetch} hasContent={data}>
        <div className='flex flex-col lg:flex-row gap-4 p-4'>
          {/* image section  */}
          <div className='lg:max-w-[22rem] lg:min-w-[22rem]'>
            <div>
              <img src={primaryImage || data?.images[0]} className='aspect-square object-cover w-full ' />
            </div>
            {data?.images?.length > 0 &&
              <div className='mt-2 grid grid-cols-4 gap-2'>
                {
                  data.images.slice(1).map((item, key) => (
                    <img
                      key={"secondary-image-" + key}
                      src={item}
                      onMouseEnter={() => { setPrimaryImage(item) }}
                      onMouseLeave={() => setPrimaryImage(null)}
                      className='aspect-square object-cover  border-2 hover:border-red-500' />
                  ))
                }
              </div>
            }
          </div>
          {/* description */}
          <div className='flex flex-col gap-4 w-full'>
            <p className='font-semibold text-xl'>{data?.product_name}</p>
            <StarLayout rating={review?.length == 0 ? 0 : (overall_rating) / (review?.length)} />
            <p className='font-semibold text-2xl'>{DATA.PESO} {data?.price}</p>
            <p className='h-full'>{data?.description}</p>
            <p><span className='font-semibold'>Category: </span> {data?.category?.category}</p>
            <p className='font-semibold'>Sizes: </p>
            <div className='flex gap-4'>
              {data?.sizes.map((item, key) => (
                <p key={"sizes-" + key} className={` px-2 py-1 border rounded-md`}>{item}</p>
              ))}
            </div>
            {data?.colors?.length > 0 &&
              <div className='w-full flex items-center justify-between'>
                <div>
                  <p className='font-semibold'>Colors: </p>
                  <div className='flex gap-4'>
                    {data?.colors.map((item, key) => (
                      <p key={"colors-" + key} className={` w-10 aspect-square border rounded-md`} style={{ backgroundColor: item }}></p>
                    ))}
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div>
          <div className='p-4'>
            <div className='border-b-4 py-2 border-red-600'>
              <p className='text-2xl font-semibold'>Rating and Review's: {review?.length}</p>
            </div>

            {/* review form  */}
            <LoadingLayout hasContent={true} loadingState={isLoading?.review}>
              {review?.length == 0 ?
                <p className='py-4'>There are no reviews yet.</p>
                :
                review.map(({ user, comment, rating, _id }) => (
                  <div key={_id} className='flex items-start gap-4 flex-col border my-4 p-4'>
                    <div className='flex gap-4 items-center font-semibold'>
                      <img src={user?.profile_image || '/images/no-profile.png'} className='h-10 w-10 rounded-full object-cover' />
                      <p className='text-lg'>{user?.first_name} {user?.last_name}</p>
                    </div>
                    <StarLayout rating={rating} />
                    <p>{comment}</p>

                  </div>
                ))
              }
            </LoadingLayout>
          </div>
        </div>
      </LoadingLayout>
    </AdminLayout>
  )
}

export default ViewProduct