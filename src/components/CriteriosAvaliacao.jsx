import React from "react";

function CriteriosAvaliacao() {
  return (
    <div className="bg-primary text-black py-12 px-4 sm:px-10 lg:px-24 xl:px-40 2xl:px-60">
      {/* Título */}
      <h2 className="font-handwriting text-3xl sm:text-4xl text-center uppercase mb-8">
        CRITÉRIOS DE AVALIAÇÃO
      </h2>

      {/* Caixinhas */}
      <div className="flex justify-center gap-6">
        <div className="w-40 sm:w-48 md:w-150 h-12 md:h-50 border border-black rounded-xl" />
        <div className="w-40 sm:w-48 md:w-150 h-12 md:h-50 border border-black rounded-xl" />
      </div>
    </div>
  );
}

export default CriteriosAvaliacao;
