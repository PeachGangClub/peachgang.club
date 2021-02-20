import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import '../styles/global.css'
import ReactGA from 'react-ga'
import HycContextProvider from '../contexts/HycContext'
import React from 'react'
import ImageProcessingContextProvider from '../contexts/ImageProcessingContext'
import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyBMhJ6Tm8ZhwcuifNnawOyop71jMaskfjM',
  authDomain: 'peachgang-club.firebaseapp.com',
  projectId: 'peachgang-club',
  storageBucket: 'peachgang-club.appspot.com',
  messagingSenderId: '704790623367',
  appId: '1:704790623367:web:0da6352c016ecf2d20b422',
  measurementId: 'G-X47GE16GPR',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}
ReactGA.initialize('UA-48876391-9')

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=0.9, shrink-to-fit=no" />
      <link rel="shortcut icon" href="/images/peachick.png" key="shortcutIcon" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;700&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />
    </Head>
    <ThemeProvider theme={theme}>
      <HycContextProvider>
        <ImageProcessingContextProvider>
          <Component {...pageProps} />
        </ImageProcessingContextProvider>
      </HycContextProvider>
    </ThemeProvider>
  </>
)

export default App
