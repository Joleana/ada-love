"use client"
import React, { useState, useEffect, useRef } from "react"

export default function ChatOverlay({ messages, setMessages, onClose }) {
  const [input, setInput] = useState("")
  const containerRef = useRef(null)
  const [autoScroll, setAutoScroll] = useState(true)

  async function handleSend() {
    if (!input.trim()) return

    const userMsg = { role: "user", content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: input,
          conversation: newMessages,
        })
      })
      const data = await res.json()
      console.log("Chat response:", data)
      setMessages([...newMessages, { role: "assistant", content: data.reply }])
    } catch (err) {
      console.error("Chat API error:", err)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return
    if (autoScroll) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, autoScroll])

  function handleScroll() {
    const el = containerRef.current
    if (!el) return
    const threshold = 50
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
    setAutoScroll(distanceFromBottom < threshold)
  }

  return (
    <div
      style={{
        pointerEvents: "auto",
        position: "fixed",
        top: "320px",
        right: "-400px",
        width: "700px",
        background: "rgba(0,0,0,0.7)",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        zIndex: 9999,
        color: "rgb(124, 252, 0)",
        // resize: "both",       // Allow user to resize both width and height
        // overflow: "auto"      // If content exceeds current size, add scrollbar
      }}
      onWheel={(e) => e.stopPropagation()}
    >
      <button onClick={onClose} style={{ float: "right", background:"rgba(0,0,0,0.7)", color: "rgb(124, 252, 0)", }}>X</button>
      <h3>Chat with Ada</h3>
      
      {/* Fixed-height scrollable container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: "100px",       // fixed height so container doesn't grow
          overflowY: "auto",
          marginBottom: "8px"
        }}
      >
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: "8px" }}>
            <strong>{m.role === "assistant" ? "Ada: " : "You: "}</strong>
            {m.content}
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          style={{ flex: 1, padding: "6px", fontSize: "14px", color: "rgb(124, 252, 0)", background: "rgba(0,0,0,0.7)" }}
          placeholder="..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          style={{ marginLeft: "6px", padding: "6px 12px", fontSize: "14px", cursor: "pointer", background:"rgba(0,0,0,0.7)", color: "rgb(124, 252, 0)" }}
        >
          +
        </button>
      </div>
    </div>
  )
}
