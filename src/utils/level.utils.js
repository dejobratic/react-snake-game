// more details on https://rembound.com/articles/creating-a-snake-game-tutorial-with-html5

export const drawSnakeOnLevel = (
  levelSize,
  levelTileSize,
  levelGraphics,
  levelGraphicsTileSize,
  drawingContext,
  snake
) => {
  // Loop over every snake segment
  for (var i = 0; i < snake.length; i++) {
    var segment = snake[i]
    var segx = segment[0]
    var segy = segment[1]
    var tilex = segx * levelTileSize
    var tiley = segy * levelTileSize

    // Sprite column and row that gets calculated
    var tx = 0
    var ty = 0

    if (i === 0) {
      // Head; Determine the correct image
      var nseg = snake[i + 1] // Next segment
      if (segy < nseg[1]) {
        // Up
        tx = 3
        ty = 0
      } else if (segx > nseg[0]) {
        // Right
        tx = 4
        ty = 0
      } else if (segy > nseg[1]) {
        // Down
        tx = 4
        ty = 1
      } else if (segx < nseg[0]) {
        // Left
        tx = 3
        ty = 1
      }
    } else if (i === snake.length - 1) {
      // Tail; Determine the correct image
      var pseg = snake[i - 1] // Prev segment
      if (pseg[1] < segy) {
        // Up
        tx = 3
        ty = 2
      } else if (pseg[0] > segx) {
        // Right
        tx = 4
        ty = 2
      } else if (pseg[1] > segy) {
        // Down
        tx = 4
        ty = 3
      } else if (pseg[0] < segx) {
        // Left
        tx = 3
        ty = 3
      }
    } else {
      // Body; Determine the correct image
      var pseg = snake[i - 1] // Previous segment
      var nseg = snake[i + 1] // Next segment
      if (
        (pseg[0] < segx && nseg[0] > segx) ||
        (nseg[0] < segx && pseg[0] > segx)
      ) {
        // Horizontal Left-Right
        tx = 1
        ty = 0
      } else if (
        (pseg[0] < segx && nseg[1] > segy) ||
        (nseg[0] < segx && pseg[1] > segy)
      ) {
        // Angle Left-Down
        tx = 2
        ty = 0
      } else if (
        (pseg[1] < segy && nseg[1] > segy) ||
        (nseg[1] < segy && pseg[1] > segy)
      ) {
        // Vertical Up-Down
        tx = 2
        ty = 1
      } else if (
        (pseg[1] < segy && nseg[0] < segx) ||
        (nseg[1] < segy && pseg[0] < segx)
      ) {
        // Angle Top-Left
        tx = 2
        ty = 2
      } else if (
        (pseg[0] > segx && nseg[1] < segy) ||
        (nseg[0] > segx && pseg[1] < segy)
      ) {
        // Angle Right-Up
        tx = 0
        ty = 1
      } else if (
        (pseg[1] > segy && nseg[0] > segx) ||
        (nseg[1] > segy && pseg[0] > segx)
      ) {
        // Angle Down-Right
        tx = 0
        ty = 0
      }
    }

    if (levelGraphics) {
      // Draw the image of the snake part
      drawingContext.drawImage(
        levelGraphics,
        tx * levelGraphicsTileSize,
        ty * levelGraphicsTileSize,
        levelGraphicsTileSize,
        levelGraphicsTileSize,
        tilex / levelTileSize,
        tiley / levelTileSize,
        1,
        1
      )
    }
  }
}

export const drawAppleOnLevel = (
  levelSize,
  levelTileSize,
  levelGraphics,
  levelGraphicsTileSize,
  drawingContext,
  apple
) => {
  if (levelGraphics) {
    drawingContext.drawImage(
      levelGraphics,
      0,
      3 * levelGraphicsTileSize,
      levelGraphicsTileSize,
      levelGraphicsTileSize,
      apple[0],
      apple[1],
      1,
      1
    )
  }
}
