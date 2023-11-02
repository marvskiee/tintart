import React from 'react'
import { AdminLayout, SettingHeader, SettingLayout, TextInput } from '../../../components'
import { Button, FileInput, Label } from 'flowbite-react'

const Profile = () => {
  const fields = [
    { label: "First Name" },
    { label: "Last Name" },
    { label: "Email", },
    { label: "Contact No." }
  ]
  
  const submitHandler = () => {
  }

  return (
    <AdminLayout>
      <SettingLayout>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <p className='text-xl font-semibold mb-2 col-span-1 lg:col-span-2'>Edit Profile</p>
          <div className={`col-span-1 lg:col-span-2`}>
            <Label className='capitalize mb-2 block'>User Image</Label>
            <FileInput />
          </div>
          {fields.map((item, key) => (
            <div key={"profile-" + key}>
              <Label className='capitalize mb-2 block'>{item.label}</Label>
              <TextInput
                type='text'
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

export default Profile