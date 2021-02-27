import React, { useEffect } from 'react'
import styled from 'styled-components'

import Game from './LuftpiyonzaGame'

const Root = styled.div`
  position: relative;
  z-index: 10;
  top: 104px;
  width: 100%;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  position: relative;
  background-color: grey;
  width: 300px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
`

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 5px;
  width: 20px;
  height: 20px;
  color: red;
  border: none;
  background-color: transparent;
`

const GameDisplay = styled.canvas`
  background-color: skyblue;
  margin: 0;
`
const JumpButton = styled.button`
  width: 100%;
  height: 4rem;
  padding: 0;
  margin: 0;
  border: none;
  font-weight: 800;
  font-size: 2rem;
  color: white;
  background-color: orange;
  &:active {
    background-color: #b97900;
  }
`

type Props = {
  onFinish?: () => void
}

const Luftpiyonza: React.VFC<Props> = ({ onFinish }) => {
  const display = React.useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    Game.setCanvas(display.current)
    Game.start()
    return () => {
      Game.stop()
    }
  }, [display])

  const handleClick = () => {
    Game.up()
  }
  const handleClose = () => {
    onFinish && onFinish()
  }
  return (
    <Root>
      <Container>
        <CloseButton onClick={handleClose}>
          <span role="img" aria-label="close">
            ❌
          </span>
        </CloseButton>
        <GameDisplay ref={display} width="300px" height="500px" />
        <JumpButton onClick={handleClick}>TAP</JumpButton>
      </Container>
    </Root>
  )
}

export default Luftpiyonza
