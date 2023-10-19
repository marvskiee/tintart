import React from 'react'
import { AdminLayout, SettingHeader, SettingLayout } from '../../../components'
import { Button, FileInput, Label } from 'flowbite-react'

const Shop = () => {
  const topFields = [
    { label: "Shop Name", span: "col-span-2" },
    { label: "Shop Description", span: "col-span-2" },
    { label: "Terms and Conditions", span: "col-span-2", isTextArea: true },
  ]
  const middleFields = [
    { label: "Facebook", span: "col-span-1" },
    { label: "Instagram", span: "col-span-1" },
    { label: "Tiktok", span: "col-span-1" },
    { label: "Shopee", span: "col-span-1" },
  ]
  const bottomFields = [
    { label: "Email", span: "col-span-1" },
    { label: "Contact No.", span: "col-span-1" },
  ]
  const submitHandler = () => { }
  return (
    <AdminLayout>
      <SettingLayout>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <p className='text-xl font-semibold mb-2 col-span-1 lg:col-span-2'>Shop Settings</p>
          <div className={`col-span-1 lg:col-span-2`}>
            <Label className='capitalize mb-2 block'>Shop Logo</Label>
            <FileInput />
          </div>
          {topFields.map((item, key) => (
            <div key={"password-" + key} className={`col-span-1 lg:col-span-2`} >
              <Label className='capitalize mb-2 block'>{item.label}</Label>
              {item?.isTextArea ?
                <textarea
                  className='
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                />
                :
                <input
                  type='text'
                  className='
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                />
              }
            </div>
          ))}
          <Label className='capitalize mb-2 block col-span-1 lg:col-span-2'>Social Media Links</Label>
          <div className='col-span-1 lg:col-span-2 grid-cols-1 grid gap-4 p-4 border rounded-md lg:grid-cols-2'>
            {middleFields.map((item, key) => (
              <div key={"password-" + key}>
                <Label className='capitalize mb-2 block'>{item.label}</Label>
                {item?.isTextArea ?
                  <textarea
                    className='
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                  />
                  :
                  <input
                    type='text'
                    className='
                bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                  />
                }
              </div>
            ))}
          </div>
          {bottomFields.map((item, key) => (
            <div key={"password-" + key} className={`col-span-1`}>
              <Label className='capitalize mb-2 block'>{item.label}</Label>
              {item?.isTextArea ?
                <textarea
                  className='
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                />
                :
                <input
                  type='text'
                  className='
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                />
              }
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

export default Shop