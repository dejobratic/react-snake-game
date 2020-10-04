import React, { useContext } from "react"

import { SettingsContext } from "contexts/SettingsContext"

import useLevel from "hooks/useLevel"
import useCanvas from "hooks/useCanvas"

const Level = ({ snake, apple }) => {
  const { levelSettings } = useContext(SettingsContext)

  const [drawSnake, drawApple] = useLevel(
    levelSettings.size,
    levelSettings.tileSize
  )

  const canvasRef = useCanvas(
    levelSettings.size,
    levelSettings.tileSize,
    (context) => {
      drawApple(context, apple)
      drawSnake(context, snake)
    }
  )

  return (
    <>
      <canvas
        ref={canvasRef}
        width={`${levelSettings.size[0]}px`}
        height={`${levelSettings.size[1]}px`}
      />
    </>
  )
}

export default Level
