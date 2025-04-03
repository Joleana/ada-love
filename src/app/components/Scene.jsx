"use client"
import React, { useState, uspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import AdaModel from "./AdaModel"
import NodeGraph from "./NodeGraph"


export default function Scene() {
  const [adaMesh, setAdaMesh] = useState(null)

  return (
    <Canvas style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 10, 10]} intensity={0.9} />
      <React.Suspense fallback={null}>
        {/* Render Ada's model; this loads the GLTF and sets adaMesh */}
        <AdaModel setAdaMeshRef={setAdaMesh} scale={[2.5, 2.5, 2.5]} position={[0, -1, 0]} />
        {/* Render NodeGraph; it uses the adaMesh reference */}
        <NodeGraph adaMesh={adaMesh} />
      </React.Suspense>
      <OrbitControls />
    </Canvas>
  )
}




