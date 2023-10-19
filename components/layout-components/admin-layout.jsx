import React from 'react'
import FooterLayout from './footer-layout'
import CustomerHeader from '../header-components/customer-header'
import AdminHeader from '../header-components/admin-header'

const CustomerLayout = ({ children }) => {
  return (
    <>
      <AdminHeader />
      <div className='min-h-[60vh] 2xl:min-h-[100vh] lg:p-8 p-4'>{children}</div>
    </>
  )
}

export default CustomerLayout
