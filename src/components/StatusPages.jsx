import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// --- ÍCONES SVG ---

const SucessoIcon = () => (
  <svg
    className="w-24 h-24 text-green-400 mx-auto mb-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const FalhaIcon = () => (
  <svg
    className="w-24 h-24 text-red-500 mx-auto mb-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PendenteIcon = () => (
  <svg
    className="w-24 h-24 text-yellow-400 mx-auto mb-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- LAYOUT REUTILIZÁVEL ---

const StatusPageLayout = ({
  icon,
  title,
  titleColor,
  description,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#2d002a] text-white text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#40013b] border border-[#5a1c54] rounded-2xl p-8 md:p-12 shadow-2xl max-w-lg w-full"
      >
        {icon}
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${titleColor}`}
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {title}
        </h1>
        <p
          className="text-lg text-gray-300 mb-8"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {description}
        </p>
        <Link
          to={buttonLink}
          className="bg-[#add083] text-black font-bold py-3 px-8 rounded-lg text-lg uppercase hover:bg-opacity-90 transition-colors transform hover:scale-105"
        >
          {buttonText}
        </Link>
      </motion.div>
    </div>
  );
};

// --- PÁGINAS INDIVIDUAIS ---

export function Sucesso() {
  return (
    <StatusPageLayout
      icon={<SucessoIcon />}
      title="Pagamento Aprovado!"
      titleColor="text-green-400"
      description="Sua inscrição foi confirmada com sucesso. Enviamos todos os detalhes para o seu e-mail. Bem-vindo(a) ao concurso!"
      buttonText="Voltar para o Início"
      buttonLink="/"
    />
  );
}

export function Falha() {
  return (
    <StatusPageLayout
      icon={<FalhaIcon />}
      title="Pagamento Recusado"
      titleColor="text-red-500"
      description="Não foi possível processar seu pagamento. Verifique os dados com sua operadora de cartão ou tente um método de pagamento diferente."
      buttonText="Tentar Novamente"
      buttonLink="/"
    />
  );
}

export function Pendente() {
  return (
    <StatusPageLayout
      icon={<PendenteIcon />}
      title="Pagamento Pendente"
      titleColor="text-yellow-400"
      description="Seu pagamento está sendo processado e estamos aguardando a confirmação. Isso pode levar alguns instantes, principalmente para pagamentos via boleto."
      buttonText="Voltar para o Início"
      buttonLink="/"
    />
  );
}
