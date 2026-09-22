import { Outlet } from 'react-router-dom'
import WebLayout from './layout'

function App() {
  return (
    <WebLayout>
      <Outlet />
    </WebLayout>
  )
}

export default App
