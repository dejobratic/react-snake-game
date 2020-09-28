import React, { createContext } from "react"

const SettingsContext = createContext({})

const SettingsContextProvider = ({ children }) => {
  const LEVEL_SIZE = [800, 800]
  const LEVEL_SCALE = 40
  
  return (
    <SettingsContext.Provider value={{ LEVEL_SIZE, LEVEL_SCALE }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsContextProvider }
