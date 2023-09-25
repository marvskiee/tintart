// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAjRbwXeqb4yRCyV7InzRBEI24qpQ6XkvA',
  authDomain: 'malinta-96042.firebaseapp.com',
  projectId: 'malinta-96042',
  storageBucket: 'malinta-96042.appspot.com',
  messagingSenderId: '626100295559',
  appId: '1:626100295559:web:73e189da3e1c222d5da522',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
