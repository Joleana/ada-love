// app/page.js
// Main entry point for app; defines the homepage layout and imports core components + global style
export const dynamic = 'force-dynamic';

import React from 'react'
import PreloadScene from './components/PreloadScene'
import ClearRestartUI from "./components/ClearRestartUI"
import './globals.css'

// Import client component (PreloadScene) vs server component
export default function HomePage() {
  return (
    <main>
      <PreloadScene />
      <ClearRestartUI />
    </main>
  )
}
