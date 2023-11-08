import React from 'react'
import { TableLayout, AdminLayout } from '../../../components'
import DATA from '../../../utils/DATA'
import { getAdminUsers } from '../../../services/user.services'
import { useRouter } from 'next/router'

const Users = () => {
  const router = useRouter();

  return (
    <AdminLayout>
      <TableLayout
        title="Users"
        nextPage={{ addHandler: () => router.push('/admin/users/add') }}
        loadRequest={getAdminUsers}
        fieldInputs={DATA.TABLE_HEADERS.USERS} />
    </AdminLayout>
  )
}

export default Users