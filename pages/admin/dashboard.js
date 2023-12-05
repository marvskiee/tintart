import React, { useEffect, useState } from 'react'
import { AdminLayout, GraphLayout } from '../../components'
import { FaPesoSign } from 'react-icons/fa6'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { formatNumberWithCommas } from '../../services/tools'
import { Dropdown } from 'flowbite-react'
import DATA from "../../utils/DATA"
import { getAllProduct } from '../../services/product.services'
import { getDashboardData } from '../../services/order_details.services'
const Dashboard = () => {
  const [graph, setGraph] = useState({ orders: {}, sales: {} })
  const [isLoading, setIsLoading] = useState(false)
  const [merchandiseData, setMerchandiseData] = useState({
    sintra_board: 0,
    t_shirt: 0,
    photo_card: 0
  })
  const loadHandler = async () => {
    setIsLoading(true)
    const result1 = await getDashboardData(sort)
    if (result1.success) {
      setGraph(result1.data)
    }
    const result2 = await getAllProduct();
    if (result2.success) {
      const available_products = result2.data.filter(d => !d.is_sold_out && !d.is_archived)
      setMerchandiseData({
        sintra_board: available_products.filter(d => d.merchandise == "Sintra Board").length,
        t_shirt: available_products.filter(d => d.merchandise == "T-Shirt").length,
        photo_card: available_products.filter(d => d.merchandise == "Photocard").length
      })
    }
    setIsLoading(false)

  }
  const [sort, setSort] = useState("Daily")
  useEffect(() => {
    loadHandler();
  }, [sort])
  const data = [
    {
      label: "Sales",
      data: graph?.sales,
      price: Object.values(graph?.sales).reduce((total, value) => total + value, 0),
    },
    {
      label: "Orders",
      price: Object.values(graph?.orders)
        .flatMap(Object.values)
        .filter(val => typeof val === 'number')
        .reduce((acc, curr) => acc + curr, 0),
      data: graph?.orders
    },
  ]
  const MERCHANDISE_DATA = [
    { label: "T-Shirt", bg: "bg-violet-100 text-violet-500 border border-violet-200", value: merchandiseData?.t_shirt },
    { label: "Sintra Board", bg: "bg-sky-100 text-sky-500 border border-sky-200", value: merchandiseData?.sintra_board },
    { label: "Photocard", bg: "bg-rose-100 text-rose-500 border border-rose-200", value: merchandiseData?.photo_card }
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
        {!isLoading ?
          <>

            {data.length > 0 ? (
              data.map((d, index) => (
                <div key={index} className='lg:w-[calc(50vw-48px)] shadow-md rounded-md p-4'>
                  <div className='flex items-center justify-between'>
                    <div>

                      <p className='text-lg font-semibold'>Total {d?.label}</p>
                      <p className='text-2xl font-semibold'>{formatNumberWithCommas(d?.price)}</p>
                    </div>
                    {d?.label == "Sales" ?
                      <FaPesoSign size="50" className='text-violet-300' />
                      :
                      <BsFillCartCheckFill size='50' className='text-rose-300' />
                    }
                  </div>


                  <div className="" >
                    <GraphLayout
                      sort={sort}
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
          </>
          :
          <p className="flex w-full items-center justify-center error-graphs text-center shadow-md text-slate-700 rounded-md min-h-[10rem]">Fetching Graphs...</p>
        }
      </div>
      <div className='my-8'>
        <p className='font-semibold text-xl'>Merchandise</p>

        <div className='flex lg:gap-8 gap-4 lg:flex-row flex-col mt-4'>
          {MERCHANDISE_DATA.map((item, key) => (
            <div key={`merchandise-item-${key}`} className={` rounded-md p-4 w-full ${item.bg}`}>
              <div>
                <p className='text-lg font-semibold'>{item?.label}</p>
                <p className='text-2xl font-semibold'>{formatNumberWithCommas(item?.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard