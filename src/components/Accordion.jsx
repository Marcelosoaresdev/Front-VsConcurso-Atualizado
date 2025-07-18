import React, { useState } from "react";
import { motion } from "framer-motion";

// --- DADOS ---
const faqData = [
  {
    question: "O que é a Vitis Souls?",
    answer: (
      <>
        <p className="mb-4">
          A Vitis Souls não é apenas uma marca, é um movimento de transformação.
          Criada por Flávia Cavalcante, autora, psicóloga, coach e terapeuta, a
          Vitis nasceu da coragem de transformar dores pessoais em um projeto
          coletivo de autoconhecimento e reencontro com o sentido da vida.
        </p>
        <p>
          É uma marca que fala com pessoas reais, que se sentem perdidas,
          sobrecarregadas, vivendo no automático — mas que ainda desejam
          recomeçar de forma mais leve, verdadeira e profunda.
        </p>
      </>
    ),
  },
  {
    question: "Quais são os pilares da Vitis Souls?",
    answer: (
      <>
        <p className="mb-4">
          Tudo na Vitis é feito com sensibilidade, verdade e um cuidado que se
          traduz numa comunicação acolhedora, como um abraço em forma de
          conteúdo, apoiado nos seguintes pilares:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Espiritual</li>
          <li>Emocional</li>
          <li>Físico</li>
          <li>Financeiro</li>
        </ul>
      </>
    ),
  },
  {
    question: "Como são os minicursos?",
    answer: (
      <>
        <p className="mb-4">
          São conteúdos acessíveis, profundos e objetivos, criados para quem
          precisa de clareza interior e ferramentas práticas para recomeçar,
          abordando temas como:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Autoconhecimento</li>
          <li>Cura da autoestima e das relações</li>
          <li>Conexão com o propósito</li>
          <li>Fortalecimento emocional</li>
          <li>Prosperidade com consciência</li>
        </ul>
        <p className="mt-4">
          Os cursos são 100% online, com linguagem direta e sensível e preço
          acessível — especialmente para estudantes e professores.
        </p>
      </>
    ),
  },
];

// --- ANIMAÇÕES ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- COMPONENTES ---
function AccordionItem({ item, isOpen, onClick }) {
  return (
    <motion.div variants={itemVariants} className="border-b border-[#92b06d]">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-2 cursor-pointer"
      >
        <h3
          className={`text-lg lg:text-[1.5rem] font-semibold transition-colors ${
            isOpen ? "text-[#40013b]" : "text-gray-800"
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {item.question}
        </h3>
        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            className="w-6 h-6 text-[#40013b]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ maxHeight: isOpen ? "1000px" : "0" }}
      >
        <div
          className="pb-5 px-2 text-xl text-gray-700 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {item.answer}
        </div>
      </div>
    </motion.div>
  );
}

function Accordions() {
  const [openIndex, setOpenIndex] = useState(0);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#add083] py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl sm:text-7xl text-center text-[#40013b] uppercase mb-12"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Perguntas Frequentes
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-2"
        >
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Accordions;
