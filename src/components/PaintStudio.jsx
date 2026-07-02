import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import "../stylesheets/PaintStudio.css"
// Si en tu proyecto usas el paquete nuevo "motion" en vez de "framer-motion",
// cambia la línea de arriba por: import { motion } from 'motion/react';

/**
 * PaintStudio
 * Mini "Paint" hecho con <canvas>. Pensado para ser simple de leer y fácil
 * de ampliar (más pinceles, capas, deshacer/rehacer, etc.).
 *
 * Requiere: framer-motion y Bootstrap ya cargados en el proyecto.
 */
export default function PaintStudio() {
  // Color de fondo del lienzo ("hoja de papel"), centralizado para reutilizarlo
  const PAPER_COLOR = '#fbf8f1';

  // ---------- Estado de las herramientas ----------
  const [tool, setTool] = useState('brush');       // 'brush' | 'eraser' | 'line' | 'rect' | 'circle' | 'triangle'
  const [brushType, setBrushType] = useState('round'); // 'pencil' | 'marker' | 'round'
  const [color, setColor] = useState('#1f1d1a');
  const [thickness, setThickness] = useState(8);
  const [opacity, setOpacity] = useState(1);
  const [fillEnabled, setFillEnabled] = useState(false); // aplica a rectángulo, círculo y triángulo
  const [fillColor, setFillColor] = useState('#f1c40f');
  const [isDrawing, setIsDrawing] = useState(false);

  // Paleta de colores editable: el usuario puede agregar o quitar colores
  const [palette, setPalette] = useState([
    '#1f1d1a', '#ffffff', '#caa05a', '#e0703e',
    '#c0392b', '#2f6f6a', '#3a6b6e', '#7b3fa0', '#f1c40f',
  ]);

  function addColorToPalette(hex) {
    setPalette((prev) => (prev.includes(hex) ? prev : [...prev, hex]));
  }

  function removeColorFromPalette(hex) {
    setPalette((prev) => (prev.length > 1 ? prev.filter((c) => c !== hex) : prev));
  }

  // ---------- Referencias ----------
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const startPos = useRef({ x: 0, y: 0 });
  const snapshotRef = useRef(null); // foto del lienzo antes de dibujar una figura (para la vista previa)

  // ---------- Configuración inicial del canvas ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineJoin = 'round';
    ctxRef.current = ctx;
    // "Hoja de papel" en blanco
    ctx.fillStyle = PAPER_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // ---------- Utilidades ----------

  // Convierte coordenadas del mouse (CSS) a coordenadas reales del canvas
  function getCoords(e) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  // Aplica al contexto el estilo según el tipo de pincel elegido
  function applyBrushSettings(ctx) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.strokeStyle = color;
    ctx.fillStyle = fillColor;

    if (brushType === 'pencil') {
      // Lápiz: trazo fino y firme
      ctx.lineWidth = Math.max(1, thickness * 0.5);
      ctx.lineCap = 'round';
      ctx.globalAlpha = opacity;
    } else if (brushType === 'marker') {
      // Marcador: trazo ancho, plano y algo translúcido (efecto resaltador)
      ctx.lineWidth = thickness * 1.6;
      ctx.lineCap = 'square';
      ctx.globalAlpha = opacity * 0.65;
      ctx.globalCompositeOperation = 'multiply';
    } else {
      // Pincel redondo: trazo suave con borde difuminado
      ctx.lineWidth = thickness;
      ctx.lineCap = 'round';
      ctx.globalAlpha = opacity;
      ctx.shadowBlur = thickness * 0.5;
      ctx.shadowColor = color;
    }
  }

  // Configura el contexto para borrar: "pinta" con el color del papel
  function applyEraserSettings(ctx) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.strokeStyle = PAPER_COLOR;
    ctx.lineWidth = Math.max(thickness * 1.5, 12);
    ctx.lineCap = 'round';
  }

  // Dibuja (o redibuja) la figura de vista previa mientras se arrastra el mouse
  function drawShapePreview(x, y) {
    const ctx = ctxRef.current;
    ctx.putImageData(snapshotRef.current, 0, 0); // restaura el lienzo previo
    applyBrushSettings(ctx);
    const { x: startX, y: startY } = startPos.current;

    ctx.beginPath();
    if (tool === 'line') {
      ctx.moveTo(startX, startY);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === 'rect') {
      const w = x - startX;
      const h = y - startY;
      if (fillEnabled) ctx.fillRect(startX, startY, w, h);
      ctx.strokeRect(startX, startY, w, h);
    } else if (tool === 'circle') {
      const radius = Math.hypot(x - startX, y - startY);
      ctx.arc(startX, startY, radius, 0, Math.PI * 2);
      if (fillEnabled) ctx.fill();
      ctx.stroke();
    } else if (tool === 'triangle') {
      // Triángulo inscrito en el rectángulo que va del punto inicial al actual
      const midX = (startX + x) / 2;
      ctx.moveTo(midX, startY);
      ctx.lineTo(x, y);
      ctx.lineTo(startX, y);
      ctx.closePath();
      if (fillEnabled) ctx.fill();
      ctx.stroke();
    }
  }

  // ---------- Eventos del mouse sobre el canvas ----------
  function handleMouseDown(e) {
    const ctx = ctxRef.current;
    const { x, y } = getCoords(e);
    setIsDrawing(true);

    if (tool === 'brush' || tool === 'eraser') {
      if (tool === 'brush') applyBrushSettings(ctx);
      else applyEraserSettings(ctx);
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      // Para figuras guardamos el punto inicial y una foto del lienzo
      startPos.current = { x, y };
      snapshotRef.current = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }

  function handleMouseMove(e) {
    if (!isDrawing) return;
    const ctx = ctxRef.current;
    const { x, y } = getCoords(e);

    if (tool === 'brush' || tool === 'eraser') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      drawShapePreview(x, y);
    }
  }

  function finishStroke() {
    if (!isDrawing) return;
    if (tool === 'brush' || tool === 'eraser') ctxRef.current.closePath();
    setIsDrawing(false);
    ctxRef.current.globalAlpha = 1;
    ctxRef.current.globalCompositeOperation = 'source-over';
    ctxRef.current.shadowBlur = 0;
  }

  // ---------- Acciones generales ----------
  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.fillStyle = PAPER_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function downloadImage() {
    const link = document.createElement('a');
    link.download = 'mi-dibujo.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  }

  // ---------- Datos para los botones de herramientas ----------
  const shapeTools = [
    { id: 'brush', label: 'Libre', glyph: '✎' },
    { id: 'eraser', label: 'Borrador', glyph: '⌫' },
    { id: 'line', label: 'Línea', glyph: '╱' },
    { id: 'rect', label: 'Rectángulo', glyph: '▭' },
    { id: 'circle', label: 'Círculo', glyph: '◯' },
    { id: 'triangle', label: 'Triángulo', glyph: '△' },
  ];

  const brushTypes = [
    { id: 'pencil', label: 'Lápiz' },
    { id: 'marker', label: 'Marcador' },
    { id: 'round', label: 'Pincel' },
  ];

  // Dibuja la fila de swatches de la paleta, con una "x" para eliminar cada color
  function renderPalette(selectedColor, onSelect, keyPrefix) {
    return (
      <div className="d-flex flex-wrap gap-2">
        {palette.map((c) => (
          <div key={`${keyPrefix}-${c}`} className="ps-swatch-wrap">
            <motion.button
              type="button"
              className={`ps-swatch ${selectedColor === c ? 'is-active' : ''}`}
              style={{ backgroundColor: c }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(c)}
              aria-label={`Color ${c}`}
            />
            <button
              type="button"
              className="ps-swatch-remove"
              onClick={(e) => {
                e.stopPropagation();
                removeColorFromPalette(c);
              }}
              title="Eliminar color de la paleta"
              aria-label={`Eliminar color ${c}`}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="ps-desk d-flex flex-column flex-md-row gap-4 p-3 p-md-4">
      {/* ---------- Barra de herramientas ---------- */}
      <motion.div
        className="ps-toolbar d-flex flex-column gap-3 p-3 rounded-3"
        initial={{ x: -24 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div>
          <p className="ps-section-title mb-2">Herramienta</p>
          <div className="d-flex flex-wrap gap-2">
            {shapeTools.map((t) => (
              <motion.button
                key={t.id}
                type="button"
                className={`ps-tool-btn ${tool === t.id ? 'is-active' : ''}`}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setTool(t.id)}
                title={t.label}
              >
                <span className="ps-glyph">{t.glyph}</span>
                <span className="ps-tool-label">{t.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {tool === 'brush' && (
          <div>
            <p className="ps-section-title mb-2">Tipo de pincel</p>
            <div className="d-flex flex-wrap gap-2">
              {brushTypes.map((b) => (
                <motion.button
                  key={b.id}
                  type="button"
                  className={`ps-chip ${brushType === b.id ? 'is-active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setBrushType(b.id)}
                >
                  {b.label}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="ps-section-title mb-2">Color</p>
          <div className="d-flex align-items-center gap-2 mb-2">
            <input
              type="color"
              className="ps-color-input"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <span className="ps-color-value">{color}</span>
            <motion.button
              type="button"
              className="ps-add-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => addColorToPalette(color)}
              title="Agregar este color a la paleta"
            >
              + Agregar
            </motion.button>
          </div>
          {renderPalette(color, setColor, 'stroke')}
        </div>

        {(tool === 'rect' || tool === 'circle' || tool === 'triangle') && (
          <div>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <p className="ps-section-title mb-0">Relleno</p>
              <motion.button
                type="button"
                className={`ps-toggle ${fillEnabled ? 'is-active' : ''}`}
                whileTap={{ scale: 0.94 }}
                onClick={() => setFillEnabled((v) => !v)}
              >
                {fillEnabled ? 'Activado' : 'Desactivado'}
              </motion.button>
            </div>
            {fillEnabled && (
              <>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <input
                    type="color"
                    className="ps-color-input"
                    value={fillColor}
                    onChange={(e) => setFillColor(e.target.value)}
                  />
                  <span className="ps-color-value">{fillColor}</span>
                </div>
                {renderPalette(fillColor, setFillColor, 'fill')}
              </>
            )}
          </div>
        )}

        <div>
          <label className="ps-section-title d-block mb-1" htmlFor="ps-thickness">
            Grosor — {thickness}px
          </label>
          <input
            id="ps-thickness"
            type="range"
            className="form-range"
            min="1"
            max="40"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="ps-section-title d-block mb-1" htmlFor="ps-opacity">
            Opacidad — {Math.round(opacity * 100)}%
          </label>
          <input
            id="ps-opacity"
            type="range"
            className="form-range"
            min="0.05"
            max="1"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
          />
        </div>

        <div className="d-flex gap-2 mt-1">
          <button type="button" className="ps-action-btn" onClick={clearCanvas}>
            Limpiar
          </button>
          <button type="button" className="ps-action-btn ps-action-btn--accent" onClick={downloadImage}>
            Descargar
          </button>
        </div>
      </motion.div>

      {/* ---------- Lienzo / hoja de papel ---------- */}
      <div className="ps-canvas-wrap flex-grow-1 d-flex align-items-center justify-content-center">
        <motion.div
          className="ps-paper"
          initial={{ y: -10, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
        >
          <canvas
            ref={canvasRef}
            width={900}
            height={560}
            className="ps-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={finishStroke}
            onMouseLeave={finishStroke}
          />
        </motion.div>
      </div>
    </div>
  );
}
