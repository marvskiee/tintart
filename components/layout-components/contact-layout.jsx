import { Button, Label } from 'flowbite-react'
import React, { useState } from 'react'
import { sendMessage } from '../../services/email.services'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import { hasBlankValue } from '../../services/tools'

const ContactLayout = ({ title }) => {
  const [isLoading, setIsLoading] = useState(false)
  const field = {
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    body: '',
  }
  const [data, setData] = useState(field)

  const fields = [
    {
      label: 'First Name',
      name: 'first_name',
      value: data?.first_name,
      setValue: e => setData({ ...data, first_name: e.target.value }),
    },
    {
      label: 'Last Name',
      value: data?.last_name,
      setValue: e => setData({ ...data, last_name: e.target.value }),
    },
    {
      label: 'Email',
      value: data?.email,
      setValue: e => setData({ ...data, email: e.target.value }),
    },
    {
      label: 'Subject',
      value: data?.subject,
      setValue: e => setData({ ...data, subject: e.target.value }),
    },
  ]

  const submitHandler = async () => {
    const hasBlank = hasBlankValue(Object.values(data))
    if (hasBlank) return toast.error('Please enter valid values!', toastOptions)
    setIsLoading(true)
    const result = await sendMessage(data)
    if (await result?.success) {
      toast.success(`Email has been sent!`, toastOptions)
      setData(field)
    } else {
      toast.error('Something went wrong!', toastOptions)
    }

    setIsLoading(false)
  }

  return (
    <>
      <p className='font-bold text-2xl my-4'>{title}</p>
      <div className='rounded-md border grid grid-cols-1 gap-4 lg:grid-cols-2 p-4'>
        {fields.map((item, key) => (
          <div>
            <Label>{item?.label}</Label>
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
        <div className='lg:col-span-2 col-span-1'>
          <Label>Message</Label>
          <textarea
            disabled={isLoading}
            value={data?.body}
            onChange={e => setData({ ...data, body: e.target.value })}
            className='
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
          />
        </div>
        <div>
          <Button color='dark' onClick={submitHandler} disabled={isLoading}>
            {!isLoading ? 'Submit' : 'Submitting...'}
          </Button>
        </div>
      </div>
    </>
  )
}

export default ContactLayout
