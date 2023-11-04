import React, { useEffect, useRef, useState } from 'react'
import { CustomerLayout, CustomerWrapper, LoadingLayout } from '../../components'
import { Button } from 'flowbite-react'
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';
import { authLogout } from '../../services/auth.services';
import toast from 'react-hot-toast';
import { getUserShipping } from '../../services/shipping.services';
import { addWishList, deleteWishList, getUserWishList } from '../../services/wishlist.services';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { toastOptions } from '../../styles/modalOption';

const Profile = () => {
    const { state, dispatch } = useAppContext();
    const router = useRouter()

    const [shippingData, setShippingData] = useState([])
    const [wishlistData, setWishlistData] = useState([])
    const [orderData, setOrderData] = useState([])


    const refreshWishList = async (id) => {
        const result_wishlist = await getUserWishList(id)
        if (result_wishlist?.success) {
            setWishlistData(result_wishlist?.data)
        }
    }
    const loadHandler = async () => {
        let id = state?.user?._id
        const result_shipping = await getUserShipping(id)
        console.log(result_shipping?.data)
        if (result_shipping?.success) {
            let defaultData = result_shipping?.data.filter((d) => d._id == state?.user?.shipping_id)
            console.log(defaultData)
            if (defaultData.length > 0)
                setShippingData(defaultData)
        }
        refreshWishList(id)
        // const result_order = await getUserShipping(id)
        // if (result_order?.success) {
        //     setData({ ...data, order: result_order?.data })
        //     setIsLoading({ ...isLoading, order: false })
        // }
        setIsLoading(false)
    }

    useEffect(() => {
        if (state?.user?._id)
            loadHandler()
    }, [state?.isAuth])

    const [isLoading, setIsLoading] = useState(true)

    const heartHandler = async (item) => {
        const { _id } = item
        const result = await deleteWishList(_id)
        if (result?.success) {
            refreshWishList(item?.user_id)
            return toast.success(`Removed to Wishlist`, toastOptions)
        }
    }


    const logoutHandler = async () => {
        toast.dismiss();

        dispatch({ type: "LOGIN_REQUEST" });
        setTimeout(async () => {
            const { success, message } = await authLogout();

            if (!success) {
                dispatch({ type: "LOGIN_ERROR", value: { error: message } });
                toast.error(message, {
                    duration: 1500,
                });
            } else {
                dispatch({ type: "LOGOUT" });
                router.push("/");
            }
        }, 1000);
    };

    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:px-10 p-4'>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex items-center justify-between'>
                            <p className='underline cursor-pointer' onClick={logoutHandler}>LOGOUT</p>
                            <Button color='dark' onClick={() => router.push("/profile/edit")}>Edit Profile</Button>
                        </div>
                        <p className='text-xl'>My Account</p>
                        <div className='lg:col-span-2'>
                            <img
                                src={state?.user?.profile_image || '/images/no-profile.png'}
                                className='object-cover w-32 aspect-square border rounded-md'
                            />
                        </div>
                        <p className='text-2xl font-semibold'>Welcome Back, {state?.user?.first_name} {state?.user?.last_name}</p>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        {/* shipping section  */}
                        <div className='border-b'>
                            <p className='text-2xl py-2 font-semibold uppercase'>Shipping Address</p>
                        </div>
                        {/* selected address  */}
                        <LoadingLayout message="You have no address listed." loadingState={isLoading} hasContent={shippingData.length > 0}>
                            <div className='flex items-center justify-between border-y p-4 text-zinc-500'>
                                <div>
                                    <div className='flex gap-2 lg:flex-row flex-col'>
                                        <p className='text-black'>{shippingData[0]?.receiver_name}</p>
                                        <p className=''>{shippingData[0]?.contact_no}</p>
                                    </div>
                                    <p className=''>{shippingData[0]?.unit} {shippingData[0]?.street} {shippingData[0]?.region}</p>
                                    <p className=''>{shippingData[0]?.information}</p>
                                    <p className='py-2'>
                                        {
                                            shippingData[0]?._id == state?.user?.shipping_id &&
                                            <span className='border border-red-600 text-red-600 p-1 px-4 text-xs'>Default</span>
                                        }
                                    </p>
                                </div>
                            </div>
                        </LoadingLayout>
                        <Button color="failure" className='w-full' onClick={() => router.push("/shipping")}>Edit Shipping Address</Button>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        {/* order section  */}
                        <div className='border-b'>
                            <p className='text-2xl py-2 font-semibold uppercase'>My Orders</p>
                        </div>
                        {/* list of orders  */}
                        <div>

                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        {/* wishlist section  */}
                        <div className='border-b'>
                            <p className='text-2xl py-2 font-semibold uppercase'>Wishlist</p>
                        </div>
                        <LoadingLayout message="You have no wishlist." loadingState={isLoading} hasContent={wishlistData?.length > 0}>
                            {wishlistData?.map((item, key) => (
                                <div className='flex items-center justify-between'>
                                    <img src={item?.image} className='object-cover w-14 aspect-square' />
                                    <div className="flex w-full justify-between items-center">
                                        <div className='p-2'>
                                            <p className='font-semibold'>{item?.title}</p>
                                            <p className='underline'>
                                                <Link href={"/shop/" + item?._id}>
                                                    Live Preview
                                                </Link>
                                            </p>
                                        </div>
                                        <Button onClick={() => heartHandler(item)} color="light" size="xs"
                                            className='border-0 aspect-square'>
                                            <AiFillHeart className='text-2xl text-red-600' />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </LoadingLayout>
                    </div>
                </div>
            </CustomerWrapper >
        </CustomerLayout >
    )
}

export default Profile