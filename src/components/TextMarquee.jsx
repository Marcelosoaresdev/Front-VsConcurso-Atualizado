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
    if (!marquee || !marquee.firstElementChild) return;

    const marqueeWidth =
      marquee.firstElementChild.getBoundingClientRect().width;
    const speed = 0.01; // Ajuste a velocidade aqui (menor = mais rápido)
    const duration = marqueeWidth * speed;

    const controls = animate(x, -marqueeWidth, {
      duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [x]);

  return (
    <div>
      {/*
        Container Principal
        - ALTERAÇÃO: Adicionamos 'relative' para que ele sirva como
          referência para o posicionamento absoluto do botão.
        - ALTERAÇÃO: Removemos 'flex-row'. Os itens não ficarão mais lado a lado.
        - Mantemos 'flex' e 'items-center' para que o letreiro fique centralizado verticalmente.
      */}
      <div className="relative flex items-center">
        {/*
          1. Marquee:
          - Ele agora ocupa a largura total naturalmente.
          - 'overflow-hidden' continua sendo crucial para o efeito.
        */}
        <div className="w-full overflow-hidden bg-[#add083]">
          <motion.div
            ref={marqueeRef}
            // Adicionado 'whitespace-nowrap' por segurança, para garantir que o conteúdo nunca quebre a linha.
            className="flex whitespace-nowrap py-3 sm:py-4"
            style={{ x }}
          >
            {/* Renderiza o conteúdo várias vezes para o loop contínuo */}
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
            <MarqueeContent />
            <MarqueeContent />
          </motion.div>
        </div>

        {/*
          2. Botão Quadrado (agora em sobreposição)
          - ALTERAÇÃO: Este wrapper agora é responsável pelo posicionamento.
          - 'absolute': Tira o botão do fluxo normal e o coloca "flutuando".
          - 'z-10': Garante que o botão fique em uma camada ACIMA do texto.
          - 'top-1/2': Posiciona o topo do elemento a 50% da altura do pai.
          - 'right-4 md:right-8': Posiciona o elemento à direita, com um espaçamento.
          - 'transform -translate-y-1/2': Este é o truque para centralizar verticalmente
            de forma perfeita. Ele move o elemento para cima em 50% da SUA PRÓPRIA altura.
        */}
        <div className="absolute z-10 top-1/2 right-4  md:right-11 lg:right-26 xl:right-61 transform -translate-y-1/2">
          <a
            href="https://drive.google.com/drive/folders/1rZ_5ZquL9I8OE3H-Ddl7obTG7FzMq9yP?usp=sharing"
            target="_blank"
            rel="noopener noreferrer" // Boa prática de segurança para links com target="_blank"
            className="flex items-center justify-center text-center font-bold w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-[#add083] text-black rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105"
            style={{ fontFamily: "'Inter', sans-serif" }}
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
