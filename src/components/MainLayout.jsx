import React from "react";
// 1. Importando o 'motion' para animações
import { motion } from "framer-motion";

import BannerTop from "./BannerTop";
import VideoVertical from "./VideoVertical";
import premioImage from "../assets/imagens/premio.webp";
import instagramImage from "../assets/imagens/instagram.svg";
import tiktokImage from "../assets/imagens/tiktok.svg";
import fotoFlavia from "../assets/imagens/fotoFlavia.webp";

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
    <section className="px-4 sm:px-10 lg:px-24 xl:px-40 pt-4 2xl:px-60 space-y-10">
      {/* Banner principal (sem animação para não atrasar o carregamento inicial) */}
      <div className="rounded-3xl border border-[#5d3559] overflow-hidden h-[25vh] lg:h-[50vh] flex items-center justify-center">
        <BannerTop />
      </div>
      {/* Redes sociais melhoradas para tablets */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 mb-14 text-center sm:text-left">
        {/* Foto da Flávia */}
        <div className="flex-shrink-0">
          <img
            src={fotoFlavia}
            alt="Foto de Flávia, a criadora do concurso"
            className="rounded-full w-28 h-28 md:w-32 md:h-32 object-cover object-[center_30%]"
            loading="lazy"
          />
        </div>

        {/* Texto + ícones */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <p
            className="lg:text-3xl text-xl md:text-xl text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Siga nossas redes sociais
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/vitissouls"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar Instagram"
              className="transition-transform hover:scale-110"
            >
              <img
                src={instagramImage}
                alt="Instagram"
                className="md:h-14 md:w-14 h-12 w-12"
              />
            </a>

            <a
              href="https://tiktok.com/@vitissouls_"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar TikTok"
              className="transition-transform hover:scale-110"
            >
              <img
                src={tiktokImage}
                alt="TikTok"
                className="md:h-14 md:w-14 h-12 w-12"
              />
            </a>
          </div>
        </div>
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
          <div className="relative border-2 bg-[#40013b] border-[#5a1c54] rounded-2xl p-6 md:p-8 lg:p-12 flex flex-col items-center pt-16 md:pt-20 lg:pt-24 overflow-visible">
            {/* Title with better positioning and responsive line breaks */}
            <h2
              className="absolute -top-6 sm:-top-8 md:-top-10 left-1/2 -translate-x-1/2 
             text-[#ffc961] text-center italic uppercase px-6 py-3 rounded-xl 
             bg-[#40013b] border-2 border-[#5a1c54] z-10 max-w-[700px] w-full leading-tight"
              style={{
                fontFamily: "Bebas Neue, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)", // menor em desktop pra caber melhor
                lineHeight: "1.1",
              }}
            >
              Mostre sua Criatividade
              <br />e Concorra a até R$3.000!
            </h2>

            {/* Content with improved spacing and typography */}
            <div className="mt-8 md:mt-10 lg:mt-12 w-full max-w-3xl text-center space-y-6">
              <p
                className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                O concurso é uma iniciativa para incentivar
                <strong className="text-[#ffc961] font-semibold">
                  {" "}
                  pessoas criativas{" "}
                </strong>
                a criarem{" "}
                <span className="text-[#ffc961]">
                  conteúdos originais e inovadores{" "}
                </span>
                que ajudem na divulgação dos{" "}
                <strong className="text-white">mini cursos</strong> da{" "}
                <strong className="text-white">Vitis Souls</strong>.
              </p>

              <p
                className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Os <strong className="text-white">mini cursos</strong> são uma
                <strong className="text-[#ffc961]"> ferramenta prática</strong>,
                embasada cientificamente e com{" "}
                <span className="text-white">diversos aprendizados </span> para{" "}
                <strong className="text-[#ffc961]">
                  elevar sua vida a um novo nível
                </strong>
                , com temas variados desde{" "}
                <strong className="text-white">vida financeira </strong>
                até{" "}
                <strong className="text-white">
                  objetivos futuros e saúde física
                </strong>
                .
              </p>
            </div>
          </div>

          {/* ✅ SUGESTÃO APLICADA: Botão de CTA principal */}
          <div className="text-center py-8">
            <motion.a
              href="#inscricao"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(173, 208, 131, 0.4)",
              }}
              className="inline-block bg-[#ffc961] text-black font-bold text-xl md:text-2xl px-8 py-4 rounded-xl shadow-lg"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Quero me inscrever e concorrer a R$3.000!
            </motion.a>
          </div>

          <img
            src={premioImage}
            alt="Prêmio de R$1.000 para o vencedor de cada categoria"
            className="w-full h-auto max-w-md self-center"
            fetchPriority="high"
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
