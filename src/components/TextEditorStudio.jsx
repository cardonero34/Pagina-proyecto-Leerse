import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
// Si en tu proyecto usas el paquete nuevo "motion" en vez de "framer-motion",
// cambia la línea de arriba por: import { motion } from 'motion/react';

/**
 * TextEditorStudio
 * Editor de texto enriquecido muy simple: una barra de herramientas compacta
 * (negrita, cursiva, listas, alineación, formato, fuente, color) sobre un
 * área editable tipo "hoja". Usa document.execCommand, que es la forma más
 * simple de lograr esto sin librerías externas (Slate, ProseMirror, etc.).
 * Pensado para ser fácil de leer y ampliar. Incluye solo dos tipografías
 * (Crimson Text y Lato) de Google Fonts, que se cargan automáticamente al
 * montar el componente.
 *
 * Requiere: framer-motion y Bootstrap ya cargados en el proyecto.
 */

// ---------- Iconos simples en SVG (línea fina, sin librería externa) ----------
const OrderedListIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="16">
    <text x="0" y="6" fontSize="6" fill="currentColor">1.</text>
    <line x1="7" y1="4" x2="19" y2="4" stroke="currentColor" strokeWidth="1.6" />
    <text x="0" y="14" fontSize="6" fill="currentColor">2.</text>
    <line x1="7" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const UnorderedListIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="16">
    <circle cx="2" cy="4" r="1.4" fill="currentColor" />
    <line x1="7" y1="4" x2="19" y2="4" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="2" cy="12" r="1.4" fill="currentColor" />
    <line x1="7" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="16" fill="currentColor">
    <path d="M3 4c-1.5 0-2.5 1.2-2.5 3 0 1.6 1 2.6 2.3 2.6.2 1.6-.6 2.8-2 3.3l.5 1c2.2-.7 3.4-2.4 3.2-4.9-.1-1.6-.6-5-1.5-5zM11 4c-1.5 0-2.5 1.2-2.5 3 0 1.6 1 2.6 2.3 2.6.2 1.6-.6 2.8-2 3.3l.5 1c2.2-.7 3.4-2.4 3.2-4.9-.1-1.6-.6-5-1.5-5z" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <line x1="1" y1="2" x2="19" y2="2" />
    <line x1="1" y1="7" x2="13" y2="7" />
    <line x1="1" y1="12" x2="16" y2="12" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <line x1="1" y1="2" x2="19" y2="2" />
    <line x1="4" y1="7" x2="16" y2="7" />
    <line x1="2.5" y1="12" x2="17.5" y2="12" />
  </svg>
);

const AlignRightIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <line x1="1" y1="2" x2="19" y2="2" />
    <line x1="7" y1="7" x2="19" y2="7" />
    <line x1="4" y1="12" x2="19" y2="12" />
  </svg>
);

const AlignJustifyIcon = () => (
  <svg viewBox="0 0 20 16" width="16" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <line x1="1" y1="2" x2="19" y2="2" />
    <line x1="1" y1="7" x2="19" y2="7" />
    <line x1="1" y1="12" x2="19" y2="12" />
  </svg>
);

