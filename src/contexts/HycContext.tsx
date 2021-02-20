import React, { createContext, useEffect, useState } from 'react'

interface ContextProps {
  hyc: number
  setHyc: React.Dispatch<React.SetStateAction<number>>
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const HycContext = createContext({ hyc: 0, setHyc: () => {} } as ContextProps)

const HycContextProvider = ({ children }) => {
  const [hyc, setHyc] = useState<number>(0)
  useEffect(() => {
    if (!window) return
    if (!hyc) return
    window.localStorage.setItem('club.peachgang.hyc', `${hyc}`)
  }, [hyc])

  useEffect(() => {
    if (!window) return
    const h = +(
      (window.localStorage.getItem('club.peachgang.hyc') ||
        window.localStorage.getItem('club.peachgung.hyc')) ??
      0
    )
    if (h === Infinity) {
      alert('ハッキングやめてください')
      setHyc(-99999999)
      return
    }
    setHyc(h)
  }, [])

  return <HycContext.Provider value={{ hyc, setHyc }}>{children}</HycContext.Provider>
}

export default HycContextProvider
