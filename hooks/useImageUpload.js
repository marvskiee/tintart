import React, {  useRef, useState } from 'react'
import { TextInput, Button, Table, Label, Select } from 'flowbite-react'
import toast, { Toaster } from 'react-hot-toast'
import { toastOptions } from '../styles/modalOptions'
import Footer from '../components/Footer'
import Image from 'next/image'
import { Sidebar } from '../components'
import { useAppContext } from '../context/AppContext'
import { FiCamera } from 'react-icons/fi'
import moment from 'moment'
import { updateStudent } from '../services/student.services'
//FIREBASE
import { ref, uploadBytes, getDownloadURL, listAll, list } from 'firebase/storage'
import { storage } from '../services/firebase'
import { v4 } from 'uuid'

const useImageUpload = () => {
  const { state, dispatch } = useAppContext()

  //IMAGE
  const [imageUpload, setImageUpload] = useState(null)
  const imageUrlRef = useRef()
  const uploadRef = useRef()
  const uploadFile = () => {
    if (imageUpload?.file == null) return
    const imageRef = ref(storage, `images/${imageUpload.file.name + v4()}`)
    uploadBytes(imageRef, imageUpload.file).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        imageUrlRef.current = url
        finalHandler()
      })
    })
  }

  const saveHandler = async e => {
    e.preventDefault()
    if (imageUpload?.size > 2000000) {
      toast.error('File must be less than 2mb.', toastOptions)
      return
    }
    if (imageUpload) {
      uploadFile()
    } else {
      await finalHandler()
    }
  }

  return (
    <div className='flex min-h-screen flex-row'>
      <Sidebar />
      <Toaster />
      <div className='flex items-center justify-between flex-col overflow-hidden w-full'>
        <div className='w-full'>
          <div className='block w-full relative max-h-[70px] sm:max-h-[98px] lg:max-h-[13rem] h-screen overflow-hidden'>
            <Image src='/banner.png' style={{ objectFit: 'cover' }} alt='banner' fill />
          </div>
          <input
            ref={uploadRef}
            type='file'
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
            className='hidden my-2 rounded-md border border-zinc-300 px-4 py-3'
          />

          {state.isAuth && (
            <div className='p-6 max-w-[80rem] mx-auto'>
              <div className='flex flex-col items-center gap-4 mt-4 font-work'>
                <div className='relative'>
                  <div className='block rounded-full aspect-square relative w-40 overflow-hidden'>
                    <Image
                      src={imageUpload?.url || state.user?.profile_image || '/avatar.png'}
                      style={{ objectFit: 'cover' }}
                      fill
                      alt='profile'
                    />
                  </div>
                  {isEditable && (
                    <Button
                      onClick={() => uploadRef.current.click()}
                      className=' aspect-square bottom-0 right-0 absolute h-12 w-12 rounded-full bg-primary text-white'
                    >
                      <FiCamera className='text-xl' />
                    </Button>
                  )}
                </div>
                <form className='max-w-[40rem] space-y-4 w-full' onSubmit={saveHandler}>
                  <div className='flex gap-4 sm:flex-row flex-col'>
                    <div className='w-full'>
                      <Label htmlFor='fname' value='First Name' />
                      <TextInput
                        disabled={!isEditable}
                        id='fname'
                        type='text'
                        required={true}
                        defaultValue={state?.user?.first_name}
                        placeholder='Full Name'
                        ref={firstNameRef}
                      />
                    </div>
                    <div className='w-full'>
                      <Label htmlFor='lname' value='Last Name' />
                      <TextInput
                        disabled={!isEditable}
                        id='lname'
                        type='text'
                        required={true}
                        defaultValue={state?.user?.last_name}
                        placeholder='Last Name'
                        ref={lastNameRef}
                      />
                    </div>
                  </div>
                  <div className='flex gap-4 sm:flex-row flex-col'>
                    <div className='w-full'>
                      <Label htmlFor='grade' value='Grade' />
                      <TextInput disabled type='text' defaultValue={state?.user?.grade} />
                    </div>
                    <div className='w-full'>
                      <Label htmlFor='strand' value='Strand' />
                      <TextInput disabled type='text' defaultValue={state?.user?.track} />
                    </div>
                    <div className='w-full'>
                      <Label htmlFor='section' value='Section' />
                      <TextInput disabled type='text' defaultValue={state?.user?.section} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='lrn' value='LRN' />
                    <TextInput
                      id='lrn'
                      type='text'
                      value={state?.user?.lrn}
                      required={true}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor='birthday' value='Birth Date' />
                    <TextInput
                      disabled
                      id='birthday'
                      type='date'
                      defaultValue={
                        state?.user?.birthday && moment(state?.user?.birthday).format('YYYY-MM-DD')
                      }
                      required={true}
                    />
                  </div>
                  {!isEditable ? (
                    <Button
                      onClick={() => setIsEditable(true)}
                      color='light'
                      type='button'
                      className=' font-semibold w-full uppercase'
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className='flex gap-4 items-center'>
                      <Button
                        onClick={() => setIsEditable(false)}
                        color='light'
                        type='button'
                        className=' font-semibold uppercase w-full'
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setIsEditable(true)}
                        type='submit'
                        className='font-semibold uppercase w-full'
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}
export default useImageUpload