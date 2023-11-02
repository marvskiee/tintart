import React from 'react'
import { CustomerLayout, CustomerWrapper } from '../../components'
import { Button } from 'flowbite-react'
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';
import { authLogout } from '../../services/auth.services';
import toast from 'react-hot-toast';

const Profile = () => {
    const { state, dispatch } = useAppContext();
    const router = useRouter()

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
                        <p className='text-2xl font-semibold'>Welcome Back, {state?.user?.first_name} {state?.user?.last_name}</p>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        {/* shipping section  */}
                        <div className='border-b'>
                            <p className='text-2xl py-2 font-semibold uppercase'>Shipping Address</p>
                        </div>
                        {/* selected address  */}
                        <div>

                        </div>
                        <Button color="failure" className='w-full' onClick={()=>router.push("/shipping")}>Edit Shipping Address</Button>
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
                    </div>
                </div>
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default Profile