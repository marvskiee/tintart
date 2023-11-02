import React, { useEffect, useRef, useState } from 'react'
import { AdminLayout, SettingHeader, SettingLayout, TextInput } from '../../../components'
import { Button, FileInput, Label } from 'flowbite-react'
import { addShop, getAllShop, updateShop } from '../../../services/shop.services'
import toast from 'react-hot-toast'
import { toastOptions } from '../../../styles/modalOption'
import { hasBlankValue, imageUploader } from '../../../services/tools'

const Shop = () => {
  const [logo, setLogo] = useState(null)
  const initialData = {
    name: "",
    description: "",
    terms: "",
    facebook_link: "",
    instagram_link: "",
    tiktok_link: "",
    shopee: "",
    email: "",
    contact_no: "",
  }

  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const dataRowRef = useRef();
  const loadHandler = async () => {
    setIsLoading(true)
    const result = await getAllShop();
    if (result?.success) {
      dataRowRef.current = result?.data?.length
      if (result?.data.length > 0)
        setData(result?.data[0])
    }
    setIsLoading(false)

  }

  const topFields = [
    {
      label: "Shop Name", span: "col-span-2",
      value: data?.name,
      setValue: e => setData({ ...data, name: e.target.value }),
    },
    {
      label: "Shop Description", span: "col-span-2",
      value: data?.description,
      setValue: e => setData({ ...data, description: e.target.value }),
    },
    {
      label: "Terms and Conditions", span: "col-span-2", isTextArea: true,
      value: data?.terms,
      setValue: e => setData({ ...data, terms: e.target.value }),
    },
  ]
  const middleFields = [
    {
      label: "Facebook", span: "col-span-1",
      value: data?.facebook_link,
      setValue: e => setData({ ...data, facebook_link: e.target.value }),
    },
    {
      label: "Instagram", span: "col-span-1",
      value: data?.instagram_link,
      setValue: e => setData({ ...data, instagram_link: e.target.value }),
    },
    {
      label: "Tiktok", span: "col-span-1",
      value: data?.tiktok_link,
      setValue: e => setData({ ...data, tiktok_link: e.target.value }),
    },
    {
      label: "Shopee", span: "col-span-1",
      value: data?.shopee,
      setValue: e => setData({ ...data, shopee: e.target.value }),
    },
  ]
  const bottomFields = [
    {
      label: "Email", span: "col-span-1",
      value: data?.email,
      setValue: e => setData({ ...data, email: e.target.value }),
    },
    {
      label: "Contact No.", span: "col-span-1",
      value: data?.contact_no,
      setValue: e => setData({ ...data, contact_no: e.target.value }),
    },
  ]

  const validationHandler = async () => {
    const hasBlank = hasBlankValue(
      Object.values(data)
    )

    console.log(data)
    if (hasBlank) return toast.error('Please enter valid values!', toastOptions)
    setIsLoading(true)
    if (logo) {
      await imageUploader([logo], async postImage => {
        submitHandler(postImage)
      })
    } else {
      submitHandler()
    }

  }

  useEffect(() => {
    loadHandler()
  }, [])

  const submitHandler = async (postImage) => {
    let newData = data

    if (postImage) {
      newData['logo'] = postImage[0]
    }
    console.log(newData)
    if (dataRowRef.current > 0) {
      const result = await updateShop(newData, data?._id)
      if (await result?.success) {
        toast.success(`Shop has been updated successfuly!`, toastOptions)
      } else {
        console.log(result?.errors)
        toast.error(result?.errors || 'Something went wrong!', toastOptions)
      }
    } else {
      const result = await addShop(newData)
      if (await result?.success) {
        toast.success(`Shop has been added successfuly!`, toastOptions)
        setLogo(null)
        setData(initialData)
      } else {
        toast.error(result?.errors || 'Something went wrong!', toastOptions)
      }
    }
    setIsLoading(false)
  }


  return (
    <AdminLayout>
      <SettingLayout>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <p className='text-xl font-semibold mb-2 col-span-1 lg:col-span-2'>Shop Settings</p>
          <div className='lg:col-span-2'>
            <img
              src={logo?.url || data?.logo || '/images/camera.png'}
              className='object-cover w-32 aspect-square border rounded-md'
            />
          </div>
          <div className={`col-span-1 lg:col-span-2`}>
            <Label className='capitalize mb-2 block'>Shop Logo</Label>
            <FileInput
              className='w-full'
              disabled={isLoading}
              onChange={e => {
                try {
                  if (e.target?.files[0].size > 2000000)
                    toast.error('File must be less than 2mb.', toastOptions)
                  setLogo({
                    url: URL?.createObjectURL(e.target?.files[0]),
                    file: e.target?.files[0],
                    size: e.target?.files[0].size,
                  })
                } catch (e) { }
              }}
              accept='image/*'
            />
          </div>
          {topFields.map((item, key) => (
            <div key={"password-" + key} className={`col-span-1 lg:col-span-2`} >
              <Label className='capitalize mb-2 block'>{item.label}</Label>
              {item?.isTextArea ?
                <textarea
                  disabled={isLoading}
                  value={item?.value}
                  onChange={e => item?.setValue(e)}
                  className='
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
                />
                :
                <TextInput
                  disabled={isLoading}
                  value={item?.value}
                  onChange={e => item?.setValue(e)}
                  type='text'
                />
              }
            </div>
          ))}
          <Label className='capitalize mb-2 block col-span-1 lg:col-span-2'>Social Media Links</Label>
          <div className='col-span-1 lg:col-span-2 grid-cols-1 grid gap-4 p-4 border rounded-md lg:grid-cols-2'>
            {middleFields.map((item, key) => (
              <div key={"password-" + key}>
                <Label className='capitalize mb-2 block'>{item.label}</Label>
                {
                  <TextInput
                    disabled={isLoading}
                    value={item?.value}
                    onChange={e => item?.setValue(e)}
                    type='text'
                  />
                }
              </div>
            ))}
          </div>
          {bottomFields.map((item, key) => (
            <div key={"password-" + key} className={`col-span-1`}>
              <Label className='capitalize mb-2 block'>{item.label}</Label>
              {
                <TextInput
                  disabled={isLoading}
                  value={item?.value}
                  onChange={e => item?.setValue(e)}
                  type='text'
                />
              }
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

export default Shop