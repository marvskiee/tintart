import React from 'react'
import { AdminLayout, SettingHeader, SettingLayout } from '../../../components'
import { Button, FileInput, Label, TextInput } from 'flowbite-react'

const ChangePassword = () => {
  const fields = [
    {
      label: "Old Password", span: "col-span-2"
    },
    {
      label: "New Password", span: "col-span-2"
    },
    {
      label: "Repeat Password", span: "col-span-2"
    }
  ]
  const submitHandler = () => {
  }
  return (
    <AdminLayout>
      <SettingLayout>
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <p className='text-xl font-semibold mb-2'>Change Password</p>
          {fields.map((item, key) => (
            <div className={`my-2 ${item.span}`}>
              <Label className='capitalize mb-2 block'>{item.label}</Label>
              <input
                type='text'
                className='
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
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
          <Button color='gray'>
            Cancel
          </Button>
        </div>
      </SettingLayout>
    </AdminLayout>
  )
}

export default ChangePassword