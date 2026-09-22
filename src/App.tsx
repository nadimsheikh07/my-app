import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const up = () => {
    setCount((count) => count + 1)
  }

  const down = () => {
    setCount((count) => count - 1)

  }

  return (
    <>
      <button onClick={() => up()}>Up</button>
      <button onClick={() => down()}>Down</button>
      <h1>{count}</h1>
    </>
  )
}

export default App
