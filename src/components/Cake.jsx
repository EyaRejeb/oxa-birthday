import React from "react";

export default function Cake({ candlesLit, candlesBlown }) {
  return (
    <div style={{
      position: "relative",
      width: "280px",
      height: "180px",
      background: "linear-gradient(to top, #ff9999, #ffe6cc)",
      margin: "0 auto",
      borderRadius: "0 0 40px 40px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
      overflow: "visible",
      animation: candlesBlown ? "shakeCake 0.5s" : "pop 0.5s",
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
    </div>
  );
}
