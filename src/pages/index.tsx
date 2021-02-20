import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CommandInput from '../components/CommandInput'
import { motion } from 'framer-motion'

import Layout from '../components/Layout'
import AppHead from '../components/AppHead'
import nightWithStars from '@iconify/icons-twemoji/night-with-stars'
import cityscapeIcon from '@iconify/icons-twemoji/cityscape'
import tornadoIcon from '@iconify/icons-twemoji/tornado'
import videoGame from '@iconify/icons-twemoji/video-game'
import twitterIcon from '@iconify/icons-logos/twitter'
import radioactiveIcon from '@iconify/icons-twemoji/radioactive'
import ActionIcon from '../components/AcionIcon'
import Roulette from '../components/Roulette'
import ReactGA from 'react-ga'
import Retrogame from '../components/actions/Retrogame'
import HycText from '../components/HycText'

type StyledProps = {
  isNight: boolean
}

const ActionHeader = styled.div`
  position: fixed;
  font-size: 16px;
  top: 0;
  right: 0;
  padding: 4px 8px;
  z-index: 10;
  font-weight: 100;
  text-align: right;
`
const Title = styled.h1<StyledProps>`
  font-size: 40px;
  font-weight: 100;
  transition: color 1s;
  color: ${({ isNight }) => (isNight ? '#fff' : '#000')};
`
const PGButton = styled.button`
  font-size: 40px;
  font-weight: 100;
  background: none;
  border-width: 0;
  outline: 0;
  cursor: help;
`

const ActionContainer = styled.div<StyledProps>`
  transition: background-color 1s;

  background-color: ${({ isNight }) => (isNight ? '#222' : '#fff')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const CommandInputWrap = styled.div`
  padding-top: 16px;
`
const IndexPage: React.FC = () => {
  const [commandInputIsOpen, setCommandInputIsOpen] = useState<boolean>(false)
  const [isNight, setIsNight] = useState<boolean>(false)
  const [isOpenRoulette, setIsOpenRoulette] = useState<boolean>(false)
  const [isOpenRetrogame, setIsOpenRetrogame] = useState<boolean>(false)

  const [rotate, setRotate] = useState<number>(0)
  const [commandText, setCommandText] = useState<string>('')
  useEffect(() => {
    fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vR04bDEoPZUExwsnXZsxzDx5Ii09DM_U4IanJD-NASu1yrXyp_rYp6EGUuiUsSYF-3rwwlBwzTPEqQi/pub?output=csv'
    ).then((res) => {
      res.text().then((t) => {
        const data = t.split('\n').map((r) => {
          const d = r.split(',')
          return {
            number: +d[0],
            title: d[1],
            reward: d[2] == '' ? 0 : +d[2],
            image: d[3] == '' ? null : d[3],
            link: d[4] == '' ? null : d[4],
            text: d[5] == '' ? null : d[5],
            color: d[6] == '' || d[6].length === 1 ? null : d[6],
          }
        })

        data.shift()
        window.localStorage.setItem('club.peachgung.roulette.contents', JSON.stringify(data))
      })
    })
  }, [commandInputIsOpen])

  const handleClickPeachGang = () => {
    setCommandInputIsOpen(true)
  }

  const handleSubmit = () => {
    if (commandText !== '') {
      ReactGA.event({
        category: 'ユーザーアクション',
        action: 'コマンドを実行',
        label: commandText,
      })
    }
    switch (commandText) {
      case 'night-mode':
        setIsNight(true)
        break
      case 'day-mode':
        setIsNight(false)
        break
      case 'spin':
        setRotate(rotate + 360 * 20)
        break
      case 'roulette':
        setIsOpenRoulette(true)
        break
      case 'retrogame':
        setIsOpenRetrogame(true)
        break
      case 'twitter':
        window.open('https://twitter.com/peachgangclub', '_blank')
        break
    }

    setCommandText('')
  }
  const handleClickActionIcon = (text: string) => {
    setCommandText(text)
  }
  return (
    <Layout>
      <AppHead
        title={'Peach Gang Club'}
        description={''}
        keyword={'peach gang club 桃'}
        image={'images/og_image.png'}
        url={'/'}
      />
      <div>
        {commandInputIsOpen && (
          <ActionHeader>
            <HycText />
          </ActionHeader>
        )}
        <ActionContainer isNight={isNight}>
          {commandInputIsOpen && (
            <>
              <ActionIcon text="twitter" icon={twitterIcon} onClick={handleClickActionIcon} />
              <ActionIcon text="night-mode" icon={nightWithStars} onClick={handleClickActionIcon} />
              <ActionIcon text="day-mode" icon={cityscapeIcon} onClick={handleClickActionIcon} />
              <ActionIcon text="spin" icon={tornadoIcon} onClick={handleClickActionIcon} />
              <ActionIcon text="roulette" icon={radioactiveIcon} onClick={handleClickActionIcon} />
              <ActionIcon text="retrogame" icon={videoGame} onClick={handleClickActionIcon} />
            </>
          )}

          <div>
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: commandInputIsOpen ? 0 : 1 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
            >
              <Title isNight={isNight}>Peach Gang Club</Title>
            </motion.div>

            <PGButton onClick={handleClickPeachGang}>
              <motion.img
                src="/images/peachick.png"
                alt="pgc"
                width={200}
                height={200}
                initial={{ scale: 0 }}
                animate={{ rotate: rotate, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              />
            </PGButton>
          </div>
          <CommandInputWrap>
            {commandInputIsOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <CommandInput
                  value={commandText}
                  onChange={handleClickActionIcon}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </CommandInputWrap>
        </ActionContainer>
      </div>
      {isOpenRoulette && (
        <Roulette
          onFinish={() => {
            setIsOpenRoulette(false)
          }}
        />
      )}
      {isOpenRetrogame && (
        <Retrogame
          onFinish={() => {
            setIsOpenRetrogame(false)
          }}
        />
      )}
    </Layout>
  )
}

export default IndexPage
