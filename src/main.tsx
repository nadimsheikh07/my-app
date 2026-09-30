import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MyRoutes from './routes.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './theme/ThemeContext.tsx';
import { AboutProvider } from './context/AboutContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <AboutProvider>
        <MyRoutes />
      </AboutProvider>
    </ThemeProvider>
  </StrictMode>
)
