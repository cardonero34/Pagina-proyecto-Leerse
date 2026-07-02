import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioRecorder() {
    const [recording, setRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const [audioBlob, setAudioBlob] = useState(null);
    const [fileName, setFileName] = useState("Grabación 1");
    const [playing, setPlaying] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const canvasRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        drawIdleWave();
    }, []);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const mediaRecorder = new MediaRecorder(stream);

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, {
                    type: mediaRecorder.mimeType,
                });

                const url = URL.createObjectURL(blob);

                setAudioBlob(blob);
                setAudioURL(url);
            };

            mediaRecorder.start();
            setRecording(true);

            animateRecordingWave();
        } catch (error) {
            console.error(error);
            alert("No se pudo acceder al micrófono");
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setRecording(false);
        drawIdleWave();
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setPlaying(!playing);
    };

    const deleteRecording = () => {
        setAudioURL(null);
        setAudioBlob(null);
        setPlaying(false);
        drawIdleWave();
    };

    const downloadAudio = () => {
        if (!audioBlob) return;

        const link = document.createElement("a");
        link.href = URL.createObjectURL(audioBlob);
        link.download = `${fileName}.webm`;
        link.click();
    };

    const drawIdleWave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 45; i++) {
            const height = 10 + Math.random() * 15;

            ctx.fillStyle = "#d9d9d9";

            ctx.fillRect(
                i * 8,
                canvas.height / 2 - height / 2,
                4,
                height
            );
        }
    };

    const animateRecordingWave = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");

        const draw = () => {
            if (!recording && mediaRecorderRef.current?.state !== "recording")
                return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 45; i++) {
                const height = 10 + Math.random() * 40;

                ctx.fillStyle = "#0d6efd";

                ctx.fillRect(
                    i * 8,
                    canvas.height / 2 - height / 2,
                    4,
                    height
                );
            }

            requestAnimationFrame(draw);
        };

        draw();
    };

    return (
        <div className="container py-4">

            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </div>

            <motion.div
                layout
                className="bg-white shadow-sm rounded-4 p-3 d-flex align-items-center gap-3"
            >
                {!recording ? (
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05 }}
                        className="btn btn-primary rounded-circle"
                        style={{
                            width: 55,
                            height: 55,
                        }}
                        onClick={startRecording}
                    >
                        🎤
                    </motion.button>
                ) : (
                    <motion.button
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                        }}
                        className="btn btn-danger rounded-circle"
                        style={{
                            width: 55,
                            height: 55,
                        }}
                        onClick={stopRecording}
                    >
                        ⏹
                    </motion.button>
                )}

                <canvas
                    ref={canvasRef}
                    width={380}
                    height={70}
                    style={{
                        maxWidth: "100%",
                    }}
                />
            </motion.div>

            <AnimatePresence>
                {audioURL && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="bg-white shadow-sm rounded-4 p-3 mt-3"
                    >
                        <div className="d-flex align-items-center gap-3">

                            <button
                                className="btn btn-primary rounded-circle"
                                onClick={toggleAudio}
                            >
                                {playing ? "⏸" : "▶"}
                            </button>

                            <div className="flex-grow-1">
                                <canvas
                                    width={300}
                                    height={50}
                                    style={{
                                        width: "100%",
                                        height: "50px",
                                    }}
                                />
                            </div>

                            <button
                                className="btn btn-light"
                                onClick={deleteRecording}
                            >
                                🗑
                            </button>

                            <button
                                className="btn btn-primary"
                                onClick={downloadAudio}
                            >
                                📤
                            </button>
                        </div>

                        <audio
                            ref={audioRef}
                            src={audioURL}
                            onEnded={() => setPlaying(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}