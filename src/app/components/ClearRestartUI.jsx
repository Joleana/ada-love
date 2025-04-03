"use client"
import React, { useState } from "react"

export default function ClearRestartUI() {
  const [showClearOverlay, setShowClearOverlay] = useState(false)

  function handleClear() {
    // If you want to do something in NodeGraph, you can pass a callback down
    // or simply reload the page if your NodeGraph data is ephemeral.
    setShowClearOverlay(true)
  }

  function handleRestart() {
    setShowClearOverlay(false)
    // Reload or do something else
    window.location.reload()
  }

  return (
    <>
      {/* The Clear button pinned in the top-right corner of the normal DOM */}
      <div style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999
      }}>
        <button
          onClick={handleClear}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            cursor: "pointer",
            color: "#fff",
            background: "#000",
            border: "none",
            borderRadius: "0.25rem"
          }}
        >
          Clear
        </button>
      </div>

      {/* If Clear is triggered, show the overlay */}
      {showClearOverlay && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            color: "#fff",
            padding: "20px",
            textAlign: "center",
            fontSize: "24px",
            maxWidth: "600px",
            border: "2px solid #fff",
            borderRadius: "8px"
          }}>
            <p>
              What will be my ultimate line, time only can show. I have my own impression about it; 
              but until much has been worked out of me in various ways, I do not think anyone can foresee… - April 1842
            </p>
            <button
              onClick={handleRestart}
              style={{ marginTop: "20px", padding: "8px 16px", fontSize: "18px", cursor: "pointer" }}
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  )
}
