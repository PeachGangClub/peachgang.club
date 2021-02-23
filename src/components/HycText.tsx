import React from 'react'
import styled from 'styled-components'

import useHyc from '../hooks/useHyc'

type StyledProps = {
  isNight: boolean
}

const Root = styled.span<StyledProps>`
 color: ${({ isNight }) => { return isNight ? "#0f0" : "#000" }};
`

type Props = {
  isNight: boolean
}
const HycText: React.VFC<Props> = ({ isNight }) => {
  const { hyc } = useHyc()

  return <Root isNight={isNight}>{hyc}HYC</Root>
}
export default HycText
