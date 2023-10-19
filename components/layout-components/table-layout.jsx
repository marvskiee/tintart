import React, { useEffect, useRef, useState } from 'react'
import TextInput from '../input-components/text-input'
import { Button, Label, Modal, Table } from 'flowbite-react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import moment from 'moment/moment'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'

const TableLayout = ({
  title,
  refs,
  validationHandler,
  loadRequest,
  postRequest,
  updateRequest,
  deleteRequest,
  header,
}) => {
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [fetchData, setFetchData] = useState([])
  const targetRef = useRef()

  const headerArray = header.map(item => item.name)
  const fieldsArray = header.map(item => item.name).slice(0, -1)

  const searchHandler = array => {
    return array.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
  }

  const searchFilter = searchHandler(fetchData)

  useEffect(() => {
    loadHandler()
  }, [])

  // HANDLERS
  const loadHandler = async () => {
    const result = await loadRequest()
    setFetchData(result.data || [])
    setIsLoading(false)
  }

  const requestHandler = async ({ requestName }) => {
    let newData = {}
    if (requestName != 'deleted') {
      for (let i = 0; i < refs.length; i++) {
        newData[fieldsArray[i]] = refs[i].current.value
      }
      const validation_result = validationHandler(newData)
      if (!validation_result?.success) {
        return toast.error(validation_result?.message, toastOptions)
      }
      console.log(newData)
    }
    setModal(undefined)
    let result
    switch (requestName) {
      case 'added':
        result = await postRequest(newData)
        break
      case 'updated':
        result = await updateRequest(newData, targetRef.current?._id)
        break
      case 'deleted':
        result = await deleteRequest(targetRef.current?._id)
        break
      default:
        result = null
        break
    }
    console.log(result)
    if (await result?.success) {
      await loadHandler()
      toast.success(`${title.slice(0, -1)} has been ${requestName} successfuly!`, toastOptions)
    } else {
      toast.error('Something went wrong!', toastOptions)
    }
  }

  const RowTemplate = ({ label }) => {
    return (
      <Table.Row>
        <Table.Cell colSpan={header.length} className='text-center'>
          {label}
        </Table.Cell>
      </Table.Row>
    )
  }

  return (
    <>
      {modal && (
        <Modal dismissible show={modal === 'dismissible'} onClose={() => setModal(undefined)}>
          <Modal.Header>
            {modalType} {title.replace('ie', 'y').slice(0, -1)}
          </Modal.Header>
          <Modal.Body>
            <div className='space-y-6'>
              {modalType == 'Add' || modalType == 'Edit' ? (
                <>
                  {fieldsArray.map((item, key) => (
                    <div key={`${key}-${title}-input`}>
                      <Label className='capitalize mb-2 block'>{item}</Label>
                      <input
                        type='text'
                        className='
                        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 undefined'
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
      )}
      <div className='flex-col gap-4 flex'>
        <p className='font-semibold text-xl'>{title}</p>
        <div className='flex gap-4'>
          <TextInput placeholder='Search here...' onChange={e => setSearch(e.target.value)} />
          <Button
            gradientDuoTone='cyanToBlue'
            onClick={() => {
              targetRef.current = null
              setModalType('Add')
              setModal('dismissible')
            }}
            className='shrink-0'
          >
            Add New
          </Button>
        </div>
        <Table>
          <Table.Head>
            {header.map((item, key) => (
              <Table.HeadCell key={`header-${title.toLowerCase()}-${key}`}>
                {item?.label}
              </Table.HeadCell>
            ))}
            <Table.HeadCell />
          </Table.Head>
          <Table.Body>
            {isLoading ? (
              <RowTemplate label='Fetching...' />
            ) : searchFilter.length > 0 ? (
              searchFilter.map((parentItem, parentKey) => (
                <Table.Row key={`parent-${title.toLowerCase()}-${parentKey}`}>
                  {headerArray.map((childItem, childKey) => (
                    <Table.Cell key={`children-${title.toLowerCase()}-${childKey}`}>
                      {childItem == 'created_at'
                        ? moment(parentItem[childItem]).format('MMMM DD, yyyy hh:mm A')
                        : parentItem[childItem]}
                    </Table.Cell>
                  ))}
                  <Table.Cell className='flex flex-row gap-4 items-center justify-end'>
                    <Button
                      gradientDuoTone='greenToBlue'
                      onClick={() => {
                        targetRef.current = parentItem
                        setModalType('Edit')
                        setModal('dismissible')
                      }}
                    >
                      <AiOutlineEdit />
                    </Button>
                    <Button
                      gradientDuoTone='pinkToOrange'
                      onClick={() => {
                        targetRef.current = parentItem
                        setModalType('Delete')
                        setModal('dismissible')
                      }}
                    >
                      <RiDeleteBin6Line />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <RowTemplate label='No Data' />
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  )
}

export default TableLayout
