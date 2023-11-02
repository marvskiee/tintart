import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const LoadingLayout = ({ children, ...props }) => {
  const { loadingState, message, hasContent } = props
  return (
    <div>
      {loadingState ? (
        <p className='text-center py-10'>
          <AiOutlineLoading3Quarters className='animate-spin mx-auto text-red-500' size={50} />
        </p>
      ) : hasContent ? (
        children
      ) : (
        <p className='text-center py-10'>{message}</p>
      )}
    </div>
  )
}

export default LoadingLayout
