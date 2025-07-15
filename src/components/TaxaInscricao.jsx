import React from "react";
import { motion } from "framer-motion";

// --- ÍCONE ---
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-[#add083]"
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
);

// --- DADOS ---
const planos = [
  {
    titulo: "1 Categoria",
    preco: "15",
    features: [
      "Inscrição em 1 categoria",
      "Acesso à comunidade de criadores",
      "Certificado de participação",
    ],
  },
  {
    titulo: "2 Categorias",
    preco: "25",
    features: [
      "Inscrição em 2 categorias",
      "Acesso à comunidade de criadores",
      "Suporte prioritário via chat",
    ],
  },
  {
    titulo: "3 Categorias",
    preco: "35",
    features: [
      "Inscrição em 3 categorias",
      "Destaque na galeria de vencedores",
      "Selo de 'Criador Destaque' no perfil",
    ],
    destaque: true,
  },
];

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

// --- COMPONENTE ---
function TaxaInscricao() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-10 lg:px-24 xl:px-40 pt-10 2xl:px-60">
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-7xl lg:text-8xl text-center font-bold text-white uppercase"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        Taxa de <span className="text-[#add083]">Inscrição</span>
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {planos.map((plano, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, scale: plano.destaque ? 1.07 : 1.04 }} // Scale um pouco mais sutil
            /* ▼▼▼ AQUI ESTÁ A MUDANÇA PRINCIPAL ▼▼▼ */
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className={`
                            relative border bg-[#40013b] rounded-2xl p-8 
                            flex flex-col text-center text-white
                            transition-shadow duration-300
                            ${
                              plano.destaque
                                ? "border-[#add083] scale-105 shadow-2xl shadow-[#add083]/10"
                                : "border-[#5a1c54]"
                            }
                        `}
          >
            {plano.destaque && (
              <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#add083] text-black font-bold text-sm px-4 py-1 rounded-full uppercase">
                Mais Recomendado
              </span>
            )}
            <h3 className="text-3xl font-bold uppercase">{plano.titulo}</h3>
            <p className="my-6">
              <span className="text-5xl font-bold text-[#add083]">
                R${plano.preco}
              </span>
              <span
                className="text-gray-400"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                /taxa única
              </span>
            </p>
            <ul
              className="space-y-4 text-left text-gray-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {plano.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-[#add083] text-black font-bold text-lg px-8 py-3 rounded-lg uppercase hover:bg-opacity-90 transition-colors">
              Inscrever-se
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default TaxaInscricao;
