import React from 'react'
import { TableLayout, AdminLayout } from '../../../components'
import DATA from '../../../utils/DATA'
import { getAllUser } from '../../../services/user.services'
import { useRouter } from 'next/router'

const Users = () => {
  const router = useRouter();

  return (
    <AdminLayout>
      <TableLayout
        title="Users"
        nextPage={{ addHandler: () => router.push('/admin/users/add') }}
        loadRequest={getAllUser}
        fieldInputs={DATA.TABLE_HEADERS.USERS} />
    </AdminLayout>
  )
}

export default Users