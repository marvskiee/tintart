import React, { useRef, useState } from 'react'
import { AdminLayout, TableLayout } from '../../components'
import DATA from '../../utils/DATA'
import { addColor, deleteColor, getAllColor, updateColor } from '../../services/color.services'
import { addSize, deleteSize, getAllSize, updateSize } from '../../services/size.services'
import { hasBlankValue } from '../../services/tools'

const Properties = () => {

  const initialColorData = {
    merchandise: "T-Shirt",
    values: ""
  }
  const [colorData, setColorData] = useState(initialColorData)

  const colorfieldInputs = [
    {
      label: 'Merchandise',
      name: 'merchandise',
      value: colorData?.merchandise,
      setValue: e => setColorData({ ...colorData, merchandise: e }),
    },
    {
      label: 'Values',
      name: 'values',
      value: colorData?.values,
      setValue: e => setColorData({ ...colorData, values: e.target.value }),
    },
    {
      label: 'Date Created',
      name: 'created_at',
      value: colorData?.created_at,
    },
  ]

  const initialSizeData = {
    merchandise: "T-Shirt",
    values: ""
  }
  const [sizeData, setSizeData] = useState(initialSizeData)


  const sizeFieldInputs = [
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


  const colorValidationHandler = (data) => {
    const hasBlank = hasBlankValue(Object.values(data));
    const hexColorRegex = /^#([0-9A-Fa-f]{3}){1,2}$/;
    let is_valid = !hasBlank && hexColorRegex.test(data?.values)
    return { success: is_valid, message: "Please enter valid values!" };
  }

  const sizeValidationHandler = (data) => {
    const hasBlank = hasBlankValue(Object.values(data));
    return { success: !hasBlank, message: "Please enter valid values!" };
  }

  return (
    <AdminLayout>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* COLORS  */}
        <TableLayout
          title="Colors"
          data={colorData}
          initialData={initialColorData}
          setData={setColorData}
          validationHandler={colorValidationHandler}
          loadRequest={getAllColor}
          postRequest={addColor}
          updateRequest={updateColor}
          deleteRequest={deleteColor}
          fieldInputs={colorfieldInputs} />

        {/* SIZES */}
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
      </div>
    </AdminLayout>
  )
}

export default Properties