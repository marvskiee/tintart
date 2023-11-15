import React from 'react'
import DATA from '../../utils/DATA'
import Link from 'next/link'
import { Button } from 'flowbite-react'
import { useRouter } from 'next/router'
const SettingHeader = ({ routes }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col border rounded-md overflow-hidden'>
      {routes.map((item, key) => (
        <Link href={item?.link} key={`settings-${key}`}>
          <Button
            className={`outline-none text-left capitalize w-full rounded-none font-semibold border-0 border-t
            ${key== 0 &&"border-t-0"}
            ${
              router.pathname == item?.link &&
              'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-violet-600'
            }`}
            color='light'
          >
            {item?.name}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default SettingHeader
