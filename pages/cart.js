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
const Cart = () => {
    const { state } = useAppContext()
    const [products, setProducts] = useState([])
    const router = useRouter();
    const table_header = [
        "Product",
        "Quantity",
        "Price"
    ]
    const loadHandler = async () => {
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

    // computations
    const total = products?.filter((item) => item?.is_selected)?.reduce((accumulator, product) => {
        return accumulator + (product.product_id?.price * product.quantity)
    }, 0)

    return (
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='flex px-4 py-10 flex-col lg:flex-row gap-4'>
                    {/* sidebar  */}
                    <div className=' w-full'>
                        <p className='font-semibold text-2xl mb-4'>Your Cart</p>
                        <Table className='text-zinc-900'>
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
                            <Table.Body>
                                {products?.map((item, key) => (
                                    <Table.Row key={`row-${item?._id}`}>
                                        <Table.Cell align='center'>
                                            <input type='checkbox' checked={item?.is_selected} onChange={() => selectHandler(key, !item?.is_selected)} />
                                        </Table.Cell>
                                        <Table.Cell className='flex flex-shrink-0 items-center gap-4 flex-row'>
                                            <img src={item?.product_id?.images[0]} alt='pic' className='lg:w-20 w-10 aspect-square object-contain' />
                                            <div className=''>
                                                <p className=' font-semibold'>{item?.product_id?.product_name}</p>
                                                <p>Size: {item?.size}</p>
                                                <p className='flex gap-2'>Color:<span className='block w-5 h-5 rounded-md' style={{ backgroundColor: item?.color }}></span></p>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell align='center'>
                                            <div className='flex gap-4 justify-center items-center'>
                                                <Button size="xs" onClick={() => quantityHandler(key, item?.quantity > 1 ? item.quantity - 1 : 1)} color="light">-</Button>
                                                <p className='font-semibold'>
                                                    {item.quantity}
                                                </p>
                                                <Button size="xs" onClick={() => quantityHandler(key, item?.quantity < 100 ? Number(item.quantity) + 1 : 100)} color="light">+</Button>
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell align='center'>
                                            <p className='font-semibold text-lg whitespace-nowrap'>
                                                {DATA.PESO} {formatNumberWithCommas(item?.product_id?.price)}
                                            </p>
                                        </Table.Cell>
                                        <Table.Cell align='center'>
                                            <Button color="light" onClick={() => deleteHandler(item._id)}>
                                                <BsFillTrash3Fill className='text-red-700 text-lg' />
                                            </Button>
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
                                <p>Subtotal</p>
                                <p className='text-red-700 font-semibold'>{DATA.PESO} {total}</p>
                            </div>
                            <div className='flex items-center justify-between'>
                                <p>Total</p>
                                <p className='text-red-700 font-semibold'>{DATA.PESO} {total}</p>
                            </div>
                        </div>
                        <Button onClick={() => router.push('/checkout')} disabled={total == 0} className='w-full mt-4' color="failure">PROCEED TO CHECKOUT</Button>
                    </div>
                    {/* main content  */}
                </div>
            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default Cart