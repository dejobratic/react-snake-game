import { useRef, useEffect, useContext } from "react"

import { SettingsContext } from "contexts/SettingsContext"

const useCanvas = (callback) => {
  const canvasRef = useRef()
  const { LEVEL_SIZE, LEVEL_SCALE } = useContext(SettingsContext)

  useEffect(() => {
    const context = canvasRef.current.getContext("2d")
    context.setTransform(LEVEL_SCALE, 0, 0, LEVEL_SCALE, 0, 0)
    context.clearRect(0, 0, LEVEL_SIZE[0], LEVEL_SIZE[1])
    callback(context)
  }, [callback, LEVEL_SIZE, LEVEL_SCALE])

  return canvasRef
}

export default useCanvas
