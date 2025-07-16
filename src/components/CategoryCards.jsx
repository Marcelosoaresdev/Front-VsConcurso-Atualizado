import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- DADOS ---
const categories = [
  {
    title: "REELS",
    description:
      "Crie um vídeo curto e impactante para divulgar os minicursos da Vitis Souls.",
    modalContent: {
      objetivo:
        "Criar um vídeo curto (Reels) com foco na venda dos miniccursos da Vitis Souls.",
      requisitos: [
        "Duração entre 30s a 1m.",
        "Formatos: .mp4, .mov ou .avi.",
        "Utilizar os materiais obrigatórios.",
        "Conteúdo 100% autoral e original.",
        "Não usar músicas ou imagens com direitos autorais.",
      ],
    },
  },
  {
    title: "PITCH",
    description:
      "Apresente uma ideia criativa e original para a divulgação dos minicursos.",
    modalContent: {
      objetivo:
        "Apresentar uma ideia original e criativa para divulgar os minicursos da Vitis Souls.",
      requisitos: [
        "Vídeo de 1:30 a 3 minutos.",
        "Formato Horizontal 1920x1080.",
        "Pode ser fala direta, storytelling, etc.",
        "Definir público-alvo e estratégia.",
        "Não usar conteúdos com direitos autorais.",
      ],
    },
  },
  {
    title: "DESIGN",
    description:
      "Crie uma peça visual que represente os valores da Vitis Souls e promova seus minicursos.",
    modalContent: {
      objetivo:
        "Criar uma peça visual que represente os valores da Vitis Souls e promova seus miniccursos com foco em transformação e conexão com o público jovem.",
      requisitos: [
        "Formatos: post, story, carrossel ou banner.",
        "Mínimo de 1 e máximo de 5 peças.",
        "Utilizar os elementos visuais oficiais da marca.",
        "Proibido o uso de bancos de imagens.",
        "Material 100% original e autoral.",
      ],
    },
  },
];

// --- ANIMAÇÕES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// --- COMPONENTES ---
function CategoryCard({ title, description, onClick }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.04 }} // Scale sutil de 4%
      /* ▼▼▼ AQUI ESTÁ O AJUSTE PARA A ANIMAÇÃO SUAVE ▼▼▼ */
      transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      className="relative bg-[#40013b] rounded-2xl p-6 pt-16 flex flex-col items-center text-center h-full shadow-lg border border-[#5a1c54] cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute -top-8 bg-white rounded-full w-20 h-20 shadow-lg"></div>
      <div className="flex-grow flex flex-col items-center">
        <h3
          className="text-6xl md:text-7xl font-extrabold text-[#c9e265] uppercase"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {title}
        </h3>
        <p
          className="text-white mt-4 text-base leading-relaxed flex-grow"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {description}
        </p>
      </div>
      <div className="mt-6 w-full bg-[#ffc961] text-[#40013b] font-bold py-2 px-8 rounded-md text-lg uppercase">
        Saiba Mais
      </div>
    </motion.div>
  );
}

function CategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCardClick = (category) => setSelectedCategory(category);

  return (
    <div className="py-16 md:py-24 px-4 sm:px-10">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-20"
        >
          <h2
            className="text-[#ffc961] text-center italic px-8 py-2 rounded-xl text-7xl lg:text-8xl tracking-wide mb-4"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            CATEGORIAS
          </h2>
          <p
            className="mt-2 text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Clique em uma categoria para saber mais sobre os requisitos de cada
            uma.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-y-20 md:gap-x-8"
        >
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              {...cat}
              onClick={() => handleCardClick(cat)}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCategory && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCategory(null)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative bg-[#40013b] border border-[#5a1c54] rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div
                className="w-full"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <h3
                  className="text-3xl font-bold mb-6 text-center text-[#add083] uppercase"
                  style={{ fontFamily: "Bebas Neue, sans-serif" }}
                >
                  Categoria: {selectedCategory.title}
                </h3>
                <div className="text-left w-full space-y-6">
                  <div>
                    <h4 className="font-bold text-lg text-white mb-2">
                      Objetivo:
                    </h4>
                    <p className="text-gray-300">
                      {selectedCategory.modalContent.objetivo}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-white mb-2">
                      Requisitos:
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {selectedCategory.modalContent.requisitos.map(
                        (req, index) => (
                          <li key={index}>{req}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CategoryCards;
