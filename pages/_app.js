import '../styles/globals.css'
import React from 'react'
import { AppWrapper } from '../context/AppContext'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppWrapper>
        <Component {...pageProps} />
        <Toaster/>
      </AppWrapper>
    </>
  )
}

export default MyApp
