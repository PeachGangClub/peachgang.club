import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import randomcolor from 'randomcolor'
import ReactGA from 'react-ga'
import useHyc from '../hooks/useHyc'
const Root = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.1);
`
const Button = styled.button`
  flex: 1;
  vertical-align: top;
  cursor: pointer;
  border: none;
  margin: 0 8px 0 4px;
  display: inline-block;
  color: white;
  font-weight: bold;
  text-decoration: none;
  background-color: #43a047;
  background-image: linear-gradient(to right, #0ba360, #3cb085, #2bb673);
  padding: 10px 24px 6px 24px;
  font-size: 12px;
  border-radius: 10px;
  :focus {
    outline: none;
  }
`
const InverseButton = styled.button`
  flex: 1;

  vertical-align: top;
  cursor: pointer;
  border: none;
  margin: 0 4px 0 8px;
  display: inline-block;
  font-weight: bold;
  color: #2bb673;
  text-decoration: none;
  background-color: #fff;
  padding: 10px 24px 6px 24px;
  font-size: 12px;
  border-radius: 10px;
  :focus {
    outline: none;
  }
`

const Container = styled.div`
  position: absolute;
  font-size: 16px;
  top: 40px;
  left: 50%;
  margin-left: -20px;
`
const Pin = styled.div`
  position: absolute;
  top: -20px;
  left: 13.5px;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  border-top: 30px solid #d42727;
  z-index: 100;
`

const LinkButton = styled.a`
  display: inline-block;
  color: white;
  text-decoration: none;
  background-color: #ed6ea0;
  background-image: linear-gradient(to right, #ed6ea0, #ffbea5, #f89abf);
  text-shadow: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 10px;
`
const FlavorText = styled.div`
  color: white;
  font-size: 14px;
  margin: 8px 32px;
  line-height: 18px;
`

const Result = styled.div`
  border-radius: 16px;
  line-height: 30px;
  font-size: 30px;
  position: absolute;
  top: 0px;
  left: -180px;
  width: 100%;
  text-align: center;
  z-index: 100;
  color: #fff;
  font-weight: bold;
  padding: 0 16px;
`

const ResultContent = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
  padding: 16px 0;
  border-radius: 10px;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NextActionWrap = styled.div`
  margin-top: 4px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 0;
  border-radius: 10px;
`

const CirclePanel = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  transform-origin: 18px 200px;
`
const Panel = styled.div`
  position: absolute;
  border-right: 18px solid transparent;
  border-left: 18px solid transparent;
  transform-origin: 18px 200px;
`
const PGImage = styled.img`
  position: absolute;
  top: 160px;
  left: -20px;
  width: 80px;
  height: 80px;
`
const PanelText = styled.span`
  position: absolute;
  top: -190px;
  left: -9px;
  font-size: 16px;
  line-height: 18px;
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
`

const generatePanelData = () => {
  const contents = JSON.parse(window.localStorage.getItem('club.peachgung.roulette.contents'))
  return contents.map((c, i) => {
    if (!c.color) {
      if (i === 0 || contents[i - 1].title !== c.title) {
        c.color = randomcolor({ luminosity: 'light' })
      } else {
        c.color = contents[i - 1].color
      }
    }
    const checkCenter = () => {
      let r = 0
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const beforeItem = contents[i - r]
        const afterItem = contents[i + r]
        if (afterItem?.title === beforeItem?.title && afterItem?.title === c.title) {
          r++
          continue
        }

        if (afterItem?.title !== c.title && beforeItem?.title !== c.title) return true

        return false
      }
    }
    c.center = checkCenter()
    return c
  })
}

type Props = {
  onFinish: () => void
}
const Roulette: React.VFC<Props> = ({ onFinish }) => {
  const ref = useRef<HTMLDivElement>()
  const pgRef = useRef<HTMLImageElement>()
  const [panelData] = useState(generatePanelData())
  const { hyc, setHyc } = useHyc()
  const [result, setResult] = useState<{
    number: number
    color: string
    title: string
    reward: number
    center: boolean
    link: string | null
    image: string | null
    text: string
  } | null>(null)

  const handleClickRetryButton = () => {
    setResult(null)
  }

  useEffect(() => {
    if (result) return
    setHyc(hyc - 10)
    let r = 0
    let a = Math.random() + 0.2
    let v = Math.random() * 3
    let finished = false
    const timeout = setInterval(() => {
      v = v + a
      if (v > 15) {
        a = 0
      }

      if (v > 0) {
        v -= 0.1
      }
      if (a === 0 && Math.abs(v) <= 0.1 && !finished) {
        v = 0
        finished = true
        let index = Math.floor((360 - (r - 5)) / 10)
        if (index >= 36) index = 0
        setResult(panelData[index])
        ReactGA.event({
          category: '統計データ',
          action: 'ルーレット結果',
          label: panelData[index].title,
          value: panelData[index].reward,
        })
        setHyc(hyc + panelData[index].reward)
      }
      if (r > 360) {
        r -= 360
      }

      r += v
      ref.current.style.transform = `rotate(${r}deg)`
    }, 25)

    return () => {
      clearInterval(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return (
    <Root>
      <Container>
        <Pin />
        <CirclePanel ref={ref}>
          {panelData.map((d) => {
            return (
              <Panel
                key={d.number}
                style={{
                  borderTop: `200px solid ${d.color}`,
                  transform: `rotate(${d.number * 10}deg)`,
                }}
              >
                <PanelText>
                  {d.center ? d.title : ''}
                  <br />
                </PanelText>
              </Panel>
            )
          })}
          <PGImage ref={pgRef} src="/images/peachick2.png" alt="pgc" />
        </CirclePanel>
        {result && (
          <Result>
            <ResultContent>
              <div>
                {result.title}
                <br />
                <div>
                  <small style={{ fontSize: 14 }}>+{result.reward}HYC</small>
                </div>
                {result.image && (
                  <div>
                    <img
                      src={result.image}
                      alt={result.title}
                      height={140}
                      style={{ borderRadius: 10, display: 'inline-block', margin: 16 }}
                    />
                  </div>
                )}
                <div>
                  <FlavorText>{result.text}</FlavorText>
                </div>
                {result.link && (
                  <div>
                    <LinkButton href={result.link} target="_blank" rel="noreferrer">
                      今すぐ購入
                    </LinkButton>
                  </div>
                )}
              </div>
            </ResultContent>
            <NextActionWrap>
              <div style={{ display: 'flex' }}>
                <InverseButton
                  onClick={() => {
                    onFinish()
                  }}
                >
                  やめる
                </InverseButton>
                <Button onClick={handleClickRetryButton}>回す</Button>
              </div>
            </NextActionWrap>
          </Result>
        )}
      </Container>
    </Root>
  )
}
export default Roulette
