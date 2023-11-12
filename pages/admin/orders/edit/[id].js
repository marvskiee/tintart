import React, { useEffect, useState } from 'react';
import { AdminLayout, DropdownInput, LoadingLayout, ModalLayout } from '../../../../components';
import { getOneOrderDetails, updateOrderDetails } from '../../../../services/order_details.services';
import { useRouter } from 'next/router';
import { Button, FileInput, Label, Table } from 'flowbite-react';
import DATA from '../../../../utils/DATA';
import { formatNumberWithCommas, imageUploader } from '../../../../services/tools';
import moment from 'moment';
import { getOneUser } from '../../../../services/user.services';
import { toastOptions } from '../../../../styles/modalOption';
import toast from 'react-hot-toast';

const ViewOrders = () => {
  const [data, setData] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isLoading, setIsLoading] = useState({ fetch: true, update: false });
  const router = useRouter();
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const id = router.query.id;
  const [modalMode, setModalMode] = useState(null)
  const [imageUpload, setImageUpload] = useState(null)


  const refetchHandler = async () => {
    const result1 = await getOneOrderDetails(id);
    if (result1.success) {
      setData(result1.data);
      const result2 = await getOneUser(result1?.data?.user_id);
      if (result2.success) {
        setCustomer(result2?.data);
      }
    }
  }
  const loadHandler = async () => {
    setIsLoading({ ...isLoading, fetch: true });
    await refetchHandler()
    setIsLoading({ ...isLoading, fetch: false });
  };
  const updateHandler = async (newData) => {
    setIsLoading({ ...isLoading, update: true });

    const result = await updateOrderDetails(newData, id)
    if (result?.success) {
      await refetchHandler()
      toast.success("Order updated successfuly!", toastOptions)
    } else {
      toast.error("Something went wrong!", toastOptions)
    }
    setIsLoading({ ...isLoading, update: false });

  }
  const table_headers = ["Products", "Price", "Quantity", "Subtotal"];

  useEffect(() => {
    if (id) {
      loadHandler();

    }

    const afterPrint = () => {
      setIsPrintDialogOpen(false);
      // Show the elements when the print dialog is closed
      document.getElementById('header').style.display = 'block';
      document.getElementById('footer').style.display = 'flex';

    };

    window.addEventListener('afterprint', afterPrint);

    return () => {
      window.removeEventListener('afterprint', afterPrint);
    };
  }, [id]);

  const validationHandler = async () => {
    if (imageUpload) {
      await imageUploader([imageUpload], async postImage => {
        await updateHandler({ proof_image: postImage[0] })
        setImageUpload(null)
        setModalMode(null)
      })
    } else {
      toast.error("Please select image file type!", toastOptions)
    }
  }


  const Card = ({ title, children }) => {
    return (
      <div className='rounded-md border w-full flex flex-col'>
        <p className='p-2 text-center bg-slate-100 font-semibold'>{title}</p>
        <div className='flex-grow items-center justify-center flex flex-col p-4'>
          {children}
        </div>
      </div>
    )
  }
  return (

    <AdminLayout>
      {modalMode &&
        <ModalLayout>
          <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>{modalMode != "view" && "Upload"} Payment Proof</h3>
          </div>
          <div className='p-6'>
            <Label className='capitalize mb-2 block'>Preview:</Label>
            <div className=''>
              <img
                src=
                {modalMode != "view" ?
                  imageUpload?.url || '/images/camera.png' :
                  data?.proof_image
                }
                className='mx-auto object-cover aspect-square sm:w-72 w-auto border rounded-md'
              />
            </div>
            {modalMode != "view" &&
              <>
                <Label className='capitalize mb-2 block'>Upload Image:</Label>
                <div className='flex items-center gap-4'>
                  <FileInput
                    className='w-full'
                    disabled={isLoading?.update}
                    onChange={e => {
                      try {
                        if (e.target?.files[0].size > 2000000)
                          return toast.error('File must be less than 2mb.', toastOptions)
                        setImageUpload({
                          url: URL?.createObjectURL(e.target?.files[0]),
                          file: e.target?.files[0],
                          size: e.target?.files[0].size,
                        })
                      } catch (e) { }
                    }}
                    accept='image/*'
                  />
                </div>
              </>
            }
            <div className='flex gap-4 justify-end mt-4 sm:flex-row flex-col'>
              {modalMode != "view" &&
                <Button
                  disabled={isLoading?.update}
                  gradientDuoTone={'cyanToBlue'}
                  onClick={validationHandler}
                >
                  Submit
                </Button>
              }
              <Button
                disabled={isLoading?.update}
                color="light"
                onClick={() => {
                  setImageUpload(null)
                  setModalMode(null)
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </ModalLayout>}
      <div className='flex-col gap-4 flex'>
        <LoadingLayout hasContent={data} loadingState={isLoading?.fetch} message={"Order does not exist!"}>
          <div className='flex flex-col gap-4' id="container-to-download">
            <p className='font-semibold text-xl flex flex-col md:flex-row items-center gap-4'>Order Detail <span className='text-sm text-slate-700'>Order ID: {data?._id}</span></p>
            {!isPrintDialogOpen &&
              <div className='flex items-center flex-col md:flex-row gap-4 justify-between'>
                <div className='flex gap-4 flex-col md:flex-row w-full'>
                  <DropdownInput name="order-status" item={DATA.ORDER_STATUS} handler={(e) => { updateHandler({ status: e }) }} selected={data?.status?.replaceAll("_", " ").toUpperCase()} disabled={isLoading?.fetch || isLoading?.update} className="w-full md:w-auto" />
                  <Button color="dark" onClick={() => {
                    document.getElementById('header').style.display = 'none';
                    document.getElementById('footer').style.display = 'none';
                    
                    setIsPrintDialogOpen(true)
                    setTimeout(() => {
                      window.print()
                    }, 500);

                  }} className='w-full md:w-auto'>Export to PDF</Button>
                </div>
                <Button color="dark" className='w-full md:w-auto' onClick={() => setModalMode("upload")}>Upload</Button>
              </div>
            }

            <div className='text-sm grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card title={"Customer:"}>
                <img src={customer?.profile_image || '/images/no-profile.png'} className='rounded-full h-16 w-16 object-cover' />
                <p className='text-center'>{customer?.first_name} {customer?.last_name}</p>
                <p className='text-center'>{customer?.email}</p>
              </Card>
              <Card title={"Shipped To:"}>
                <p className='text-center'>{data?.name}</p>
                <p className='text-center'>{data?.address}<br />{data?.information}</p>
                <p className='text-center'>{data?.contact_no}</p>

              </Card>
              <Card title={"Mode of Payment:"}>
                <p className='text-center'>{data?.mop == "credit" ? "Credit/Debit Card" : data?.mop == "gcash" ? "Gcash" : data?.mop == "cod" && "Cash on Delivery"}</p>
                {data?.proof_image &&
                  <p className='cursor-pointer underline text-blue-500 font-semibold' onClick={() => setModalMode("view")}>View Payment Proof</p>
                }
              </Card>
              <Card title={"Order Date:"}>
                <p className='text-center'>{moment(data?.created_at).format("hh:mm A MMMM DD, YYYY")}</p>
              </Card>
            </div>

            <p className='font-semibold text-xl'>Product Summary</p>
            <Table>
              <Table.Head>
                {table_headers?.map((item, key) => (
                  <Table.HeadCell key={`order-header-${key}`}>
                    {item}
                  </Table.HeadCell>
                ))}
              </Table.Head>
              <Table.Body>
                {data?.products.map((item, key) => (
                  <Table.Row
                    key={`parent-${key}`}
                    className={key % 2 && 'transition-colors bg-zinc-100'}
                  >
                    <Table.Cell>
                      <div className='flex gap-2 items-center'>
                        <img src={item?.image} className='w-16 h-16 object-cover' />
                        <div className='flex-col flex g ap-2'>
                          <p className='font-semibold'>{item?.name}</p>
                          <p className='flex gap-2'>{item?.size}, {item?.color}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{DATA.PESO} {formatNumberWithCommas(item?.price)}</Table.Cell>
                    <Table.Cell>{item?.quantity}</Table.Cell>
                    <Table.Cell>{DATA.PESO} {formatNumberWithCommas(item?.sub_total)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="flex items-end flex-col gap-4 justify-end w-full">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p className='font-semibold'>Total</p>
                    </td>
                    <td>
                      <p className='font-semibold  ml-4'>{DATA.PESO} {formatNumberWithCommas(data?.total_price)}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className='font-semibold'>Payment Status</p>
                    </td>
                    <td>
                      <p className={`font-semibold ml-4 text-right ${data?.is_paid ? "text-emerald-500" : "text-red-500"}`}>{data?.is_paid ? "YES" : "NO"}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div id="footer" className='flex items-center gap-4 flex-col md:flex-row w-full md:w-auto'>
                <Button disabled={isLoading?.update || data?.is_paid} className='w-full md:w-auto' onClick={() => updateHandler({ is_paid: true })}>Mark as Paid</Button>
                <Button disabled={isLoading?.update || !data?.is_paid} className='w-full md:w-auto' color="failure" onClick={() => updateHandler({ is_paid: false })}>Mark as Not Paid</Button>
              </div>
            </div>


          </div>
        </LoadingLayout>
      </div>
    </AdminLayout >
  )
}

export default ViewOrders