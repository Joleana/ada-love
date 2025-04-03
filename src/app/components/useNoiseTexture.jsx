// useNoiseTexture.js
import { useMemo } from "react"
import * as THREE from "three"

export default function useNoiseTexture(size = 256) {
  return useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")
    const imageData = context.createImageData(size, size)
    // Fill the image data with random noise
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.floor(Math.random() * 255)
      imageData.data[i] = v     // R
      imageData.data[i + 1] = v // G
      imageData.data[i + 2] = v // B
      imageData.data[i + 3] = 255 // Alpha fully opaque
    }
    context.putImageData(imageData, 0, 0)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [size])
}
