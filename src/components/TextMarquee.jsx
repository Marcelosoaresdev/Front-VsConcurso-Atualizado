// src/components/FramerMarquee.jsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

function TextMarquee() {
  const containerRef = useRef(null);
  const baseRef = useRef(null);
  const x = useMotionValue(0);

  const texts = ["MEDIA KIT", "•", "BAIXE AGORA"];
  const [repeatCount, setRepeatCount] = useState(0);
  const [baseWidth, setBaseWidth] = useState(0);

  // 1) Ao montar, mede o container e a sequência base, calcula quantas vezes repetir
  useEffect(() => {
    if (!containerRef.current || !baseRef.current) return;
    const containerW = containerRef.current.getBoundingClientRect().width;
    const baseW = baseRef.current.getBoundingClientRect().width;

    setBaseWidth(baseW);
    // garante uma repetição extra para não faltar texto
    setRepeatCount(Math.ceil(containerW / baseW) + 1);
  }, []);

  // 2) Quando tivermos baseWidth, animamos de 0 até -baseWidth e repetimos
  useEffect(() => {
    if (baseWidth <= 0) return;
    const speed = 100; // px por segundo
    const duration = baseWidth / speed;

    const controls = animate(x, -baseWidth, {
      duration,
      ease: "linear",
      repeat: Infinity,
    });
    return controls.stop;
  }, [baseWidth, x]);

  // 3) Monta o array final, repetindo o texts repeatCount vezes
  const items = Array(repeatCount).fill(texts).flat();

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-black"
      style={{ whiteSpace: "nowrap" }}
    >
      <motion.div style={{ x }} className="inline-flex">
        {/* sequência que usamos de base para medir */}
        <div ref={baseRef} className="inline-flex">
          {texts.map((txt, i) => (
            <span
              key={`base-${i}`}
              className="px-4 py-2 text-white text-sm font-bold"
            >
              {txt}
            </span>
          ))}
        </div>

        {/* todo o resto, que vai entrar em loop */}
        {items.map((txt, i) => (
          <span key={i} className="px-4 py-2 text-white text-sm font-bold">
            {txt}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default TextMarquee;