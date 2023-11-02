import React, { useEffect, useState } from 'react'
import { AdminLayout, DynamicFetchLayout, LoadingLayout, UserFormLayout } from '../../../../components'
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
      <LoadingLayout message="User does not exist!" loadingState={isLoading} hasContent={data}>
        <UserFormLayout title="Edit User" oldData={data} />
      </LoadingLayout>
    </AdminLayout >
  )
}

export default EditUser