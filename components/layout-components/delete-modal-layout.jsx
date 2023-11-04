import { Button, Modal } from 'flowbite-react'
import React from 'react'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import { useRouter } from 'next/router'
import ModalLayout from './modal-layout'

const DeleteModalLayout = ({ title, path, modal, setModal, id, itemName, handler, preHandler }) => {
  const router = useRouter()
  return (
    <>
      {modal && (
        <ModalLayout>
          <div class='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
            <h3 class='text-xl font-semibold text-gray-900 dark:text-white'>Delete {title}</h3>
          </div>
          <div class='p-6 space-y-6'>
            <p>
              Are you sure you want to delete this {title.toLowerCase()} "{itemName}"?{' '}
            </p>
          </div>
          <div class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <Button
              gradientDuoTone={'pinkToOrange'}
              onClick={async () => {
                const result = await handler(id)
                if (await result?.success) {
                  if (path) router.push(path)
                  else preHandler()
                  toast.success(`${title} has been deleted successfuly!`, toastOptions)
                } else {
                  toast.error('Something went wrong!', toastOptions)
                }
              }}
            >
              Proceed
            </Button>
            <Button color='gray' onClick={() => setModal(undefined)}>
              Cancel
            </Button>
          </div>
        </ModalLayout>
      )}
    </>
  )
}

export default DeleteModalLayout
