import { useContext } from 'react'
import { HycContext } from '../contexts/HycContext'

const useHyc = () => {
  return useContext(HycContext)
}

export default useHyc
