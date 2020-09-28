import React from "react"

import Game from "components/Game"

import { SettingsContextProvider } from "contexts/SettingsContext"

import "App.css"

const App = () => {
  return (
    <SettingsContextProvider>
      <Game />
    </SettingsContextProvider>
  )
}

export default App
