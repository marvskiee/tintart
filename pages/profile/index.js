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
import { getUserOrderDetails } from '../../services/order_details.services';
import DATA from '../../utils/DATA';
import { formatNumberWithCommas } from '../../services/tools';
import ProfileLayout from '../../components/layout-components/profile-layout';

const Profile = () => {
    const { state, dispatch } = useAppContext();
    const router = useRouter()

    const [shippingData, setShippingData] = useState([])


    const loadHandler = async () => {
        let id = state?.user?._id
        // get shipping
        const result_shipping = await getUserShipping(id)
        if (result_shipping?.success) {
            let defaultData = result_shipping?.data.filter((d) => d._id == state?.user?.shipping_id)
            if (defaultData.length > 0)
                setShippingData(defaultData)
        }

        setIsLoading(false)
    }

    useEffect(() => {
        if (state?.user?._id)
            loadHandler()
    }, [state?.isAuth])
    console.log(state?.user?._id)

    const [isLoading, setIsLoading] = useState(true)

    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <ProfileLayout>
                    <div className='grid grid-cols-1 gap-4'>
                        <div className='w-full flex flex-col lg:flex-row gap-4 items-start justify-between'>
                            <div className='flex gap-4 items-center'>
                                <img
                                    src={state?.user?.profile_image || '/images/no-profile.png'}
                                    className='object-cover rounded-full w-32 aspect-square border'
                                />
                                <div>
                                    <p className='text-lg font-semibold'>{state?.user?.first_name} {state?.user?.last_name}</p>
                                    <p className=''>{state?.user?.contact_no}</p>
                                    <p className=''>{state?.user?.email}</p>
                                </div>
                            </div>
                            <Button color='dark' onClick={() => router.push("/profile/edit")}>Edit Profile</Button>
                        </div>

                        <div className='w-full flex flex-col mt-4 gap-4'>
                            {/* shipping section  */}
                            <p className='text-2xl py-2 font-semibold uppercase'>Shipping Address</p>
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
                    </div>
                </ProfileLayout>
            </CustomerWrapper >
        </CustomerLayout >
    )
}

export default Profile