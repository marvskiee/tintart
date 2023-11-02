import React from 'react'
import { AdminLayout, TableLayout } from '../../../components'
import { getAllProduct } from '../../../services/product.services'
import DATA from '../../../utils/DATA'
import { useRouter } from 'next/router'

const Products = () => {
  const router = useRouter()

  return (
    <AdminLayout>
      <TableLayout
        title="Products"
        nextPage={{ addHandler: () => router.push('/admin/products/add') }}
        loadRequest={getAllProduct}
        fieldInputs={DATA.TABLE_HEADERS.PRODUCTS} />
    </AdminLayout>
  )
}

export default Products