"use client"
import React from "react"
import * as THREE from "three"
import { useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import useNoiseTexture from "./useNoiseTexture" // adjust path as needed

export default function FancySphere({ size = 0.15, color = "#000" }) {
  // Use your procedural noise texture as a roughness map.
  const noiseTexture = useNoiseTexture(256)
  
  return (
    <mesh>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        roughness={1}
        roughnessMap={noiseTexture}
      />
    </mesh>
  )
}
