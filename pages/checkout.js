import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper, LoadingLayout } from '../components'
import { Button, Label, Table } from 'flowbite-react'
import { getUserShipping } from '../services/shipping.services'
import { useAppContext } from '../context/AppContext'
import DATA from '../utils/DATA'
import { getUserCart } from '../services/cart.services'
import { formatNumberWithCommas } from '../services/tools'
import { BiSolidMap } from 'react-icons/bi'
const Checkout = () => {
    const { state } = useAppContext();
    const [isLoading, setIsLoading] = useState(false)
    const [shippingData, setShippingData] = useState([])
    const [products, setProducts] = useState([])
    const placeOrderHandler = () => {
    }
    const loadHandler = async () => {
        let id = state?.user?._id
        const result_shipping = await getUserShipping(id)
        console.log(result_shipping?.data)
        if (result_shipping?.success) {
            let defaultData = result_shipping?.data.filter((d) => d._id == state?.user?.shipping_id)
            console.log(defaultData)
            if (defaultData.length > 0)
                setShippingData(defaultData)
        }
        const result = await getUserCart(id)
        if (result?.success)
            setProducts(result?.data)
        setIsLoading(false)
    }
    useEffect(() => {
        if (state?.user?._id)
            loadHandler()
    }, [state?.isAuth])
    const total = products?.reduce((accumulator, product) => {
        return accumulator + (product.product_id?.price * product.quantity)
    }, 0)
    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='flex px-4 py-10 flex-col lg:flex-row gap-4'>
                    {/* sidebar  */}  
                    <div className=' w-full'>
                        <LoadingLayout message="You have no address listed." loadingState={isLoading} hasContent={shippingData.length > 0}>
                            <div className='flex flex-col justify-between border p-4 text-zinc-500'>
                                <p className='text-lg text-red-600 font-semibold flex items-center gap-2'>
                                    <BiSolidMap /> Delivery Address</p>
                                <p className='text-black'>Name: {shippingData[0]?.receiver_name} <span className="text-zinc-700">{shippingData[0]?.contact_no}</span></p>
                                <p><span className="text-black">Address: </span>{shippingData[0]?.unit} {shippingData[0]?.street} {shippingData[0]?.region} {shippingData[0]?.information}</p>
                            </div>
                        </LoadingLayout>
                        <Table className='text-zinc-900'>
                            <Table.Body>
                                {products?.map((item, key) => (
                                    <Table.Row key={`row-${item?._id}`}>
                                        <Table.Cell className='flex flex-shrink-0 items-center gap-4 flex-row'>
                                            <div className='relative'>
                                                <img src={item?.product_id?.images[0]} alt='pic' className='lg:w-20 w-10 aspect-square object-contain' />
                                                <span className='px-2 font-semibold absolute -top-2 py-1 -right-2 rounded-full text-white bg-red-500'>{item?.quantity}</span>
                                            </div>
                                            <div className=''>
                                                <p className=' font-semibold'>{item?.product_id?.product_name}</p>
                                                <p>Size: {item?.size}</p>
                                                <p className='flex gap-2'>Color:<span className='block w-5 h-5 rounded-md' style={{ backgroundColor: item?.color }}></span></p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell align='center'>
                                            <p className='font-semibold text-lg whitespace-nowrap'>
                                                {DATA.PESO} {formatNumberWithCommas(item?.product_id?.price * item?.quantity)}
                                            </p>
                                        </Table.Cell>

                                    </Table.Row>

                                ))}

                                {products?.length == 0 && <Table.Cell className='text-center w-fullfont-semibold' colSpan={5}>Cart is Empty</Table.Cell>}
                            </Table.Body>
                        </Table>
                    </div>
                    <div className='min-w-[20rem] h-full'>
                        <div className="flex flex-col gap-4 p-4 rounded-md border">
                            <div className='flex items-center justify-between'>
                                <p>Total</p>
                                <p className='text-red-700 font-semibold'>{DATA.PESO} {formatNumberWithCommas(total)}</p>
                            </div>
                        </div>
                        <div className='p-4'>
                            <input type='checkbox' id="policy" />
                            <Label for="policy" className='ml-2'>
                                I have read and accepted the terms and Conditions and privacy policy.
                            </Label>
                        </div>
                        <Button onClick={placeOrderHandler} className='w-full mt-4' color="failure">PLACE ORDER</Button>
                    </div>
                    {/* main content  */}
                </div>
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default Checkout