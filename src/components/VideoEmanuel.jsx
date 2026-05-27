import React, { useRef } from 'react'

export const VideoEmanuel = () => {

    const videoRef = useRef(null)

    const handlePlay = () => {
        videoRef.current.play()
    }
    
    return (
        <>
            <h1>Reproductor interactivo</h1>
            <video 
            ref={videoRef}
            width={700} 
            >
                <source 
                src="https://www.w3schools.com/Html/mov_bbb.mp4" 
                type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div>
                <button onClick={handlePlay}>Play</button>
                <button>Pause</button>
            </div>

        </>
    )
}
