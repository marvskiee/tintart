import { Button, FileInput, Label, TextInput } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, AiOutlineClose } from 'react-icons/ai'
import { FiArchive, FiDownload, FiType } from "react-icons/fi";
import { FiImage } from "react-icons/fi";
import { IoChevronBack } from "react-icons/io5";
import { LuSave } from "react-icons/lu";
import { MdDoNotDisturbAlt, MdOutlineColorLens } from "react-icons/md";


import domtoimage from 'dom-to-image';
import { addCanvas, getUserCanvas } from '../../services/canvas.services';
import { useAppContext } from '../../context/AppContext';
import { getUser } from '../../services/auth.services';
import toast from 'react-hot-toast';
import { toastOptions } from '../../styles/modalOption';
import { useRouter } from 'next/router';
import { addArtwork, deleteArtwork, getUserArtwork, updateArtwork } from '../../services/artwork.services';
import moment from 'moment';
import { ChromePicker } from 'react-color';
import { translateAliases } from '../../models/Artwork';
import { imageUploader } from '../../services/tools';
const TextComponent = ({ setCanvas, canvas, location, setLocation, closeHandler, setFontSizes, fontSizes, position, setPosition }) => {
  return (
    <ModalComponent closeHandler={closeHandler}>
      <div className='flex gap-4'>
        <Button pill onClick={() => setLocation("front")} color={location != "front" ? "white" : "purple"}>Front</Button>
        {/* <Button pill onClick={() => setLocation("back")} color={location != "back" ? "white" : "purple"}>Back</Button> */}
      </div >
      <Label>Font Size:</Label>
      <TextInput type='number' value={fontSizes[location]} onChange={(e) => setFontSizes({ ...fontSizes, [location]: e.target.value })} />
      <TextInput placeholder='Enter text here...' className="mt-4 w-full" value={canvas[location]} onChange={(e) => { setCanvas({ ...canvas, [location]: e.target.value }) }} />
      <div className='mx-auto max-w-[10rem]'>
        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">X Position</label>
        <input id="default-range" min={-100} max={100} type="range" onChange={(e) => setPosition({ ...position, [location + "_x"]: e.target.value })} value={position[location + "_x"]} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
      <div className='mx-auto max-w-[10rem]'>
        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">Y Position</label>
        <input id="default-range" min={-100} max={100} type="range" onChange={(e) => setPosition({ ...position, [location + "_y"]: e.target.value })} value={position[location + "_y"]} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
    </ModalComponent >
  )
}

const ModalComponent = ({ children, closeHandler }) => {
  return (
    <div className=' bg-white/10 w-full p-4 overflow-auto h-screen fixed top-0 left-0 z-[200] flex items-center justify-center'>
      <div className='m-auto max-w-[40rem] w-full'>
        <div className='relative bg-white/40 w-full rounded-lg shadow dark:bg-gray-700 p-4'>
          <span onClick={closeHandler} className='absolute top-4 right-4 cursor-pointer'><AiOutlineClose /></span>

          {children}</div>
      </div>
    </div>
  )
}

