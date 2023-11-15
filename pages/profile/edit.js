import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper, DropdownInput, TextInput } from '../../components'
import { useAppContext } from '../../context/AppContext'
import { Button, FileInput, Label } from 'flowbite-react'
import { filterObjectWithEmptyProperties, hasBlankValue, imageUploader } from '../../services/tools'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import { changePassword, updateUser } from '../../services/user.services'
import { useRouter } from 'next/router'

const ProfileEdit = () => {
    const router = useRouter()
    const { state, dispatch } = useAppContext()
    const [isLoading, setIsLoading] = useState({ profile: false, newPassword: false })
    const initialProfileData = {
        first_name: '',
        last_name: '',
        email: '',
        contact_no: '',
        profile_image: '',
    }
    
    const [profileData, setProfileData] = useState(initialProfileData)

    const [imageUpload, setImageUpload] = useState(null)
    const inputFieldsProfile = [
        {
            label: 'First Name',
            name: 'first_name',
            value: profileData?.first_name,
            setValue: e => setProfileData({ ...profileData, first_name: e.target.value }),
        },
        {
            label: 'Last Name',
            name: 'last_name',
            value: profileData?.last_name,
            setValue: e => setProfileData({ ...profileData, last_name: e.target.value }),
        },
        {
            label: 'Email',
            name: 'email',
            value: profileData?.email,
            setValue: e => setProfileData({ ...profileData, email: e.target.value }),
        },
        {
            label: 'Contact No. (11 digits)',
            name: 'contact',
            value: profileData?.contact_no,
            setValue: e => {
                setProfileData({ ...profileData, contact_no: e.target.value.replace(/[^0-9]/g, '').slice(0, 11) })
            },
        },
    ]
   
    const submitHandler = async postImage => {
        let newData = filterObjectWithEmptyProperties(profileData)

        if (postImage) {
            newData['profile_image'] = postImage[0]
        }
        const result = await updateUser(newData, state?.user?._id)
        if (await result?.success) {
            router.push("/profile")
            dispatch({ type: 'LOGIN_SUCCESS', value: result.data })
            toast.success(`Profile has been updated successfuly!`, toastOptions)
        } else {
            toast.error(result?.errors || 'Something went wrong!', toastOptions)
        }
        setIsLoading({ ...isLoading, profile: false })
    }
    const validationHandler = async () => {
        const hasBlank = hasBlankValue(
            Object.values(profileData).slice(0, -1)
        )
        // const passwordMatch = profileData?.newPassword == profileData?.confirmPassword
        if (hasBlank || profileData?.contact_no.length != 11)
            return toast.error('Please fill up the form!', toastOptions)
        setIsLoading({ ...isLoading, profile: true })
        if (imageUpload) {
            await imageUploader([imageUpload], async postImage => {
                submitHandler(postImage)
            })
        } else {
            submitHandler()
        }
    }
    
    useEffect(() => {
        if (state?.isAuth) {
            const { first_name, last_name, email, profile_image, contact_no } = state?.user
            setProfileData({
                first_name,
                last_name,
                email,
                contact_no,
                profile_image,
            })
        }
    }, [state?.isAuth])
    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='flex flex-col p-4 mb-6'>
                    <p className='text-2xl font-semibold my-4'>Edit Profile</p>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:p-8 p-4 rounded-md border'>
                        <div className='lg:col-span-2'>
                            <img
                                src={imageUpload?.url || profileData?.profile_image || '/images/no-profile.png'}
                                className='object-cover w-32 aspect-square border rounded-md'
                            />
                        </div>
                        <div className={`lg:col-span-2`}>
                            <Label className='capitalize mb-2 block'>User Image</Label>
                            <div className='flex items-center gap-4'>
                                <FileInput
                                    className='w-full'
                                    disabled={isLoading?.profile}
                                    onChange={e => {
                                        try {
                                            setImageUpload({
                                                url: URL?.createObjectURL(e.target?.files[0]),
                                                file: e.target?.files[0],
                                                size: e.target?.files[0].size,
                                            })
                                            if (e.target?.files[0].size > 2000000)
                                                toast.error('File must be less than 2mb.', toastOptions)
                                        } catch (e) { }
                                    }}
                                    accept='image/*'
                                />
                            </div>
                        </div>

                        {inputFieldsProfile.map((input, key) => (
                            <div key={'profile-' + key}>
                                <Label className='capitalize mb-2 block'>{input.label}</Label>
                                <TextInput
                                    disabled={isLoading?.profile}
                                    value={input?.value}
                                    onChange={e => input?.setValue(e)}
                                    type='text'
                                />
                            </div>
                        ))}
                        <div
                            className={`lg:col-span-2`}
                        >

                            <Button className='float-right mt-4' disabled={isLoading?.profile} gradientDuoTone={'cyanToBlue'} onClick={validationHandler}>
                                Save Changes
                            </Button>

                        </div>
                    </div>
                    
                </div>
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default ProfileEdit