// src/components/Waves.jsx
import React from "react";
import wavesPath from "../assets/imagens/wave_tree.png";

function Waves() {
  return (
    <div className="overflow-hidden">
      <img src={wavesPath} alt="Onda decorativa" className="w-full" />
    </div>
  );
}

export default Waves;