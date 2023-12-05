import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper, LoadingLayout, TextInput } from '../components'
import { addShipping, deleteShipping, getUserShipping, updateShipping } from '../services/shipping.services'
import { useAppContext } from '../context/AppContext'
import { Button, Label, Modal } from 'flowbite-react'
import { AiFillPlusCircle, AiOutlineEdit } from 'react-icons/ai'
import DATA from '../utils/DATA'
import { hasBlankValue, isValidPhoneNumber } from '../services/tools'
import toast from 'react-hot-toast'
import { toastOptions } from '../styles/modalOption'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { updateUser } from '../services/user.services'
import { getUser } from '../services/auth.services'

const Shipping = () => {
    const [modalType, setModalType] = useState('')
    const initialData = {
        receiver_name: "",
        contact_no: "",
        region: "",
        street: "",
        unit: "",
        information: "",
    }
    const [formData, setFormData] = useState(initialData)
    const [data, setData] = useState(initialData)

    const [isLoading, setIsLoading] = useState({ load: false, crud: false })
    const [modal, setModal] = useState(null)
    const { state, dispatch } = useAppContext();

    const inputFields = [
        {
            label: "Receiver's Name", name: "receiver_name",
            value: formData?.receiver_name,
            setValue: e => setFormData({ ...formData, receiver_name: e.target.value }),
        },
        {
            label: 'Contact No. (11 digits)',
            name: 'contact',
            value: formData?.contact_no,
            setValue: e => {
                setFormData({ ...formData, contact_no: e.target.value.replace(/[^0-9]/g, '').slice(0, 11) })
            },
        },
        {
            label: "Region/City/Barangay", name: "region",
            value: formData?.region,
            setValue: e => setFormData({ ...formData, region: e.target.value }),
        },
        {
            label: "Street/Building Name", name: "street",
            value: formData?.street,
            setValue: e => setFormData({ ...formData, street: e.target.value }),
        },
        {
            label: "Unit/Floor", name: "unit", value: formData?.unit,
            setValue: e => setFormData({ ...formData, unit: e.target.value }),
        },
        {
            label: "Additional Information (Optional)", name: "information", value: formData?.information,
            setValue: e => setFormData({ ...formData, information: e.target.value }),
        },
    ]
    const loadHandler = async () => {
        setIsLoading({ ...isLoading, load: true })
        const result = await getUserShipping(state?.user?._id)
        if (result?.success)
            setData(result?.data)
        setIsLoading({ ...isLoading, load: false })
    }
    useEffect(() => {
        if (state?.user?._id)
            loadHandler()
    }, [state?.isAuth])

    const requestHandler = async ({ requestName }) => {
        if (requestName != 'deleted') {
            let { information, ...rest } = formData
            const hasBlank = hasBlankValue(Object.values(rest))
            if (hasBlank) return toast.error('Please fill up the form!', toastOptions)
            if (!isValidPhoneNumber(formData?.contact_no))
                return toast.error('Invalid Contact Number!', toastOptions)
        }
        setIsLoading({ ...isLoading, crud: true })

        let result
        switch (requestName) {
            case 'added':
                formData["user_id"] = state?.user?._id
                result = await addShipping(formData)
                await updateUser({ shipping_id: result.data?._id }, state?.user?._id)
                break
            case 'updated':
                result = await updateShipping(formData, formData?._id)
                break
            case 'mark':
                result = await updateUser({ shipping_id: formData?._id }, state?.user?._id)

                break
            case 'deleted':
                result = await deleteShipping(formData?._id)

                break
            default:
                result = null
                break
        }
        if (await result?.success) {


            if (requestName == "deleted") {
                const shipping = await getUserShipping(state?.user?._id)
                if (shipping?.data?.length > 0) {
                    const r = await updateUser({ shipping_id: shipping.data[0]?._id }, state?.user?._id)
                }
            }
            const res2 = await getUser()
            await dispatch({ type: 'SET_USER', value: res2?.data })
            setModal(null)

            await loadHandler()
            toast.success(
                `Shipping Address has been ${requestName} successfuly!`,
                toastOptions
            )
            setModalType('')
        } else {
            toast.error('Something went wrong!', toastOptions)
        }


        setIsLoading({ ...isLoading, crud: false })

    }

    return (<>
        {modal &&
            <Modal show={modal === 'dismissible'} onClose={() => setModal(undefined)}>
                <Modal.Header>
                    {modalType} Shipping Address
                </Modal.Header>
                <Modal.Body>
                    <div className=' grid gap-4 md:grid-cols-2'>
                        {modalType == 'Add' || modalType == 'Edit' ? (
                            <>
                                {inputFields.map((item, key) => (
                                    <div key={`${key}-shipping-input`}>
                                        <Label className='capitalize mb-2 block'>{item?.label}</Label>
                                        <TextInput
                                            disabled={isLoading?.crud}
                                            value={item?.value}
                                            onChange={e => item?.setValue(e)}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : (
                            modalType == 'Delete' && (
                                <p className='lg:col-span-2'>
                                    Are you sure you want to delete this shipping address of "{formData.receiver_name}"?{' '}
                                </p>
                            )
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='flex items-center flex-col md:flex-row gap-4 justify-between w-full'>
                        {(formData?._id != state?.user.shipping_id) && modalType == "Edit" ?
                            <Button
                                disabled={isLoading?.crud}
                                gradientDuoTone='pinkToOrange'
                                onClick={() => requestHandler({ requestName: 'mark' })
                                }
                                className="w-full md:w-auto"
                            >
                                Mark as Default and Save
                            </Button>
                            :
                            <div />}
                        <div className='w-full md:w-auto flex gap-4 flex-col md:flex-row'>
                            <Button
                                disabled={isLoading?.crud}
                                gradientDuoTone={modalType == 'Delete' ? 'pinkToOrange' : 'cyanToBlue'}
                                onClick={() => {
                                    modalType == 'Add'
                                        ? requestHandler({ requestName: 'added' })
                                        : modalType == 'Edit'
                                            ? requestHandler({ requestName: 'updated' })
                                            : requestHandler({ requestName: 'deleted' })
                                }}
                                className="w-full md:w-auto"

                            >
                                {modalType == 'Delete' ? 'Proceed' : modalType == "Edit" ? "Save Changes" : 'Submit'}
                            </Button>
                            <Button
                                disabled={isLoading?.crud}
                                className="w-full md:w-auto"
                                color='gray' onClick={() => setModal(undefined)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        }
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='p-4'>
                    <p className='font-semibold text-2xl mb-4'>Shipping Addresses</p>
                    <LoadingLayout hasContent={data?.length > 0} message="There is no address listed. Please add a new one" loadingState={isLoading?.load} >
                        {data?.length > 0 && data?.map((item, key) => (
                            <div key={item?._id} className='flex items-center justify-between border-y p-4 text-zinc-500'>
                                <div>
                                    <div className='flex gap-2 lg:flex-row flex-col'>
                                        <p className='text-black'>{item?.receiver_name}</p>
                                        <p className=''>{item?.contact_no}</p>
                                    </div>
                                    <p className=''>{item?.unit} {item?.street} {item?.region}</p>
                                    <p className=''>{item?.information}</p>
                                    <p className='py-2'>
                                        {
                                            item?._id == state?.user?.shipping_id &&
                                            <span className='border border-red-600 text-red-600 p-1 px-4 text-xs'>Default</span>
                                        }
                                    </p>
                                </div>
                                <div className='flex gap-4 flex-col'>
                                    <Button
                                        gradientDuoTone='greenToBlue'
                                        onClick={() => {
                                            setFormData(item)
                                            setModalType('Edit')
                                            setModal('dismissible')
                                        }}
                                    >
                                        <AiOutlineEdit />
                                    </Button>
                                    <Button
                                        gradientDuoTone='pinkToOrange'
                                        onClick={() => {
                                            setModalType('Delete')
                                            setFormData(item)
                                            setModal('dismissible')
                                        }}
                                    >
                                        <RiDeleteBin6Line />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </LoadingLayout>
                    <Button onClick={() => {
                        setFormData(initialData)
                        setModalType("Add");
                        setModal("dismissible")
                    }} color="light" className='mt-4 w-full text-red-500'>
                        <AiFillPlusCircle className='mr-4' />
                        Add New Address</Button>
                </div>
            </CustomerWrapper>
        </CustomerLayout>
    </>
    )
}

export default Shipping