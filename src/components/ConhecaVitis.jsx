import React from "react";
import logoVitis from "../assets/imagens/logoVitis.png";

function ConhecaVitis({ logoSrc = logoVitis, logoAlt = "Logo Vitis Souls" }) {
  return (
    // 1. Consistência: Usando o fundo escuro do tema. Mais padding vertical para respiro.
    <section className="bg-[#40013b] py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Container para centralizar todo o conteúdo e definir o espaçamento */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* 2. Responsividade: Tamanho do logo ajustado para diferentes telas. Classes inválidas removidas. */}
        <img
          src={logoSrc}
          alt={logoAlt}
          className="h-16 sm:h-20 md:h-24 w-auto"
        />

        <h1
          // 3. Código Limpo: Estilos inline removidos. Tipografia controlada 100% pelo Tailwind.
          // A fonte "Bebas Neue" é aplicada aqui (supondo que esteja no seu tema).
          className="text-white text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider"
          style={{ fontFamily: "Bebas Neue, sans-serif" }} // Mantido por consistência, mas o ideal seria uma classe customizada
        >
          Conheça a Vitis Souls
        </h1>
      </div>
    </section>
  );
}

export default ConhecaVitis;
