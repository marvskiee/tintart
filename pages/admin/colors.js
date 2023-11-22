import React, { useRef, useState } from 'react'
import { AdminLayout, TableLayout } from '../../components'
import { addColor, deleteColor, getAllColor, updateColor } from '../../services/color.services'
import { hasBlankValue } from '../../services/tools'

const Colors = () => {

    const initialColorData = {
        merchandise: "T-Shirt",
        values: ""
    }
    const [colorData, setColorData] = useState(initialColorData)

    const colorfieldInputs = [
        {
            label: 'Color ID',
            name: '_id',
        },
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

    const sizeValidationHandler = (data) => {
        const hasBlank = hasBlankValue(Object.values(data));
        return { success: !hasBlank, message: "Please fill up the form!" };
    }

    return (
        <AdminLayout>
            <TableLayout
                title="Colors"
                data={colorData}
                initialData={initialColorData}
                setData={setColorData}
                validationHandler={sizeValidationHandler}
                loadRequest={getAllColor}
                postRequest={addColor}
                updateRequest={updateColor}
                deleteRequest={deleteColor}
                fieldInputs={colorfieldInputs} />
        </AdminLayout>
    )
}

export default Colors