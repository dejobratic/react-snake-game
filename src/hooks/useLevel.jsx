import useImage from "use-image"

import { drawSnakeOnLevel, drawAppleOnLevel } from "utils/level.utils"

import levelGraphicsPath from "assets/snake-graphics.png"

const useLevel = (levelSize, levelTileSize) => {
  const [levelGraphics] = useImage(levelGraphicsPath)
  const levelGraphicsTileSize = 64

  const drawSnake = drawSnakeOnLevel.bind(
    this,
    levelSize,
    levelTileSize,
    levelGraphics,
    levelGraphicsTileSize
  )

  const drawApple = drawAppleOnLevel.bind(
    this,
    levelSize,
    levelTileSize,
    levelGraphics,
    levelGraphicsTileSize
  )

  return [drawSnake, drawApple]
}

export default useLevel
