import React, { useRef } from 'react'
import { AdminLayout, TableLayout } from '../../../components'
import DATA from '../../../utils/DATA'
import { hasBlankValue } from '../../../services/tools'
import { addAdmin, deleteAdmin, getAllAdmin, updateAdmin } from '../../../services/admin.services'

const Admins = () => {
  const adminInputRef = Array.from({ length: 1 }, () => useRef());
  const validationHandler = (data) => {
    const hasBlank = hasBlankValue(Object.values(data));
    return { success: !hasBlank, message: "Please enter valid values!" };
  }
  return (
    <AdminLayout>
      <TableLayout
        title="Admins"
        refs={adminInputRef}
        validationHandler={validationHandler}
        loadRequest={getAllAdmin}
        postRequest={addAdmin}
        updateRequest={updateAdmin}
        deleteRequest={deleteAdmin}
        header={DATA.TABLE_HEADERS.ADMINS} />
    </AdminLayout>
  )
}

export default Admins