import React, { useState } from 'react'
import { CustomerLayout, CustomerWrapper, PasswordInput, TextInput } from '../components'
import ProfileLayout from '../components/layout-components/profile-layout'
import toast from 'react-hot-toast'
import { toastOptions } from '../styles/modalOption'
import { useAppContext } from '../context/AppContext'
import { Button, Label } from 'flowbite-react'
import { hasBlankValue, isValidPassword } from '../services/tools'
import { changePassword } from '../services/user.services'

const Password = () => {
    const { state } = useAppContext()

    const initialPasswordData = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    }
    const [isLoading, setIsLoading] = useState({ profile: false, newPassword: false })
    const passwordValidationHandler = async () => {
        const hasBlank = hasBlankValue(
            Object.values(passwordData).slice(0, -1)
        )
        const passwordValidation = isValidPassword(passwordData?.newPassword)
        if (!passwordValidation)
            return toast.error('Your password must be at least 16 characters long and contain alphanumeric and special characters.', toastOptions)
        if (hasBlank)
            return toast.error('Please fill up the form!', toastOptions)

        setIsLoading({ ...isLoading, newPassword: true })
        const result = await changePassword(passwordData, state?.user?._id)
        if (result?.success) {
            setPasswordData(initialPasswordData)
            toast.success(`Password has been updated successfuly!`, toastOptions)
        } else {
            toast.error(`${result?.errors?.oldPasswordError || result?.errors?.newPasswordError || result?.errors?.confirmPasswordError}`, toastOptions)
        }
        setIsLoading({ ...isLoading, newPassword: false })

    }
    const [passwordData, setPasswordData] = useState(initialPasswordData)
    const inputFieldsPassword = [
        {
            label: 'Old Password',
            name: 'oldPassword',
            value: passwordData?.oldPassword,
            setValue: e => setPasswordData({ ...passwordData, oldPassword: e.target.value }),
        },
        {
            label: 'Password',
            name: 'newPassword',
            value: passwordData?.newPassword,
            setValue: e => setPasswordData({ ...passwordData, newPassword: e.target.value }),
        },
        {
            label: 'Confirm Password',
            name: 'confirmPassword',
            value: passwordData?.confirmPassword,
            setValue: e => setPasswordData({ ...passwordData, confirmPassword: e.target.value }),
        },
    ]
    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <ProfileLayout>
                    <div className='grid grid-cols-1 gap-4'>
                        <p className='text-xl font-semibold mb-2 '>Change Password</p>
                        {inputFieldsPassword.map((input, key) => (
                            <div key={'newPassword-' + key}>
                                <Label className='capitalize mb-2 block'>{input.label}</Label>
                                <PasswordInput
                                    isLoading={isLoading?.newPassword}
                                    value={input?.value}
                                    setValue={input?.setValue}
                                />
                            </div>
                        ))}
                    </div>

                    <div
                    >

                        <Button className='float-right mt-4' disabled={isLoading?.newPassword} gradientDuoTone={'cyanToBlue'} onClick={passwordValidationHandler}>
                            Submit
                        </Button>

                    </div>
                </ProfileLayout>
            </CustomerWrapper>
        </CustomerLayout >
    )
}

export default Password