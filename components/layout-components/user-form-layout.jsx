import { Button, Dropdown, FileInput, Label } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { addUser, deleteUser, getOneUser, updateUser } from '../../services/user.services'
import DropdownInput from '../input-components/dropdown-input'
import { filterObjectWithEmptyProperties, hasBlankValue, imageUploader } from '../../services/tools'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import DeleteModalLayout from './delete-modal-layout'
import TextInput from '../input-components/text-input'
import { useAppContext } from '../../context/AppContext'

const UserFormLayout = ({ title, oldData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const initialData = {
    role: 1,
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    password: '',
    confirm_password: '',
    profile_image: '',
  }
  const [data, setData] = useState(initialData)
  const [imageUpload, setImageUpload] = useState(null)

  useEffect(() => {
    if (oldData) {
      const { role, first_name, last_name, email, profile_image, contact_no } = oldData
      setData({
        role,
        first_name,
        last_name,
        email,
        contact_no,
        password: '',
        profile_image,
        confirm_password: '',
      })
    }
  }, [oldData])
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
      label: 'Contact No. (11 digits)',
      name: 'contact',
      value: data?.contact_no,
      setValue: e => {
        setData({ ...data, contact_no: e.target.value.replace(/[^0-9]/g, '').slice(0, 11) })
      },
    },
    {
      label: 'Password',
      name: 'password',
      value: data?.password,
      setValue: e => setData({ ...data, password: e.target.value }),
    },
    {
      label: 'Confirm Password',
      name: 'confirm_password',
      value: data?.confirm_password,
      setValue: e => setData({ ...data, confirm_password: e.target.value }),
    },
  ]
  const finalInputFields = oldData
    ? inputFields.filter(field => field.name !== 'password' && field.name !== 'confirm_password')
    : inputFields
  const submitHandler = async postImage => {
    let newData = filterObjectWithEmptyProperties(data)

    if (postImage) {
      newData['profile_image'] = postImage[0]
    }
    if (oldData) {
      const result = await updateUser(newData, oldData?._id)
      if (await result?.success) {
        toast.success(`User has been updated successfuly!`, toastOptions)
      } else {
        toast.error(result?.errors || 'Something went wrong!', toastOptions)
      }
    } else {
      const result = await addUser(newData)
      if (await result?.success) {
        toast.success(`User has been added successfuly!`, toastOptions)
        setImageUpload(null)
        setData(initialData)
      } else {
        toast.error(result?.errors || 'Something went wrong!', toastOptions)
      }
    }
    setIsLoading(false)
  }
  const validationHandler = async () => {
    const hasBlank = hasBlankValue(
      oldData ? Object.values(data).slice(0, -3) : Object.values(data).slice(0, -1)
    )
    const passwordMatch = data?.password == data?.confirm_password
    if (oldData) {
      if (hasBlank || !passwordMatch) return toast.error('Please enter valid values!', toastOptions)
    } else {
      if (hasBlank || !passwordMatch || !imageUpload)
        return toast.error('Please enter valid values!', toastOptions)
    }
    setIsLoading(true)
    if (imageUpload) {
      await imageUploader([imageUpload], async postImage => {
        submitHandler(postImage)
      })
    } else {
      submitHandler()
    }
  }

  const { state } = useAppContext()
  const router = useRouter()
  const [modal, setModal] = useState(false)
  return (
    <div>
      {oldData && (
        <DeleteModalLayout
          title='User'
          path='/admin/users'
          modal={modal}
          setModal={setModal}
          id={oldData?._id}
          itemName={oldData.first_name + ' ' + oldData.last_name}
          handler={deleteUser}
        />
      )}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:p-8 p-4 rounded-md border'>
        <p className='text-xl font-semibold mb-2 col-span-1 lg:col-span-2'>{title}</p>
        <div className='lg:col-span-2'>
          <img
            src={imageUpload?.url || oldData?.profile_image || '/images/no-profile.png'}
            className='object-cover w-32 aspect-square border rounded-md'
          />
        </div>
        <div className={``}>
          <Label className='capitalize mb-2 block'>User Image</Label>
          <div className='flex items-center gap-4'>
            <FileInput
              className='w-full'
              disabled={isLoading}
              onChange={e => {
                try {
                  setImageUpload({
                    url: URL?.createObjectURL(e.target?.files[0]),
                    file: e.target?.files[0],
                    size: e.target?.files[0].size,
                  })
                  if (e.target?.files[0].size > 2000000)
                    toast.error('File must be less than 2mb.', toastOptions)
                } catch (e) {}
              }}
              accept='image/*'
            />
          </div>
        </div>
        <div className='w-full'>
          <Label className='capitalize mb-2 block'>User Type</Label>
          <DropdownInput
            selected={data?.role == 2 ? 'Admin' : 'Artist'}
            item={state?.user?.role == 3 ? ['Admin', 'Artist'] : ['Artist']}
            disabled={isLoading}
            handler={value => setData({ ...data, role: value == 'Admin' ? 2 : 1 })}
          />
        </div>
        {finalInputFields.map((input, key) => (
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
        <div
          className={`flex flex-col lg:flex-row gap-4 ${
            oldData ? 'justify-between' : 'justify-end'
          } mt-4 lg:col-span-2`}
        >
          {oldData && (
            <Button
              disabled={isLoading}
              gradientDuoTone={'pinkToOrange'}
              onClick={() => setModal('dismissible')}
            >
              Delete this user
            </Button>
          )}
          <div className='flex gap-4 flex-col lg:flex-row'>
            <Button disabled={isLoading} gradientDuoTone={'cyanToBlue'} onClick={validationHandler}>
              Submit
            </Button>
            <Button disabled={isLoading} onClick={() => router.back()} color='gray'>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFormLayout
