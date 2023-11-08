import { Button, FileInput, Label } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import DropdownInput from '../input-components/dropdown-input'
import { useRouter } from 'next/router'
import CheckboxInput from '../input-components/checkbox-input'
import { addProduct, deleteProduct, updateProduct } from '../../services/product.services'
import { getAllCategory } from '../../services/category.services'
import { getAllColor } from '../../services/color.services'
import { getAllSize } from '../../services/size.services'
import { AiFillCloseCircle } from 'react-icons/ai'
import { hasBlankValue, imageUploader } from '../../services/tools'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import DeleteModalLayout from './delete-modal-layout'
import TextInput from '../input-components/text-input'
const ProductFormLayout = ({ title, oldData }) => {
  const [isLoading, setIsLoading] = useState(false)
  const initialData = {
    merchandise: 'T-Shirt',
    description: '',
    product_name: '',
    price: '',
    category: '',
    colors: [],
    sizes: [],
    is_featured: false,
    is_archived: false,
    is_sold_out: false,
  }
  const [data, setData] = useState(initialData)
  const [categoryList, setCategoryList] = useState([])
  const [colorList, setColorList] = useState([])
  const [sizeList, setSizeList] = useState([])
  const categoryRef = useRef()
  // image
  const uploadRef = useRef()

  const [imageUpload, setImageUpload] = useState([])
  useEffect(() => {
    loadHandler()
  }, [oldData])
  const loadHandler = async () => {
    const category_result = await getAllCategory()
    const color_result = await getAllColor()
    const size_result = await getAllSize()

    if (category_result?.success) {
      let list = category_result?.data.map(item => item.category)
      setData({ ...data, category: list[0] })
      setCategoryList(category_result?.data)
    }

    if (color_result?.success) setColorList(color_result?.data.map(item => item.values))
    if (size_result?.success) setSizeList(size_result?.data.map(item => item.values))

    if (oldData) {
      const {
        merchandise,
        description,
        product_name,
        price,
        category,
        colors,
        sizes,
        is_featured,
        is_archived,
        is_sold_out,
        images,
      } = oldData
      categoryRef.current = category
      setData({
        merchandise,
        description,
        product_name,
        price,
        category: category?.category,
        colors,
        sizes,
        is_featured,
        is_archived,
        is_sold_out,
      })
      setImageUpload(images)
    }
  }

  const validationHandler = async () => {
    const hasBlank = hasBlankValue(Object.values(data).filter(item => typeof item === 'string'))
    if (hasBlank || imageUpload.length == 0)
      return toast.error('Please enter valid values!', toastOptions)
    setIsLoading(true)

    await imageUploader(imageUpload, async postImage => {
      submitHandler(postImage)
    })
  }

  const submitHandler = async postImage => {
    const newData = { ...data, images: postImage, category: categoryRef.current }
    console.log(newData)
    if (oldData) {
      const result = await updateProduct(newData, oldData?._id)
      if (await result?.success) {
        toast.success(`Product has been updated successfuly!`, toastOptions)
        setImageUpload(postImage)
      } else {
        toast.error('Something went wrong!', toastOptions)
      }
    } else {
      const result = await addProduct(newData)
      if (await result?.success) {
        toast.success(`Product has been added successfuly!`, toastOptions)
        setImageUpload([])
      } else {
        toast.error('Something went wrong!', toastOptions)
      }
      setData(initialData)
    }
    setIsLoading(false)
  }

  const router = useRouter()
  const [modal, setModal] = useState(false)
  return (
    <div>
      {oldData && (
        <DeleteModalLayout
          title='Product'
          path='/admin/products'
          modal={modal}
          setModal={setModal}
          id={oldData?._id}
          itemName={oldData.product_name}
          handler={deleteProduct}
        />
      )}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:p-8 p-4 rounded-md border'>
        <p className='text-xl font-semibold mb-2 col-span-1 lg:col-span-3'>{title}</p>
        <div className='col-span-1 lg:col-span-1'>
          <Label className='capitalize mb-2  block'>Merchandise</Label>
          <DropdownInput
            name='merchandise'
            selected={data?.merchandise}
            item={['T-Shirt', 'Sintra Board', 'Photocard']}
            disabled={isLoading}
            handler={value => setData({ ...data, merchandise: value })}
          />
        </div>
        <div className='hidden lg:block' />
        <div className='hidden lg:block' />
        <div className='lg:col-span-3'>
          <Label className='capitalize mb-2 block'>Images</Label>
          <div className='flex gap-4'>
            {imageUpload.map((item, key) => (
              <div className='relative' key={key + 'image-upload'}>
                <img
                  src={item?.url || item}
                  key={key + 'product-image'}
                  className='border w-20 aspect-square object-cover'
                />
                {!isLoading && (
                  <span
                    onClick={() => {
                      setImageUpload([...imageUpload.filter((sup, i) => i != key)])
                    }}
                    className='cursor-pointer absolute  rounded-full  top-2 right-2 bg-white z-10'
                  >
                    <AiFillCloseCircle size={20} className='text-red-600' />
                  </span>
                )}
              </div>
            ))}
            {!isLoading && imageUpload.length < 5 && (
              <img
                onClick={() => uploadRef.current.click()}
                src='/images/camera.png'
                className='cursor-pointer border w-20 aspect-square'
              />
            )}
          </div>

          <input
            ref={uploadRef}
            type='file'
            onChange={e => {
              try {
                if (e.target?.files[0].size > 2000000)
                  return toast.error('File must be less than 2mb.', toastOptions)
                setImageUpload([
                  ...imageUpload,
                  {
                    url: URL?.createObjectURL(e.target?.files[0]),
                    file: e.target?.files[0],
                    size: e.target?.files[0].size,
                  },
                ])
              } catch (e) {}
            }}
            accept='image/*'
            className='hidden my-2 rounded-md border border-zinc-300 px-4 py-3'
          />
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Name</Label>
          <TextInput
            disabled={isLoading}
            value={data?.product_name}
            onChange={e => setData({ ...data, product_name: e.target.value })}
            type='text'
          />
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Price</Label>
          <TextInput
            disabled={isLoading}
            value={data?.price}
            onChange={e => setData({ ...data, price: e.target.value })}
            type='text'
          />
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Category</Label>
          <DropdownInput
            isObject={true}
            item={categoryList}
            name='category'
            value={data?.category}
            selected={data?.category}
            handler={value => {
              categoryRef.current = value?._id
              setData({ ...data, category: value?.category })
            }}
            disabled={isLoading}
          />
        </div>
        <div className='lg:col-span-3'>
          <Label className='capitalize mb-2 block'>Description</Label>
          <textarea
            disabled={isLoading}
            value={data?.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            className='
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
          ></textarea>
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Color</Label>
          <DropdownInput
            name='color'
            item={colorList}
            disabled={isLoading}
            handler={item => {
              if (data.colors?.indexOf(item) == -1)
                setData({ ...data, colors: [...data?.colors, item] })
            }}
          />
          {data?.colors?.length > 0 && (
            <div className='flex flex-wrap rounded-md my-4 gap-2'>
              {data?.colors?.map((item, key) => (
                <div
                  key={key + '-image-'}
                  className='flex gap-2 bg-zinc-100 rounded-full px-2 items-center'
                >
                  <span>{item}</span>
                  <span
                    onClick={() => {
                      let filtered = data.colors.filter(d => d != item)
                      console.log(filtered, item)
                      setData({ ...data, colors: filtered })
                    }}
                  >
                    <AiFillCloseCircle />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Sizes</Label>
          <DropdownInput
            name='size'
            item={sizeList}
            handler={item => {
              if (data.sizes?.indexOf(item) == -1)
                setData({ ...data, sizes: [...data?.sizes, item] })
            }}
            disabled={isLoading}
          />
          {data?.sizes?.length > 0 && (
            <div className='flex flex-wrap rounded-md my-4 gap-2'>
              {data?.sizes?.map((item, key) => (
                <div
                  className='flex gap-2 bg-zinc-100 rounded-full px-2 items-center'
                  key={key + 'data'}
                >
                  <span>{item}</span>
                  <span
                    onClick={() => {
                      let filtered = data.sizes.filter(d => d != item)
                      console.log(filtered, item)
                      setData({ ...data, sizes: filtered })
                    }}
                  >
                    <AiFillCloseCircle />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Featured</Label>
          <CheckboxInput
            disabled={isLoading}
            title='featured'
            description='This product will appear on homepage'
            value={data?.is_featured}
            onChange={e => setData({ ...data, is_featured: e.target.checked })}
          />
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Archived</Label>
          <CheckboxInput
            disabled={isLoading}
            title='archived'
            description="This product will appear on the store as 'Sold Out'"
            value={data?.is_archived}
            onChange={e => setData({ ...data, is_archived: e.target.checked })}
          />
        </div>
        <div>
          <Label className='capitalize mb-2 block'>Sold Out</Label>
          <CheckboxInput
            disabled={isLoading}
            title='sold-out'
            description="This product will appear on the store as 'Sold Out'"
            value={data?.is_sold_out}
            onChange={e => setData({ ...data, is_sold_out: e.target.checked })}
          />
        </div>
        <div
          className={`flex flex-col lg:flex-row gap-4 ${
            oldData ? 'justify-between' : 'justify-end'
          } mt-4 lg:col-span-3 col-span-1`}
        >
          {oldData && (
            <Button
              disabled={isLoading}
              gradientDuoTone={'pinkToOrange'}
              onClick={() => setModal('dismissible')}
            >
              Delete this product
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

export default ProductFormLayout
