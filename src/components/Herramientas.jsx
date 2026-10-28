import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "../stylesheets/Herramientas.css"
import PaintStudio from "./PaintStudio";
import TextEditorStudio from "./TextEditorStudio";
import AudioRecorder from "./AudioRecorder";
import FotoArchive from "./FotoArchive";

const actions = [
  {
    id: "Postip",
    label: "Postip",
    icon: (
      <img src="/iconos/clip.png" className="icono p-2" />
    ),
  },
  {
    id: "crear",
    label: "Crear",
    icon: (
      <img src="/iconos/crear.png" className="icono p-1" />
    ),
  },
];

/* Sub menu CREAR =================================<<<<<<< */
const createActions = [
  {
    id: "foto",
    label: "Foto",
    icon: (
      <img src="/iconos/icono-foto.png" className="icono p-1" />
    ),
  },
  {
    id: "audio",
    label: "Audio",
    icon: (
      <img src="/iconos/icono-audio.png" className="icono p-1" />
    ),
  },
  {
    id: "dibujo",
    label: "Dibujo",
    icon: (
      <img src="/iconos/icono-dibujo.png" className="icono p-1" />
    ),
  },
  {
    id: "texto",
    label: "texto",
    icon: (
      <img src="/iconos/icono-text.png" className="icono p-1" />
    ),
  },
];

const containerVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

