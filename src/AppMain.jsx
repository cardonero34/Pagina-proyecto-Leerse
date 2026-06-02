import React from 'react'
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

export const AppMain = () => {
  return (
    <>
    {/*<VideoEmanuel />
     <StatusGame />
    <ManuelaRMPage />
    <EmanuelRMPage /> 
    */} 
 {/*      <Home/>
    <Animation />
    <Tutorial /> 
    <VideoManuela/>  */}

    <LootieManuela/>
    <LootieEmanuel/>
    </>
  )
}
