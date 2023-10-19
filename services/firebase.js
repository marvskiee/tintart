// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGITk_E5LgWujQinjxWLYYSAwavFuK-rQ",
  authDomain: "tintart-eec2e.firebaseapp.com",
  projectId: "tintart-eec2e",
  storageBucket: "tintart-eec2e.appspot.com",
  messagingSenderId: "342440309375",
  appId: "1:342440309375:web:2421730923d3a0a4dc454a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
