import React from 'react'
import FooterLayout from './footer-layout'
import CustomerHeader from '../header-components/customer-header'

const CustomerLayout = ({ children }) => {
  return (
    <>
      <CustomerHeader />
      <div className='min-h-[60vh] 2xl:min-h-[100vh] '>{children}</div>
      <FooterLayout />
    </>
  )
}

export default CustomerLayout
