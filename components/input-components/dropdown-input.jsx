import React, { useEffect, useState, useRef } from 'react'
import { RiArrowDropDownLine } from 'react-icons/ri'

const DropdownInput = ({ name, item, handler, selected, disabled, customButton }) => {
  const dropdownRef = useRef(null)
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const handleOutsideClick = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        disabled={disabled}
        onClick={() => setToggle(!toggle)}
        className={`w-full flex bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 items-center justify-between ${customButton}`}
        type='button'
      >
        {selected || '--Select--'}
        <RiArrowDropDownLine className='text-black' />
      </button>

      <div
        className={`z-20 ${
          !toggle || disabled ? 'hidden' : ''
        }  bg-white absolute w-full divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className='py-2 text-sm text-gray-700 dark:text-gray-200'
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
              <p className='capitalize cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
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
