import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../stylesheets/FotoArchive.css";

export default function ImageUploader({ onGuardarCreacion }) {
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

    const guardarCreacion = () => {
        if (!imageFile || !imageSrc) return;

        const creacion = {
            tipo: "creacion",
            formato: "foto",
            origen: "crearse",
            url: imageSrc,
            nombre: imageFile.name,
        };

        console.log("CREACIÓN FOTO:", creacion);

        onGuardarCreacion?.(creacion);
    };

    const clearImage = () => {
        setImageSrc(null);
        setImageFile(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="image-uploader pt-2">

            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="btnS image-uploader__select py-3 px-5 rounded-3 border-0"
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
                            className="image-uploader__preview border rounded-4 shadow-sm overflow-hidden d-flex justify-content-center align-items-center mt-4"
                            style={{
                                background: "#f8f9fa",
                            }}
                        >
                            <img
                                src={imageSrc}
                                alt="Vista previa"
                                className="image-uploader__image"
                            />
                        </div>

                        <div className="image-uploader__actions d-flex gap-2 mt-3">

                            <button
                                className="btn btn-primary"
                                onClick={guardarCreacion}
                            >
                                Guardar
                            </button>

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