export default function TextEditorStudio() {
  const editorRef = useRef(null);
  const textColorRef = useRef(null);
  const hiliteColorRef = useRef(null);

  // Estado "activo" de cada botón, para resaltarlo cuando el cursor está
  // sobre texto con ese formato
  const [active, setActive] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    alignJustify: false,
    fontCrimson: false,
    fontLato: false,
  });
  const [isQuote, setIsQuote] = useState(false);
  const [textColor, setTextColor] = useState('#1f1d1a');
  const [highlightColor, setHighlightColor] = useState('#f1c40f');
  const [highlightActive, setHighlightActive] = useState(true); // false = "sin resaltado"
  const savedRange = useRef(null); // guarda el texto seleccionado del editor

  // Carga las Google Fonts del selector de fuentes (solo una vez,
  // aunque el componente se monte varias veces en la página)
  useEffect(() => {
    const linkId = 'te-google-fonts-link';
    if (document.getElementById(linkId)) return;
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Lato:wght@400;700&display=swap';
    document.head.appendChild(link);
  }, []);

  // Guarda la selección actual del editor (se llama al soltar el mouse o una tecla)
  function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editorRef.current.contains(sel.anchorNode)) {
      savedRange.current = sel.getRangeAt(0).cloneRange();
    }
  }

  // Vuelve a aplicar esa selección justo antes de ejecutar un comando.
  // Esto es necesario porque al hacer clic en un <select> o en un input de
  // color, el navegador le quita el foco al editor y "olvida" qué texto
  // tenías seleccionado.
  function restoreSelection() {
    if (!savedRange.current) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedRange.current);
  }

  // Lee el estado real de la selección actual y actualiza los botones
  function refreshActiveState() {
    saveSelection();
    const fontValue = (document.queryCommandValue('fontName') || '').replace(/["']/g, '').toLowerCase();
    setActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strike: document.queryCommandState('strikeThrough'),
      alignLeft: document.queryCommandState('justifyLeft'),
      alignCenter: document.queryCommandState('justifyCenter'),
      alignRight: document.queryCommandState('justifyRight'),
      alignJustify: document.queryCommandState('justifyFull'),
      fontCrimson: fontValue.includes('crimson'),
      fontLato: fontValue.includes('lato'),
    });
  }

  // Ejecuta un comando de edición sobre el área editable
  function exec(command, value = null) {
    restoreSelection();
    editorRef.current.focus();
    document.execCommand(command, false, value);
    saveSelection();
    refreshActiveState();
  }

  // Aplica una tipografía al texto seleccionado usando un <span> con estilo
  // en línea forzado con !important. Esto es necesario porque execCommand
  // ('fontName') crea una etiqueta <font face="..."> cuya prioridad en el
  // navegador es MÁS BAJA que cualquier regla CSS (incluso un simple
  // `* { font-family: Lato }` sin !important le gana). Un estilo en línea
  // con !important sí gana, incluso si en tu proyecto tienes
  // `* { font-family: Lato !important }`.
  function applyFont(fontFamily) {
    restoreSelection();
    editorRef.current.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return; // nada seleccionado

    try {
      const range = sel.getRangeAt(0);
      const span = document.createElement('span');
      span.style.setProperty('font-family', `'${fontFamily}'`, 'important');
      range.surroundContents(span);
      sel.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.addRange(newRange);
    } catch (err) {
      // Selección compleja (abarca varios párrafos/elementos): usamos el
      // comando nativo como respaldo y forzamos !important sobre lo creado
      document.execCommand('fontName', false, fontFamily);
      editorRef.current.querySelectorAll('font[face], span[style]').forEach((node) => {
        const current = (node.style.fontFamily || node.getAttribute('face') || '').replace(/["']/g, '');
        if (current === fontFamily) {
          node.style.setProperty('font-family', `'${fontFamily}'`, 'important');
        }
      });
    }

    saveSelection();
    refreshActiveState();
  }

  // Exporta el contenido del editor a PDF. No usa ninguna librería externa:
  // crea un iframe oculto con el contenido y las mismas fuentes, y dispara
  // el diálogo de impresión del navegador. Ahí el usuario elige como
  // destino "Guardar como PDF" (o "Microsoft Print to PDF" en Windows).
  function downloadAsPDF() {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Documento</title>
          <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />
          <style>
            body { font-family: 'Lato', sans-serif; padding: 32px; color: #2b2722; line-height: 1.6; }
            blockquote { margin: 0 0 0 4px; padding-left: 14px; border-left: 3px solid #d98a3d; color: #6b6356; font-style: italic; }
          </style>
        </head>
        <body>${editorRef.current.innerHTML}</body>
      </html>
    `);
    doc.close();

    // Pequeña espera para que el iframe cargue las fuentes antes de imprimir
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 500);
    }, 350);
  }

  function toggleQuote() {
    restoreSelection();
    editorRef.current.focus();
    document.execCommand('formatBlock', false, isQuote ? 'p' : 'blockquote');
    setIsQuote((v) => !v);
  }

  function applyFormatBlock(value) {
    restoreSelection();
    editorRef.current.focus();
    document.execCommand('formatBlock', false, value);
    setIsQuote(value === 'blockquote');
  }

  function applyTextColor(hex) {
    setTextColor(hex);
    exec('foreColor', hex);
  }

  function applyHighlightColor(hex) {
    setHighlightColor(hex);
    setHighlightActive(true);
    restoreSelection();
    editorRef.current.focus();
    const ok = document.execCommand('hiliteColor', false, hex);
    if (!ok) document.execCommand('backColor', false, hex);
  }

  // Quita el resaltado: pinta el fondo del texto como "transparente"
  function removeHighlight() {
    setHighlightActive(false);
    restoreSelection();
    editorRef.current.focus();
    const ok = document.execCommand('hiliteColor', false, 'transparent');
    if (!ok) document.execCommand('backColor', false, 'transparent');
  }

  // ---------- Datos de los botones de formato en línea ----------
  const inlineButtons = [
    { id: 'bold', command: 'bold', label: 'Negrita', render: <b>B</b> },
    { id: 'italic', command: 'italic', label: 'Cursiva', render: <i>I</i> },
    { id: 'underline', command: 'underline', label: 'Subrayado', render: <u>U</u> },
    { id: 'strike', command: 'strikeThrough', label: 'Tachado', render: <s>S</s> },
  ];

  const alignButtons = [
    { id: 'alignLeft', command: 'justifyLeft', label: 'Izquierda', Icon: AlignLeftIcon },
    { id: 'alignCenter', command: 'justifyCenter', label: 'Centrar', Icon: AlignCenterIcon },
    { id: 'alignRight', command: 'justifyRight', label: 'Derecha', Icon: AlignRightIcon },
    { id: 'alignJustify', command: 'justifyFull', label: 'Justificar', Icon: AlignJustifyIcon },
  ];


  return (
    <div className="te-desk p-3 p-md-4">
      {/* ---------- Barra de herramientas ---------- */}
      <motion.div
        className="te-toolbar rounded-3 p-2 mb-3"
        initial={{ y: -16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Fila 1: estilos en línea, listas, cita, alineación */}
        <div className="te-row">
          {inlineButtons.map((b) => (
            <motion.button
              key={b.id}
              type="button"
              className={`te-btn ${active[b.id] ? 'is-active' : ''}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => exec(b.command)}
              title={b.label}
              aria-label={b.label}
            >
              {b.render}
            </motion.button>
          ))}

          <span className="te-divider" />

          <motion.button
            type="button"
            className="te-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => exec('insertOrderedList')}
            title="Lista numerada"
            aria-label="Lista numerada"
          >
            <OrderedListIcon />
          </motion.button>
          <motion.button
            type="button"
            className="te-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => exec('insertUnorderedList')}
            title="Lista con viñetas"
            aria-label="Lista con viñetas"
          >
            <UnorderedListIcon />
          </motion.button>
          <motion.button
            type="button"
            className={`te-btn ${isQuote ? 'is-active' : ''}`}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleQuote}
            title="Cita"
            aria-label="Cita"
          >
            <QuoteIcon />
          </motion.button>

          <span className="te-divider" />

          {alignButtons.map((b) => (
            <motion.button
              key={b.id}
              type="button"
              className={`te-btn ${active[b.id] ? 'is-active' : ''}`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => exec(b.command)}
              title={b.label}
              aria-label={b.label}
            >
              <b.Icon />
            </motion.button>
          ))}
        </div>

        {/* Fila 2: formato de párrafo, fuente, color de texto y resaltado */}
        <div className="te-row te-row--secondary">
          <select
            className="form-select form-select-sm te-select"
            defaultValue="p"
            onChange={(e) => applyFormatBlock(e.target.value)}
            title="Formato de párrafo"
          >
            <option value="p">Normal</option>
            <option value="h1">Título 1</option>
            <option value="h2">Título 2</option>
            <option value="h3">Título 3</option>
            <option value="blockquote">Cita</option>
          </select>

          <motion.button
            type="button"
            className={`te-btn te-font-btn ${active.fontCrimson ? 'is-active' : ''}`}
            style={{ fontFamily: "'Crimson Text', serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => applyFont('Crimson Text')}
            title="Aplicar fuente Crimson Text"
            aria-label="Aplicar fuente Crimson Text"
          >
            Crimson
          </motion.button>
          <motion.button
            type="button"
            className={`te-btn te-font-btn ${active.fontLato ? 'is-active' : ''}`}
            style={{ fontFamily: "'Lato', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => applyFont('Lato')}
            title="Aplicar fuente Lato"
            aria-label="Aplicar fuente Lato"
          >
            Lato
          </motion.button>

          <span className="te-divider" />

          <div className="te-color-btn">
            <motion.button
              type="button"
              className="te-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => textColorRef.current.click()}
              title="Color de texto"
              aria-label="Color de texto"
            >
              <span className="te-color-letter">A</span>
              <span className="te-color-bar" style={{ backgroundColor: textColor }} />
            </motion.button>
            <input
              ref={textColorRef}
              type="color"
              className="te-color-input"
              value={textColor}
              onChange={(e) => applyTextColor(e.target.value)}
            />
          </div>

          <div className="te-color-btn">
            <motion.button
              type="button"
              className="te-btn"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => hiliteColorRef.current.click()}
              title="Resaltado"
              aria-label="Resaltado"
            >
              <span
                className={`te-color-letter te-color-letter--fill ${!highlightActive ? 'is-none' : ''}`}
                style={highlightActive ? { backgroundColor: highlightColor } : undefined}
              >
                A
              </span>
            </motion.button>
            <input
              ref={hiliteColorRef}
              type="color"
              className="te-color-input"
              value={highlightColor}
              onChange={(e) => applyHighlightColor(e.target.value)}
            />
            <motion.button
              type="button"
              className="te-btn te-btn--mini"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={removeHighlight}
              title="Quitar resaltado"
              aria-label="Quitar resaltado"
            >
              ✕
            </motion.button>
          </div>

          <span className="te-divider" />

          <motion.button
            type="button"
            className="te-btn te-pdf-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={downloadAsPDF}
            title="Descargar como PDF"
            aria-label="Descargar como PDF"
          >
            ⬇ PDF
          </motion.button>
        </div>
      </motion.div>

      {/* ---------- Hoja / área editable ---------- */}
      <motion.div
        className="te-page-wrap"
        initial={{ y: -10, scale: 0.99 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        <div
          ref={editorRef}
          className="te-page"
          contentEditable
          suppressContentEditableWarning
          data-placeholder="Escribe aquí..."
          onMouseUp={refreshActiveState}
          onKeyUp={refreshActiveState}
        />
      </motion.div>

      {/* Estilos del componente (mismo tema claro y acento usados en PaintStudio) */}
      <style>{`
        .te-desk {
          background: linear-gradient(135deg, #f8f6f0 0%, #ece6d8 100%);
          border-radius: 18px;
        }
        .te-toolbar {
          background: #ffffff;
          border: 1px solid #e6dfd0;
          box-shadow: 0 8px 24px rgba(60, 50, 30, 0.08);
        }
        .te-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 4px;
        }
        .te-row--secondary {
          margin-top: 8px;
        }
        .te-divider {
          width: 1px;
          height: 22px;
          background: #e6dfd0;
          margin: 0 4px;
        }
        .te-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          min-width: 32px;
          height: 32px;
          padding: 0 6px;
          border-radius: 6px;
          border: 1px solid transparent;
          background: transparent;
          color: #2b2722;
          font-size: 0.9rem;
          cursor: pointer;
        }
        .te-btn:hover {
          background: #faf8f3;
          border-color: #e6dfd0;
        }
        .te-btn.is-active {
          background: #fbe8d2;
          border-color: #d98a3d;
          color: #8a4f17;
        }
        .te-btn u { text-decoration: underline; }
        .te-btn s { text-decoration: line-through; }
        .te-font-btn {
          min-width: auto;
          padding: 0 10px;
          font-size: 0.82rem;
        }
        .te-pdf-btn {
          margin-left: auto;
          padding: 0 12px;
          background: #d98a3d;
          color: #ffffff;
          font-weight: 600;
          font-size: 0.8rem;
        }
        .te-pdf-btn:hover {
          background: #c27a32;
          border-color: #c27a32;
        }

        .te-select {
          width: auto;
          max-width: 140px;
          border: 1px solid #e6dfd0;
          background-color: #faf8f3;
          color: #2b2722;
          font-size: 0.8rem;
        }
        .te-select:focus {
          border-color: #d98a3d;
          box-shadow: 0 0 0 2px rgba(217, 138, 61, 0.2);
        }

        .te-color-btn { position: relative; display: inline-flex; align-items: center; }
        .te-color-letter {
          font-weight: 700;
          font-size: 0.85rem;
          line-height: 1;
        }
        .te-color-letter--fill {
          padding: 1px 3px;
          border-radius: 3px;
          color: #1f1d1a;
        }
        .te-color-letter--fill.is-none {
          position: relative;
          color: #2b2722;
          background-image:
            linear-gradient(45deg, #e6dfd0 25%, transparent 25%, transparent 75%, #e6dfd0 75%),
            linear-gradient(45deg, #e6dfd0 25%, transparent 25%, transparent 75%, #e6dfd0 75%);
          background-size: 6px 6px;
          background-position: 0 0, 3px 3px;
          background-color: #ffffff;
        }
        .te-color-letter--fill.is-none::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 3px;
          background: linear-gradient(to top right, transparent calc(50% - 1px), #c0392b, transparent calc(50% + 1px));
        }
        .te-btn--mini {
          min-width: 22px;
          width: 22px;
          height: 22px;
          font-size: 0.65rem;
          color: #8a7f6b;
          margin-left: 2px;
        }
        .te-btn--mini:hover {
          color: #c0392b;
        }
        .te-color-bar {
          display: block;
          width: 14px;
          height: 3px;
          border-radius: 2px;
          margin-top: 1px;
        }
        .te-color-input {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }

        .te-page-wrap {
          background: #ffffff;
          border: 1px solid #e6dfd0;
          border-radius: 6px;
          box-shadow: 0 12px 28px rgba(60, 50, 30, 0.12);
          padding: 6px;
        }
        .te-page {
          min-height: 420px;
          padding: 28px 32px;
          border-radius: 3px;
          background: #fbf8f1;
          color: #2b2722;
          font-size: 1rem;
          line-height: 1.6;
          outline: none;
        }
        .te-page:empty:before {
          content: attr(data-placeholder);
          color: #a89c86;
          pointer-events: none;
        }
        .te-page blockquote {
          margin: 0 0 0 4px;
          padding-left: 14px;
          border-left: 3px solid #d98a3d;
          color: #6b6356;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
