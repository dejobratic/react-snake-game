import React, { useState, createContext } from "react"

import Level from "components/Level"

import useInterval from "hooks/useInterval"

import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "utils/game-constants"

export const GameContext = createContext({})

const Game = () => {
  const DIRECTION_START = [0, -1]

  const [snake, setSnake] = useState(SNAKE_START)
  const [apple, setApple] = useState(APPLE_START)
  const [direction, setDirection] = useState(DIRECTION_START)
  const [speed, setSpeed] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const startGame = () => {
    setSnake(SNAKE_START)
    setApple(APPLE_START)
    setDirection(DIRECTION_START)
    setSpeed(SPEED)
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
    let newApple = apple.map((_, i) =>
      Math.floor((Math.random() * CANVAS_SIZE[i]) / SCALE)
    )

    while (hasCollidedWithSnakeBody(newApple, currentSnake)) {
      newApple = createApple()
    }

    return newApple
  }

  const hasCollidedWithWall = (block) => {
    return (
      block[0] * SCALE >= CANVAS_SIZE[0] ||
      block[0] < 0 ||
      block[1] * SCALE >= CANVAS_SIZE[1] ||
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
