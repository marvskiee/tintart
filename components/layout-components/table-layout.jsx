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

  const pillDataRef = useRef()
  // HANDLERS
  const loadHandler = async () => {
    const result = await loadRequest()
    let temp_data = result?.data
    pillDataRef.current = temp_data
    let filtered = temp_data
    if (['Colors', 'Sizes'].indexOf(title) > -1) {
      filtered = temp_data?.filter(t => t.merchandise == selectedMerch)
    }
    setNewSlice(filtered?.slice(0, MAX))
    setFetchData(filtered || [])
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

  // pagination
  const [page, setPage] = useState(1)
  const [newSlice, setNewSlice] = useState([])
  const MAX = 10
  const paginationHandler = item => {
    setPage(item)
    setNewSlice(searchFilter.slice(item * MAX - MAX, item * MAX))
  }
  const merchandise_list = ['T-Shirt', 'Photocard', 'Sintra Board']
  const [selectedMerch, setSelectedMerch] = useState(merchandise_list[0])
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
                  {fieldInputs
                    .filter(f => f.name != '_id')
                    ?.slice(0, -1)
                    .map((item, key) => (
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
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-xl'>{title}</p>
          {['Colors', 'Sizes', 'Products'].indexOf(title) > -1 && (
            <Button.Group>
              {merchandise_list.map((item, key) => (
                <Button
                  onClick={() => {
                    setSelectedMerch(item)
                    let filtered = pillDataRef.current?.filter(t => t.merchandise == item)
                    setNewSlice(filtered?.slice(0, MAX))
                    setPage(1)
                    setFetchData(filtered)
                  }}
                  color='gray'
                  key={key + item}
                  className={item == selectedMerch ? 'text-blue-400' : ''}
                >
                  {item}
                </Button>
              ))}
            </Button.Group>
          )}
        </div>
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
            Export CSV
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
            ) : newSlice.length > 0 ? (
              newSlice.map((parentItem, parentKey) => (
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

        <div className='flex gap-1 my-5 items-end justify-end'>
          <button
            disabled={page == 1}
            onClick={() => paginationHandler(page - 1)}
            className={`border p-1 px-4 rounded-md `}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(searchFilter?.length / MAX) }, (_, i) => i + 1).map(
            (item, index) => (
              <button
                onClick={() => paginationHandler(item)}
                className={`border p-1 px-4 rounded-md ${
                  page == item ? ' text-white bg-zinc-900 ' : ' text-zinc-900 bg-white '
                } `}
                key={index}
              >
                {item}
              </button>
            )
          )}
          <button
            onClick={() => paginationHandler(page + 1)}
            disabled={Math.ceil(searchFilter?.length / MAX) == page}
            className={`border p-1 px-4 rounded-md `}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default TableLayout
