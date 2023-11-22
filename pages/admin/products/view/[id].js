import React, { useEffect, useRef, useState } from 'react'
import { AdminLayout, BackLayout, CustomerLayout, CustomerWrapper, DeleteModalLayout, LoadingLayout, StarLayout, TextInput } from '../../../../components'
import { deleteProduct, getOneProduct } from '../../../../services/product.services'
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
  const { state } = useAppContext()
  const [data, setData] = useState(null)
  const [review, setReview] = useState([])
  const [modal, setModal] = useState(false)
  const [isLoading, setIsLoading] = useState({
    fetch: true,
    review: false
  })
  const [primaryImage, setPrimaryImage] = useState(null)

  const loadReviewHandler = async () => {
    const result3 = await getProductReview(id)
    if (result3.success) {
      setReview(result3.data)
    }
  }
  const loadHandler = async () => {
    setIsLoading({ ...isLoading, fetch: true })

    const result1 = await getOneProduct(id)

    if (result1.success) {
      setData(result1.data)
    }
    await loadReviewHandler()
    setIsLoading({ ...isLoading, fetch: false })

  }

  useEffect(() => {
    if (id != undefined) {
      loadHandler();
    }
  }, [id, state?.isAuth])


  const overall_rating = review?.reduce((accumulator, star) => {
    return Number(accumulator) + Number(star.rating)
  }, 0)
  return (
    <AdminLayout>
      <BackLayout href={"/admin/products"} page={"Products"}/>
      <DeleteModalLayout
        title='Product'
        path='/admin/products'
        modal={modal}
        setModal={setModal}
        id={id}
        itemName={data?.product_name}
        handler={deleteProduct}
      />
      <LoadingLayout message="Product does not exist!" loadingState={isLoading?.fetch} hasContent={data}>
        <>
          <div className='flex p-4 items-center justify-between w-full'>
            <p className='font-semibold text-xl'>Product Details</p>
            <div className='flex gap-4'>
              <Button
                gradientDuoTone={'cyanToBlue'}
              >
                <Link href={"/admin/products/edit/" + id}>
                  Edit
                </Link>
              </Button>
              <Button
                gradientDuoTone={'pinkToOrange'}
                onClick={() => setModal('dismissible')}
              >
                Delete
              </Button>
            </div>
          </div>
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
              <p dangerouslySetInnerHTML={{ __html: data?.description.replace(/\n/g, '<br>') }}></p>

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
                        <p key={"sizes-" + key} className={` px-2 py-1 border rounded-md`}>{item}</p>
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
        </>
      </LoadingLayout>
    </AdminLayout>
  )
}

export default ViewProduct