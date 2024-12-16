import { useState } from 'react'
import './App.css'
import SmartWatchStore from './SmartWatchStore'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <SmartWatchStore/>
    </>
  )
}

export default App
