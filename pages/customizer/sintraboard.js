import { Button, TextInput } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiOutlineClose } from 'react-icons/ai'
import { FiArchive, FiDownload, FiType } from "react-icons/fi";
import { FiImage } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { LuSave } from "react-icons/lu";
import { MdDoNotDisturbAlt } from "react-icons/md";


import domtoimage from 'dom-to-image';
import { getUserCanvas } from '../../services/canvas.services';
import { useAppContext } from '../../context/AppContext';
import { getUser } from '../../services/auth.services';
import toast from 'react-hot-toast';
import { toastOptions } from '../../styles/modalOption';
import { useRouter } from 'next/router';
import { addArtwork, deleteArtwork, getUserArtwork } from '../../services/artwork.services';
import moment from 'moment';
const TextComponent = ({ setCanvas, canvas, closeHandler }) => {
  return (
    <ModalComponent closeHandler={closeHandler}>
      <TextInput placeholder='Enter text here...' className="mt-4 w-full" value={canvas} onChange={(e) => { console.log(e.target.value); setCanvas(e.target.value) }} />
    </ModalComponent >
  )
}

const ModalComponent = ({ children, closeHandler }) => {
  return (
    <div className=' bg-white/10 w-full p-4 overflow-auto h-screen fixed top-0 left-0 z-[200] flex items-center justify-center'>
      <div className='m-auto max-w-[40rem] w-full'>
        <div className='relative bg-white w-full rounded-lg shadow dark:bg-gray-700 p-4'>
          <span onClick={closeHandler} className='absolute top-4 right-4 cursor-pointer'><AiOutlineClose /></span>
          {children}</div>
      </div>
    </div>
  )
}


const PictureComponent = ({ images, setCanvas, canvas, closeHandler }) => {
  return (
    <ModalComponent closeHandler={closeHandler}>

      <div className='mt-4 grid lg:grid-cols-3 grid-cols-2 gap-4'>
        <div
          onClick={() => setCanvas("")}
          className='aspect-square hover:border-violet-600 cursor-pointer border rounded-md flex items-center justify-center'>
          <MdDoNotDisturbAlt size={50} />
        </div>
        {images?.map((item, key) => (
          <img onClick={() => setCanvas(item)} src={item} className='hover:border-violet-600 border cursor-pointer rounded-md aspect-square w-full object-cover' key={key + "images"} />
        ))}
      </div>
    </ModalComponent >
  )
}

