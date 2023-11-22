import React, { useRef, useState } from 'react'
import { AdminLayout, TableLayout } from '../../components'
import { addSize, deleteSize, getAllSize, updateSize } from '../../services/size.services'
import { hasBlankValue } from '../../services/tools'

const Sizes = () => {


  const initialSizeData = {
    merchandise: "T-Shirt",
    values: ""
  }
  const [sizeData, setSizeData] = useState(initialSizeData)
  const sizeFieldInputs = [
    {
      label: 'Size ID',
      name: '_id',
    },
    {
      label: 'Merchandise',
      name: 'merchandise',
      value: sizeData?.merchandise,
      setValue: e => setSizeData({ ...sizeData, merchandise: e }),
    },
    {
      label: 'Values',
      name: 'values',
      value: sizeData?.values,
      setValue: e => setSizeData({ ...sizeData, values: e.target.value }),
    },
    {
      label: 'Date Created',
      name: 'created_at',
      value: sizeData?.created_at,
    },
  ]


  const sizeValidationHandler = (data) => {
    const hasBlank = hasBlankValue(Object.values(data));
    return { success: !hasBlank, message: "Please fill up the form!" };
  }

  return (
    <AdminLayout>
      <TableLayout
        title="Sizes"
        data={sizeData}
        initialData={initialSizeData}
        setData={setSizeData}
        validationHandler={sizeValidationHandler}
        loadRequest={getAllSize}
        postRequest={addSize}
        updateRequest={updateSize}
        deleteRequest={deleteSize}
        fieldInputs={sizeFieldInputs} />
    </AdminLayout>
  )
}

export default Sizes