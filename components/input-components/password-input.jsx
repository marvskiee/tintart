import React, { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import TextInput from './text-input'

const PasswordInput = ({ value, setValue, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className='relative flex items-center'>
      <TextInput
        type={showPassword ? 'text' : 'password'}
        disabled={isLoading}
        value={value}
        onChange={e => setValue(e)}
      />
      <div className='absolute right-2 p-2' onClick={() => setShowPassword(!showPassword)}>
        {!showPassword ? <IoEye /> : <IoEyeOff />}
      </div>
    </div>
  )
}

export default PasswordInput
