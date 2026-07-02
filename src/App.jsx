
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Animation } from './pages/Animation'
import PaintStudio from './components/PaintStudio'
import { Tutorial } from './components/Tutorial'


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/animacion' element={<Animation />} />
        <Route path='/paint' element={<PaintStudio />} />
        <Route path='/tutorial' element={<Tutorial />} />
      </Routes>
    </BrowserRouter>
  )
}
