import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import '../styles/global.css'
import ReactGA from 'react-ga'
import HycContextProvider from '../contexts/HycContext'
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
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ThemeProvider theme={theme}>
      <HycContextProvider>
        <Component {...pageProps} />
      </HycContextProvider>
    </ThemeProvider>
  </>
)

export default App
