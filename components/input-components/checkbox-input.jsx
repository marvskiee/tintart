import { Label } from 'flowbite-react'
import React from 'react'

const CheckboxInput = ({ title, description, disabled, value, onChange }) => {
  return (
    <div className='flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 gap-2 items-start w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '>
      <input
        disabled={disabled}
        id={title}
        type='checkbox'
        className={`mt-1`}
        checked={value}
        onChange={onChange}
      />
      <Label htmlFor={title}> {description}</Label>
    </div>
  )
}

export default CheckboxInput
