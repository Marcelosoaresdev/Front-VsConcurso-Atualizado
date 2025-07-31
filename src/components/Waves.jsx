import React from "react";
import wavesPath from "../assets/imagens/wave_tree.webp";

function Waves() {
  return (
    <div className="w-full bg-gradient-to-b from-transparent to-[#add083]">
      <img
        src={wavesPath}
        alt="Onda decorativa"
        className="w-full block"
        draggable={false}
        loading="lazy"
      />
    </div>
  );
}

export default Waves;
