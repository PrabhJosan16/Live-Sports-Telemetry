import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LiveSpeed from "./components/LiveSpeed"

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Live Sports Telemetry</h1>
      <LiveSpeed />
    </div>
  )
}

export default App;