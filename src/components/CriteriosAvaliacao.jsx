import React from "react";
import { motion } from "framer-motion";

// --- DADOS E ÍCONES ---
const evaluationCriteria = [
  {
    number: "01", // Adicionado para o efeito de fundo
    title: "DESEMPENHO NAS REDES SOCIAIS:",
    items: [
      "O perfil na rede social deve ser público.",
      "É obrigatório marcar @vitissouls e usar a #vitissouls.",
      "Métricas observadas: visualizações, curtidas, compartilhamentos e comentários.",
      "O uso de tráfego pago para impulsionar o conteúdo é permitido.",
    ],
  },
  {
    number: "02",
    title: "CRIATIVIDADE E TÉCNICA:",
    items: [
      "Originalidade, sensibilidade e poder de conexão da mensagem.",
      "Qualidade de produção visual e sonora do material.",
      "Alinhamento com os valores e a identidade da Vitis Souls.",
    ],
  },
];

const BulletIcon = () => (
  <svg
    className="w-5 h-5 mt-1 text-[#add083] flex-shrink-0"
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <circle cx="8" cy="8" r="5" />
  </svg>
);

// --- ANIMAÇÕES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- COMPONENTE ---
function CriteriosAvaliacao() {
  return (
    <section className=" text-white py-16 md:py-24 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-7xl lg:text-8xl text-center italic uppercase mb-12 text-[#ffc961]"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          CRITÉRIOS DE AVALIAÇÃO
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {evaluationCriteria.map((criterion) => (
            <motion.div
              key={criterion.title}
              variants={itemVariants}
              className="relative bg-[#40013b] p-8 rounded-2xl border-2 border-[#5a1c54] overflow-hidden"
            >
              {/* NÚMERO GIGANTE NO FUNDO */}
              <span
                className="absolute -top-2 -left-2 text-9xl font-black text-white/5"
                aria-hidden="true"
              >
                {criterion.number}
              </span>

              {/* Conteúdo do Card */}
              <div className="relative z-10">
                <h3 className="font-bold text-xl text-[#add083] mb-5">
                  {criterion.title}
                </h3>
                <ul
                  className="space-y-3 text-gray-300"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {criterion.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <BulletIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CriteriosAvaliacao;
