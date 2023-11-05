import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper } from '../components'
import { Button, Table } from 'flowbite-react'
import { BsFillTrash3Fill } from 'react-icons/bs'
import DATA from '../utils/DATA'
import { useRouter } from 'next/router'
import { deleteCart, getUserCart, updateCart } from '../services/cart.services'
import { useAppContext } from '../context/AppContext'
import { toastOptions } from '../styles/modalOption'
import toast from 'react-hot-toast'
import { formatNumberWithCommas } from '../services/tools'
import { getUserShipping } from '../services/shipping.services'
import { BiSolidMap } from 'react-icons/bi'
const Cart = () => {
    const { state } = useAppContext()
    const [products, setProducts] = useState([])
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [shippingData, setShippingData] = useState([])
    const [paymentMethod, setPaymentMethod] = useState(null)
    const table_header = [
        "Product",
        "Quantity",
        "Price"
    ]
    const loadHandler = async () => {
        const result_shipping = await getUserShipping(state?.user?._id)
        if (result_shipping?.success) {
            let defaultData = result_shipping?.data.filter((d) => d._id == state?.user?.shipping_id)
            if (defaultData.length > 0)
                setShippingData(defaultData)
        }
        const result = await getUserCart(state?.user?._id)
        if (result?.success)
            setProducts(result?.data)
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

    const placeHolderHandler = () => {
        if (!paymentMethod)
            return toast.error("Please select payment method!", toastOptions)
    }

    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='flex px-4 py-10 flex-col lg:flex-row gap-4'>
                    {/* sidebar  */}
                    <div className=' w-full'>
                        <p className='font-semibold text-2xl mb-4'>{isCheckOut ? "Checkout" : "Your Cart"}</p>
                        {isCheckOut &&
                            <div className='flex flex-col mb-4 justify-between border p-4 text-zinc-500'>
                                <p className='text-lg text-red-600 font-semibold flex items-center gap-2'>
                                    <BiSolidMap /> Delivery Address</p>
                                <p className='text-black'>Name: {shippingData[0]?.receiver_name} <span className="text-zinc-700">{shippingData[0]?.contact_no}</span></p>
                                <p><span className="text-black">Address: </span>{shippingData[0]?.unit} {shippingData[0]?.street} {shippingData[0]?.region}</p>
                                <p><span className="text-black">Additional Information: </span>{shippingData[0]?.information}</p>
                            </div>
                        }
                        <Table className='text-zinc-900'>
                            {!isCheckOut &&
                                <Table.Head>
                                    <Table.HeadCell align='center'>
                                        Select
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
                                                <input type='checkbox' checked={item?.is_selected} onChange={() => selectHandler(key, !item?.is_selected)} />
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
                                                <p className='flex gap-2'>Color:<span className='block w-5 h-5 rounded-md' style={{ backgroundColor: item?.color }}></span></p>
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

                                {filteredData?.length == 0 && <Table.Cell className='text-center w-fullfont-semibold' colSpan={5}>Cart is Empty</Table.Cell>}
                            </Table.Body>
                        </Table>
                        {isCheckOut &&
                            <>
                                <p className='text-lg text-red-600 font-semibold flex items-center gap-2 py-4'>Select Payment Method</p>
                                <div className='flex gap-4 flex-col lg:flex-row'>
                                    {DATA.PAYMENT_METHOD.map((item, key) => (
                                        <div key={"payment-method-" + key} onClick={() => setPaymentMethod(item?.method)} className={`${item?.method == paymentMethod && "border-red-600 "}  border p-4 w-full cursor-pointer`}>
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
                    <div className='min-w-[20rem] h-full'>
                        <div className="flex flex-col gap-4 p-4 rounded-md border">
                            <div className='flex items-center justify-between'>
                                <p>Total</p>
                                <p className='text-red-700 font-semibold'>{DATA.PESO} {formatNumberWithCommas(total)}</p>
                            </div>
                        </div>
                        <Button onClick={() => !isCheckOut ? setIsCheckOut(true) : placeHolderHandler()} disabled={total == 0} className='w-full mt-4' color="failure">{!isCheckOut ? "PROCEED TO CHECKOUT" : "PLACE ORDER"}</Button>
                        {isCheckOut &&
                            <Button onClick={() => setIsCheckOut(false)} className='w-full mt-4' color="light">Cancel</Button>
                        }

                    </div>
                    {/* main content  */}
                </div>
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default Cart