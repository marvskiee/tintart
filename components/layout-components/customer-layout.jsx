import React from 'react'
import FooterLayout from './footer-layout'
import CustomerHeader from '../header-components/customer-header'
import { useAppContext } from '../../context/AppContext'

const CustomerLayout = ({ children, hasFetch }) => {
  const { state, dispatch } = useAppContext()
  return (
    <>
      <CustomerHeader />
      {hasFetch ? (
        state?.isAuth ? (
          <div className='min-h-[60vh] 2xl:min-h-[100vh] '>{children}</div>
        ) : (
          <div className='min-h-[60vh]' />
        )
      ) : (
        <div className='min-h-[60vh] 2xl:min-h-[100vh] '>{children}</div>
      )}

      <FooterLayout />
    </>
  )
}

export default CustomerLayout
