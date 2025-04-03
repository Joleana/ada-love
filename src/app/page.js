// app/page.js
import React from 'react'
import PreloadScene from './components/PreloadScene'
import ClearRestartUI from "./components/ClearRestartUI"
import './globals.css'

// This can be a Server Component, 
// but you’re importing a client component (PreloadScene), so we do a small tweak:
export default function HomePage() {
  return (
    <main>
      <PreloadScene />
      <ClearRestartUI />
    </main>
  )
}
