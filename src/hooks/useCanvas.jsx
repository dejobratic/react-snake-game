import { useRef, useEffect } from "react"

const useCanvas = (canvasSize, canvasTileSize, callback) => {
  const canvasRef = useRef()

  useEffect(() => {
    const context = canvasRef.current.getContext("2d")
    context.setTransform(canvasTileSize, 0, 0, canvasTileSize, 0, 0)
    context.clearRect(0, 0, canvasSize[0], canvasSize[1])
    callback(context)
  }, [canvasSize, canvasTileSize, callback])

  return canvasRef
}

export default useCanvas
