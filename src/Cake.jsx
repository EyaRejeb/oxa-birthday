import React, { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

export default function Cake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const audioRef = useRef(null);

  // Add photo URLs here (replace with real photos)
  const photos = [
    "https://via.placeholder.com/200?text=Friend+1",
    "https://via.placeholder.com/200?text=Friend+2",
    "https://via.placeholder.com/200?text=Friend+3",
    "https://via.placeholder.com/200?text=Friend+4",
    "https://via.placeholder.com/200?text=Friend+5",
    "https://via.placeholder.com/200?text=Friend+6",
    // Add more photos
  ];

  // Window resize for confetti
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Microphone blow detection
  useEffect(() => {
    const startBlowDetection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const microphone = audioCtx.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);
          const sum = dataArray.reduce((a, b) => a + b, 0);
          if (sum > 1000 && !candlesBlown) {
            setCandlesBlown(true);
            if (audioRef.current) audioRef.current.play();
          }
          requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (err) {
        console.error("Microphone access denied", err);
      }
    };

    startBlowDetection();
  }, [candlesBlown]);

  return (
    <div style={{ textAlign: "center", padding: "2rem", fontFamily: "'Comic Sans MS', cursive", background: "#ffe5e0", minHeight: "100vh" }}>
      <h1 style={{ color: "#ff3366", fontSize: "3rem", animation: "bounce 1s infinite alternate" }}>
        Oxa, Happy Birthday! 🎂
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", animation: "fadeIn 2s" }}>
        From France to Spain, blow your candles!
      </p>

      {/* Cake */}
      <div
        style={{
          position: "relative",
          width: "250px",
          height: "150px",
          background: "#ffcc99",
          margin: "0 auto",
          borderRadius: "0 0 30px 30px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          animation: "pop 0.5s",
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "12px",
              height: "45px",
              background: "#fff",
              top: "-45px",
              left: `${30 + i * 40}px`,
              borderRadius: "3px",
              boxShadow: "0 0 3px #aaa",
            }}
          >
            {!candlesBlown && (
              <div
                style={{
                  width: "8px",
                  height: "18px",
                  background: "orange",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-18px",
                  left: "2px",
                  animation: "flicker 0.2s infinite alternate",
                  boxShadow: "0 0 8px yellow",
                }}
              ></div>
            )}
          </div>
        ))}
      </div>

      {candlesBlown && <Confetti width={windowSize.width} height={windowSize.height} />}

      {/* Birthday music */}
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {/* Animated Photo Gallery */}
      <div style={{ marginTop: "3rem" }}>
        <h2 style={{ color: "#ff3366", animation: "fadeIn 2s" }}>Photos from friends 📸</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {photos.map((url, idx) => (
            <div
              key={idx}
              style={{
                overflow: "hidden",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                transform: "scale(0)",
                animation: `zoomIn 0.5s forwards ${idx * 0.2}s`,
              }}
            >
              <img
                src={url}
                alt={`Friend ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  transition: "transform 0.3s",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes flicker {
          0% { transform: scaleY(1); }
          100% { transform: scaleY(1.3); }
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes pop {
          0% { transform: scale(0.8); }
          100% { transform: scale(1); }
        }
        @keyframes zoomIn {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
