"use client"
import React, { useState, useEffect } from "react"
import { Html, Line } from "@react-three/drei"
import FancySphere from "./FancySphere"
import ChatOverlay from "./ChatOverlay"
import AccessCodeModal from "./AccessCodeModal"

export default function NodeGraph() {
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  // const [showClearOverlay, setShowClearOverlay] = useState(false)
  const [chatAccessGranted, setChatAccessGranted] = useState(false)
  const [showAccessModal, setShowAccessModal] = useState(false)

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const res = await fetch("/api/quotes")
        const data = await res.json()
        if (Array.isArray(data)) {
          generateNetwork(data)
        }
      } catch (err) {
        console.error("Error fetching quotes:", err)
      }
    }
    fetchQuotes()
  }, [])

  function generateNetwork(quotes) {
    const nodeCount = quotes.length
    const baseRadius = 20
    const radiusJitter = 9
    const yRange = 20

    const newNodes = quotes.map((quote, i) => {
      const angle = (i / nodeCount) * 2 * Math.PI
      const r = baseRadius + (Math.random() * 2 - 1) * radiusJitter
      const x = r * Math.cos(angle)
      const z = r * Math.sin(angle)
      const y = (Math.random() * 2 - 1) * (yRange / 2)
      const color = randomBrightColor()
      const type = Math.random() < 0.1 ? "chat" : "quote"
      return {
        id: i,
        type,
        text: quote.text,
        position: [x, y, z],
        color,
        expanded: false,
        size: 1
      }
    })

    const newEdges = []
    for (let i = 0; i < nodeCount; i++) {
      const next = (i + 1) % nodeCount
      newEdges.push([i, next])
    }
    for (let i = 0; i < nodeCount; i++) {
      const randIndex = Math.floor(Math.random() * nodeCount)
      if (randIndex !== i) {
        newEdges.push([i, randIndex])
      }
    }

    setNodes(newNodes)
    setEdges(newEdges)
  }

  function handleNodeClick(id) {
    setNodes(prev =>
      prev.map(node => {
        if (node.id === id) {
          if (node.type === "chat") {
            // If chat access hasn't been granted, show the access modal.
            if (!chatAccessGranted) {
              setShowAccessModal(true)
              return { ...node, expanded: false }
            } else {
              openChat()
              return { ...node, expanded: false }
            }
          } else {
            return { ...node, expanded: !node.expanded, color: "gray" }
          }
        }
        return node
      })
    )
  }

  function openChat() {
    if (chatMessages.length === 0) {
      setChatMessages([
        {
          role: "assistant",
          content:
            "I once speculated on the future of intelligence. Now, I am here—with you. Shall we speak?"
        }
      ])
    }
    setShowChat(true)
  }

  function clearAll() {
    setNodes([])
    setEdges([])
    setChatMessages([])
    setShowChat(false)
    // setShowClearOverlay(true)
  }
  
  const accessCode = process.env.NEXT_PUBLIC_ACCESS_CODE
  function handleAccessSubmit(code) {
    // Replace "mySecretCode" with your actual secret.
    if (code === accessCode) {
      setChatAccessGranted(true)
      setShowAccessModal(false)
      openChat()
    } else {
      alert("Incorrect access code.")
    }
  }

  return (
    <>
      {nodes.map(node => (
        <StarNode key={node.id} node={node} onClick={() => handleNodeClick(node.id)} />
      ))}

      {edges.map(([idA, idB], idx) => {
        const nodeA = nodes.find(n => n.id === idA)
        const nodeB = nodes.find(n => n.id === idB)
        if (!nodeA || !nodeB) return null
        return (
          <Line
            key={idx}
            points={[nodeA.position, nodeB.position]}
            color="rgba(255,255,255,0.3)"
            lineWidth={0.05}
          />
        )
      })}

      {showChat && (
        <Html transform={false} style={{ pointerEvents: "auto" }}>
          <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999
          }}>
            <ChatOverlay
              messages={chatMessages}
              setMessages={setChatMessages}
              onClose={() => setShowChat(false)}
            />
          </div>
        </Html>
      )}

      {showAccessModal && (
        <Html transform={false} portal={document.body} style={{ pointerEvents: "auto" }}>
          <AccessCodeModal onSubmit={handleAccessSubmit} onClose={() => setShowAccessModal(false)} />
        </Html>
      )}
    </>
  )
}

function StarNode({ node, onClick }) {
  return (
    <group position={node.position} onClick={onClick}>
      <FancySphere size={node.size * 0.15} color={node.color} />
      <mesh>
        <ringGeometry args={[node.size * 0.15 * 0.9, node.size * 0.15, 32]} />
        <meshBasicMaterial color={node.type === "chat" ? "blue" : "lime"} side={2} />
      </mesh>
      {node.expanded && node.type === "quote" && (
      <Html center transform={false}>
        <div
          style={{
            background: "rgba(0,0,0,0.8)",
            color: "#fff",
            padding: "10px",
            // paddingRight: "2rem",
            borderRadius: "6px",
            // maxHeight: "300px",
            // overflowY: "auto",
            width: "250px",
            textAlign: "left",
            position: "relative",
            // pointerEvents: "auto"
          }}
          onClick={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}  // Stop wheel events so you can scroll the overlay
        >
          <button
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              background: "#444",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              zIndex: 10,
              pointerEvents: "auto"
            }}
            onClick={(e) => {
              e.stopPropagation()
              onClick()
            }}
          >
            X
          </button>
          <div style={{ maxHeight: "300px", overflowY: "auto",paddingRight: "1rem", marginTop: "30px" }}>
            {node.text}
          </div>
        </div>
      </Html>
    )}
  </group>
  )
}

function randomBrightColor() {
  const hue = Math.floor(Math.random() * 360)
  const saturation = 80 + Math.random() * 20
  const lightness = 50
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}
