import React, { useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

// O conteúdo que será animado.
const content = ["MÍDIA KIT", "•"];

function MarqueeContent() {
  return (
    <div className="flex-shrink-0 flex items-center">
      {content.map((txt, i) => (
        <span
          key={i}
          className={`px-3 text-black ${
            txt === "•" ? "opacity-60" : "italic"
          } text-lg sm:text-xl md:text-5xl`}
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {txt}
        </span>
      ))}
    </div>
  );
}

function TextMarquee() {
  const x = useMotionValue(0);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Pega a largura do primeiro filho (nosso conteúdo base)
    const marqueeWidth =
      marquee.firstElementChild.getBoundingClientRect().width;
    const speed = 0.01; // Ajuste a velocidade aqui (menor = mais rápido)
    const duration = marqueeWidth * speed;

    const controls = animate(x, -marqueeWidth, {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop", // Garante um loop contínuo sem saltos
    });

    return () => controls.stop();
  }, [x]);

  return (
    // Container externo com padding geral
    <div className="bg-[#40013b] p-3 sm:p-4">
      <div className="flex flex-row items-center gap-3 sm:gap-4">
        {/* 1. Marquee: ocupa o espaço que sobrar */}
        <div className="flex-grow overflow-hidden bg-[#add083] rounded-lg">
          <motion.div
            ref={marqueeRef}
            className="flex py-3 sm:py-4"
            style={{ x }}
          >
            {/* Renderiza o conteúdo 4 vezes para garantir cobertura em telas ultra-largas */}
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </motion.div>
        </div>

        {/* 2. Botão Quadrado */}
        <div className="flex-shrink-0">
          <a
            href="https://drive.google.com/drive/folders/1rZ_5ZquL9I8OE3H-Ddl7obTG7FzMq9yP?usp=sharing" // Coloque seu link de download aqui
            target="_blank"
            className="flex items-center justify-center text-center font-bold
                       w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36
                       bg-[#add083] text-black rounded-2xl shadow-xl 
                       transition-transform duration-300 hover:scale-105"
          >
            <span className="px-2 text-xs sm:text-sm">
              CLIQUE AQUI PARA BAIXAR
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TextMarquee;