const ArtworkComponent = ({ data, deleteHandler, closeHandler }) => {
  const scale = 50
  const scaledHeight = 400 * (scale / 100);
  const scaledWidth = 700 * (scale / 100);
  const fs = 20
  return (
    <ModalComponent closeHandler={closeHandler}>
      <div className='mt-4 grid grid-cols-1  gap-4'>
        {data?.map((item, key) => (
          <div key={item?._id} className='mx-auto'>
            <p className='text-center font-semibold'>{item?.title}</p>
            <p className='text-center text-slate-500'>{moment(item?.created_at).format("MMMM DD, YYYY hh:mm A")}</p>
            <div id="contentToCapture" className='mx-auto grid-cols-1 flex gap-4 relative' key={item?._id} >
              <span
                onClick={() =>
                  deleteHandler(item?._id)
                }
                className='cursor-pointer absolute  rounded-full  top-2 right-2 bg-white z-10'
              >
                <AiFillCloseCircle size={20} className='text-red-600' />
              </span>
              <div className={`bg-white relative border rounded-xl shadow-lg bg-white-600 overflow-hidden`}
                style={{
                  height: scaledHeight,
                  width: scaledWidth,
                }}
              >
                {item.front_image.length > 0 &&
                  <img
                    style={{
                      minHeight: scaledHeight,
                      minWidth: scaledWidth,
                    }} src={item.front_image} className='h-full w-full object-cover' />
                }
                {item.front_text.length > 0 &&
                  <div className=' mx-auto absolute bottom-1 w-full '>
                    <div className='m-4 flex items-center justify-center'>
                      <p
                        style={{ fontSize: fs * (scale / 100) }}
                        className=' py-1 px-2 rounded-md bg-white font-semibold z-10'
                      >{item?.front_text}</p>
                    </div>
                  </div>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.length == 0 && <p className='text-center'>There's no artwork saved.</p>}
    </ModalComponent >
  )
}

const SaveComponent = ({ title, setTitle, submitHandler, closeHandler }) => {
  return (
    <ModalComponent closeHandler={closeHandler}>
      <div className='flex gap-4 items-center mt-6 lg:flex-row flex-col'>
        <TextInput placeholder='Enter title here...' className="w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button
          onClick={submitHandler}
          className='bg-violet-600 w-full lg:w-auto hover:bg-violet-700 flex-shrink-0'>
          Submit
        </Button>
      </div>
    </ModalComponent >
  )
}



const Customizer = () => {
  const [modal, setModal] = useState({
    picture: false,
    text: false,
    artwork: false,
    download: false,
    save: false
  })
  const [canvasText, setCanvasText] = useState("")

  const MY_CORS = 'https://marvs-cors.onrender.com/proxy?url='
  const [canvasImage, setCanvasImage] = useState("")
  const [scale, setScale] = useState(50)
  const [title, setTitle] = useState("")
  const [images, setImages] = useState([
  ])
  const ICONSIZE = 25
  const { state, dispatch } = useAppContext()
  const loadHandler = async () => {
    const result = await getUserCanvas(state?.user?._id)
    if (result?.success) {
      const filter_merch = result.data.filter(d => d.product.merchandise == "Sintra Board")
      console.log(filter_merch)
      const imagelist = filter_merch.map(item => item.product.logos).flat().filter((r) => r != null || r != undefined);
      setImages(imagelist)
    }
    await refetchArtworkHandler()
  }
  const [artWorkData, setArtWorkData] = useState([])
  const refetchArtworkHandler = async () => {
    const result = await getUserArtwork(state?.user?._id)
    if (result.success)
      setArtWorkData(result.data.filter(d => d.merchandise == "sintraboard"))
  }

  useEffect(() => {
    const load = async () => {
      if (!state.isAuth) {
        const res = await getUser()
        await dispatch({ type: 'SET_USER', value: res?.data })
      }
    }
    load()
    if (state?.user?._id)
      loadHandler()
  }, [state?.isAuth])

  console.log(state?.isAuth)


  const captureDivContent = () => {
    const node = document.getElementById('contentToCapture');
    console.log(node)
    domtoimage.toPng(node)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'customize.png'; // Set the desired filename for the downloaded image
        link.click(); // Simulate a click on the anchor to initiate download
        toast.success("Image has been downloaded", toastOptions)

      })
      .catch((error) => {
        toast.error("Something went wrong!", toastOptions)
        console.error('Error capturing content:', error);
      });
  };
  const LEFT_BUTTON = [
    {
      name: "Picture",
      icon: <FiImage size={ICONSIZE} />,
      setModal: () => setModal({ ...modal, picture: !modal.picture }),
    },
    {
      name: "Text",
      icon: <FiType size={ICONSIZE} />,
      setModal: () => setModal({ ...modal, text: !modal.text }),
    }
  ]

  const RIGHT_BUTTON = [
    {
      name: "Artwork",
      icon: <FiArchive size={ICONSIZE} />,
      setModal: () => setModal({ ...modal, artwork: !modal.artwork }),
    },
    {
      name: "Download ",
      icon: <FiDownload size={ICONSIZE} />,
      setModal: () => captureDivContent(),
    }
  ]

  const ButtonComponent = ({ data }) => {
    return (
      <>
        <div onClick={data?.setModal} className='cursor-pointer rounded-full hover:bg-purple-200 p-1'>
          {data?.icon}
        </div>
        {data?.modalComponent}
      </>
    )
  }
  const router = useRouter()
  const deleteHandler = async (id) => {
    const result = await deleteArtwork(id)
    if (result.success) {
      await refetchArtworkHandler()
      return toast.success("Artwork Deleted", toastOptions)
    }
    toast.error("Something went wrong!", toastOptions)

  }
  const submitHandler = async () => {
    if (title.trim().length == 0)
      return toast.error("Please enter title!", toastOptions)
    const newData = {
      merchandise: router.pathname.split("/")[2],
      user_id: state?.user?._id,
      title: title,
      front_image: canvasImage.replace(MY_CORS, ""),
      front_text: canvasText,
    }
    const result = await addArtwork(newData)
    if (result.success) {
      setModal({ ...modal, save: false })
      setTitle("")
      await refetchArtworkHandler()
      return toast.success("Artwork Saved", toastOptions)
    }
    toast.error("Something went wrong!", toastOptions)

  }

  const scaledHeight = 400 * (scale / 100);
  const scaledWidth = 700 * (scale / 100);
  // Styles for centering the fixed div
  const centerDivStyle = {
    position: 'fixed',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  return (
    <>
      {/* MODALS  */}

      {modal.picture && <PictureComponent
        images={images}
        setCanvas={setCanvasImage}
        canvas={canvasImage}
        closeHandler={LEFT_BUTTON[0].setModal}

      />}
      {modal.text && <TextComponent
        setCanvas={setCanvasText}
        canvas={canvasText}
        closeHandler={LEFT_BUTTON[1].setModal} />}
      {modal.save && <SaveComponent
        title={title}
        setTitle={setTitle}
        submitHandler={submitHandler}
        closeHandler={() => setModal({ ...modal, save: !modal.save })} />}

      {modal.artwork && <ArtworkComponent
        data={artWorkData}
        deleteHandler={deleteHandler}
        closeHandler={RIGHT_BUTTON[0].setModal} />}



      {/* END OF MODALS  */}
      <div className='overflow-hidden h-screen relative'>

        <Button size="xs" color="light" className='fixed top-1 left-1 z-10'>
          <Link href="/">
            <IoChevronBack size={ICONSIZE} />
          </Link>
        </Button>
        <Button size="xs" onClick={() => setModal({ ...modal, save: true })} className='bg-violet-600 fixed top-1 right-1 z-10 hover:bg-violet-700'>
          <LuSave size={ICONSIZE} />
        </Button>

        <div className='fixed left-1 top-[40%] z-10 rounded-md p-4 flex flex-col gap-4 bg-white/50 shadow-md'>
          {LEFT_BUTTON.map((item, key) => (
            <ButtonComponent data={item} key={"left" + key} />
          ))}
        </div>
        <div className='fixed right-1 top-[40%] z-10 rounded-md p-4 flex flex-col gap-4 bg-white/50 shadow-md'>
          {RIGHT_BUTTON.map((item, key) => (
            <ButtonComponent data={item} key={"right" + key} />
          ))}
        </div>
        {/* bottom control  */}
        <div className='fixed bottom-5 w-full z-10'>
          <div className='mx-auto max-w-[10rem]'>
            <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">Camera Scale</label>
            <input id="default-range" min={20} max={100} type="range" onChange={(e) => setScale(e.target.value)} value={scale} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
          </div>
        </div>
        {/* end of control */}
        <div style={centerDivStyle} className='mx-auto fixed flex items-center justify-center gap-4'>
          <div id="contentToCapture" className='flex gap-4' >

            {/* front canvas  */}
            <div className={`bg-white relative border shadow-lg bg-white-600 overflow-hidden`}
              style={{
                height: scaledHeight,
                width: scaledWidth,
              }}
            >
              {canvasImage.length > 0 &&
                <img
                  style={{
                    minHeight: scaledHeight,
                    minWidth: scaledWidth,
                  }} src={MY_CORS + canvasImage} className='h-full w-full object-cover' />
              }
              {canvasText.length > 0 &&
                <div className=' mx-auto absolute bottom-1 w-full'>
                  <div className='m-4 flex items-center justify-center'>
                    <p
                      style={{ fontSize: 20 * (scale / 100) }}
                      className=' py-1 px-2 rounded-md bg-white font-semibold z-10'
                    >{canvasText}</p>
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Customizer