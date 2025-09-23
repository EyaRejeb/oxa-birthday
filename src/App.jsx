import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import img1 from "./assets/img1.jpeg";
import img2 from "./assets/img2.jpeg";
import img3 from "./assets/img3.jpeg";
import img4 from "./assets/img4.jpeg";
import img5 from "./assets/img5.jpeg";
import img6 from "./assets/img6.jpeg";
import img7 from "./assets/img7.jpeg";
import img8 from "./assets/img8.jpeg";
import img9 from "./assets/img9.jpeg";
import img10 from "./assets/img10.jpeg";
import img11 from "./assets/img11.jpeg";
import img12 from "./assets/img12.jpeg";
import img13 from "./assets/img13.jpeg";
import img14 from "./assets/img14.jpeg";
import img15 from "./assets/img15.jpeg";
import img16 from "./assets/img16.jpeg";
import img17 from "./assets/img17.jpeg";
import img18 from "./assets/img18.jpeg";
import img19 from "./assets/img19.jpeg";
import img20 from "./assets/img20.jpeg";
import img21 from "./assets/img21.jpeg";
import img22 from "./assets/img22.jpeg";
import img23 from "./assets/img23.jpeg";

export default function App() {
  const [step, setStep] = useState(0);
  const [candlesLit, setCandlesLit] = useState(true);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const audioRef = useRef(null);
  const [wishCount, setWishCount] = useState(0);

  const threshold = /iPhone|iPad|iPod/.test(navigator.userAgent) ? 1500 : 2000;

  const photos = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,

  ];

  const shuffledPhotos = photos.sort(() => 0.5 - Math.random());

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Microphone blow detection with smoothing & 2s delay
  useEffect(() => {
    if (!candlesLit) return;

    let animationFrame;
    let audioCtx;
    const lastSums = [];
    let readyToBlow = false;

    const timer = setTimeout(() => { readyToBlow = true; }, 2000);

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

          lastSums.push(sum);
          if (lastSums.length > 5) lastSums.shift();
          const avg = lastSums.reduce((a, b) => a + b, 0) / lastSums.length;

          if (readyToBlow && avg > threshold && candlesLit) {
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
      clearTimeout(timer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (audioCtx) audioCtx.close();
    };
  }, [candlesLit]);

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
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#ff6699", animation: "fadeIn 3s" }}>
        {candlesLit ? "Blow your candles and make a wish! 🌟" : wishCount === 1 ? "Amazing! 🎉 Wishes made and candles blown!" : "Use the match to relight your candles for another wish!"}
      </p>

      {/* Cake with extra top space */}
      <div style={{
        position: "relative",
        width: "280px",
        height: "220px", // taller to add space
        background: "linear-gradient(to top, #ff9999, #ffe6cc)",
        margin: "160px auto 0 auto", // extra 40px space on top
        borderRadius: "0 0 40px 40px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
        overflow: "visible",
        animation: candlesBlown ? "shakeCake 0.5s" : "pop 0.5s"
      }}>
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ position: "absolute", width: "14px", height: "50px", background: "#fff", top: "-70px", left: `${30 + i*50}px`, borderRadius: "3px" }}>
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
      {/*}
      {!candlesLit && <Confetti width={windowSize.width} height={windowSize.height} />}
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
     */}
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

      {/* Multi-row Animated Photo Gallery (Mobile-Friendly) */}
{/* Multi-row Animated Photo Gallery (Mobile-Friendly, Full Images) */}
{candlesBlown && (
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "0.5rem",
    marginTop: "2rem",
    padding: "1rem",
  }}>
    {Array.from({ length: 30 }).map((_, cellIdx) => {
      // Shuffle photos for each cell
      const cellPhotos = [...shuffledPhotos].sort(() => 0.5 - Math.random());
      const duration = 6 + Math.random() * 5; // 6–11s per image

      return (
        <div key={cellIdx} style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "10px",
          aspectRatio: "1",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        }}>
          {cellPhotos.map((url, idx) => (
            <img 
              key={idx}
              src={url}
              alt={`Photo ${idx+1}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover", // keeps full photo without stretching
                opacity: 0,
                animation: `fadeCarousel${cellIdx} ${duration * cellPhotos.length}s infinite`,
                animationDelay: `${idx * duration}s`,
              }}
            />
          ))}
          <style>{`
            @keyframes fadeCarousel${cellIdx} {
              0% { opacity: 0; }
              5% { opacity: 1; }
              25% { opacity: 1; }
              30% { opacity: 0; }
              100% { opacity: 0; }
            }
          `}</style>

        </div>
      )
    })}
  </div>
)}



    </div>
  );
}
