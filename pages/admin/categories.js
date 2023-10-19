import React, { useRef } from 'react'
import { AdminHeader, AdminLayout, TableLayout } from '../../components'
import DATA from '../../utils/DATA'
import { hasBlankValue } from '../../services/tools'
import { addCategory, deleteCategory, getAllCategory, updateCategory } from '../../services/category.services'

const Categories = () => {
  const categoryInputRef = Array.from({ length: 1 }, () => useRef());
  const validationHandler = (data) => {
    const hasBlank = hasBlankValue(Object.values(data));
    return { success: !hasBlank, message: "Please enter valid values!" };
  }
  return (
    <AdminLayout>
      <TableLayout
        title="Categories"
        refs={categoryInputRef}
        validationHandler={validationHandler}
        loadRequest={getAllCategory}
        postRequest={addCategory}
        updateRequest={updateCategory}
        deleteRequest={deleteCategory}
        header={DATA.TABLE_HEADERS.CATEGORIES} />
    </AdminLayout>
  )
}

export default Categories