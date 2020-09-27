import { useRef, useCallback, useEffect } from "react"

import { CANVAS_SIZE, SCALE } from "utils/game-constants"

const useCanvas = (callback) => {
  const canvasRef = useRef()

  useEffect(() => {
    const context = canvasRef.current.getContext("2d")
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1])
    callback(context)
  }, [callback])

  return canvasRef
}

export default useCanvas
