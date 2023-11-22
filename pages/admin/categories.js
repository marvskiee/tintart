import React, { useRef, useState } from 'react'
import { AdminHeader, AdminLayout, TableLayout } from '../../components'
import DATA from '../../utils/DATA'
import { hasBlankValue } from '../../services/tools'
import { addCategory, deleteCategory, getAllCategory, updateCategory } from '../../services/category.services'

const Categories = () => {
  const initialCategoryData = {
    category: "",
  }
  const [categoryData, setCategoryData] = useState(initialCategoryData)


  const categoryFieldInputs = [
    {
      label: 'Category ID',
      name: '_id',
    },
    {
      label: 'Category',
      name: 'category',
      value: categoryData?.category,
      setValue: e => setCategoryData({ ...categoryData, category: e.target.value }),
    },
    {
      label: 'Date Created',
      name: 'created_at',
      value: categoryData?.created_at,
    },
  ]

  const validationHandler = (data) => {
    const hasBlank = hasBlankValue(Object.values(data));
    return { success: !hasBlank, message: "Please fill up the form!" };
  }
  return (
    <AdminLayout>
      <TableLayout
        title="Categories"
        data={categoryData}
        initialData={initialCategoryData}
        setData={setCategoryData}
        validationHandler={validationHandler}
        loadRequest={getAllCategory}
        postRequest={addCategory}
        updateRequest={updateCategory}
        deleteRequest={deleteCategory}
        fieldInputs={categoryFieldInputs} />
    </AdminLayout>
  )
}

export default Categories