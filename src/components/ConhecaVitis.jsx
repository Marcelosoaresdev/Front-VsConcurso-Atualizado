import React from "react";
// 1. Importando o 'motion' para animações
import { motion } from "framer-motion";
import logoVitis from "../assets/imagens/logoVitis.png";

// 2. Definindo as animações que vamos usar
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Atraso entre a animação da logo e do título
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, // Começa invisível e 50px para baixo
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function ConhecaVitis({ logoSrc = logoVitis, logoAlt = "Logo Vitis Souls" }) {
  return (
    <section className="bg-[#add083] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* 3. Container da animação: ele controla quando a animação começa */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // A animação começa quando o elemento entra na tela
        viewport={{ once: true, amount: 0.3 }} // Anima apenas uma vez
        className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6"
      >
        {/* 4. Cada elemento filho agora tem sua própria animação */}
        <motion.img
          src={logoSrc}
          alt={logoAlt}
          variants={itemVariants}
          className="h-40 w-auto"
        />

        <motion.h1
          variants={itemVariants}
          className="text-[#40013b] text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Conheça a <br /> Vitis Souls
        </motion.h1>
      </motion.div>
    </section>
  );
}

export default ConhecaVitis;
