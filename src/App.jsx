import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [step, setStep] = useState(0);
  const [candlesLit, setCandlesLit] = useState(true);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const audioRef = useRef(null);
  const [wishCount, setWishCount] = useState(0);

  // Harder blow threshold
  const threshold = /iPhone|iPad|iPod/.test(navigator.userAgent) ? 900 : 2000;

  const photos = [
    "https://via.placeholder.com/200?text=Friend+1",
    "https://via.placeholder.com/200?text=Friend+2",
    "https://via.placeholder.com/200?text=Friend+3",
    "https://via.placeholder.com/200?text=Friend+4",
    "https://via.placeholder.com/200?text=Friend+5",
    "https://via.placeholder.com/200?text=Friend+6",
    "https://via.placeholder.com/200?text=Friend+7",
    "https://via.placeholder.com/200?text=Friend+8",
    "https://via.placeholder.com/200?text=Friend+9",
  ];

  const shuffledPhotos = photos.sort(() => 0.5 - Math.random());

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Microphone blow detection with smoothing
  useEffect(() => {
    if (!candlesLit) return;

    let animationFrame;
    let audioCtx;
    const lastSums = [];

    const startBlowDetection = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const microphone = audioCtx.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const detectBlow = () => {
          analyser.getByteFrequencyData(dataArray);
          const sum = dataArray.reduce((a, b) => a + b, 0);

          // Push sum to lastSums, keep last 5 frames
          lastSums.push(sum);
          if (lastSums.length > 5) lastSums.shift();
          const avg = lastSums.reduce((a, b) => a + b, 0) / lastSums.length;

          // Only blow if average exceeds threshold
          if (avg > threshold && candlesLit) {
            setCandlesBlown(true);
            setCandlesLit(false);
            setWishCount(prev => prev + 1);
            if (audioRef.current) audioRef.current.play();
          }

          animationFrame = requestAnimationFrame(detectBlow);
        };

        detectBlow();
      } catch (err) {
        console.error("Microphone access denied", err);
      }
    };

    startBlowDetection();

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioCtx) audioCtx.close();
    };
  }, [candlesLit]);

  // Intro screen
  if (step === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "3rem",
        fontFamily: "'Comic Sans MS', cursive",
        background: "linear-gradient(120deg, #ffe5e0, #fff6f0)",
        minHeight: "100vh"
      }}>
        <h1 style={{
          fontSize: "3rem",
          color: "#ff3366",
          animation: "fadeIn 1.5s",
          textShadow: "2px 2px #fff3"
        }}>Today is... your special day, Oxana! 🎉</h1>
        <p style={{ fontSize: "1.5rem", color: "#ff6699", marginTop: "2rem" }}>
          Another year of laughter, adventures, and unforgettable moments. 🌟
        </p>
        <p style={{ fontSize: "1.3rem", color: "#ff3366", marginTop: "1rem" }}>
          Ready to make a wish and blow your birthday candles?
        </p>
        <button
          onClick={() => setStep(1)}
          style={{
            marginTop: "2rem",
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            borderRadius: "10px",
            background: "#ff3366",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >Yes!</button>
      </div>
    );
  }

  // Cake screen
  return (
    <div style={{
      fontFamily: "'Comic Sans MS', cursive",
      background: "linear-gradient(to top, #fff6f0, #ffe5e0)",
      minHeight: "100vh",
      padding: "2rem",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#ff3366", fontSize: "3rem", marginBottom: "1rem", animation: "fadeIn 2s" }}>
        🎂 Happy Birthday, Oxana! 🎂
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", animation: "fadeIn 3s" }}>
        {candlesLit ? "Blow your candles and make a wish! 🌟" : wishCount === 1 ? "Amazing! 🎉 Wishes made and candles blown!" : "Use the match to relight your candles for another wish!"}
      </p>

      {/* Cake */}
      <div style={{
        position: "relative",
        width: "280px",
        height: "180px",
        background: "linear-gradient(to top, #ff9999, #ffe6cc)",
        margin: "0 auto",
        borderRadius: "0 0 40px 40px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
        overflow: "visible",
        animation: candlesBlown ? "shakeCake 0.5s" : "pop 0.5s"
      }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ position: "absolute", width: "14px", height: "50px", background: "#fff", top: "-50px", left: `${30 + i*50}px`, borderRadius: "3px" }}>
            {candlesLit && (
              <div style={{
                width: "10px",
                height: "20px",
                background: "orange",
                borderRadius: "50%",
                position: "absolute",
                top: "-20px",
                left: "2px",
                animation: "flicker 0.2s infinite alternate",
                boxShadow: "0 0 10px yellow",
              }}></div>
            )}
          </div>
        ))}
      </div>

      {!candlesBlown && [...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#fff0b3",
          top: `${20 + Math.random()*100}px`,
          left: `${Math.random()*250}px`,
          animation: `sparkle ${1+Math.random()}s infinite alternate`,
          opacity: 0.8,
        }}></div>
      ))}

      {!candlesLit && <Confetti width={windowSize.width} height={windowSize.height} />}
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      {!candlesLit && (
        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={() => { setCandlesLit(true); setCandlesBlown(false); }}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "10px",
              background: "#ff9933",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >🔥 Light Candles Again!</button>
        </div>
      )}

      {/* 3 Rows Animated Photo Grid */}
      {candlesBlown && (
        <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          {shuffledPhotos.map((url, idx) => (
            <div key={idx} style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              animation: `floatPhoto 5s ease-in-out ${idx * 0.3}s infinite alternate`
            }}>
              <img src={url} alt={`Friend ${idx+1}`} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes flicker { 0% { transform: scaleY(1); } 100% { transform: scaleY(1.3); } }
        @keyframes pop { 0% { transform: scale(0.8); } 100% { transform: scale(1); } }
        @keyframes shakeCake { 0% { transform: rotate(-5deg); } 25% { transform: rotate(5deg); } 50% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } 100% { transform: rotate(0deg); } }
        @keyframes sparkle { 0% { transform: scale(0.5); opacity: 0.3; } 100% { transform: scale(1.2); opacity: 1; } }
        @keyframes floatPhoto { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-10px) rotate(2deg); } }
      `}</style>
    </div>
  );
}
