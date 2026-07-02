import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageUploader() {
    const fileInputRef = useRef(null);

    const [imageSrc, setImageSrc] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (!file) return;

        setImageFile(file);
        setImageSrc(URL.createObjectURL(file));
    };

    const downloadImage = () => {
        if (!imageFile) return;

        const link = document.createElement("a");

        link.href = imageSrc;
        link.download = imageFile.name;

        link.click();
    };

    const clearImage = () => {
        setImageSrc(null);
        setImageFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="container py-3">

            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary mb-3"
                onClick={() => fileInputRef.current.click()}
            >
                🖼️ Seleccionar imagen
            </motion.button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileUpload}
            />

            <AnimatePresence>
                {imageSrc && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className="border rounded-4 shadow-sm overflow-hidden d-flex justify-content-center align-items-center"
                            style={{
                                minHeight: "300px",
                                background: "#f8f9fa",
                            }}
                        >
                            <img
                                src={imageSrc}
                                alt="Vista previa"
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "500px",
                                    objectFit: "contain",
                                }}
                            />
                        </div>

                        <div className="d-flex gap-2 mt-3">

                            <button
                                className="btn btn-success"
                                onClick={downloadImage}
                            >
                                Descargar
                            </button>

                            <button
                                className="btn btn-outline-danger"
                                onClick={clearImage}
                            >
                                Eliminar
                            </button>

                        </div>

                        <div className="mt-2 text-muted">
                            {imageFile?.name}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}