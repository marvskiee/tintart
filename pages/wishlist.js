import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper, LoadingLayout } from '../components'
import ProfileLayout from '../components/layout-components/profile-layout'
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'next/router';
import { deleteWishList, getUserWishList } from '../services/wishlist.services';
import { Button } from 'flowbite-react';
import { AiFillHeart } from 'react-icons/ai';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { toastOptions } from '../styles/modalOption';

const Wishlist = () => {
    const { state } = useAppContext();
    const [wishlistData, setWishlistData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const refreshWishList = async (id) => {
        const result_wishlist = await getUserWishList(id)
        if (result_wishlist?.success) {
            setWishlistData(result_wishlist?.data.filter(d => d?.product_id != null))
        }
    }

    const loadHandler = async () => {
        let id = state?.user?._id

        refreshWishList(id)

        setIsLoading(false)
    }
    const heartHandler = async (item) => {
        const { _id } = item
        const result = await deleteWishList(_id)
        if (result?.success) {
            refreshWishList(item?.user_id)
            return toast.success(`Removed to Wishlist`, toastOptions)
        }
    }
    useEffect(() => {
        if (state?.user?._id)
            loadHandler()
    }, [state?.isAuth])
    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <ProfileLayout>
                    <LoadingLayout message="You have no wishlist." loadingState={isLoading} hasContent={wishlistData?.length > 0}>
                        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 mb-10'>
                            {wishlistData?.map((item, key) => (

                                <div className='relative flex-col flex gap-2 cursor-pointer' key={key} >
                                    <Button onClick={() => heartHandler(item)} color="light" size="xs" className='z-10 bg-black/50 border-0 absolute top-5 right-5 aspect-square'>
                                        <AiFillHeart className='text-2xl text-red-600' />
                                    </Button>
                                    {item?.is_sold_out &&
                                        <div onClick={() => router.push("/shop/" + item?._id)} src={item?.image} className='rounded-2xl absolute flex items-center justify-center w-full aspect-square top-0 left-0 bg-black/50'>
                                            <p className='text-white text-xl font-semibold uppercase'>Sold Out</p>
                                        </div>}
                                    <img onClick={() => router.push("/shop/" + item?._id)} src={item?.image} className='rounded-2xl w-full aspect-square object-cover' />
                                    <p onClick={() => router.push("/shop/" + item?._id)} className="px-2 font-semibold text-md">{item?.product_id?.product_name}</p>
                                    <p onClick={() => router.push("/shop/" + item?._id)} className="px-2 font-semibold text-xl">PHP {item?.product_id?.price}</p>
                                </div>
                            ))}
                        </div>
                    </LoadingLayout>
                </ProfileLayout>
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default Wishlist