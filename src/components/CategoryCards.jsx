import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ÍCONES SVG ---
const ReelsIcon = ({ className = "w-15 h-15 text-[#40013b]" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PitchIcon = ({ className = "w-15 h-15 text-[#40013b]" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Círculo invisível para centralizar visualmente */}
    <circle cx="12" cy="12" r="10" fill="none" stroke="none" />
    {/* Linha vertical do cifrão */}
    <path d="M12 3v16" />
    {/* Curvas do "S" */}
    <path d="M16 8c0-2-2-3-4-3s-4 1-4 3 2 3 4 3 4 1 4 3-2 3-4 3-4-1-4-3" />
  </svg>
);

const DesignIcon = ({ className = "w-15 h-15 text-[#40013b]" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    />
  </svg>
);

// --- DADOS ---
const categories = [
  {
    title: "REELS",
    description:
      "Crie um vídeo curto e impactante para divulgar os minicursos da Vitis Souls.",
    icon: <ReelsIcon />,
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
    icon: <PitchIcon />,
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
    icon: <DesignIcon />,
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
function CategoryCard({ title, description, onClick, icon }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, scale: 1.04 }}
      transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      className="relative bg-[#40013b] rounded-2xl p-6 pt-16 flex flex-col items-center text-center h-full shadow-lg border border-[#5a1c54] cursor-pointer"
      onClick={onClick}
    >
      {/* ▼▼▼ 2. Adicione o ícone dentro do círculo branco ▼▼▼ */}
      <div className="absolute -top-8 bg-white rounded-full w-20 h-20 shadow-lg flex items-center justify-center">
        {icon}
      </div>

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