const PictureComponent = ({ refetch, state, images, setCanvas, canvas, location, setLocation, closeHandler, scale, setScale, position, setPosition }) => {
  const addHandler = async (imageUpload) => {
    await imageUploader([imageUpload], async (postImage) => {
      if (postImage[0] != null) {
        const newData = {
          user_id: state?.user?._id, image: postImage[0], merch: "sintraboard"
        }
        const result = await addCanvas(newData)
        if (await result?.success) {
          refetch()
          return toast.success(`Uploaded successfuly!`, toastOptions)
        } 
      }
      toast.error('Something went wrong!', toastOptions)
      setImageUpload(null)
    })
  }

  return (
    <ModalComponent closeHandler={closeHandler}>
      <div className='flex gap-4'>
        <Button pill onClick={() => setLocation("front")} color={location != "front" ? "white" : "purple"}>Front</Button>
        <Button pill onClick={() => setLocation("back")} color={location != "back" ? "white" : "purple"}>Back</Button>
      </div >
      <div className='mx-auto max-w-[10rem]'>
        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">Image Scale</label>
        <input id="default-range" min={10} max={100} type="range" onChange={(e) => setScale({ ...scale, [location]: e.target.value })} value={scale[location]} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
      <div className='mx-auto max-w-[10rem]'>
        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">X Position</label>
        <input id="default-range" min={-100} max={100} type="range" onChange={(e) => setPosition({ ...position, [location + "_x"]: e.target.value })} value={position[location + "_x"]} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
      <div className='mx-auto max-w-[10rem]'>
        <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">Y Position</label>
        <input id="default-range" min={-100} max={100} type="range" onChange={(e) => setPosition({ ...position, [location + "_y"]: e.target.value })} value={position[location + "_y"]} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
      </div>
      <Label>Upload Photo</Label>
      <FileInput className='w-full'
        onChange={e => {
          try {
            if (e.target?.files[0].size > 2000000)
              return toast.error('File must be less than 2mb.', toastOptions)
            addHandler({
              url: URL?.createObjectURL(e.target?.files[0]),
              file: e.target?.files[0],
              size: e.target?.files[0].size,
            })
          } catch (e) { }
        }}
        accept='image/*'
      />
      <div className='mt-4 grid lg:grid-cols-3 grid-cols-2 gap-4'>
        <div
          onClick={() => setCanvas({ ...canvas, [location]: "" })}
          className='aspect-square hover:border-violet-600 cursor-pointer border rounded-md flex items-center justify-center'>
          <MdDoNotDisturbAlt size={50} />
        </div>
        {images?.map((item, key) => (
          <div className='relative' key={key + "-item"}>
            <img onClick={() => setCanvas({ ...canvas, [location]: item })} src={item} className='hover:border-violet-600 border cursor-pointer rounded-md aspect-square w-full object-stretch' key={key + "images"} />
          </div>
        ))}
      </div>

    </ModalComponent >
  )
}

