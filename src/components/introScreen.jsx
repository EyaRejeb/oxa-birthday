import React from "react";

export default function IntroScreen({ onStart }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem", fontFamily: "'Comic Sans MS', cursive", background: "linear-gradient(120deg, #ffe5e0, #fff6f0)", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "3rem", color: "#ff3366", animation: "fadeIn 1.5s" }}>Today is... your special day, Oxana!!!! 🎉</h1>
      <p style={{ fontSize: "1.3rem", marginTop: "2rem" }}>Another year of laughter, adventures, and unforgettable moments. 🌟</p>
      <p style={{ fontSize: "1.3rem", marginTop: "1rem" }}>Ready to make a wish and blow your birthday candles?</p>
      <button
        onClick={onStart}
        style={{ marginTop: "2rem", padding: "1rem 2rem", fontSize: "1.2rem", borderRadius: "10px", background: "#ff3366", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
      >
        Yes!
      </button>
    </div>
  );
}
