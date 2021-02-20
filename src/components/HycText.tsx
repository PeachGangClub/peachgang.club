import React from 'react'
import styled from 'styled-components'

import useHyc from '../hooks/useHyc'
const Root = styled.span``

const HycText: React.VFC = () => {
  const { hyc } = useHyc()

  return <Root>{hyc}HYC</Root>
}
export default HycText
