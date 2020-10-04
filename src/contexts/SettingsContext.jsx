import React, { createContext } from "react"

const SettingsContext = createContext({})

const SettingsContextProvider = ({ children }) => {
  const levelSettings = {
    size: [640, 640],
    tileSize: 32,
  }

  return (
    <SettingsContext.Provider value={{ levelSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsContextProvider }
