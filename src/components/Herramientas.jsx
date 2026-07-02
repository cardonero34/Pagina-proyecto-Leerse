import { useState } from "react";
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
    id: "Desicion",
    label: "Desición",
    icon: (
      <img src="/iconos/icono-desicion2.png" className="icono p-1" />
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

export default function Herramientas() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  const handleAction = (id) => {
    setActiveAction(id);
    setIsOpen(false);
  };

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
            className="InterfazSeleccion position-fixed top-50 start-50 translate-middle d-flex align-items-center justify-content-center"
          >
            {/* op1 */}
            {activeAction === "Postip" && (
              <div className="containerOption position-relative w-50">
                <h3>Postip</h3>
                <textarea placeholder="Escribe tu Postip aquí..." className="form-control" />
                <button className="btn btn-secondary mt-3 position-absolute top-0 start-100 translate-middle" onClick={() => setActiveAction(null)}>X</button>
              </div>
            )}

            {/* op2 */}
            {activeAction === "Desicion" && (
              <div className="containerOption position-relative">
                <h3>Desición</h3>

                <button className="btn btn-secondary mt-3 position-absolute top-0 start-100 translate-middle" onClick={() => setActiveAction(null)}>X</button>
              </div>
            )}

            {/* sub menu interfaces ====================<<<<<< */}

            {activeAction === "texto" && (
              <div className="containerOption position-relative">
                <h3>Texto</h3>

                <TextEditorStudio />

                <button className="btn btn-secondary mt-3 position-absolute top-0 start-100 translate-middle" onClick={() => setActiveAction(null)}>X</button>
              </div>
            )}

            {activeAction === "foto" && (
              <div className="containerOption position-relative">
                <h3>Subir Foto</h3>

                <FotoArchive />

                <button className="btn btn-secondary mt-3 position-absolute top-0 start-100 translate-middle" onClick={() => setActiveAction(null)}>X</button>
              </div>
            )}

            {activeAction === "audio" && (
              <div className="containerOption position-relative">
                <h3>Grabar Audio</h3>

                <AudioRecorder />

                <button className="btn btn-secondary mt-3 position-absolute top-0 start-100 translate-middle" onClick={() => setActiveAction(null)}>X</button>
              </div>
            )}

            {activeAction === "dibujo" && (
              <div className="containerOption position-relative">
                <h3>Dibujo</h3>

                <PaintStudio />

                <button className="btn btn-secondary mt-3 position-absolute top-0 start-100 translate-middle" onClick={() => setActiveAction(null)}>X</button>
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
                  onClick={()=>setActiveAction(action.id)}
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