import React, { useState } from 'react'
import { AdminLayout, GraphLayout } from '../../components'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { formatNumberWithCommas } from '../../services/tools'
import { Dropdown } from 'flowbite-react'
import DATA from "../../utils/DATA"
const Dashboard = () => {
  const [sort, setSort] = useState("Weekly")
  const data = [
    {
      label: "Sales",
      data: {
        89: 10, 18: 90, 9: 77
      },
      price: 986564,
    },
    {
      label: "Orders",
      data:
      {
        89: 10, 18: 90, 9: 77
      },
      price: 50,
    },
  ]
  const MERCHANDISE_DATA = [
    { label: "T-Shirt", bg: "bg-violet-100 text-violet-500 border border-violet-200" },
    { label: "Sintra Board", bg: "bg-sky-100 text-sky-500 border border-sky-200" },
    { label: "Photocard", bg: "bg-rose-100 text-rose-500 border border-rose-200" }
  ]

  return (
    <AdminLayout>
      <div className='flex lg:items-start items-center justify-between'>
        <p className='font-semibold text-xl'>Dashboard</p>
        <Dropdown color="light" label={sort} dismissOnClick={true} size="sm">
          {DATA.DROPDOWN_GRAPH.map((item, key) => (
            <Dropdown.Item onClick={() => setSort(item)} key={"dropdown-" + key}>{item}</Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <div className="flex lg:flex-row flex-col gap-8">
        {data.length > 0 ? (
          data.map((d, index) => (
            <div key={index} className='lg:w-[calc(50vw-48px)] shadow-md rounded-md p-4'>
              <div className='flex items-center justify-between'>
                <div>

                  <p className='text-lg font-semibold'>Total {d?.label}</p>
                  <p className='text-2xl font-semibold'>{formatNumberWithCommas(d?.price)}</p>
                </div>
                {d?.label == "Sales" ?
                  <AiFillDollarCircle size="50" className='text-violet-300' />
                  :
                  <BsFillCartCheckFill size='50' className='text-rose-300' />
                }
              </div>


              <div className="" >
                <GraphLayout
                  key={index}
                  label={d?.label}
                  data={d?.data}
                  min={d?.min}
                  max={d?.max}
                />
              </div>
            </div>

          ))
        ) : (
          <p className="error-graphs">Can't Load Graphs</p>
        )}
      </div>
      <div className='my-8'>
        <p className='font-semibold text-xl'>Merchandise</p>

        <div className='flex lg:gap-8 gap-4 lg:flex-row flex-col mt-4'>
          {MERCHANDISE_DATA.map((item, key) => (
            <div key={`merchandise-item-${key}`} className={` rounded-md p-4 w-full ${item.bg}`}>
              <div>
                <p className='text-lg font-semibold'>{item?.label}</p>
                <p className='text-2xl font-semibold'>{formatNumberWithCommas(123124)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard