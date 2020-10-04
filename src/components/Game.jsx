import React, { useState, useContext } from "react"

import Level from "components/Level"

import { SettingsContext } from "contexts/SettingsContext"

import useInterval from "hooks/useInterval"

const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
}

const SNAKE_START = [
  [8, 10],
  [8, 11],
]
const APPLE_START = [8, 3]
const DIRECTION_START = DIRECTIONS[38]

const GAME_SPEED = 100

const Game = () => {
  const { levelSettings } = useContext(SettingsContext)

  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [direction, setDirection] = useState(DIRECTION_START)
  const [speed, setSpeed] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDirection(DIRECTION_START)
    setSpeed(GAME_SPEED)
    setGameStarted(true)
  }

  const endGame = () => {
    setSpeed(null)
    setGameStarted(false)
  }

  const handleKeyPress = ({ keyCode }) => {
    if (gameStarted) {
      handleChangeSnakeDirection({ keyCode })
    } else {
      startGame()
    }
  }

  const handleChangeSnakeDirection = ({ keyCode }) => {
    // prevent movement with unallowed keys
    if (keyCode < 37 || keyCode > 40) return

    // prevent sudden movement in oposite direction
    if (direction === DIRECTIONS[38] && keyCode === 40) return
    if (direction === DIRECTIONS[40] && keyCode === 38) return
    if (direction === DIRECTIONS[37] && keyCode === 39) return
    if (direction === DIRECTIONS[39] && keyCode === 37) return

    setDirection(DIRECTIONS[keyCode])
  }

  const createApple = (currentSnake) => {
    const placeAppleOnRandomBlock = () => {
      return apple.map((_, i) =>
        Math.floor(
          (Math.random() * levelSettings.size[i]) / levelSettings.tileSize
        )
      )
    }

    let newApple = null
    do {
      newApple = placeAppleOnRandomBlock()
    } while (hasCollidedWithSnakeBody(newApple, currentSnake))

    return newApple
  }

  const hasCollidedWithWall = (block) => {
    return (
      block[0] * levelSettings.tileSize >= levelSettings.size[0] ||
      block[0] < 0 ||
      block[1] * levelSettings.tileSize >= levelSettings.size[1] ||
      block[1] < 0
    )
  }

  const hasCollidedWithSnakeBody = (block, currentSnake = snake) => {
    for (const segment of currentSnake)
      if (block[0] === segment[0] && block[1] === segment[1]) return true
  }

  const hasEatenApple = (currentSnake) => {
    return currentSnake[0][0] === apple[0] && currentSnake[0][1] === apple[1]
  }

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

  const run = () => {
    const newSnake = deepClone(snake)

    const newSnakeHead = [
      newSnake[0][0] + direction[0],
      newSnake[0][1] + direction[1],
    ]
    newSnake.unshift(newSnakeHead)

    if (
      hasCollidedWithWall(newSnakeHead) ||
      hasCollidedWithSnakeBody(newSnakeHead)
    ) {
      endGame()
    }

    if (hasEatenApple(newSnake)) {
      const newApple = createApple(newSnake)
      setApple(newApple)
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }

  useInterval(() => run(), speed)

  return (
    <div
      className="game-container"
      tabIndex="0"
      role="button"
      onKeyDown={handleKeyPress}
      style={{
        width: `${levelSettings.size[0] + 20}px`,
        height: `${levelSettings.size[1] + 20}px`,
      }}
    >
      <Level snake={snake} apple={apple} />
      {!gameStarted && (
        <div className="game-message">PRESS ANY KEY TO START!</div>
      )}
    </div>
  )
}

export default Game
