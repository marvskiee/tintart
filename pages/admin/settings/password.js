import React from 'react'
import { AdminLayout, SettingHeader, SettingLayout, TextInput } from '../../../components'
import { Button, FileInput, Label } from 'flowbite-react'

const ChangePassword = () => {
  const fields = [
    {
      label: "Old Password",
    },
    {
      label: "New Password",
    },
    {
      label: "Repeat Password",
    }
  ]
  const submitHandler = () => {
  }
  return (
    <AdminLayout>
      <SettingLayout>
        <div className='grid grid-cols-1 gap-4'>
          <p className='text-xl font-semibold mb-2 '>Change Password</p>
          {fields.map((item, key) => (
            <div key={"password-" + key}>
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

export default ChangePassword