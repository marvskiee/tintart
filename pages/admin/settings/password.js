import React, { useState } from 'react'
import { AdminLayout, PasswordInput, SettingHeader, SettingLayout, TextInput } from '../../../components'
import { Button, FileInput, Label } from 'flowbite-react'
import { filterObjectWithEmptyProperties, hasBlankValue, isValidPassword } from '../../../services/tools'
import { changePassword } from '../../../services/user.services'
import { toastOptions } from '../../../styles/modalOption'
import toast from 'react-hot-toast'
import { useAppContext } from '../../../context/AppContext'

const ChangePassword = () => {
  const { state, dispatch } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)

  const initialPasswordData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
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
  const submitHandler = async () => {
    const hasBlank = hasBlankValue(
      Object.values(passwordData).slice(0, -1)
    )
    const passwordValidation = isValidPassword(passwordData?.newPassword)
    if (!passwordValidation)
      return toast.error('Password must be 8-16 characters, containing at least one letter/number and one special character.', toastOptions)
    if (hasBlank)
      return toast.error('Please fill up the form!', toastOptions)

    setIsLoading(true)
    const result = await changePassword(passwordData, state?.user?._id)
    if (result?.success) {
      setPasswordData(initialPasswordData)
      toast.success(`Password has been updated successfuly!`, toastOptions)
    } else {
      toast.error(`${result?.errors?.oldPasswordError || result?.errors?.newPasswordError || result?.errors?.confirmPasswordError}`, toastOptions)
    }
    setIsLoading(false)
  }
  return (
    <AdminLayout>
      <SettingLayout>
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
        <div className='flex gap-4 justify-end mt-4'>
          <Button
            gradientDuoTone={'cyanToBlue'}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </div>
      </SettingLayout>
    </AdminLayout>
  )
}

export default ChangePassword