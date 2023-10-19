import React, { useRef } from 'react'
import { AdminLayout, TableLayout } from '../../components'
import DATA from '../../utils/DATA'
import { addColor, deleteColor, getAllColor, updateColor } from '../../services/color.services'
import { addSize, deleteSize, getAllSize, updateSize } from '../../services/size.services'
import { hasBlankValue } from '../../services/tools'

const Properties = () => {
  const colorInputRef = Array.from({ length: 2 }, () => useRef());
  const sizeInputRef = Array.from({ length: 2 }, () => useRef());

  const colorValidationHandler = (data) => {
    const hasBlank = hasBlankValue(Object.values(data));
    console.log("DATA: ", !hasBlank)
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
          refs={colorInputRef}
          validationHandler={colorValidationHandler}
          loadRequest={getAllColor}
          postRequest={addColor}
          updateRequest={updateColor}
          deleteRequest={deleteColor}
          header={DATA.TABLE_HEADERS.PROPERTIES} />

        {/* SIZES */}
        <TableLayout
          title="Sizes"
          refs={sizeInputRef}
          validationHandler={sizeValidationHandler}
          loadRequest={getAllSize}
          postRequest={addSize}
          updateRequest={updateSize}
          deleteRequest={deleteSize}
          header={DATA.TABLE_HEADERS.PROPERTIES} />
      </div>
    </AdminLayout>
  )
}

export default Properties