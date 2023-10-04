import React from 'react'
import { AiOutlineHeart } from "react-icons/ai"
import { CustomerHeader, CustomerWrapper } from '../components'
import { Accordion, Button } from 'flowbite-react'
import CustomerLayout from '../components/layout-components/customer-layout'
import DATA from '../utils/DATA'

const Shop = () => {
 
  return <CustomerLayout>
    <CustomerWrapper containerClass="p-4">
      <h2 className='font-bold text-3xl p-4'>All Products</h2>
      <div className='flex flex-col lg:flex-row gap-10'>
        {/* sidebar */}
        <div className='lg:min-w-[20rem]'>
          <Accordion alwaysOpen={false} collapseAll={true}>
            <Accordion.Panel>
              <Accordion.Title>
                FILTER BY
              </Accordion.Title>
              <Accordion.Content>
                Maintenance
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>
                PRODUCTS
              </Accordion.Title>
              <Accordion.Content>
                Maintenance
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
        {/* main content */}
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3 mb-10'>
          {DATA.SAMPLE_PRODUCT.map((item, key) => (
            <div className='relative' key={key}>
              <Button color="light" size="xs" className='bg-black/50 border-0 absolute top-5 right-5 aspect-square'>
                <AiOutlineHeart color='red' className='text-2xl' />
              </Button>
              <img alt='luffy' src={`./images/sample-products/SP (${key}).jpg`} className='rounded-2xl w-full aspect-square object-cover' />
              <p className="p-2 font-semibold text-md">{item?.name}</p>
              <p className="p-2 font-semibold text-xl">PHP {item?.price}</p>
            </div>
          ))}
        </div>
      </div>
    </CustomerWrapper>
  </CustomerLayout>
}

export default Shop
