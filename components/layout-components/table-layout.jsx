import React, { useEffect, useRef, useState } from 'react'
import TextInput from '../input-components/text-input'
import { Button, Label, Modal, Table } from 'flowbite-react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineEdit } from 'react-icons/ai'
import moment from 'moment/moment'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import { FiEye, FiMoreHorizontal } from 'react-icons/fi'
import { useRouter } from 'next/router'
import DropdownInput from '../input-components/dropdown-input'
import { downloadFile } from '../../services/excel.services'

const TableLayout = ({
  title,
  data,
  setData,
  initialData,
  nextPage,
  validationHandler,
  loadRequest,
  postRequest,
  updateRequest,
  deleteRequest,
  fieldInputs,
}) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [fetchData, setFetchData] = useState([])

  const headerArray = fieldInputs?.map(item => item.name)

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
    if (requestName != 'deleted') {
      const validation_result = validationHandler(data)
      if (!validation_result?.success) {
        return toast.error(validation_result?.message, toastOptions)
      }
    }
    setModal(undefined)
    let result
    switch (requestName) {
      case 'added':
        result = await postRequest(data)
        break
      case 'updated':
        result = await updateRequest(data, data?._id)
        break
      case 'deleted':
        result = await deleteRequest(data?._id)
        break
      default:
        result = null
        break
    }
    if (await result?.success) {
      await loadHandler()
      toast.success(
        `${title.replace('ie', 'y').slice(0, -1)} has been ${requestName} successfuly!`,
        toastOptions
      )
    } else {
      toast.error(result?.error || 'Something went wrong!', toastOptions)
    }
  }

  const RowTemplate = ({ label }) => {
    return (
      <Table.Row>
        <Table.Cell colSpan={fieldInputs?.length + 1} className='text-center'>
          {label}
        </Table.Cell>
      </Table.Row>
    )
  }
  const booleanCell = value => {
    return value ? 'YES' : 'NO'
  }
  return (
    <>
      {modal && (
        <Modal show={modal === 'dismissible'} onClose={() => setModal(undefined)}>
          <Modal.Header>
            {modalType} {title.replace('ie', 'y').slice(0, -1)}
          </Modal.Header>
          <Modal.Body>
            <div className='space-y-6'>
              {modalType == 'Add' || modalType == 'Edit' ? (
                <>
                  {fieldInputs?.slice(0, -1).map((item, key) => (
                    <div key={`${key}-${title}-input`}>
                      <Label className='capitalize mb-2 block'>{item?.label}</Label>
                      {item?.label == 'Merchandise' ? (
                        <DropdownInput
                          name='merchandise'
                          selected={item?.value}
                          item={['T-Shirt', 'Sintra Board', 'Photocard']}
                          handler={e => item?.setValue(e)}
                        />
                      ) : (
                        <TextInput
                          disabled={isLoading}
                          value={item?.value}
                          onChange={e => item?.setValue(e)}
                          type='text'
                        />
                      )}
                    </div>
                  ))}
                </>
              ) : (
                modalType == 'Delete' && (
                  <p>Are you sure you want to delete this "{data[headerArray[0]]}"? </p>
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
        <div className='flex gap-4 flex-col md:flex-row'>
          <TextInput placeholder='Search here...' onChange={e => setSearch(e.target.value)} />
          {title != 'Orders' && (
            <Button
              gradientDuoTone='cyanToBlue'
              onClick={() => {
                if (nextPage != null) {
                  return nextPage.addHandler()
                }
                setData(initialData)
                setModalType('Add')
                setModal('dismissible')
              }}
              className='shrink-0'
            >
              Add New
            </Button>
          )}
          <Button
            gradientDuoTone='purpleToBlue'
            onClick={() => {
              downloadFile(title, searchFilter)
            }}
            disabled={!searchFilter?.length}
            className='shrink-0'
          >
            Export Excel
          </Button>
        </div>
        <Table>
          <Table.Head>
            {fieldInputs?.map((item, key) => (
              <Table.HeadCell key={`fieldInputs-${title.toLowerCase()}-${key}`}>
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
                <Table.Row
                  key={`parent-${title.toLowerCase()}-${parentKey}`}
                  className={parentKey % 2 && 'transition-colors bg-zinc-100'}
                >
                  {headerArray?.map((childItem, childKey) => (
                    <Table.Cell key={`children-${title.toLowerCase()}-${childKey}`}>
                      {childItem == 'created_at'
                        ? moment(parentItem[childItem]).format('MMMM DD, yyyy hh:mm A')
                        : childItem == 'role'
                        ? `${
                            parentItem['role'] == 2
                              ? 'Admin'
                              : parentItem['role'] == 1
                              ? 'Artist'
                              : parentItem['role'] == 0 && 'Customer'
                          }`
                        : childItem == 'name' && title == 'Users'
                        ? `${parentItem['first_name']} ${parentItem['last_name']}`
                        : childItem == 'colors'
                        ? parentItem['colors'].join(', ')
                        : childItem == 'status'
                        ? parentItem[childItem].replaceAll('_', ' ').toUpperCase()
                        : childItem == 'sizes'
                        ? parentItem['sizes'].join(', ')
                        : ['is_featured', 'is_sold_out', 'is_archived', 'is_paid'].indexOf(
                            childItem
                          ) > -1
                        ? booleanCell(parentItem[childItem])
                        : parentItem[childItem]}
                    </Table.Cell>
                  ))}
                  <Table.Cell className='flex flex-row gap-4 items-center justify-end'>
                    {nextPage == null ? (
                      <>
                        <Button
                          gradientDuoTone='greenToBlue'
                          onClick={() => {
                            setModalType('Edit')
                            setData(parentItem)
                            setModal('dismissible')
                          }}
                        >
                          <AiOutlineEdit />
                        </Button>
                        {title != 'Categories' && (
                          <Button
                            gradientDuoTone='pinkToOrange'
                            onClick={() => {
                              setData(parentItem)
                              setModalType('Delete')
                              setModal('dismissible')
                            }}
                          >
                            <RiDeleteBin6Line />
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        {title == 'Products' && (
                          <Button
                            gradientDuoTone='pinkToOrange'
                            onClick={() => {
                              router.push(title.toLowerCase() + '/view/' + parentItem?._id)
                            }}
                          >
                            <FiEye />
                          </Button>
                        )}
                        <Button
                          gradientDuoTone='cyanToBlue'
                          onClick={() => {
                            router.push(title.toLowerCase() + '/edit/' + parentItem?._id)
                          }}
                        >
                          <FiMoreHorizontal />
                        </Button>
                      </>
                    )}
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
