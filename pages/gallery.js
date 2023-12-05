import React, { useEffect, useRef, useState } from 'react'
import { CustomerLayout, CustomerWrapper, DeleteModalLayout, DynamicFetchLayout, LoadingLayout, ModalLayout, TextInput, ViewGalleryModal } from '../components'
import { Button, FileInput, Label, Modal } from 'flowbite-react'
import { addGallery, deleteGallery, getAllGallery } from '../services/gallery.services'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { toastOptions } from '../styles/modalOption'
import { hasBlankValue, imageUploader } from '../services/tools'
import Link from 'next/link'
import { FaEye, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'

const Gallery = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { state, dispatch } = useAppContext();
  const initialData = {
    name: "",
    artwork_title: "",
    facebook_link: "",
    instagram_link: "",
  }
  const [formData, setFormData] = useState(initialData)
  const [data, setData] = useState([])
  const [modal, setModal] = useState(null)
  const [deleteModal, setDeleteModal] = useState(null)
  const [imageModal, setImageModal] = useState(null)
  const targetRef = useRef()
  const [myGallery, setMyGallery] = useState(false)
  const [hoverActive, setHoverActive] = useState();
  const getLinks = (id) => {
    setHoverActive(id);
  };

  const loadHandler = async () => {
    const result = await getAllGallery();
    if (result.success) {
      setData(result.data)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadHandler()
  }, [])
  const [imageUpload, setImageUpload] = useState(null)
  const filteredData = myGallery ? data?.filter(d => d.user_id == state?.user?._id) : data
  const fieldInputs = [
    {
      label: 'Artist Name',
      name: 'name',
      value: formData?.name,
      setValue: e => setFormData({ ...formData, name: e.target.value }),
    },
    {
      label: 'Artwork Title',
      name: 'artwork_title',
      value: formData?.artwork_title,
      setValue: e => setFormData({ ...formData, artwork_title: e.target.value }),
    },
    {
      label: 'Facebook Link',
      name: 'facebook_link',
      value: formData?.facebook_link,
      setValue: e => setFormData({ ...formData, facebook_link: e.target.value }),
    },
    {
      label: 'Instagram Link',
      name: 'instagram_link',
      value: formData?.instagram_link,
      setValue: e => setFormData({ ...formData, instagram_link: e.target.value }),
    },

  ]
  const addHandler = async () => {
    const hasBlank = hasBlankValue(Object.values(formData).slice(0, -3))

    if (hasBlank)
      return toast.error('Please fill up atleast the name and artwork title!', toastOptions)

    if (!imageUpload)
      return toast.error('Please select an image!', toastOptions)


    setIsLoading(true)
    await imageUploader([imageUpload], async (postImage) => {
      const newData = {
        ...formData, user_id: state?.user?._id, image: postImage[0]
      }

      const result = await addGallery(newData)
      if (await result?.success) {
        toast.success(`Uploaded successfuly!`, toastOptions)
        setFormData(initialData)
        setImageUpload(null)
        setModal(null)
      } else {
        toast.error('Something went wrong!', toastOptions)
      }
      loadHandler()
      setIsLoading(false)
    })

  }

  return (
    <>
      {imageModal &&
        <ViewGalleryModal
          modal={imageModal}
          setModal={setImageModal} />
      }
      <DeleteModalLayout
        title='Image'
        modal={deleteModal}
        setModal={setDeleteModal}
        id={targetRef?.current?._id}
        itemName={`${targetRef.current?.name}`}
        handler={deleteGallery}
        preHandler={() => { setDeleteModal(null); loadHandler(); }}
      />
      {modal && (
        <Modal show={modal === 'dismissible'} onClose={() => setModal(undefined)}>
          <Modal.Header>
            Upload Image
          </Modal.Header>
          <Modal.Body>
            <div className='gap-4 grid lg:grid-cols-2 grid-cols-1'>
              <>
                <div className='lg:col-span-2'>
                  <img
                    src={imageUpload?.url || '/images/camera.png'}
                    className='object-cover w-32 aspect-square border rounded-md'
                  />
                </div>
                <div className={``}>
                  <Label className='capitalize mb-2 block'>Image</Label>
                  <div className='flex items-center gap-4'>
                    <FileInput className='w-full' disabled={isLoading}
                      onChange={e => {
                        try {
                          setImageUpload({
                            url: URL?.createObjectURL(e.target?.files[0]),
                            file: e.target?.files[0],
                            size: e.target?.files[0].size,
                          })
                          if (e.target?.files[0].size > 2000000)
                            toast.error('File must be less than 2mb.', toastOptions)
                        } catch (e) { }
                      }}
                      accept='image/*'
                    />
                  </div>
                </div>
                {fieldInputs?.map((item, key) => (
                  <div key={`${key}-gallery-input`}>
                    <Label className='capitalize mb-2 block'>{item?.label}</Label>
                    <TextInput
                      disabled={isLoading}
                      value={item?.value}
                      onChange={e => item?.setValue(e)}
                      type='text'
                    />
                  </div>
                ))}
              </>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={isLoading}
              gradientDuoTone={'cyanToBlue'}
              onClick={addHandler}
            >
              Submit
            </Button>
            <Button
              disabled={isLoading}
              color='gray' onClick={() => setModal(undefined)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <CustomerLayout>
        <CustomerWrapper>
          <div className='flex flex-col lg:flex-row p-4 pb-0'>
            <div className='w-full flex items-center justify-between'>
              <p className='text-2xl font-semibold my-4'>TintArt Gallery</p>
              {state?.user?.role == 1 &&
                <Button color="dark" onClick={() => { setModal("dismissible"); setFormData(initialData) }}>Upload your Artwork</Button>
              }
            </div>
          </div>
          <div className="flex items-center gap-4 px-4">
            <p onClick={() => setMyGallery(false)} className={`font-semibold cursor-pointer ${myGallery == false && state?.user?.role == 1  ? "underline": ""}`}>TintArt Gallery</p>
            {state?.user?.role == 1 &&
              <p onClick={() => setMyGallery(true)} className={`font-semibold cursor-pointer ${myGallery == true  ? "underline": ""}`}>My Gallery</p>
            }
          </div>
          <LoadingLayout message="Gallery is Empty." loadingState={isLoading} hasContent={filteredData?.length > 0}>
            <div className='p-4 grid grid-cols-2  lg:grid-cols-4 gap-4'>
              {filteredData.map((item, key) => (
                <div
                  key={"gallery-item-" + key}
                  className='relative overflow-hidden flex flex-col gap-4 aspect-square'
                  onClick={() => getLinks(item?._id)}
                  onMouseEnter={() => getLinks(item?._id)}
                  onMouseLeave={() => getLinks(false)}>
                  {state?.user?._id == item?.user_id &&
                    <Button className='absolute top-5 right-5 z-20' color="failure" onClick={() => { targetRef.current = item; setDeleteModal("dismissible") }}>
                      <RiDeleteBin6Line />
                    </Button>}

                  <img src={item?.image} className={` aspect-square w-full object-cover h-full ${hoverActive === item?._id ? "scale-150" : ""
                    } transition-transform overflow-hidden`} />
                  <div
                    className={`
                ${hoverActive === item?._id
                        ? -"translate-y-1000"
                        : "-translate-y-full "
                      }
                  flex items-center justify-center p-4 gap-2 z-0 h-full absolute w-full object-cover flex-col -top-0 left-0 bg-black/70 transition-transform
                    }`}
                  >
                    <p className=' left-0 bottom-10 truncate w-full text-center text-xl font-semibold text-white'>{item?.artwork_title}</p>
                    <div className='flex gap-4 my-4'>
                      {item?.instagram_link &&
                        <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item?.instagram_link}><FaInstagram /></Link>
                      }

                      {item?.facebook_link &&
                        <Link target='_blank' className='p-2 rounded-full bg-zinc-500 text-white' href={item?.facebook_link}><FaFacebook /></Link>
                      }
                      <p className='cursor-pointer p-2 rounded-full bg-zinc-500 text-white' onClick={() => setImageModal(item?.image)}><FaEye /></p>
                    </div>
                    <p className=' left-0 bottom-10 truncate w-full text-center text-white'>Artist: {item?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </LoadingLayout>
        </CustomerWrapper>
      </CustomerLayout>
    </>
  )
}

export default Gallery