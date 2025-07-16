import React from "react";
// 1. Importando o 'motion' para animações
import { motion } from "framer-motion";

import BannerTop from "./BannerTop";
import VideoVertical from "./VideoVertical";
import premioImage from "../assets/imagens/premio.png";

// 2. Definindo as animações que vamos usar
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Atraso entre a animação de cada item filho
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // Começa invisível e 30px para baixo
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }, // Anima para visível e na posição original
};

function MainLayout() {
  return (
    <section className="px-4 sm:px-10 lg:px-24 xl:px-40 pt-10 2xl:px-60 space-y-10">
      {/* Banner principal (sem animação para não atrasar o carregamento inicial) */}
      <div className="rounded-3xl border border-[#5d3559] overflow-hidden h-[25vh] lg:h-[50vh] flex items-center justify-center">
        <BannerTop />
      </div>

      {/* 3. Container da animação: ele controla quando a animação começa */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // A animação começa quando o elemento entra na tela
        viewport={{ once: true, amount: 0.2 }} // Anima apenas uma vez
        className="flex flex-col md:flex-row gap-10 md:gap-4 lg:gap-6 items-stretch"
      >
        {/* Coluna da Esquerda com animação */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:gap-6 w-full md:w-2/3"
        >
          <div className="relative border bg-[#40013b] border-[#5a1c54] rounded-2xl p-6 md:p-6 lg:p-10 flex flex-col justify-center grow">
            <h2
              className="absolute -top-10 sm:-top-8 md:-top-10 left-1/2 -translate-x-1/2 text-[#ffc961] text-center italic uppercase px-2 sm:px-8 py-2 rounded-xl text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wide"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              O QUE É O<br />
              CONCURSO?
            </h2>

            {/* 4. TIPOGRAFIA: Nova fonte 'Inter' e classes de texto melhoradas */}
            <p
              className="text-gray-300 text-center text-base md:text-lg leading-relaxed mt-8 sm:mt-20 md:mt-20 lg:mt-30"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              O concurso é uma iniciativa para incentivar pessoas criativas a
              criarem conteúdos originais e inovadores que ajudem na divulgação
              dos mini cursos da Vitis Souls.
            </p>
            <p
              className="text-gray-300 text-center text-base md:text-lg leading-relaxed mt-4 md:mt-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Os mini cursos são uma ferramenta prática, embasada
              cientificamente e com diversos aprendizados para elevar sua vida a
              um novo nível, com temas variados desde vida financeira até
              objetivos futuros e saúde física.
            </p>
          </div>

          <img
            src={premioImage}
            alt="Prêmio de R$1.000 para o vencedor de cada categoria"
            className="w-full h-auto max-w-md self-center"
          />
        </motion.div>

        {/* Coluna da Direita com animação */}
        <motion.div variants={itemVariants} className="w-full md:w-1/3">
          <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden border border-[#40013b] shadow-lg">
            <VideoVertical />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default MainLayout;
