import React from 'react'

const ModalLayout = ({ children }) => {
  return (
    <div className=' bg-black/50 w-full p-4 overflow-auto h-screen fixed top-0 left-0 z-[100] flex items-center justify-center'>
      <div className='m-auto max-w-[40rem]'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>{children}</div>
      </div>
    </div>
  )
}

export default ModalLayout
