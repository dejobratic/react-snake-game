import React, { useState, useRef, useEffect } from "react"

import { useInterval } from "useInterval"

import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "game-constants"

import "App.css"

const App = () => {
  const DIRECTION_START = [0, -1]

  const canvasRef = useRef(null)

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
    setSpeed(0)
    setGameOver(true)
  }

  const moveSnake = ({ keyCode }) => {
    keyCode >= 37 && keyCode <= 40 && setDirection(DIRECTIONS[keyCode])
  }

  const createApple = () =>
    apple.map((_, i) => Math.floor((Math.random() * CANVAS_SIZE[i]) / SCALE))

  const checkCollision = (piece, currentSnake = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true

    for (const segment of currentSnake)
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true

    return false
  }

  const checkAppleCollision = (currentSnake) => {
    if (currentSnake[0][0] === apple[0] && currentSnake[0][1] === apple[1]) {
      let newApple = createApple()
      while (checkCollision(newApple, currentSnake)) {
        newApple = createApple()
      }
      setApple(newApple)
      return true
    }
    return false
  }

  const gameLoop = () => {
    const snakeClone = JSON.parse(JSON.stringify(snake))
    const newSnakeHead = [
      snakeClone[0][0] + direction[0],
      snakeClone[0][1] + direction[1],
    ]
    snakeClone.unshift(newSnakeHead)
    if (checkCollision(newSnakeHead)) endGame()
    if (!checkAppleCollision(snakeClone)) snakeClone.pop()
    setSnake(snakeClone)
  }

  useEffect(() => {
    const context = canvasRef.current.getContext("2d")
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
    context.fillStyle = "lightgreen"
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1))
    context.fillStyle = "pink"
    context.fillRect(apple[0], apple[1], 1, 1)
  }, [snake, apple, gameOver])

  useInterval(() => gameLoop(), speed)

  return (
    <div role="button" tabIndex="0" onKeyDown={moveSnake}>
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div>GAME OVER!</div>}
      <button onClick={startGame}>Start Game</button>
    </div>
  )
}

export default App
