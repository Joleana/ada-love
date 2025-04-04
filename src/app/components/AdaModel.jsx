"use client"
import React, { useEffect, useRef } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { FluidShimmerMaterial } from './FluidShimmerMaterial'
import * as THREE from 'three'

export default function AdaModel({ setAdaMeshRef, ...props }) {
  // Use a fallback if NEXT_PUBLIC_BASE_URL is undefined.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ""

  // Construct the absolute URL using the baseUrl.
  const modelUrl = baseUrl + "/models/ada_love_stylize.glb"
  const { scene } = useGLTF(modelUrl, true)
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
    scene.traverse(child => {
      if (child.isMesh) {
        console.log("Overriding material on mesh:", child.name)
        if (!foundMesh) {
          foundMesh = child
        }
        const customMat = new FluidShimmerMaterial()
        customMat.uniforms.map.value = albedoMap
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
