import React from 'react'
import { AdminLayout, TableLayout } from '../../../components'
import { getAllOrderDetails } from '../../../services/order_details.services'
import DATA from '../../../utils/DATA'

const Orders = () => {
  return (
    <AdminLayout>
      <TableLayout
        title="Orders"
        nextPage={{ addHandler: () => { } }}
        loadRequest={getAllOrderDetails}
        fieldInputs={DATA.TABLE_HEADERS.ORDERS} />
    </AdminLayout>
  )
}

export default Orders