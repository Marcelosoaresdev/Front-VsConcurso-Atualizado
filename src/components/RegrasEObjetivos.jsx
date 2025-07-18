import React from "react";
import { motion } from "framer-motion";

// Ícones para clareza visual
const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-[#add083] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
const ForbiddenIcon = () => (
  <svg
    className="w-6 h-6 text-[#ffc961] flex-shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
    />
  </svg>
);

// Componente de item da lista aprimorado com ícone
const RuleItem = ({ children, icon }) => (
  <motion.li variants={itemVariants} className="flex items-start gap-3">
    {icon}
    <p className="flex-1">{children}</p>
  </motion.li>
);

// Animações
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function ContestRules() {
  const generalRules = [
    "Idade mínima para participação: 18 anos.",
    "A inscrição é individual, mas o conteúdo pode incluir mais pessoas.",
    "Você pode se inscrever em quantas categorias quiser, desde que envie conteúdos distintos para cada uma.",
    "O prazo final para envio dos materiais é até o último dia de Agosto.",
    "Todo o conteúdo deve ser 100% autoral e original.",
    "O uso da logo oficial da Vitis Souls no material é obrigatório.",
  ];

  const forbiddenRules = [
    "Conteúdo ofensivo, discriminatório ou que incite violência.",
    "Uso de material com direitos autorais (músicas, vídeos, imagens) sem permissão.",
    "Uso de marcas, logos ou qualquer propriedade intelectual de terceiros.",
    "Plágio ou descumprimento de qualquer uma das regras de inscrição.",
  ];

  return (
    <div className="py-16 md:py-24 px-4 sm:px-10 lg:px-24 xl:px-40 pt-10 2xl:px-60">
      <div className=" text-white">
        <h2
          className="text-[#ffc961] text-center italic px-8 py-2 rounded-xl text-7xl lg:text-8xl tracking-wide mb-12"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          REGRAS DO CONCURSO
        </h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto bg-[#40013b] p-6 md:p-10 rounded-2xl border-2 border-[#5a1c54]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Coluna da Esquerda (Regras Gerais) */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-6">
                O que você precisa saber:
              </h3>
              <ul className="space-y-4 text-base text-gray-300">
                {generalRules.map((rule, index) => (
                  <RuleItem key={index} icon={<CheckIcon />}>
                    {rule}
                  </RuleItem>
                ))}
              </ul>
            </div>

            {/* Coluna da Direita (Proibições) */}
            <div>
              <h3 className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
                <ForbiddenIcon />
                <span>É Proibido</span>
              </h3>
              <ul className="space-y-4 text-base text-gray-300">
                {forbiddenRules.map((rule, index) => (
                  <RuleItem key={index} icon={<ForbiddenIcon />}>
                    {rule}
                  </RuleItem>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContestRules;
