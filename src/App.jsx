
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Animation } from './pages/Animation'
import PaintStudio from './components/PaintStudio'
import { Tutorial } from './components/Tutorial'
import { ModelViewerPage } from './pages/ModelViewerPage'


export const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/animacion' element={<Animation />} />
        <Route path='/paint' element={<PaintStudio />} />
        <Route path='/tutorial' element={<Tutorial />} />
        <Route path='/modelo-3d' element={<ModelViewerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
