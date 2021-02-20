import React, { createContext, useState } from 'react'

interface ContextProps {
  processing: boolean
  setProcessing: React.Dispatch<React.SetStateAction<boolean>>
}

export const ImageProcessingContext = createContext({
  processing: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProcessing: () => {},
} as ContextProps)

const ImageProcessingContextProvider = ({ children }) => {
  const [processing, setProcessing] = useState<boolean>(false)

  return (
    <ImageProcessingContext.Provider value={{ processing, setProcessing }}>
      {children}
    </ImageProcessingContext.Provider>
  )
}

export default ImageProcessingContextProvider
