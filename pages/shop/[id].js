import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper, LoadingLayout, TextInput } from '../../components'
import { getOneProduct } from '../../services/product.services'
import { useRouter } from 'next/router'
import DATA from '../../utils/DATA'
import { Button, Label, Textarea } from 'flowbite-react'
import Link from 'next/link'
import { AiFillStar } from 'react-icons/ai'

const ViewProduct = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const loadHandler = async () => {
        setIsLoading(true)

        const result = await getOneProduct(id)
        console.log(result)
        if (result.success) {
            setData(result.data)
        }
        setIsLoading(false)
    }
    const quantityHandler = (key, newValue) => {
        let temp = data;
        temp[key] = {
            ...temp[key],
            quantity: newValue
        }
        // setData([...temp])
    }
    const router = useRouter()
    const id = router?.query?.id;
    useEffect(() => {
        if (id != undefined) {
            loadHandler();
        }
    }, [id])
    return (
        <CustomerLayout hasFetch={true}>
            <LoadingLayout message="Product does not exist!" loadingState={isLoading} hasContent={data}>
                <CustomerWrapper>
                    <div className='flex flex-col lg:flex-row gap-4 p-4'>
                        {/* image section  */}
                        <div className='lg:max-w-[22rem] lg:min-w-[22rem]'>
                            <div>
                                <img src={data?.images[0]} className='aspect-square object-cover w-full ' />
                            </div>
                            {data?.images?.length > 0 &&
                                <div className='mt-2 grid grid-cols-4 gap-2'>
                                    {
                                        data.images.slice(1).map((item, key) => (
                                            <img src={item} className='aspec-square object-cover' />
                                        ))
                                    }
                                </div>
                            }
                        </div>
                        {/* description */}
                        <div className='flex flex-col gap-4 w-full'>
                            <p className='font-semibold text-xl'>{data?.product_name}</p>
                            <p className='font-semibold text-2xl'>{DATA.PESO} {data?.price}</p>
                            <p className=''>{data?.description}</p>
                            <p className='font-semibold'>Sizes: </p>
                            <div className='flex gap-4'>
                                {data?.sizes.map((item, key) => (
                                    <p className='p-2 border rounded-md'>{item}</p>
                                ))}
                            </div>
                            <div className='w-full flex items-center justify-between'>
                                <div>
                                    <p className='font-semibold'>Colors: </p>
                                    <div className='flex gap-4'>
                                        {data?.colors.map((item, key) => (
                                            <p className='w-10 aspect-square border rounded-md' style={{ backgroundColor: item }}></p>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className='font-semibold'>Quantity: </p>
                                    <div className='flex gap-4 justify-center items-center'>
                                        <Button size="xs" onClick={() => quantityHandler(key, item?.quantity > 1 ? item.quantity - 1 : 1)} color="light">-</Button>
                                        <p className='font-semibold'>
                                            1
                                        </p>
                                        <Button size="xs" onClick={() => quantityHandler(key, item.quantity + 1)} color="light">+</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <Button className='w-full uppercase' color="failure">Add to Cart</Button>
                                <Button className='w-full uppercase border-zinc-900 font-semibold' color="light">Add to Wishlist</Button>
                            </div>
                            <Button className='w-full text-zinc-900 uppercase font-semibold' color="warning">
                                <Link href="https://tintartcustomize.vercel.app/" target="_blank">
                                    Create your own design
                                </Link>
                            </Button>

                        </div>
                    </div>
                </CustomerWrapper>
                <CustomerWrapper>
                    <div className='p-4'>
                        <div className='border-b-4 py-2 border-red-600'>
                            <p className='text-2xl font-semibold'>Reviews</p>
                        </div>
                        <p className='py-4'>There are no reviews yet.</p>
                        {/* review form  */}
                        <div className='flex flex-col w-full gap-4 p-4 border-2 border-yellow-500'>
                            <p className='font-semibold text-lg'>Be the first to review product</p>
                            <p className='font-semibold'>Your rating</p>
                            <div className='flex gap-2'>
                                {Array.from({ length: 5 }, (_, index) => index + 1).map((item, key) => (
                                    <AiFillStar size={20} className='text-zinc-400' />
                                ))}
                            </div>
                            <p className='font-semibold'>Your review</p>
                            <Textarea rows="10" />
                            <div className='flex gap-4'>
                                <div className='w-full'>
                                    <Label>Name:</Label>
                                    <TextInput />
                                </div>
                                <div className='w-full'>
                                    <Label>Email:</Label>
                                    <TextInput />
                                </div>
                            </div>
                            <div>
                                <Button className='float-left uppercase' color="failure">Submit</Button>
                            </div>
                        </div>
                    </div>
                </CustomerWrapper>
            </LoadingLayout>

        </CustomerLayout>
    )
}

export default ViewProduct