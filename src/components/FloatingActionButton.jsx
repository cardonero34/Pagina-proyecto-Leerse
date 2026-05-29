import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const actions = [
  {
    id: "edit",
    label: "Edit",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    id: "file",
    label: "File",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
  },
  {
    id: "image",
    label: "Image",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    id: "camera",
    label: "Camera",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
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

const labelVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24, delay: 0.05 },
  },
  closed: {
    x: 10,
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState(null);

  const handleAction = (id) => {
    setActiveAction(id);
    setIsOpen(false);
    setTimeout(() => setActiveAction(null), 1500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
       
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Background tap to close */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>

      {/* FAB container */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "16px",
          zIndex: 20,
        }}
      >
        {/* Action items */}
        <motion.div
          variants={containerVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "16px",
          }}
        >
          {actions.map((action) => (
            <motion.div
              key={action.id}
              variants={itemVariants}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                cursor: "pointer",
              }}
              onClick={() => handleAction(action.id)}
            >
              {/* Label */}
              <motion.span
                variants={labelVariants}
                style={{
                  background: "#1e2130",
                  color: "#e2e8f0",
                  fontSize: "14px",
                  fontWeight: 500,
                  padding: "8px 16px",
                  borderRadius: "20px",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                {action.label}
              </motion.span>

              {/* Icon button */}
              <motion.div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  background:
                    activeAction === action.id ? "#5b5fc7" : "#1e2130",
                  color: activeAction === action.id ? "#fff" : "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, color 0.2s",
                  flexShrink: 0,
                }}
              >
                {action.icon}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main FAB button */}
        <motion.button
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#5b5fc7",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isOpen
              ? "0 0 0 8px rgba(91, 95, 199, 0.18)"
              : "0 4px 24px rgba(91, 95, 199, 0.35)",
            transition: "box-shadow 0.3s",
            outline: "none",
          }}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Toast feedback */}
      <AnimatePresence>
        {activeAction && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: "fixed",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1e2130",
              color: "#e2e8f0",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: 500,
              zIndex: 30,
              pointerEvents: "none",
            }}
          >
            {actions.find((a) => a.id === activeAction)?.label} selected ✓
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}