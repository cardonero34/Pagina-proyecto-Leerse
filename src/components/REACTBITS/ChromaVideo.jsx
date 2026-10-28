import { useRef } from "react";
import "../../stylesheets/REACTBITS/ChromaVideo.css";

export default function ChromaVideo({
  src,
  className = "",
  radius = 140,
  ratio = "1 / 1",
}) {
  const areaRef = useRef(null);

  const handlePointerMove = (event) => {
    const area = areaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();

    area.style.setProperty("--chroma-x", `${event.clientX - rect.left}px`);
    area.style.setProperty("--chroma-y", `${event.clientY - rect.top}px`);
    area.style.setProperty("--chroma-power", "1");
  };

  const handlePointerLeave = () => {
    areaRef.current?.style.setProperty("--chroma-power", "0");
  };

  return (
    <div
      ref={areaRef}
      className={`chroma-video-effect ${className}`}
      style={{ aspectRatio: ratio, "--chroma-radius": `${radius}px` }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <video
        className="chroma-video-mono"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      <video
        className="chroma-video-color"
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    </div>
  );
}