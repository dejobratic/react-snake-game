import React, { useState, useContext } from "react"

import Level from "components/Level"

import { GameContext } from "contexts/GameContext"
import { SettingsContext } from "contexts/SettingsContext"

import useInterval from "hooks/useInterval"

const SNAKE_START = [
  [8, 10],
  [8, 11],
]
const APPLE_START = [8, 3]
const DIRECTION_START = [0, -1]
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0], // right
}
const GAME_SPEED = 100

const Game = () => {
  const { LEVEL_SIZE, LEVEL_SCALE } = useContext(SettingsContext)

  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [direction, setDirection] = useState(DIRECTION_START)
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDirection(DIRECTION_START)
    setSpeed(GAME_SPEED)
    setGameOver(false)
  }

  const endGame = () => {
    setSpeed(null)
    setGameOver(true)
  }

  const changeSnakeDirection = ({ keyCode }) => {
    keyCode >= 37 && keyCode <= 40 && setDirection(DIRECTIONS[keyCode])
  }

  const createApple = (currentSnake) => {
    const placeAppleOnRandomBlock = () => {
      return apple.map((_, i) =>
        Math.floor((Math.random() * LEVEL_SIZE[i]) / LEVEL_SCALE)
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
      block[0] * LEVEL_SCALE >= LEVEL_SIZE[0] ||
      block[0] < 0 ||
      block[1] * LEVEL_SCALE >= LEVEL_SIZE[1] ||
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
    <GameContext.Provider value={{ snake, apple }}>
      <div role="button" tabIndex="0" onKeyDown={changeSnakeDirection}>
        <Level />
        {gameOver && <div>GAME OVER!</div>}
        <button onClick={startGame}>Start Game</button>
      </div>
    </GameContext.Provider>
  )
}

export default Game
