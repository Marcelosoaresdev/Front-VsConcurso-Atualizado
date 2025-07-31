import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function BotaoFlutuante({ onOpenModal }) {
  const [showButton, setShowButton] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Verifica se a seção de inscrição já está visível
      const inscricaoSection = document.getElementById("inscricao");
      if (inscricaoSection) {
        const rect = inscricaoSection.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        if (isInView) {
          setShowButton(false);
          return;
        }
      }

      // Mostrar botão apenas após rolar 300px para baixo
      setShowButton(window.scrollY > 180);

      // Limpa o timeout anterior
      clearTimeout(scrollTimeout.current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleClick = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      // Fallback para comportamento anterior se onOpenModal não for fornecido
      document.getElementById("inscricao").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          key="botao-flutuante"
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#ffc961] to-[#ffb428] text-[#40013b] font-bold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center gap-2"
          initial={{ opacity: 0, y: 50, scale: 1 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: 50, scale: 1 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          aria-label="Inscreva-se no concurso"
        >
          <span>Inscreva-se aqui</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default BotaoFlutuante;
