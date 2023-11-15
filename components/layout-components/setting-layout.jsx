import React from 'react'
import SettingHeader from '../header-components/setting-header'
import DATA from '../../utils/DATA'

const SettingLayout = ({ children }) => {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-1 gap-4'>
      <div className='lg:col-span-1'>
        <SettingHeader routes={DATA.ADMIN.SETTING_LINKS}/>
      </div>
      <div className='lg:col-span-3 rounded-md border lg:p-8 p-4'>{children}</div>
    </div>
  )
}

export default SettingLayout
