import React, { useEffect, useState } from 'react'
import { AdminLayout, DynamicFetchLayout, ProductFormLayout } from '../../../../components'
import { getOneProduct } from '../../../../services/product.services'
import { useRouter } from 'next/router'

const EditProduct = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const loadHandler = async () => {
    const result = await getOneProduct(id)
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
        <DynamicFetchLayout message="Please wait while we load the data." />
        :
        <>
          {!data ?
            <DynamicFetchLayout message="Product does not exist!" path="/admin/products" />
            :
            <ProductFormLayout title="Edit Product" oldData={data} />
          }
        </>
      }
    </AdminLayout>
  )
}

export default EditProduct