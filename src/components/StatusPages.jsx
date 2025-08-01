import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  extraContent,
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
          className="text-lg text-gray-300 mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {description}
        </p>
        
        {extraContent && (
          <div className="mb-8">
            {extraContent}
          </div>
        )}
        
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
  const location = useLocation();
  const { nome = "", categorias = [] } = location.state || {};
  
  const formatCategories = (cats) => {
    if (!cats || cats.length === 0) return "";
    
    if (cats.length === 1) return cats[0];
    
    if (cats.length === 2) return `${cats[0]} e ${cats[1]}`;
    
    return cats.slice(0, -1).join(", ") + " e " + cats[cats.length - 1];
  };
  
  const categoriesText = formatCategories(categorias);
  
  const extraContent = nome ? (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[#2d002a] border border-[#add083] rounded-lg p-4 mt-4"
    >
      <p className="text-md text-[#add083] font-medium mb-2">
        Olá, <span className="font-bold">{nome}</span>!
      </p>
      {categoriesText && (
        <p className="text-sm text-gray-300">
          Você está participando {categorias.length > 1 ? 'das categorias' : 'da categoria'}: <span className="font-bold text-[#add083]">{categoriesText}</span>
        </p>
      )}
      <p className="text-sm text-gray-300 mt-2">
        Não esqueça de usar a hashtag <span className="font-bold">#vitissouls</span> nas suas publicações!
      </p>
    </motion.div>
  ) : null;

  return (
    <StatusPageLayout
      icon={<SucessoIcon />}
      title="Inscrição Confirmada!"
      titleColor="text-green-400"
      description="Sua inscrição foi confirmada com sucesso. Bem-vindo(a) ao concurso!"
      buttonText="Voltar para o Início"
      buttonLink="/"
      extraContent={extraContent}
    />
  );
}

export function Falha() {
  return (
    <StatusPageLayout
      icon={<FalhaIcon />}
      title="Erro na Inscrição"
      titleColor="text-red-500"
      description="Não foi possível processar sua inscrição. Verifique sua conexão com a internet e tente novamente."
      buttonText="Tentar Novamente"
      buttonLink="/"
    />
  );
}

export function Pendente() {
  return (
    <StatusPageLayout
      icon={<PendenteIcon />}
      title="Inscrição em Processamento"
      titleColor="text-yellow-400"
      description="Sua inscrição está sendo processada e estamos aguardando a confirmação. Isso pode levar alguns instantes."
      buttonText="Voltar para o Início"
      buttonLink="/"
    />
  );
}
