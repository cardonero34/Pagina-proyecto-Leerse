import { useRef, useEffect } from "react"
import "../stylesheets/Animation.css"

export const VideoLasMalas = ({
    videoRef,
    src,
    handleTimeUpdate,
    handleLoadedMetadata,
    setPlaying
}) => {

    useEffect(() => {

        if (!videoRef.current) return;

        videoRef.current.load();

    }, [src]);

    return (

        <div className="archivo position-absolute top-50 start-50 translate-middle">

            <video
                ref={videoRef}
                className="mp4"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
            >
                {/* 🎬 Cambia VIDEO_SRC al inicio del archivo con la URL de tu video */}
                <source src={src} type="video/mp4" />
            </video>
        </div>
    )
}
