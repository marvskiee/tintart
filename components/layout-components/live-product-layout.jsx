import React, { useEffect, useRef, useState } from 'react'
import {
  BackLayout,
  CustomerLayout,
  CustomerWrapper,
  LoadingLayout,
  StarLayout,
  TextInput,
} from '../../components'
import { IoArrowBack } from 'react-icons/io5'
import { getOneProduct } from '../../services/product.services'
import { useRouter } from 'next/router'
import DATA from '../../utils/DATA'
import { Button, Label, Textarea } from 'flowbite-react'
import Link from 'next/link'
import { AiFillHeart, AiFillStar, AiOutlineHeart } from 'react-icons/ai'
import { toastOptions } from '../../styles/modalOption'
import { addWishList, deleteWishList, getUserWishList } from '../../services/wishlist.services'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'
import useQuantity from '../../hooks/useQuantity'
import { addCart, getUserCart, updateCart } from '../../services/cart.services'
import { addReview, getProductReview } from '../../services/review.services'
import { hasBlankValue } from '../../services/tools'
import { addCanvas } from '../../services/canvas.services'
import { getUserOrderDetails } from '../../services/order_details.services'

const LiveProductLayout = props => {
  const router = useRouter()
  const id = router?.query?.id

  const [wishListData, setWishListData] = useState([])
  const { state } = useAppContext()
  const { quantity, increment, decrement } = useQuantity(1)
  const [data, setData] = useState(null)
  const [review, setReview] = useState([])

  const [isLoading, setIsLoading] = useState({
    fetch: true,
    review: false,
  })
  const [primaryImage, setPrimaryImage] = useState(null)
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const initialData = {
    comment: '',
    rating: '',
  }
  const [ratingAllowed, setRatingAllowed] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const submitHandler = async () => {
    if (!state?.user) return toast.error('You must login first!', toastOptions)
    const hasBlank = hasBlankValue(Object.values(formData))
    if (hasBlank) return toast.error('Please fill up the fields!', toastOptions)
    setIsLoading({ ...isLoading, review: true })
    const newData = {
      rating: formData?.rating,
      user: state?.user?._id,
      comment: formData?.comment,
      product_id: id,
    }
    const result = await addReview(newData)
    if (result?.success) {
      setFormData(initialData)
      loadReviewHandler()
      toast.success('Review Submitted', toastOptions)
    } else {
      toast.error('Something went wrong!', toastOptions)
    }
    setIsLoading({ ...isLoading, review: false })
  }

  const heartHandler = async item => {
    if (!state?.user) return toast.error('You must login first!', toastOptions)

    const { product_name, images, _id } = item
    let filtered = wishListData.filter(d => d.product_id?._id == _id)
    if (filtered.length > 0) {
      let selected_wishlist = wishListData.filter(d => d.product_id?._id == item?._id)[0]
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
        title: product_name,
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

    if (result1.success) {
      if (result1.data?.is_archived == false) setData(result1.data)
    }
    let user_id = state?.user?._id

    const result2 = await getUserOrderDetails(user_id)
    if (result2.success) {
      const filteredCompleted = result2.data.filter(item => {
        return item.status === 'COMPLETED' && item.products.some(product => product?.product_id === id)
      })
      console.log(result2.data, id)
      if (filteredCompleted.length > 0) {
        setRatingAllowed(true)
      }
    }
    await loadReviewHandler()
    setIsLoading({ ...isLoading, fetch: false })
  }

  useEffect(() => {
    if (id != undefined) {
      loadHandler()
    }
  }, [id, state?.isAuth])

  const addToCartHandler = async () => {
    if (!state?.user) return toast.error('You must login first!', toastOptions)

    let newData = {
      size,
      quantity,
      user_id: state?.user?._id,
      product_id: data?._id,
    }
    // if (data?.merchandise == 'T-Shirt') {
    if (!(size && color)) return toast.error('Please select the size and color!', toastOptions)
    newData.color = color
    // } else {
    // if (!size) return toast.error('Please select the size!', toastOptions)
    // }
    // update product from cart
    const result2 = await getUserCart(state?.user?._id)
    let cart = result2?.data.filter(
      d => d.product_id?._id == id && d.color == newData?.color && d.size == newData?.size
    )
    let result
    if (cart?.length > 0) {
      result = await updateCart(
        {
          quantity: Number(newData.quantity) + Number(cart[0]?.quantity),
        },
        cart[0]?._id
      )
    } else {
      result = await addCart(newData)
    }
    if (result.success) {
      return toast.success('Product has been added to cart.', toastOptions)
    } else {
      return toast.error('Something went wrong!.', toastOptions)
    }
  }
  const shirtRef = useRef()
  const createDesignHandler = async () => {
    await addCanvas({ product: id, user_id: state?.user?._id })
    if (data.merchandise == 'T-Shirt') router.push('/customizer/tshirt')
    if (data.merchandise == 'Photocard') router.push('/customizer/photocard')
    if (data.merchandise == 'Sintra Board') router.push('/customizer/sintraboard')
  }
  const refreshWishList = async () => {
    const wishlist_result = await getUserWishList(state?.user?._id)
    if (wishlist_result.success) setWishListData(wishlist_result?.data)
  }

  return (
    <CustomerLayout hasFetch={true}>
      <LoadingLayout
        message='Product does not exist!'
        loadingState={isLoading?.fetch}
        hasContent={data}
      >
        <CustomerWrapper>
          <BackLayout href={'/shop'} page='Shop' />
          <div className='flex flex-col lg:flex-row gap-4 p-4'>
            {/* image section  */}
            <div className='lg:max-w-[22rem] lg:min-w-[22rem]'>
              <div>
                <img
                  src={primaryImage || data?.images[0]}
                  className='aspect-square object-cover w-full '
                />
              </div>
              {data?.images?.length > 0 && (
                <div className='mt-2 grid grid-cols-4 gap-2'>
                  {data.images.slice(1).map((item, key) => (
                    <img
                      key={'secondary-image-' + key}
                      src={item}
                      onMouseEnter={() => {
                        setPrimaryImage(item)
                      }}
                      onMouseLeave={() => setPrimaryImage(null)}
                      className='aspect-square object-cover cursor-pointer border-2 hover:border-red-500'
                    />
                  ))}
                </div>
              )}
            </div>
            {/* description */}
            <div className='flex flex-col gap-4 w-full'>
              <p className='font-semibold text-xl'>{data?.product_name}</p>
              <p className='font-semibold text-2xl'>
                {DATA.PESO} {data?.price}
              </p>
              <p dangerouslySetInnerHTML={{ __html: data?.description.replace(/\n/g, '<br>') }}></p>
              <p>
                <span className='font-semibold'>Category: </span> {data?.category?.category}
              </p>
              <p className='font-semibold'>Sizes: </p>
              <div className='flex gap-4'>
                {data?.sizes.map((item, key) => (
                  <p
                    key={'sizes-' + key}
                    className={`cursor-pointer px-2 py-1 border rounded-md ${
                      size == item && 'border-red-600'
                    } border-2`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>
              <div className='w-full flex items-center justify-between'>
                {data?.colors.length > 0 && (
                  <div>
                    <p className='font-semibold'>Colors: </p>
                    <div className='flex gap-4'>
                      {data?.colors.map((item, key) => (
                        <p
                          key={'colors-' + key}
                          className={`cursor-pointer px-2 py-1 border rounded-md ${
                            color == item && 'border-red-600'
                          } border-2`}
                          onClick={() => setColor(item)}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className='font-semibold'>Quantity: </p>
                  <div className='flex gap-4 justify-center items-center'>
                    <Button size='xs' onClick={decrement} color='light'>
                      -
                    </Button>
                    <p className='font-semibold'>{quantity}</p>
                    <Button size='xs' onClick={increment} color='light'>
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className='flex gap-4 flex-col lg:flex-row'>
                {data?.is_sold_out ? (
                  <Button className='w-full uppercase' disabled color='light'>
                    Sold Out
                  </Button>
                ) : (
                  <Button className='w-full uppercase' color='failure' onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                )}
                <Button
                  className={`flex items-center gap-4 w-full uppercase  font-semibold `}
                  color={'light'}
                  onClick={() => heartHandler(data)}
                >
                  {!wishListData.filter(d => d.product_id?._id == data?._id).length > 0 ? (
                    <>
                      <AiOutlineHeart className='text-2xl text-red-600 mr-1' size={20} />
                      Add to Wishlist
                    </>
                  ) : (
                    <>
                      <AiFillHeart className='text-2xl text-red-600 mr-1' size={20} />
                      {'  '}Remove to Wishlist
                    </>
                  )}
                </Button>
              </div>
              <p className='font-semibold'>
                You may create your own design and sent it to the Merchant:
              </p>
              <Button
                disabled={!state?.user}
                onClick={createDesignHandler}
                className='w-full text-zinc-900 uppercase font-semibold'
                color='warning'
              >
                Design now
              </Button>
              <Link href='https://tintartcustomize.vercel.app/' target='_blank' ref={shirtRef} />
            </div>
          </div>
        </CustomerWrapper>
        <CustomerWrapper>
          <div className='p-4'>
            <div className='border-b-4 py-2 border-red-600'>
              <p className='text-2xl font-semibold'>Review's: {review?.length}</p>
            </div>

            {/* review form  */}
            <LoadingLayout hasContent={true} loadingState={isLoading?.review}>
              {review?.length == 0 ? (
                <p className='py-4'>There are no reviews yet.</p>
              ) : (
                review.map(({ user, comment, rating, _id }) => (
                  <div key={_id} className='flex items-start gap-4 flex-col border my-4 p-4'>
                    <div className='flex gap-4 items-center font-semibold'>
                      <img
                        src={user?.profile_image || '/images/no-profile.png'}
                        className='h-10 w-10 rounded-full object-cover'
                      />
                      <p className='text-lg'>
                        {user?.first_name} {user?.last_name}
                      </p>
                    </div>
                    <StarLayout rating={rating} />
                    <p>{comment}</p>
                  </div>
                ))
              )}
              {ratingAllowed && (
                <div className='flex flex-col w-full gap-4 p-4 border-2 border-yellow-500'>
                  {review?.length == 0 && (
                    <p className='font-semibold text-lg'>Be the first to review product</p>
                  )}
                  <p className='font-semibold'>Your rating</p>
                  <StarLayout rating={formData.rating} setRating={setFormData} data={formData} />
                  <p className='font-semibold'>Your review</p>
                  <Textarea
                    rows='5'
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                  />
                  <div>
                    <Button
                      className='float-left uppercase'
                      color='failure'
                      onClick={submitHandler}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </LoadingLayout>
          </div>
        </CustomerWrapper>
      </LoadingLayout>
    </CustomerLayout>
  )
}

export default LiveProductLayout
