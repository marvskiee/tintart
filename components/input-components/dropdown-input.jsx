import React, { useEffect, useState } from 'react'

const DropdownInput = ({ name, item, handler, selected, disabled }) => {
  const [toggle, setToggle] = useState(false)
  return (
    <div className='relative'>
      <button
        disabled={disabled}
        onClick={() => setToggle(!toggle)}
        className='w-full flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 items-center justify-between'
        type='button'
      >
        {selected || '--Select--'}
        <svg
          className='w-2.5 h-2.5 ml-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>

      <div
        className={`z-20 ${
          !toggle || disabled ? 'hidden' : ''
        }  bg-white absolute w-full divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className=' py-2 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownDefaultButton'
        >
          {item.map((title, key) => (
            <li
              key={`dropdown-item-${name}-${key}`}
              onClick={() => {
                handler(title)
                setToggle(false)
              }}
            >
              <p className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                {title?.category || title}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DropdownInput
