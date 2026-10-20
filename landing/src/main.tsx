import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {HelixApp} from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelixApp />
  </StrictMode>,
)
