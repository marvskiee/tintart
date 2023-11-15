import React from 'react'
import SettingHeader from '../header-components/setting-header'
import DATA from '../../utils/DATA'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'
import { authLogout } from '../../services/auth.services'
import { useRouter } from 'next/router'

const ProfileLayout = ({ children }) => {
  const { dispatch } = useAppContext()
  const router = useRouter()
  const logoutHandler = async () => {
    toast.dismiss()

    dispatch({ type: 'LOGIN_REQUEST' })

    const { success, message } = await authLogout()

    if (!success) {
      dispatch({ type: 'LOGIN_ERROR', value: { error: message } })
      toast.error(message, {
        duration: 1500,
      })
    } else {
      await dispatch({ type: 'LOGOUT' })
      router.push('/login')
    }
  }
  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 gap-4 my-4 p-4'>
      <div className='lg:col-span-1'>
        <SettingHeader routes={DATA.PROFILE_LINKS} />
        <p onClick={logoutHandler} className='text-center p-4 cursor-pointer'>
          Logout
        </p>
      </div>
      <div className='lg:col-span-3 rounded-md border lg:p-8 p-4'>{children}</div>
    </div>
  )
}

export default ProfileLayout
