import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StatusGame } from './components/StatusGame'
import { ManuelaRMPage } from './pages/ManuelaRMPage'
import { EmanuelRMPage } from './pages/EmanuelRMPage'
import { Animation } from './pages/Animation'
import { Tutorial } from './components/Tutorial'
import { VideoEmanuel } from './components/VideoEmanuel'
import { VideoManuela } from './components/VideoManuela'
import { Home } from './pages/Home'
import { LootieManuela } from './components/LootieManuela'
import { LootieEmanuel } from './components/LootieEmanuel'
import { OsoManuela } from './components/OsoManuela'
import { Guia } from './components/Guia'

export const AppMain = () => {
  return (
    <>
      {/* <Tutorial />

      <StatusGame />

      <ManuelaRMPage />
      <EmanuelRMPage />
       */}

      {/*
      <VideoManuela />
      <VideoEmanuel /> */}

      {/* 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LootieEmanuel />} />
          <Route path='/manuela' element={<OsoManuela />} />
        </Routes>
      </BrowserRouter> */}
    </>
  )
}
