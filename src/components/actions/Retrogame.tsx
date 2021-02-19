import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
const Root = styled.div`
  position: absolute;
  top: 104px;
  right: 50%;
  z-index: 10;
  white-space: pre-wrap;
`
const ButtonGroup = styled.div`
  margin-top: 4px;
  height: 40px;
`
const GameDisplay = styled.div`
  margin: 0 -800px;
  font-family: 'TheStrongGamer';
  color: white;
  font-size: 18px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
  display: inline-block;
  background: #111;
  padding: 8px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
`
const GameFrame = styled.div`
  padding-left: 16px;
  text-align: left;
  font-size: 16px;
  line-height: 20px;
  display: block;
  width: 360px;
  box-sizing: border-box;
  border: 2px solid #fff;
  min-height: 80px;
`

const Button = styled.div`
  display: inline-block;
  text-align: center;
  padding: 4px 8px 6px 8px;
  margin: 4px 20px;
  width: 90px;
  box-sizing: border-box;
  display: inline-block;
  border: 2px solid #fff;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
`

type Props = {
  onFinish?: () => void
}

const MessageScripter: React.VFC<{ message: string; onFinish: () => void }> = ({
  message,
  onFinish,
}) => {
  const [currentText, setCurrentText] = useState('')
  useEffect(() => {
    let index = 0
    const timeout = setInterval(() => {
      index++
      const newMessage = message.slice(0, index)
      setCurrentText(newMessage)
      if (newMessage === message) {
        clearTimeout(timeout)
        onFinish()
      }
    }, 100)
  }, [message])

  return <div>{currentText}</div>
}

const Retrogame: React.VFC<Props> = ({ onFinish }) => {
  const [state, setState] = useState<'start' | 'wait' | 'end'>('start')
  const [message, setMessage] = useState(
    '「ﾎｷﾞｨ」\nピーギャンが おなかをすかせている。\nももを あたえますか？'
  )
  const handleFinishScripter = () => {
    if (state === 'start') return setState('wait')

    if (state === 'end') onFinish && onFinish()
  }
  const handleAnswer = (give: boolean) => () => {
    if (state !== 'wait') return
    setState('end')
    const text = give
      ? 'ピーギャンに かたいももを あたえた。　　\nとてもうれしそうだ。　　\nよかったねぇ。　　　　　　　　　'
      : '「ﾎｷﾞｨ...ﾎｷﾞｨ...」　　\nピーギャンの かなしげなこえを しりめに　　\nわたしは しずかに このばをたちさった。  　　    '
    setMessage(text)
  }

  return (
    <Root>
      <GameDisplay>
        <img src="/images/peachick.png" alt="pgc" width={200} height={200} />
        <GameFrame>
          <MessageScripter message={message} onFinish={handleFinishScripter} />
        </GameFrame>
        <ButtonGroup>
          {state === 'wait' && (
            <>
              <Button onClick={handleAnswer(true)}>はい</Button>
              <Button onClick={handleAnswer(false)}>いいえ</Button>
            </>
          )}
        </ButtonGroup>
      </GameDisplay>
    </Root>
  )
}
export default Retrogame
