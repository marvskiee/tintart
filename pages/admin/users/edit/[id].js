import React, { useEffect, useState } from 'react'
import { AdminLayout, DynamicFetchLayout, UserFormLayout } from '../../../../components'
import { useRouter } from 'next/router'
import { getOneUser } from '../../../../services/user.services'

const EditUser = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const loadHandler = async () => {
    const result = await getOneUser(id)
    console.log(result)
    if (result.success) {
      setData(result.data)
    }
    setIsLoading(false)
  }

  const router = useRouter()
  const id = router?.query?.id;
  useEffect(() => {
    if (id != undefined) {
      loadHandler();
    }
  }, [id])

  return (
    <AdminLayout>
      {isLoading ?
        <DynamicFetchLayout message="Please wait while we load the data."/>
        :
        <>
          {!data ?
            <DynamicFetchLayout message="User does not exist!" path="/admin/users"/>
            :
            <UserFormLayout title="Edit User" oldData={data} />
          }
        </>
      }
    </AdminLayout >
  )
}

export default EditUser