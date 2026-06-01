import React, { useRef, useState, useEffect } from 'react'

// 🎬 Reemplaza esta URL con la ruta de tu video
const VIDEO_SRC = "https://www.w3schools.com/Html/mov_bbb.mp4"

const styles = {
    wrapper: {
        fontFamily: "'Helvetica Neue', sans-serif",
        maxWidth: 720,
        margin: '2rem auto',
        padding: '0 1rem',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        marginBottom: '1rem',
        color: '#111',
    },
    videoBox: {
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#000',
        aspectRatio: '16/9',
    },
    video: {
        width: '100%',
        height: '100%',
        display: 'block',
    },
    controls: {
        marginTop: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    progressRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    progressInput: {
        flex: 1,
        accentColor: '#111',
        cursor: 'pointer',
    },
    timeLabel: {
        fontSize: 13,
        color: '#666',
        whiteSpace: 'nowrap',
        minWidth: 90,
        textAlign: 'right',
    },
    btnRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    btn: {
        width: 36,
        height: 36,
        border: '1px solid #ddd',
        borderRadius: 8,
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        transition: 'background 0.15s',
    },
    volInput: {
        width: 90,
        accentColor: '#111',
        cursor: 'pointer',
    },
    volLabel: {
        fontSize: 13,
        color: '#666',
        minWidth: 36,
    },
    speedSelect: {
        border: '1px solid #ddd',
        borderRadius: 8,
        background: 'transparent',
        color: '#111',
        fontSize: 13,
        padding: '4px 6px',
        cursor: 'pointer',
        height: 36,
    },
    spacer: { flex: 1 },
    mensaje: {
        marginTop: 12,
        padding: '10px 16px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: 8,
        fontSize: 14,
        color: '#856404',
    },
}

function fmt(s) {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return m + ':' + (sec < 10 ? '0' : '') + sec
}

export const VideoManuela = () => {
    const videoRef = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(1)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [mostrarMensaje, setMostrarMensaje] = useState(false)
    const [detener, setDetener] = useState(false)

    const handlePlay = () => {
        videoRef.current.play()
    }

    const handlePause = () => {
        videoRef.current.pause()
    }

    const handleAvanzar = () => {
        videoRef.current.currentTime = 6
    }

    const handleContinuar = () => {
        setMostrarMensaje(false)
        videoRef.current.play()
    }

    const handleTogglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }

    const handleToggleMute = () => {
        videoRef.current.muted = !videoRef.current.muted
        setMuted(videoRef.current.muted)
    }

    const handleVolumeChange = (e) => {
        const val = parseFloat(e.target.value)
        videoRef.current.volume = val
        setVolume(val)
        if (val === 0) {
            videoRef.current.muted = true
            setMuted(true)
        } else {
            videoRef.current.muted = false
            setMuted(false)
        }
    }

    const handleSpeedChange = (e) => {
        const val = parseFloat(e.target.value)
        videoRef.current.playbackRate = val
        setSpeed(val)
    }

    const handleProgressChange = (e) => {
        const val = parseFloat(e.target.value)
        if (videoRef.current.duration) {
            videoRef.current.currentTime = (val / 100) * videoRef.current.duration
        }
    }

    const handleTimeUpdate = () => {
        const vid = videoRef.current
        if (!vid) return
        setCurrentTime(vid.currentTime)
        if (vid.duration) setProgress((vid.currentTime / vid.duration) * 100)

        // Lógica original: detener en seg 5
        if (vid.currentTime >= 5 && !detener) {
            vid.pause()
            setMostrarMensaje(true)
            setDetener(true)
        }
    }

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration)
    }

    const handleFullscreen = () => {
        const box = videoRef.current
        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            box.requestFullscreen && box.requestFullscreen()
        }
    }

    const volIcon = muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'

    return (
        <div style={styles.wrapper}>
            <h1 style={styles.title}>Reproductor interactivo</h1>

            <div style={styles.videoBox}>
                <video
                    ref={videoRef}
                    style={styles.video}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                >
                    {/* 🎬 Cambia VIDEO_SRC al inicio del archivo con la URL de tu video */}
                    <source src={VIDEO_SRC} type="video/mp4" />
                    Tu navegador no soporta el tag de video.
                </video>
            </div>

            <div style={styles.controls}>
                {/* Barra de progreso */}
                <div style={styles.progressRow}>
                    <input
                        type="range"
                        style={styles.progressInput}
                        min="0"
                        max="100"
                        step="0.1"
                        value={progress}
                        onChange={handleProgressChange}
                    />
                    <span style={styles.timeLabel}>
                        {fmt(currentTime)} / {fmt(duration)}
                    </span>
                </div>

                {/* Controles principales */}
                <div style={styles.btnRow}>
                    <button style={styles.btn} onClick={handleTogglePlay} title={playing ? 'Pausar' : 'Reproducir'}>
                        {playing ? '⏸' : '▶'}
                    </button>
                    <button style={styles.btn} onClick={handleToggleMute} title="Silenciar">
                        {volIcon}
                    </button>
                    <input
                        type="range"
                        style={styles.volInput}
                        min="0"
                        max="1"
                        step="0.01"
                        value={muted ? 0 : volume}
                        onChange={handleVolumeChange}
                    />
                    <span style={styles.volLabel}>{Math.round(muted ? 0 : volume * 100)}%</span>

                    <div style={styles.spacer} />

                    <button style={styles.btn} onClick={handleAvanzar} title="Ir al seg 6">⏩</button>

                    <select
                        style={styles.speedSelect}
                        value={speed}
                        onChange={handleSpeedChange}
                        title="Velocidad"
                    >
                        <option value={0.5}>0.5×</option>
                        <option value={0.75}>0.75×</option>
                        <option value={1}>1×</option>
                        <option value={1.25}>1.25×</option>
                        <option value={1.5}>1.5×</option>
                        <option value={2}>2×</option>
                    </select>

                    <button style={styles.btn} onClick={handleFullscreen} title="Pantalla completa">⛶</button>
                </div>

                {/* Botones originales */}
                <div style={styles.btnRow}>
                    <button style={styles.btn} onClick={handlePlay}>Play</button>
                    <button style={styles.btn} onClick={handlePause}>Pause</button>
                    <button style={styles.btn} onClick={handleContinuar}>Continuar</button>
                </div>
            </div>

            {mostrarMensaje && (
                <div style={styles.mensaje}>
                    ⏸ Video detenido en el seg 5
                </div>
            )}
        </div>
    )
}

export default VideoManuela