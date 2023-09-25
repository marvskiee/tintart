import React from 'react'

const CustomerWrapper = ({ children, containerClass }) => {
  return (
    <div className={containerClass}>
      <div className='max-w-[80rem] mx-auto'>{children}</div>
    </div>
  )
}

export default CustomerWrapper
