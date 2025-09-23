import React from "react";

export default function PhotoTube({ photos, candlesBlown }) {
  return (
    <div
      style={{
        marginTop: "2rem",
        display: "flex",
        gap: "1rem",
        overflowX: "auto",
        padding: "1rem",
        scrollBehavior: "smooth",
        animation: "scrollTube 30s linear infinite",
      }}
    >
      {photos.map((url, idx) => (
        <div
          key={idx}
          style={{
            flex: "0 0 auto",
            width: "200px",
            height: "200px",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            animation: `zoomIn 0.5s forwards ${idx * 0.2}s`,
          }}
        >
          <img
            src={url}
            alt={`Friend ${idx + 1}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      ))}

      {/* Sparkles */}
      {!candlesBlown &&
        [...Array(8)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            style={{
              position: "absolute",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#fff0b3",
              top: `${20 + Math.random() * 100}px`,
              left: `${Math.random() * 250}px`,
              animation: `sparkle ${1 + Math.random()}s infinite alternate`,
              opacity: 0.8,
            }}
          ></div>
        ))}

      <style>{`
        @keyframes zoomIn { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes scrollTube { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes sparkle { 0% { transform: scale(0.5); opacity: 0.3; } 100% { transform: scale(1.2); opacity: 1; } }
      `}</style>
    </div>
  );
}
