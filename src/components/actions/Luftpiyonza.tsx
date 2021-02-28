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

const Popup = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 11;
  top: 100px;
  left: 25px;
  width: 250px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
`

const PopupTitle = styled.div`
  width: 100%;
  padding: 0.5rem;
  color: white;
  font-weight: 900;
  font-size: 2rem;
  background-color: orange;
`

const PopupContaint = styled.div`
  padding: 0.5rem;
`

const PopupButton = styled.button`
  width: 100%;
  height: 4rem;
  padding: 0;
  margin: 0;
  border: none;
  font-weight: 700;
  font-size: 1.5rem;
  color: white;
  background-color: orange;
  &:active {
    background-color: #b97900;
  }
`

const GameDisplay = styled.canvas`
  background-color: skyblue;
  margin: 0;
`
const JumpButton = styled.button`
  width: 100%;
  height: 6rem;
  padding: 0;
  margin: 0;
  border: none;
  font-weight: 800;
  font-size: 2rem;
  color: white;
  background-color: orange;
  outline: none;
  &:active {
    background-color: #b97900;
  }
`

type Props = {
  onFinish?: () => void
}

const Luftpiyonza: React.VFC<Props> = ({ onFinish }) => {
  const display = React.useRef<HTMLCanvasElement>(null)

  const [gameState, setGameState] = React.useState<'Result' | 'Start' | 'InGame'>('Start')
  const [score, setScore] = React.useState(0)

  useEffect(() => {
    const img = new Image()
    img.src = '/images/luftpiyonza.png'
    img.onload = () => {
      Game.setImage(img)
    }
    Game.setCanvas(display.current)
    Game.setGameoverCallback((result: number) => {
      setScore(result)
      setGameState('Result')
    })
    Game.setStartCallback(() => {
      setGameState('InGame')
    })
    Game.start()
    return () => {
      Game.stop()
    }
  }, [display])

  const handleClick = () => {
    if (gameState !== 'Result') Game.up()
  }

  const handleClose = () => {
    onFinish && onFinish()
  }

  const handleRestart = () => {
    setGameState('Start')
    Game.start()
  }
  return (
    <Root>
      <Container>
        <CloseButton onClick={handleClose}>
          <span role="img" aria-label="close">
            ❌
          </span>
        </CloseButton>
        {gameState === 'Start' && (
          <Popup>
            <PopupContaint>
              <h1>TAP BUTTON TO START</h1>
              <h1>↓</h1>
            </PopupContaint>
          </Popup>
        )}
        {gameState === 'Result' && (
          <Popup>
            <PopupTitle>Result</PopupTitle>
            <PopupContaint>
              <div>Your score is</div>
              <h1>{`${score}`}</h1>
            </PopupContaint>
            <PopupButton onClick={handleRestart}>Continue?</PopupButton>
          </Popup>
        )}
        <GameDisplay ref={display} width="300px" height="500px" />
        <JumpButton onClick={handleClick}>TAP</JumpButton>
      </Container>
    </Root>
  )
}

export default Luftpiyonza
