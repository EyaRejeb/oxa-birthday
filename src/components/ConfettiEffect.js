import React from "react";
import Confetti from "react-confetti";

export default function ConfettiEffect({ width, height }) {
  return <Confetti width={width} height={height} />;
}
