import React, { createContext } from "react"

const SettingsContext = createContext({})

const SettingsContextProvider = ({ children }) => {
  const LEVEL_SIZE = [640, 640]
  const LEVEL_SCALE = 32

  return (
    <SettingsContext.Provider value={{ LEVEL_SIZE, LEVEL_SCALE }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsContextProvider }
