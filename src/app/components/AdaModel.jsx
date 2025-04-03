"use client"
import React, { useEffect, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { FluidShimmerMaterial } from './FluidShimmerMaterial'
import * as THREE from 'three'

export default function AdaModel({ setAdaMeshRef, ...props }) {
  // Construct an absolute URL for the GLB file using the NEXT_PUBLIC_BASE_URL
  const modelUrl = process.env.NEXT_PUBLIC_BASE_URL + "/models/ada_love_stylize.glb"
  // Use the constructed URL when loading the model
  const { scene } = useGLTF(modelUrl, true)
  // Load the albedo texture from the public folder
  const albedoMap = useTexture('/models/ada_love_0222140510_stylize_albedo.jpg')
  const groupRef = useRef()
  const materialsRef = useRef([])

  useEffect(() => {
    console.log("AdaModel useEffect triggered. Scene:", scene)
    if (!scene) {
      console.error("Scene is undefined - check the GLTF file path and network requests.")
      return
    }
    let foundMesh = null
    // Traverse the scene and override each mesh's material
    scene.traverse(child => {
      if (child.isMesh) {
        console.log("Overriding material on mesh:", child.name)
        if (!foundMesh) {
          foundMesh = child
        }
        // Create a new instance of your custom FluidShimmerMaterial
        const customMat = new FluidShimmerMaterial()
        // Assign the albedo texture to the uniform (assuming your shader expects it in 'map')
        customMat.uniforms.map.value = albedoMap
        // Optionally, you could adjust additional uniforms here if needed
        child.material = customMat
        materialsRef.current.push(customMat)
      }
    })
    if (foundMesh && setAdaMeshRef) {
      console.log("AdaModel found mesh:", foundMesh)
      setAdaMeshRef(foundMesh)
    } else {
      console.error("No mesh found in the GLTF scene.")
    }
  }, [scene, setAdaMeshRef, albedoMap])

  // Update the time uniform in your custom materials every frame
  useFrame((state, delta) => {
    materialsRef.current.forEach(mat => {
      if (mat.uniforms && mat.uniforms.time) {
        mat.uniforms.time.value += delta
      }
    })
  })

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  )
}