/* escala mariposa< */
const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: {
    y: 20,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

/* motion tarjetas con nombre de función */
const labelVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24, delay: 0.05 },
  },
  closed: {
    x: 60,
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export default function Herramientas({
  postipAbierto,
  reflexivoxSeleccionado,
  crearseSeleccionado,
  crearseDesdeNotivox,
  onEnviarPostip,
  onAbrirCrearse,
  onCerrarPostip,
  onGuardarCreacion,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [textoPostip, setTextoPostip] = useState("");

  useEffect(() => {
    if (!crearseSeleccionado) return;

    setActiveAction(crearseSeleccionado.formato);
    setIsOpen(false);
  }, [crearseSeleccionado]);

  useEffect(() => {
    if (postipAbierto) {
      setActiveAction("Postip");
    }
  }, [postipAbierto]);

  const handleAction = (id) => {
    setActiveAction(id);
    setIsOpen(false);

    if (id !== "Postip") {
      onCerrarPostip?.();
    }
  };

  console.log("CREARSE DESDE NOTIVOX:", crearseDesdeNotivox);
  console.log("NOTIVOX SELECCIONADO:", crearseSeleccionado);

  return (
    <div className="principal position-absolute bottom-0 start-0">

      {/* Background tap to close */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fondo"
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* FAB container */}
      <div className="fabContainer position-absolute bottom-0 start-0">

        {/* Main FAB button */}
        <motion.button
          onClick={() => {
            if (activeAction !== null) {
              setActiveAction(null);
              setIsOpen(false);
              return;
            }
            setIsOpen((prev) => !prev);
          }}
          className={`menu-button ${isOpen ? 'open' : 'closed'}`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >

          <motion.div
            animate={{ rotate: isOpen ? 45 : 0, scale: isOpen ? 0.8 : 1 }}
            whileTap={{ scale: 0.75 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}

          >
            <img src="/iconos/icono-herramientas.png" style={{ width: '60px' }} />
          </motion.div>
        </motion.button>

        {/* Action items */}
        <motion.div
          className="herContainer"
          variants={containerVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >

          {(activeAction === null) && actions.map((action) => (
            <motion.div
              className="option"
              key={action.id}
              variants={itemVariants}
              onClick={() => handleAction(action.id)}
            >
              {/* Label nombre */}
              <motion.span
                className="cardOption"
                variants={labelVariants}
              >
                {action.label}
              </motion.span>

              {/* Icon button */}
              <motion.div
                className={`icono ${activeAction === action.id ? 'active' : 'inactive'}`}
              >
                {action.icon}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

      </div>


      {/* Toast feedback */}
      <AnimatePresence>
        {activeAction && (
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="InterfazSeleccion position-fixed top-50 start-50 translate-middle"
          >
            {/* op1 */}
            {(activeAction === "Postip" || postipAbierto) && (
              <div className="containerOption position-absolute top-100 start-50 translate-middle w-50 rounded-4 p-3">

                <h3 className="rounded-pill px-3 py-1 w-25 d-flex justify-content-center">
                  Postip
                </h3>

                {reflexivoxSeleccionado && (
                  <div className="mb-3">
                    <p className="mb-1">
                      Reflexivox:
                    </p>

                    <p className="fw-bold">
                      {reflexivoxSeleccionado.texto}
                    </p>
                  </div>
                )}

                <textarea
                  placeholder={
                    reflexivoxSeleccionado
                      ? "Escribe tu respuesta aquí..."
                      : "Escribe tu postip o respuesta aquí..."
                  }
                  className="form-control"
                  value={textoPostip}
                  onChange={(e) => setTextoPostip(e.target.value)}
                />

                <button
                  className="btnE mt-3 rounded-3"
                  onClick={() => {
                    if (!textoPostip.trim()) return;

                    onEnviarPostip(textoPostip);

                    setTextoPostip("");
                    setActiveAction(null);
                  }}
                >
                  Enviar
                </button>

                <button
                  className="btnX position-absolute top-0 start-100 translate-middle rounded-3"
                  onClick={() => {
                    setActiveAction(null);
                    setTextoPostip("");
                    onCerrarPostip?.();
                  }}
                >
                  X
                </button>

              </div>
            )}

            {/* sub menu interfaces ====================<<<<<< */}

            {activeAction === "foto" && (
              <div className="containerOption position-absolute top-100 start-50 translate-middle w-50 rounded-4 p-3">

                <h3 className="titulo-foto-pill rounded-pill px-3 py-1 d-flex justify-content-center">
                  Subir Foto
                </h3>

                <FotoArchive
                  onGuardarCreacion={(creacion) => {
                    console.log(
                      "CREACIÓN DE FOTO RECIBIDA EN HERRAMIENTAS:",
                      creacion
                    );

                    onGuardarCreacion?.(creacion);

                    setActiveAction(null);
                  }}
                />

                <button
                  className="btnX position-absolute top-0 start-100 translate-middle rounded-3"
                  onClick={() => setActiveAction(null)}
                >
                  X
                </button>

              </div>
            )}

            {activeAction === "audio" && (
              <div className="containerOption position-absolute top-100 start-50 translate-middle w-50 rounded-4 p-3">

                <h3 className="rounded-pill px-3 py-1 w-50 d-flex justify-content-center">
                  Grabar Audio
                </h3>

                <AudioRecorder
                  onGuardar={(creacion) => {
                    console.log("CREACIÓN DE AUDIO RECIBIDA EN HERRAMIENTAS:", creacion);

                    onGuardarCreacion?.(creacion);

                    setActiveAction(null);
                  }}
                />

                <button
                  className="btnX position-absolute top-0 start-100 translate-middle rounded-3"
                  onClick={() => setActiveAction(null)}
                >
                  X
                </button>

              </div>
            )}

            {activeAction === "dibujo" && (
              <div className="containerOption paintStudio-popup rounded-4 p-2 p-md-3">
                <h3 className="rounded-pill px-3 py-1 w-25 d-flex justify-content-center">Dibujo</h3>

                <PaintStudio onGuardar={onGuardarCreacion} />

                <button className="btnX position-absolute top-0 start-100 translate-middle rounded-3" onClick={() => setActiveAction(null)}>X</button>
              </div>
            )}

            {activeAction === "texto" && (
              <div className="containerOption textStudio-popup rounded-4 p-2 p-md-3">
                <h3 className="rounded-pill px-3 py-1 w-25 d-flex justify-content-center">
                  Texto
                </h3>

                <TextEditorStudio
                  onGuardar={(creacion) => {
                    console.log("CREACIÓN DE TEXTO RECIBIDA:", creacion);

                    onGuardarCreacion?.(creacion);
                  }}
                />

                <button
                  className="btnX position-absolute top-0 start-100 translate-middle rounded-3"
                  onClick={() => setActiveAction(null)}
                >
                  X
                </button>
              </div>
            )}

          </motion.div>
        )}

        {/* op3 */}
        <AnimatePresence>
          {activeAction === "crear" && (

            <motion.div
              key="crear-menu"
              className="herContainer crearHC"
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {createActions.map((action) => (
                <motion.div
                  key={action.id}
                  className="option"
                  variants={itemVariants}
                  onClick={() => setActiveAction(action.id)}
                >
                  <motion.span
                    className="cardOption"
                    variants={labelVariants}
                  >
                    {action.label}
                  </motion.span>

                  <motion.div className="icono">
                    {action.icon}
                  </motion.div>

                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>
    </div >
  );
}