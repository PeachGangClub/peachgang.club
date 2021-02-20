import React from 'react'
import styled from 'styled-components'
import * as htmlToImage from 'html-to-image'
import { Icon } from '@iconify/react'
import logoTwitter from '@iconify/icons-ion/logo-twitter'
import { ImageProcessingContext } from '../contexts/ImageProcessingContext'
import firebase from 'firebase'
import { v4 as uuidv4 } from 'uuid'
const TwitterIcon = styled(Icon)`
  margin-right: 4px;
  font-size: 20px;
  vertical-align: middle;
`
const ButtonText = styled.span`
  padding-right: 4px;
  font-weight: bold;
  font-size: 14px;
  vertical-align: middle;
`

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  background: #1da1f2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
`

type Props = {
  target?: HTMLElement
  x?: number
  y?: number
  w?: number
  h?: number
}

const ShareOnTwitterButton: React.VFC<Props> = () => {
  const { processing, setProcessing } = React.useContext(ImageProcessingContext)
  const handleClickButton = async () => {
    if (processing) return
    setProcessing(true)

    const bodyElement: any = document.getElementById('displayRoot')
    const canvas = await htmlToImage.toCanvas(bodyElement)
    const context = canvas.getContext('2d')
    const imgData = context.getImageData(0, 0, bodyElement.clientWidth, bodyElement.clientHeight)
    const canvas2 = document.createElement('canvas')
    canvas2.width = bodyElement.clientWidth
    canvas2.height = bodyElement.clientHeight
    const ctx2 = canvas2.getContext('2d')
    console.log(imgData)
    ctx2.putImageData(imgData, 0, 0)
    const filePath = 'images/' + `${uuidv4()}.png`
    const url = `https://storage.googleapis.com/peachgang-club.appspot.com/${filePath}`
    const text = '戸田広'
    const shareUrl = `http://twitter.com/share?url=${url}&text=${text}&related=peachgangclub&hashtags=PeachGangClub`
    canvas2.toBlob((blob) => {
      firebase
        .storage()
        .ref()
        .child(filePath)
        .put(blob)
        .then(() => {
          console.log(shareUrl)
        })
    })
  }

  return (
    <>
      <Button onClick={handleClickButton}>
        <TwitterIcon icon={logoTwitter} />
        <ButtonText>Tweet</ButtonText>
      </Button>
    </>
  )
}
export default ShareOnTwitterButton
