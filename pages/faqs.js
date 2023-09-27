import React from 'react'
import { CustomerHeader, CustomerWrapper } from '../components'
import { Accordion } from 'flowbite-react'
import CustomerLayout from '../components/layout-components/customer-layout'

const Faqs = () => {
    const FAQS_DATA = [
        {
            title: "How long will it take to be delivered?",
            content: "Nothing"
        },
        {
            title: "Do you ship worldwide?",
            content: "Nothing"
        },
        {
            title: "How much is the shipping fee?",
            content: "Nothing"
        },
    ]
    return (
        <CustomerLayout>
            <CustomerWrapper>
                <div className='flex flex-col lg:flex-row px-4 py-10'>
                    {/* sidebar  */}
                    <div className='min-w-[20rem]  h-full border-r mb-10'>
                        <h2 className='text-3xl font-extrabold mb-6'>FAQs</h2>
                        <p className='font-semibold text-2xl'>Merchant</p>
                        <p className='indent-5 p-2'>Shipping Details</p>
                        <p className='indent-5 p-2'>Product Quality</p>

                        <p className='font-semibold text-2xl'>Artist</p>
                        <p className='indent-5 p-2'>Artwork Details</p>
                        <p className='indent-5 p-2'>Conact the Artist</p>

                    </div>
                    {/* main content  */}
                    <div className='lg:px-10 w-full'>
                        <h1 className='mb-10 text-4xl font-extrabold'>Shipping Details</h1>
                        <Accordion collapseAll >
                            {FAQS_DATA.map((item, key) => (
                                <Accordion.Panel key={"accordion"+key}>
                                    <Accordion.Title>
                                        {item?.title}
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        {item?.content}
                                    </Accordion.Content>
                                </Accordion.Panel>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </CustomerWrapper>
        </CustomerLayout>

    )
}

export default Faqs