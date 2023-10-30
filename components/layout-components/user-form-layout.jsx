import { Button, Dropdown, FileInput, Label } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { addUser, deleteUser, getOneUser, updateUser } from '../../services/user.services'
import DropdownInput from '../input-components/dropdown-input'
import { hasBlankValue } from '../../services/tools'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import DeleteModalLayout from './delete-modal-layout'

const UserFormLayout = ({ title, oldData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    role: 1,
    first_name: '',
    last_name: '',
    email: '',
    contact_no: '',
    password: '',
    confirm_password: '',
  })

  useEffect(() => {
    if (oldData) {
      const { role, first_name, last_name, email, contact_no } = oldData
      setData({
        role,
        first_name,
        last_name,
        email,
        contact_no,
        password: '',
        confirm_password: '',
      })
    }
  }, [oldData])
  const fields = [
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

  const submitHandler = async () => {
    const hasBlank = hasBlankValue(Object.values(data))
    const passwordMatch = data?.password === data?.confirm_password
    if (hasBlank || !passwordMatch) return toast.error('Please enter valid values!', toastOptions)
    setIsLoading(true)
    if (oldData) {
      const result = await updateUser(data, oldData?._id)
      if (await result?.success) {
        toast.success(`User has been updated successfuly!`, toastOptions)
      } else {
        toast.error('Something went wrong!', toastOptions)
      }
    } else {
      const result = await addUser(data)
      if (await result?.success) {
        toast.success(`User has been added successfuly!`, toastOptions)
      } else {
        toast.error('Something went wrong!', toastOptions)
      }
      setData({
        role: 1,
        first_name: '',
        last_name: '',
        email: '',
        contact_no: '',
        password: '',
        confirm_password: '',
      })
    }
    setIsLoading(false)
  }
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
        <div className={``}>
          <Label className='capitalize mb-2 block'>User Image</Label>
          <div className='flex items-center gap-4'>
            <img
              src='/images/about1.png'
              className='object-cover w-10 aspect-square border rounded-full'
            />
            <FileInput className='w-full' disabled={isLoading} />
          </div>
        </div>
        <div className='w-full'>
          <Label className='capitalize mb-2 block'>User Type</Label>
          <DropdownInput
            selected={data?.role == 2 ? 'Admin' : 'Artist'}
            item={['Admin', 'Artist']}
            disabled={isLoading}
            handler={value => setData({ ...data, role: value == 'Admin' ? 2 : 1 })}
          />
        </div>
        {fields.map((item, key) => (
          <div key={'profile-' + key}>
            <Label className='capitalize mb-2 block'>{item.label}</Label>
            <input
              disabled={isLoading}
              value={item?.value}
              onChange={e => item?.setValue(e)}
              type='text'
              className='
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
            />
          </div>
        ))}
        <div
          className={`flex gap-4 ${oldData ? 'justify-between' : 'justify-end'} mt-4 lg:col-span-2`}
        >
          {oldData && (
            <Button gradientDuoTone={'pinkToOrange'} onClick={() => setModal('dismissible')}>
              Delete this user
            </Button>
          )}
          <div className='flex gap-4'>
            <Button gradientDuoTone={'cyanToBlue'} onClick={submitHandler}>
              Submit
            </Button>
            <Button onClick={() => router.back()} color='gray'>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFormLayout
