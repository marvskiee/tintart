import React, { useEffect, useRef, useState } from 'react'
import { CustomerLayout, CustomerWrapper, ModalLayout } from '../components'
import { Button, Label, Table } from 'flowbite-react'
import { BsFillCheckCircleFill, BsFillTrash3Fill } from 'react-icons/bs'
import DATA from '../utils/DATA'
import { deleteCart, getUserCart, updateCart, updateItemCart } from '../services/cart.services'
import { useAppContext } from '../context/AppContext'
import { toastOptions } from '../styles/modalOption'
import toast from 'react-hot-toast'
import { formatNumberWithCommas } from '../services/tools'
import { getUserShipping } from '../services/shipping.services'
import { BiSolidMap } from 'react-icons/bi'
import { getAllShop } from '../services/shop.services'
import { addOrderDetails } from '../services/order_details.services'
import { addOrderProduct } from '../services/order_product.services'
import Link from 'next/link'
import { sendMessage } from '../services/email.services'
const Cart = () => {
    const { state } = useAppContext()
    const [products, setProducts] = useState([])
    const [shop, setShop] = useState([])
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [shippingData, setShippingData] = useState([])
    const [shippingList, setShippingList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [termsChecked, setTermsChecked] = useState(false)
    const table_header = [
        "Product",
        "Quantity",
        "Price"
    ]

    const [orderSuccess, setOrderSuccess] = useState(false)
    const loadHandler = async () => {
        const result_shipping = await getUserShipping(state?.user?._id)
        if (result_shipping?.success) {
            let defaultData = result_shipping?.data.filter((d) => d._id == state?.user?.shipping_id)
            if (defaultData.length > 0) {
                setShippingList(result_shipping?.data)
                setShippingData(defaultData[0])
            }
        }
        const result = await getUserCart(state?.user?._id)
        if (result?.success)
            setProducts(result?.data)
        const result_shop = await getAllShop()
        if (result_shop?.success) {
            if (result_shop?.data.length > 0)
                setShop(result_shop.data[0])

        }
    }
    useEffect(() => {
        loadHandler()
    }, [state?.isAuth])

    const selectHandler = (key, newValue) => {
        let temp = products;
        temp[key] = {
            ...temp[key],
            is_selected: newValue
        }
        setProducts([...temp])
    }
    const selectAllRef = useRef(false)
    const selectAllHandler = () => {
        let temp = products;
        for (let p in temp)
            temp[p] = {
                ...temp[p],
                is_selected: !selectAllRef.current
            }
        selectAllRef.current = !selectAllRef.current
        setProducts([...temp])
    }

    const quantityHandler = (key, newValue) => {
        let temp = products;
        temp[key] = {
            ...temp[key],
            quantity: newValue
        }
        setProducts([...temp])
        updateCart({ quantity: newValue }, temp[key]?._id)
    }
    const deleteHandler = async (id) => {
        const result = await deleteCart(id)
        if (result.success) {
            toast.success("Product has been removed from cart.", toastOptions)
            loadHandler()
        } else {
            toast.error("Something went wrong!", toastOptions)
        }
    }
    const filteredData = !isCheckOut ? products : products.filter(p => p.is_selected == true)

    // computations
    const total = filteredData?.filter((item) => item?.is_selected)?.reduce((accumulator, product) => {
        return accumulator + (product.product_id?.price * product.quantity)
    }, 0)

    const placeOrderHandler = async () => {

        if (!paymentMethod)
            return toast.error("Please select payment method!", toastOptions)
        setIsLoading(true)

        // second 

        let tmp_order_data = []
        for (let p of filteredData) {
            tmp_order_data.push({
                name: p?.product_id?.product_name,
                size: p?.size,
                color: p?.color,
                price: Number(p?.product_id?.price),
                quantity: Number(p?.quantity),
                sub_total: Number(p?.product_id?.price) * Number(p?.quantity),
                image: p?.product_id?.images[0],
            })
        }
        const result_order_product = await addOrderProduct({ products: tmp_order_data })
        if (result_order_product?.success) {

            // third
            let {
                receiver_name,
                contact_no, region,
                street,
                unit,
                information } = shippingData

            const newData2 = {
                name: receiver_name,
                contact_no,
                address: `${unit} ${street} ${region}`,
                information,
                total_price: total + 25,
                products: result_order_product?.data?.map(data => data._id),
                mop: paymentMethod,
                user_id: state?.user?._id
            }
            const result_order_details = await addOrderDetails(newData2)
            if (result_order_details.success) {
                // first update cart to checkout
                const newData1 = {
                    product_ids: filteredData.map((item) => item?._id)
                }
                await updateItemCart(newData1)
                // send email when registered
                const { SUBJECT,
                    BODY } = DATA.EMAILS.ORDER
                sendMessage({
                    email: state?.user?.email,
                    subject: SUBJECT(result_order_details?.data?._id),
                    text: BODY(
                        {
                            name: `${state?.user?.first_name} ${state?.user?.last_name}`,
                            order_number: result_order_details?.data?._id,
                            date: result_order_details?.created_at,
                            item: filteredData,
                            payment_method: newData2?.mop.toUpperCase(),
                            amount: newData2?.total_price
                        }
                    )
                })
                toast.success("Successfuly place an order.", toastOptions)
                setOrderSuccess(true)
            } else {
                toast.error("Something went wrong!", toastOptions)
            }
        } else {
            toast.error("Something went wrong!", toastOptions)
        }
        setIsLoading(false)
    }
    // modals
    const [termsModal, setTermsModal] = useState(false)
    const [privacyModal, setPrivacyModal] = useState(false)
    const [shippingModal, setShippingModal] = useState(false)
    const TermsModal = ({ modal, setModal, content }) => {
        return (
            <>
                {modal &&
                    <ModalLayout>
                        <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Terms and Conditions</h3>
                        </div>
                        <div className='p-6 space-y-6'>
                            <p
                                dangerouslySetInnerHTML={{ __html: content?.terms?.replace(/\n/g, '<br>') }}
                            ></p>
                        </div>
                        <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <Button color='gray' onClick={() => setModal(false)}>
                                Close
                            </Button>
                        </div>
                    </ModalLayout>
                }
            </>
        )
    }
    const PrivacyModal = ({ modal, setModal, content }) => {
        return (
            <>
                {modal &&
                    <ModalLayout>
                        <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Terms and Conditions</h3>
                        </div>
                        <div className='p-6 space-y-6'>
                            <p
                                dangerouslySetInnerHTML={{ __html: content?.privacy?.replace(/\n/g, '<br>') }}
                            ></p>
                        </div>
                        <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <Button color='gray' onClick={() => setModal(false)}>
                                Close
                            </Button>
                        </div>
                    </ModalLayout>
                }
            </>
        )
    }
    const ShippingModal = ({ modal, setModal, list, handler, default_id }) => {
        return (
            <>
                {modal &&
                    <ModalLayout>
                        <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Choose Shipping Address</h3>
                        </div>
                        <div className='p-6 w-full'>
                            {list?.length > 0 && list?.map((item, key) => (
                                <div key={item?._id} className='flex items-center justify-between border-y p-4 gap-8 text-zinc-500'>
                                    <div>
                                        <div className='flex gap-2 lg:flex-row flex-col'>
                                            <p className='text-black'>{item?.receiver_name}</p>
                                            <p className=''>{item?.contact_no}</p>
                                        </div>
                                        <p className=''>{item?.unit} {item?.street} {item?.region}</p>
                                        <p className=''>{item?.information}</p>
                                    </div>
                                    {default_id != item?._id &&
                                        <div className='flex gap-4 flex-col'>
                                            <Button
                                                gradientDuoTone='cyanToBlue'
                                                onClick={() => handler(item)}
                                            >
                                                Select Address
                                            </Button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <Button color='gray' onClick={() => setModal(false)}>
                                Close
                            </Button>
                        </div>
                    </ModalLayout>
                }
            </>
        )
    }
    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <PrivacyModal content={shop} modal={privacyModal} setModal={setPrivacyModal} />
                <TermsModal content={shop} modal={termsModal} setModal={setTermsModal} />
                <ShippingModal modal={shippingModal} default_id={shippingData?._id} setModal={setShippingModal} list={shippingList} setShippingData={setShippingData} handler={(item) => {
                    setShippingModal(false)
                    setShippingData(item)
                }} />
                {!orderSuccess ?
                    <div className='flex px-4 py-10 flex-col lg:flex-row gap-4'>
                        {/* main content  */}
                        <div className=' w-full'>
                            <p className='font-semibold text-2xl mb-4'>{isCheckOut ? "Checkout" : "Your Cart"}</p>
                            {isCheckOut &&
                                <div className='flex items-end justify-between mb-4 border p-4'>
                                    {shippingList?.length > 0 ?
                                        <>
                                            <div className='flex flex-col justify-between text-zinc-500'>
                                                <p className='text-lg text-red-600 font-semibold flex items-center gap-2'>
                                                    <BiSolidMap /> Delivery Address</p>
                                                <p className='text-black'>Name: {shippingData?.receiver_name} <span className="text-zinc-700">{shippingData?.contact_no}</span></p>
                                                <p><span className="text-black">Address: </span>{shippingData?.unit} {shippingData?.street} {shippingData?.region}</p>
                                                <p><span className="text-black">Additional Information: </span>{shippingData?.information}</p>
                                            </div>
                                            <div>
                                                <p onClick={() => !isLoading && setShippingModal(true)} className='cursor-pointer font-semibold underline text-rose-600'>Change</p>
                                            </div>
                                        </>
                                        :
                                        <p>Please go to account page and add some shipping address to continue.

                                        </p>
                                    }
                                </div>
                            }
                            <Table className='text-zinc-900'>
                                {!isCheckOut &&
                                    <Table.Head>
                                        <Table.HeadCell align='center'>
                                            <div className=''>
                                                Select <input className='ml-2' type="checkbox" onChange={selectAllHandler} />
                                            </div>
                                        </Table.HeadCell>
                                        {
                                            table_header.map((item, key) => (
                                                <Table.HeadCell align='center' key={`header-${key}`}>
                                                    {item}
                                                </Table.HeadCell>
                                            ))
                                        }
                                        <Table.HeadCell align='center'>
                                            Remove
                                        </Table.HeadCell>
                                    </Table.Head>
                                }
                                <Table.Body>
                                    {filteredData?.map((item, key) => (
                                        <Table.Row key={`row-${item?._id}`}>
                                            {!isCheckOut &&
                                                <Table.Cell align='center'>
                                                    <input type='checkbox' checked={item?.is_selected || false} onChange={() => selectHandler(key, !item?.is_selected)} />
                                                </Table.Cell>
                                            }
                                            <Table.Cell className='flex flex-shrink-0 items-center gap-4 flex-row'>
                                                <div className='relative'>
                                                    <img src={item?.product_id?.images[0]} alt='pic' className='lg:w-20 w-10 aspect-square object-contain' />
                                                    {isCheckOut &&
                                                        <span className='px-2 font-semibold absolute -top-2 py-1 -right-2 rounded-full text-white bg-red-500'>{item?.quantity}</span>
                                                    }
                                                </div>
                                                <div className=''>
                                                    <p className=' font-semibold'>{item?.product_id?.product_name}</p>
                                                    <p>Size: {item?.size}</p>
                                                    {item?.color &&
                                                        <p className='flex gap-2'>Color: {item?.color}</p>
                                                    }
                                                </div>
                                            </Table.Cell>
                                            {!isCheckOut &&
                                                <Table.Cell align='center'>
                                                    <div className='flex gap-4 justify-center items-center'>
                                                        <Button size="xs" onClick={() => quantityHandler(key, item?.quantity > 1 ? item.quantity - 1 : 1)} color="light">-</Button>
                                                        <p className='font-semibold'>
                                                            {item.quantity}
                                                        </p>
                                                        <Button size="xs" onClick={() => quantityHandler(key, item?.quantity < 100 ? Number(item.quantity) + 1 : 100)} color="light">+</Button>
                                                    </div>
                                                </Table.Cell>
                                            }
                                            <Table.Cell align='center'>
                                                <p className='font-semibold text-lg whitespace-nowrap'>
                                                    {DATA.PESO} {formatNumberWithCommas(!isCheckOut ? item?.product_id?.price : item?.product_id?.price * item?.quantity)}
                                                </p>
                                            </Table.Cell>
                                            {!isCheckOut &&
                                                <Table.Cell align='center'>
                                                    <Button color="light" onClick={() => deleteHandler(item._id)}>
                                                        <BsFillTrash3Fill className='text-red-700 text-lg' />
                                                    </Button>
                                                </Table.Cell>
                                            }
                                        </Table.Row>

                                    ))}

                                    {filteredData?.length == 0 &&
                                        (<Table.Row>
                                            <Table.Cell className='text-center w-fullfont-semibold' colSpan={5}>Cart is Empty</Table.Cell>
                                        </Table.Row>
                                        )}
                                </Table.Body>
                            </Table>
                            {isCheckOut &&
                                <>
                                    <p className='text-lg text-red-600 font-semibold flex items-center gap-2 py-4'>Select Payment Method</p>
                                    <div className='flex gap-4 flex-col lg:flex-row'>
                                        {DATA.PAYMENT_METHOD.map((item, key) => (
                                            <div key={"payment-method-" + key} onClick={() => !isLoading && setPaymentMethod(item?.method)} className={`${item?.method == paymentMethod && "border-red-600 "}  border p-4 w-full cursor-pointer`}>
                                                <p className='font-semibold'>{item?.title}</p>
                                                {item?.logo &&
                                                    <img src={item?.logo} className='mt-2 min-h-6 max-h-6' />
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </>
                            }
                        </div>
                        {/* sidebar  */}
                        <div className='min-w-[20rem] h-full'>
                            <div className="flex flex-col gap-2 p-4 rounded-md border">
                                <div className='flex items-center justify-between'>
                                    <p>Subtotal</p>
                                    <p className='text-red-700 font-semibold'>{DATA.PESO} {formatNumberWithCommas(total)}</p>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>Total</p>
                                    <p className='text-red-700 font-semibold'>{DATA.PESO} {formatNumberWithCommas(total + (total ? 25 : 0))}</p>
                                </div>
                                {total != 0 &&
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm'>(VAT included)</p>
                                    </div>
                                }
                            </div>
                            {isCheckOut &&
                                <div className='p-4'>
                                    <input disabled={isLoading} type='checkbox' checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)} />
                                    <Label htmlFor="policy" className='ml-2'>
                                        I have read and accepted the <span className='text-red-500 underline cursor-pointer' onClick={() => setTermsModal(true)}>Terms and Conditions</span> and <span className='text-red-500 underline cursor-pointer' onClick={() => setPrivacyModal(true)}>Privacy Policy</span>.
                                    </Label>
                                </div>
                            }
                            <>
                                <Button onClick={() => !isCheckOut ? setIsCheckOut(true) : placeOrderHandler()} disabled={total == 0 || (isCheckOut && !termsChecked) || isLoading || (isCheckOut && shippingList.length == 0)} className='w-full mt-4' color="failure">{!isCheckOut ? "PROCEED TO CHECKOUT" : "PLACE ORDER"}</Button>
                                {isCheckOut &&
                                    <>

                                        <Button disabled={isLoading} onClick={() => setIsCheckOut(false)} className='w-full mt-4' color="light">Cancel</Button>
                                    </>
                                }
                            </>


                        </div>
                    </div>
                    :
                    <div className='min-h-[60vh] 2xl:min-h-[100vh] justify-center flex items-center gap-4 p-4 flex-col w-full'>
                        <BsFillCheckCircleFill size={30} className='text-emerald-400' />
                        <p className='font-semibold text-2xl'>Checkout Successful!</p>
                        <p>Please check your email for the order and the payment details.</p>
                        <Link href={"/"}>
                            <p className='font-semibold uppercase'>Back to HomePage</p>
                        </Link>
                    </div>
                }
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default Cart