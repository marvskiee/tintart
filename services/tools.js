import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid"
import { toastOptions } from "../styles/modalOption"
import toast from "react-hot-toast"

export const getHTTPFormat = async ({ url }) => {
  const res = await fetch(`/api${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export const postHTTPFormat = async ({ url, newData }) => {
  const res = await fetch(`/api${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}
export let generateCode = () => { return Math.floor(100000 + Math.random() * 900000) }

export const updateHTTPFormat = async ({ url, newData }) => {
  const res = await fetch(`/api${url}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  })
  const result = await res.json()
  return result
}

export const deleteHTTPFormat = async ({ url }) => {
  const res = await fetch(`/api${url}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}
export const hasBlankValue = array => {
  return array.some(value => /^\s*$/.test(value))
}
export const formatNumberWithCommas = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const imageUploader = async (images, handler) => {
  let tmp = [];
  for (let i = 0; i < images.length; i++) {
    if (images[i]?.url) {
      const imageRef = ref(
        storage,
        `${images[i].file.name + v4()}`
      );
      await uploadBytes(imageRef, images[i].file).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            tmp.push(url);
            if (tmp.length == images.length) {
              handler(tmp)
            }
          })
          .catch((e) => {
            console.log(e)
            return null;
          });
      });
    } else {
      tmp.push(images[i]);
    }
    if (tmp.length == images.length) {
      handler(tmp)

    }
  }
}

export const filterObjectWithEmptyProperties = obj =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([key, value]) => value !== '' && value !== undefined && value !== null)
      .map(([key, value]) =>
        [key, typeof value === 'object' ? filterObjectWithEmptyProperties(value) : value]
      )
  );

export const isValidPassword = (password) => {
  return /^(?=.*[a-zA-Z0-9])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).{8,16}$/.test(password);
}
export const isValidEmail = (email) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
export const isValidPhoneNumber = (number) => {
  // Regular expression for Philippine phone numbers in the format '0912345689'
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(number);
}