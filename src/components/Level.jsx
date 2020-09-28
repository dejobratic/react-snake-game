import React, { useContext } from "react"

import { GameContext } from "contexts/GameContext"
import { SettingsContext } from "contexts/SettingsContext"

import useCanvas from "hooks/useCanvas"

const Level = () => {
  const { snake, apple } = useContext(GameContext)
  const { LEVEL_SIZE } = useContext(SettingsContext)

  const drawSnake = (context, snake) => {
    context.fillStyle = "lightgreen"
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
  }

  const drawApple = (context, apple) => {
    context.fillStyle = "pink"
    context.fillRect(apple[0], apple[1], 1, 1)
  }

  const canvasRef = useCanvas(
    (context) => {
      drawSnake(context, snake)
      drawApple(context, apple)
    },
    [snake, apple]
  )

  return (
    <>
      <canvas
        ref={canvasRef}
        width={`${LEVEL_SIZE[0]}px`}
        height={`${LEVEL_SIZE[1]}px`}
      />
    </>
  )
}

export default Level
