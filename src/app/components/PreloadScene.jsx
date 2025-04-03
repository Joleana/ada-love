"use client"
import React, { useEffect, useState } from "react"
import { useGLTF } from "@react-three/drei"
import Scene from "./Scene"

export default function PreloadScene() {
  const [mesh, setMesh] = useState(null)
  const [gltfScene, setGltfScene] = useState(null)
  const gltf = useGLTF("/models/ada_love_stylize.glb", true)

  useEffect(() => {
    if (!gltf?.scene) return
    // Store the full scene
    setGltfScene(gltf.scene)
    // Traverse the scene to find the first mesh that has geometry
    let foundMesh = null
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.geometry && !foundMesh) {
        foundMesh = child
      }
    })
    setMesh(foundMesh)
  }, [gltf])

  // Until both the scene and a mesh with geometry are loaded, display a loading message.
  if (!mesh || !gltfScene) return <div>Loading Ada...</div>

  return <Scene adaMesh={mesh} gltfScene={gltfScene} />
}
