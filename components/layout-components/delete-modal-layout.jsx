import { Button, Modal } from 'flowbite-react'
import React from 'react'
import toast from 'react-hot-toast'
import { toastOptions } from '../../styles/modalOption'
import { useRouter } from 'next/router'

const DeleteModalLayout = ({ title, path, modal, setModal, id, itemName, handler }) => {
  const router = useRouter()
  return (
    <>
      <Modal dismissible show={modal === 'dismissible'} onClose={() => setModal(undefined)}>
        <Modal.Header>Delete {title}</Modal.Header>
        <Modal.Body>
          <div className='space-y-6'>
            <p>
              Are you sure you want to delete this {title.toLowerCase()} "{itemName}"?{' '}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            gradientDuoTone={'pinkToOrange'}
            onClick={async () => {
              const result = await handler(id)
              if (await result?.success) {
                router.push(path)
                toast.success(`User has been deleted successfuly!`, toastOptions)
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
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModalLayout
