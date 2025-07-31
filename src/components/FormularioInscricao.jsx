import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModalFormulario from "./ModalFormulario";

// --- ANIMAÇÕES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function FormularioInscricao() {
  const [showModal, setShowModal] = useState(false);

  // Dados para o modal (estrutura compatível com o backend)
  const planoDados = {
    id: "inscricao-gratuita",
    titulo: "Inscrição Gratuita",
    preco: "0",
    features: ["Participação em todas as categorias", "Chance de ganhar R$3000,00"],
    tipo: "gratuito"
  };

  return (
    <>
      <section
        id="inscricao"
        className="py-16 md:py-24 px-4 sm:px-10 lg:px-24 xl:px-40 pt-10 2xl:px-60"
      >
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-7xl lg:text-8xl text-center font-bold text-white uppercase"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Faça sua <span className="text-[#add083]">Inscrição</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="relative border-2 border-[#add083] bg-[#40013b] rounded-2xl p-8 shadow-xl flex flex-col text-center text-white max-w-md w-full"
          >
            <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#add083] text-black font-bold text-sm px-4 py-1 rounded-full uppercase">
              Gratuito
            </span>
            
            <h3 className="text-3xl font-bold uppercase mt-4">Participe do Concurso</h3>
            
            <p className="my-6">
              <span className="text-5xl font-bold text-[#add083]">
                GRÁTIS
              </span>
              <span
                className="text-gray-400 block text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Inscrição sem custo
              </span>
            </p>
            
            <ul
              className="space-y-4 text-left text-gray-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#add083] mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Participe de todas as categorias</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#add083] mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Chance de ganhar até R$3.000</span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#add083] mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Processo 100% online</span>
              </li>
            </ul>
            
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer mt-8 w-full bg-[#add083] text-black font-bold text-lg px-8 py-3 rounded-lg uppercase hover:bg-opacity-90 transition-colors"
            >
              Inscrever-se Gratuitamente
            </button>
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {showModal && (
          <ModalFormulario
            plano={planoDados}
            apiUrl="https://backend-concurso.onrender.com"
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default FormularioInscricao;
