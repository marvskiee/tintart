import React, { useEffect, useState } from 'react'
import { AdminLayout, SettingHeader, SettingLayout, TextInput } from '../../../components'
import { Button, FileInput, Label } from 'flowbite-react'
import toast from 'react-hot-toast'
import { toastOptions } from '../../../styles/modalOption'
import { updateUser } from '../../../services/user.services'
import { useAppContext } from '../../../context/AppContext'
import { getUser } from '../../../services/auth.services'
import { hasBlankValue, imageUploader } from '../../../services/tools'

const Profile = () => {
  const { state, dispatch } = useAppContext()
  const [imageUpload, setImageUpload] = useState(null)
  const [data, setData] = useState(
    {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
    }
  )
  const [isLoading, setIsLoading] = useState(false)
  const inputFields = [
    {
      label: 'First Name',
      name: 'first_name',
      value: data?.first_name,
      setValue: e => setData({ ...data, first_name: e.target.value }),
    },
    {
      label: 'Last Name',
      name: 'last_name',
      value: data?.last_name,
      setValue: e => setData({ ...data, last_name: e.target.value }),
    },
    {
      label: 'Email',
      name: 'email',
      value: data?.email,
      setValue: e => setData({ ...data, email: e.target.value }),
    },
    {
      label: 'Contact No.',
      name: 'contact',
      value: data?.contact_no,
      setValue: e => setData({ ...data, contact_no: e.target.value }),
    },
  ]
  const submitHandler = async (postImage) => {
    if (postImage) {
      data['profile_image'] = postImage[0]
    }
    const result = await updateUser(data, data?._id)
    if (await result?.success) {
      loadHandler()
      toast.success(`Profile has been updated successfuly!`, toastOptions)
    } else {
      toast.error(result?.errors || 'Something went wrong!', toastOptions)
    }
  }
  const validationHandler = async () => {
    const hasBlank = hasBlankValue(Object.values(data))
    if (hasBlank) return toast.error('Please enter valid values!', toastOptions)

    setIsLoading(true)

    if (imageUpload) {
      await imageUploader([imageUpload], async postImage => {
        submitHandler(postImage)
      })
    } else {
      submitHandler()
    }

    setIsLoading(false)

  }

  const loadHandler = async () => {
    setIsLoading(true)
    const { success, data } = await getUser()
    if (success) {
      await dispatch({ type: 'SET_USER', value: data })
      setData(data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (state?.user?._id) {
      loadHandler()
    }
  }, [state?.isAuth])
  return (
    <AdminLayout>
      <SettingLayout>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <p className='text-xl font-semibold mb-2 col-span-1 lg:col-span-2'>Edit Profile</p>
          <div className='lg:col-span-2'>
            <img
              src={imageUpload?.url || data?.profile_image || '/images/no-profile.png'}
              className='object-cover w-32 aspect-square border rounded-md'
            />
          </div>
          <div className={`lg:col-span-2`}>
            <Label className='capitalize mb-2 block'>User Image</Label>
            <div className='flex items-center gap-4'>
              <FileInput
                className='w-full'
                disabled={isLoading}
                onChange={e => {
                  try {
                    if (e.target?.files[0].size > 2000000)
                      return toast.error('File must be less than 2mb.', toastOptions)
                    setImageUpload({
                      url: URL?.createObjectURL(e.target?.files[0]),
                      file: e.target?.files[0],
                      size: e.target?.files[0].size,
                    })
                  } catch (e) { }
                }}
                accept='image/*'
              />
            </div>
          </div>
          {inputFields.map((input, key) => (
            <div key={'profile-' + key}>
              <Label className='capitalize mb-2 block'>{input.label}</Label>
              <TextInput
                disabled={isLoading}
                value={input?.value}
                onChange={e => input?.setValue(e)}
                type='text'
              />
            </div>
          ))}
        </div>
        <div className='flex gap-4 justify-end mt-4'>
          <Button
            disabled={isLoading}
            gradientDuoTone={'cyanToBlue'}
            onClick={validationHandler}
          >
            Save Changes
          </Button>
        </div>
      </SettingLayout>
    </AdminLayout>
  )
}

export default Profile