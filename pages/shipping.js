import React, { useEffect, useState } from 'react'
import { CustomerLayout, CustomerWrapper, LoadingLayout, TextInput } from '../components'
import { getUserShipping } from '../services/shipping.services'
import { useAppContext } from '../context/AppContext'
import { Button, Modal } from 'flowbite-react'
import { AiFillPlusCircle } from 'react-icons/ai'
import DATA from '../utils/DATA'

const Shipping = () => {
    const [modalType, setModalType] = useState('')
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(null)
    const { state } = useAppContext();

    const fieldsArray = DATA.TABLE_HEADERS.SHIPPING_ADDRESS.map(item => item.name)

    const loadHandler = async () => {
        setIsLoading(true)
        const result = await getUserShipping(state?.user?._id)
        if (result?.success)
            setData(result?.data)
        setIsLoading(false)
    }
    useEffect(() => {
        loadHandler()
    }, [state?.isAuth])

    return (<>
        {modal &&
            <Modal dismissible show={modal === 'dismissible'} onClose={() => setModal(undefined)}>
                <Modal.Header>
                    {modalType} Shipping Address
                </Modal.Header>
                <Modal.Body>
                    <div className='space-y-6'>
                        {modalType == 'Add' || modalType == 'Edit' ? (
                            <>
                                {fieldsArray.map((item, key) => (
                                    <div key={`${key}-shipping-input`}>
                                        <Label className='capitalize mb-2 block'>{item}</Label>
                                        <TextInput
                                            type='text'
                                            ref={refs[key]}
                                            defaultValue={targetRef.current && targetRef.current[item]}
                                            placeholder={item?.name}
                                        />
                                    </div>
                                ))}
                            </>
                        ) : (
                            modalType == 'Delete' && (
                                <p>
                                    Are you sure you want to delete this "{targetRef.current[headerArray[0]]}"?{' '}
                                </p>
                            )
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        gradientDuoTone={modalType == 'Delete' ? 'pinkToOrange' : 'cyanToBlue'}
                        onClick={() => {
                            modalType == 'Add'
                                ? requestHandler({ requestName: 'added' })
                                : modalType == 'Edit'
                                    ? requestHandler({ requestName: 'updated' })
                                    : requestHandler({ requestName: 'deleted' })
                        }}
                    >
                        {modalType == 'Delete' ? 'Proceed' : 'Submit'}
                    </Button>
                    <Button color='gray' onClick={() => setModal(undefined)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        }
        <CustomerLayout hasFetch={true}>
            <CustomerWrapper>
                <div className='p-10'>
                    <p className='font-semibold text-2xl'>Shipping Addresses</p>
                    <LoadingLayout hasContent={data?.length > 0} message="There is no address listed. Please add a new one" loadingState={isLoading} />
                    <Button onClick={() => setModal("dismissible")} color="light" className='w-full text-red-500'>
                        <AiFillPlusCircle className='mr-4' />
                        Add New Address</Button>
                </div>
            </CustomerWrapper>
        </CustomerLayout>
    </>
    )
}

export default Shipping