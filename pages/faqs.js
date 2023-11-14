import React, { useState } from 'react'
import { ContactLayout, CustomerHeader, CustomerWrapper } from '../components'
import { Accordion, Button } from 'flowbite-react'
import CustomerLayout from '../components/layout-components/customer-layout'
import { BiPhotoAlbum, BiWallet } from 'react-icons/bi'
import { FiHelpCircle, FiTruck } from 'react-icons/fi'
import { AiOutlineStar } from 'react-icons/ai'
import { FaRegGem } from 'react-icons/fa'
import { GrNotes } from 'react-icons/gr'
import DATA from '../utils/DATA'


const Faqs = () => {
    const [selected, setSelected] = useState(null)
    const [accordion, setAccordion] = useState(null)

    const ICONS = [
        <GrNotes size={30} />,
        <BiWallet size={30} />,
        <FiTruck size={30} />,
        <AiOutlineStar size={30} />,
        <FaRegGem size={30} />,
        <BiPhotoAlbum size={30} />,
        <FiHelpCircle size={30} />
    ]
    return (
        <CustomerLayout>
            <CustomerWrapper>
                <div className=' p-4'>
                    {selected &&
                        <>
                            <p className='text-2xl font-semibold my-4'>{selected?.topic}</p>

                            <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">

                                {
                                    selected?.sub_topic.map((topic_item, topic_key) => (
                                        <>
                                            <h2 id="accordion-collapse-heading-1" key={"accordion-" + topic_key} onClick={() => setAccordion(accordion == topic_key ? null : topic_key)}>
                                                <button type="button" className="flex items-center justify-between w-full py-5 font-medium text-left text-black border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                                                    <span>{topic_item?.title}</span>
                                                    <svg data-accordion-icon className={`w-3 h-3 rotate-${topic_key != accordion ? 180 : 90} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div id="accordion-collapse-body-1" className={`${accordion != topic_key && "hidden"}`} aria-labelledby="accordion-collapse-heading-1">
                                                {
                                                    topic_item?.QA.map((qa_item, qa_key) => (
                                                        <div className="py-5 border-b border-gray-200 text-gray-500 dark:border-gray-700">
                                                            <p className='font-semibold'>{qa_item?.question}</p>
                                                            <p>{qa_item?.answer}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    ))
                                }
                            </div >
                        </>
                    }
                    <p className='text-2xl font-semibold my-4'>Topics</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {DATA.FAQS.map((item, key) => (
                            <div key={"faqs-icon-" + key} onClick={() => { setAccordion(null); setSelected(item) }} className='cursor-pointer hover:bg-zinc-100 transition-colors flex gap-4 rounded-md border p-4 items-center flex-col'>
                                <p>
                                    {ICONS[key]}
                                </p>
                                <p className='text-center font-semibold'>
                                    {item?.topic}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col items-center justify-centergap-4 my-10'>
                        <p className='text-3xl font-semibold'>Can't see your Question?</p>
                        <p className='text-lg font-semibold'>Feel free to contact us</p>
                        <div className='w-full'>
                            <ContactLayout title="Send us a message" />
                        </div>
                    </div>
                </div>
            </CustomerWrapper>
        </CustomerLayout>

    )
}

export default Faqs