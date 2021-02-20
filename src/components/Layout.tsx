import React, { ReactNode } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { ImageProcessingContext } from '../contexts/ImageProcessingContext'
const Display = styled.div`
  height: 100%;
  display: block !important;
`

type Props = {
  children?: ReactNode
  title?: string
}
const Root = styled.div`
  height: 100%;
  text-align: center;
`

const ProcessingPanel = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #1da1f2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`
const ProcessingRoot = () => {
  const { processing } = React.useContext(ImageProcessingContext)
  return (
    <div>
      {processing && (
        <ProcessingPanel initial={{ opacity: 0 }} animate={{ opacity: processing ? 1 : 0 }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ delay: 3, repeatDelay: 3, repeat: Infinity, duration: 1 }}
          >
            画像準備中...
            <br />
            <br />
            もう少し待ってね。
          </motion.div>
        </ProcessingPanel>
      )}
    </div>
  )
}

const Layout = ({ children, title = 'Peach Gang Club' }: Props) => (
  <Root>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Display id="displayRoot">{children}</Display>
    <ProcessingRoot />
  </Root>
)

export default Layout