const ArtworkComponent = ({ data, deleteHandler, closeHandler, artworkRef, customizerHandler }) => {
  const scale = 50
  const canvasScaledHeight = 400 * (scale / 100);
  const canvasScaledWidth = 700 * (scale / 100);
  const fs = 20
  const [deleteSelected, setDeleteSelected] = useState(null)


  const calculateTransform = (item, scale) => {
    if (item?.length > 0) {
      return `translate(${parseFloat(item.split(",")[0]) * (canvasScaledWidth / 100)}px, ${parseFloat(item.split(",")[1]) * (canvasScaledHeight / 100)}px)`;
    } else {
      return "translate(0px,0px)"
    }
  };

  return (
    <ModalComponent closeHandler={closeHandler}>
      <div className='mt-4 grid grid-cols-1  gap-4 bg-white'>
        {data?.map((item, key) => (
          <div key={item?._id} className='mx-auto '>
            <p className='text-center font-semibold'>{item?.title}</p>
            <p className='text-center text-slate-500'>{moment(item?.created_at).format("MMMM DD, YYYY hh:mm A")}</p>
            {deleteSelected?._id == item?._id ?
              <>
                <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Delete {item?.title}</h3>
                </div>
                <div className='p-6 space-y-6'>
                  <p>
                    Are you sure you want to delete this ?
                  </p>
                </div>
                <div className="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Button
                    gradientDuoTone={'pinkToOrange'}
                    onClick={async () => {
                      artworkRef.current = null
                      deleteHandler(item?._id)
                    }}
                  >
                    Proceed
                  </Button>
                  <Button color='gray' onClick={() => setDeleteSelected(null)}>
                    Cancel
                  </Button>
                </div>
              </> :
              <div id="contentToCapture" className='mx-auto grid-cols-1 flex md:flex-row flex-col gap-4 relative'  >
                <span
                  onClick={() => {
                    artworkRef.current = item;
                    closeHandler()
                    customizerHandler(item);
                  }
                  }
                  className='p-2 py-1 text-xs bg-emerald-600 text-white cursor-pointer absolute  rounded-full  top-2 left-2  z-10'
                >
                  Update
                </span>
                <span
                  onClick={() =>
                    setDeleteSelected(item)
                  }
                  className='p-2 py-1 text-xs bg-red-600 text-white cursor-pointer absolute  rounded-full  top-2 right-2  z-10'
                >
                  Delete
                </span>
                <div className={`  relative border shadow-lg bg-white-600 overflow-hidden`}
                  style={{
                    backgroundColor: item.canvas_color,
                    height: canvasScaledHeight,
                    width: canvasScaledWidth,
                  }}
                >
                  {item.front_image.length > 0 &&
                    <img
                      style={{
                        height: canvasScaledHeight * (item.front_image_size / 100),
                        width: canvasScaledWidth * (item.front_image_size / 100),
                        transform: calculateTransform(item.front_image_location, scale),
                        objectFit: "contain"
                      }} src={item.front_image} className='h-full w-full object-cover' />
                  }
                  {item.front_text.length > 0 &&
                    <div className=' mx-auto absolute w-full ' style={{ bottom: 150 * (scale / 100) }}>
                      <div className='m-4 flex items-center justify-center' >
                        <p
                          style={{
                            fontSize: item.front_text_size * (scale / 100),
                            color: item.front_color,
                            transform: `translate(${item?.front_text_location?.split(",")[0] * (canvasScaledWidth / 100)}px, ${item?.front_text_location?.split(",")[1] * (canvasScaledHeight / 100)}px)`
                          }}
                          className=' py-1 px-2 rounded-md font-semibold z-10'
                        >{item?.front_text}</p>
                      </div>
                    </div>}
                </div>
                {/* back canvas  */}
              </div>
            }
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

const ColorComponent = ({ colors, setColors, closeHandler }) => {
  return (
    <ModalComponent closeHandler={closeHandler}>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-4 mt-6'>
        <div className='w-full'>
          <Label>Sintra Board Color</Label>
          <ChromePicker color={colors["shirt"]} onChange={(updatedColor) => setColors({ ...colors, ["shirt"]: updatedColor.hex })} />
        </div>
        <div className="w-full" />
        <div className='w-full'>
          <Label>Front Text Color</Label>
          <ChromePicker color={colors["front_text"]} onChange={(updatedColor) => setColors({ ...colors, ["front_text"]: updatedColor.hex })} />
        </div>

      </div>
    </ModalComponent >
  )
}




const Customizer = () => {
  const [imageUpload, setImageUpload] = useState(null)

  const [modal, setModal] = useState({
    picture: false,
    text: false,
    artwork: false,
    download: false,
    save: false
  })
  const [imageLocation, setImageLocation] = useState("front")
  const [textLocation, setTextLocation] = useState("front")
  const [colorLocation, setColorLocation] = useState("front")

  const [canvasText, setCanvasText] = useState({ front: "", back: "" })

  const MY_CORS = 'https://marvs-cors.onrender.com/proxy?url='
  const [canvasImage, setCanvasImage] = useState({ front: "", back: "" })
  const [fontSizes, setFontSizes] = useState({ front: 20, back: 20 })
  const [scale, setScale] = useState(50)
  const [title, setTitle] = useState("")
  const [images, setImages] = useState([
  ])
  const ICONSIZE = 25
  const [imageSize, setImageSize] = useState({ front: 50, back: 50 })
  //positions
  const [imagePosition, setImagePosition] = useState({ front_x: 0, back_x: 0, front_y: 0, back_y: 0 })
  const [textPosition, setTextPosition] = useState({ front_x: 0, back_x: 0, front_y: 0, back_y: 0 })
  //colors
  const [colors, setColors] = useState({ shirt: "#D1D5DB", front_text: "#000", back_text: "#000" })
  const { state, dispatch } = useAppContext()
  const artworkRef = useRef(null)
  const loadHandler = async () => {
    const result = await getUserCanvas(state?.user?._id)
    if (result?.success) {
      let image_list = []
      const filter_merch = result.data.filter(d => d.product?.merchandise == "Sintra Board" || d.merch == "sintraboard")
      for (let i of filter_merch) {
        if (i.merch?.length > 0)
          image_list.push(i.image);
        else {
          for (let l of i.product?.logos)
            image_list.push(l);
        }
      }
      setImages(image_list)
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



  const captureDivContent = () => {
    const node = document.getElementById('contentToCapture');
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
      name: "Color",
      icon: <MdOutlineColorLens size={ICONSIZE} />,
      setModal: () => setModal({ ...modal, color: !modal.color }),
    },
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
      name: "Download ",
      icon: <FiDownload size={ICONSIZE} />,
      setModal: () => captureDivContent(),
    },
    {
      name: "Save",
      icon: <LuSave size={ICONSIZE} />,
      setModal: () => setModal({ ...modal, save: true }),
    },
    {
      name: "Custom Prints",
      icon: <FiArchive size={ICONSIZE} />,
      setModal: () => setModal({ ...modal, artwork: !modal.artwork }),
    },
  ]

  const ButtonComponent = ({ data }) => {
    return (
      <>
        <div onClick={data?.setModal} className='flex items-center flex-col cursor-pointer rounded-full hover:bg-purple-200 p-1'>
          {data?.icon}
          <p className='text-center text-xs'>{data?.name}</p>
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
      // texts
      front_text: canvasText.front,
      back_text: canvasText.back,
      // images
      front_image: canvasImage.front.replace(MY_CORS, ""),
      back_image: canvasImage.back.replace(MY_CORS, ""),
      // colors
      canvas_color: colors.shirt,
      front_color: colors.front_text,
      back_color: colors.back_text,
      // locations
      front_image_location: [imagePosition.front_x, imagePosition.front_y].join(","),
      back_image_location: [imagePosition.back_x, imagePosition.back_y].join(","),
      front_text_location: [textPosition.front_x, textPosition.front_y].join(","),
      back_text_location: [textPosition.back_x, textPosition.back_y].join(","),
      // sizes
      front_text_size: fontSizes.front,
      back_text_size: fontSizes.back,
      front_image_size: imageSize.front,
      back_image_size: imageSize.back
    }
    let result = null
    if (!artworkRef.current) {
      result = await addArtwork(newData)
    } else {
      result = await updateArtwork(artworkRef.current?._id, newData)
    }
    if (result.success) {
      artworkRef.current = null
      setModal({ ...modal, save: false })
      setTitle("")
      await refetchArtworkHandler()
      return toast.success("Artwork Saved", toastOptions)
    }
    toast.error("Something went wrong!", toastOptions)

  }


  const customizerHandler = (data) => {
    if (!data) {
      setCanvasText({ front: "", back: "" })
      setCanvasImage({ front: "", back: "" })
      setScale(50)
      setFontSizes({ front: 20, back: 20 })
      setImageSize({ front: 30, back: 30 })
      setImagePosition({ front_x: 0, back_x: 0, front_y: 0, back_y: 0 })
      setTextPosition({ front_x: 0, back_x: 0, front_y: 0, back_y: 0 })
      setColors({ shirt: "#D1D5DB", front_text: "#000", back_text: "#000" })
    } else {
      setTitle(data?.title)
      const {
        front_text, back_text,
        front_image, back_image,
        front_text_size, back_text_size,
        front_image_size, back_image_size,
        front_image_location, back_image_location,
        front_text_location, back_text_location
      } = data
      setCanvasText({ front: front_text, back: back_text })
      setCanvasImage({ front: front_image, back: back_image })

      // sizes
      setFontSizes({ front: front_text_size, back: back_text_size })
      setImageSize({ front: front_image_size, back: back_image_size })

      //position
      setImagePosition({
        front_x: front_image_location.split(",")[0],
        back_x: back_image_location.split(",")[0],
        front_y: front_image_location.split(",")[1],
        back_y: back_image_location.split(",")[1]
      })

      setTextPosition({
        front_x: front_text_location.split(",")[0],
        back_x: back_text_location.split(",")[0],
        front_y: front_text_location.split(",")[1],
        back_y: back_text_location.split(",")[1]
      })
      setColors({
        shirt: data.canvas_color,
        front_text: data.front_color,
        back_text: data.back_color
      })
    }
  }

  const canvasScaledHeight = 400 * (scale / 100);
  const canvasScaledWidth = 700 * (scale / 100);

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
        refetch={loadHandler}
        state={state}
        images={images}
        setCanvas={setCanvasImage}
        canvas={canvasImage}
        location={imageLocation}
        position={imagePosition}
        setPosition={setImagePosition}
        setLocation={setImageLocation}
        scale={imageSize}
        setScale={setImageSize}
        closeHandler={LEFT_BUTTON[1].setModal}
       

      />}
      {modal.text && <TextComponent
        setCanvas={setCanvasText}
        canvas={canvasText}
        location={textLocation}
        position={textPosition}
        setPosition={setTextPosition}
        fontSizes={fontSizes}
        setFontSizes={setFontSizes}
        setLocation={setTextLocation}
        closeHandler={LEFT_BUTTON[2].setModal} />}
      {modal.save && <SaveComponent
        title={title}
        setTitle={setTitle}
        submitHandler={submitHandler}
        closeHandler={() => setModal({ ...modal, save: !modal.save })} />}

      {modal.artwork && <ArtworkComponent
        data={artWorkData}
        customizerHandler={customizerHandler}
        deleteHandler={deleteHandler}
        artworkRef={artworkRef}
        closeHandler={RIGHT_BUTTON[2].setModal} />}

      {modal.color && <ColorComponent
        location={colorLocation}
        setLocation={setColorLocation}
        colors={colors}
        setColors={setColors}
        closeHandler={LEFT_BUTTON[0].setModal}
      />}
      {/* END OF MODALS  */}
      <div className='overflow-hidden h-screen relative'>

        <Button size="xs" color="light" className='fixed top-1 left-1 z-10'>
          <Link href="/">
            <div className='flex gap-2 items-center'>
              <IoChevronBack size={ICONSIZE} /> Back to Homepage
            </div>
          </Link>
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
            {artworkRef?.current?.title &&
              <>
                <p className=" font-semibold w-full text-center">Edit Artwork Mode{"\n"}Title: {artworkRef?.current?.title}</p>
                <Button onClick={() => {
                  artworkRef.current = null
                  customizerHandler()
                }} className="mx-auto" color="light" size={"xs"}>Cancel Edit</Button>
              </>
            }
            <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white">Camera Scale</label>
            <input id="default-range" min={20} max={100} type="range" onChange={(e) => setScale(e.target.value)} value={scale} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
          </div>
        </div>
        {/* end of control */}
        <div style={centerDivStyle} className='mx-auto fixed flex items-center justify-center gap-4'>

          <div id="contentToCapture" className='relative flex gap-4 ' >

            {/* front canvas  */}
            <div
              // className='front-shirt'
              className={`relative border shadow-lg bg-white-600 overflow-hidden`}
              style={{
                height: canvasScaledHeight,
                width: canvasScaledWidth,
                backgroundColor: colors["shirt"],
              }}
            >
              {canvasImage.front.length > 0 &&
                <img
                  style={{
                    objectFit: "contain",
                    height: (canvasScaledHeight * (imageSize.front / 100)),
                    width: (canvasScaledWidth * (imageSize.front / 100)),
                    transform: `translate(${imagePosition.front_x * (canvasScaledWidth / 100)}px, ${imagePosition.front_y * (canvasScaledHeight / 100)}px)`
                  }} src={MY_CORS + canvasImage.front} className='h-full w-full object-cover' />
              }
              {canvasText.front.length > 0 &&
                < div className={` mx-auto absolute  w-full`} style={{ bottom: 150 * (scale / 100) }}>
                  <div className='m-4 flex items-center justify-center'>
                    <p
                      style={{
                        fontSize: fontSizes["front"] * (scale / 100),
                        color: colors["front_text"],
                        transform: `translate(${textPosition.front_x * (canvasScaledWidth / 100)}px, ${textPosition.front_y * (canvasScaledHeight / 100)}px)`
                      }}
                      className='rounded-md  font-semibold z-10'
                    >{canvasText["front"]}</p>
                  </div>
                </div>}
            </div>
            {/* back canvas  */}


          </div>
        </div>
      </div >
    </>
  )
}

export default Customizer