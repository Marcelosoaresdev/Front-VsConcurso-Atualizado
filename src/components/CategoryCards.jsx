import React, { useState } from "react";

// Dados atualizados para corresponder à imagem de referência
const categories = [
  {
    title: "REELS",
    description:
      "Vídeo curto emocionante com foco na divulgação dos minicursos da Vittis Souls.",
  },
  {
    title: "PITCH",
    description:
      "Proposta criativa de venda em formato de vídeo argumentativo apresentando os minicursos.",
  },
  {
    title: "DESIGN",
    description:
      "Uma peça visual que promova os minicursos e se conecte com o público jovem.",
  },
];

// Componente do Card com o novo design
function CategoryCard({ title, description, onClick }) {
  return (
    <div className="relative bg-[#40013b] rounded-2xl p-6 pt-16 flex flex-col items-center text-center h-full shadow-lg">
      {/* Círculo branco no topo */}
      <div className="absolute -top-8 bg-white rounded-full w-20 h-20 shadow-lg"></div>

      {/* Conteúdo do card */}
      <div className="flex-grow flex flex-col items-center">
        <h3
          className="text-7xl font-extrabold text-[#c9e265] uppercase"
          style={{ fontFamily: "Bebas Neue, sans-serif" }} // Fonte Bebas Neue
        >
          {title}
        </h3>
        <p className="text-white mt-4 text-base flex-grow">{description}</p>
      </div>

      {/* Botão */}
      <button
        onClick={onClick}
        className="cursor-pointer mt-6 w-full bg-[#ffc961] text-[#40013b] font-bold py-2 px-8 rounded-md text-lg uppercase transition hover:opacity-90"
      >
        Saiba Mais
      </button>
    </div>
  );
}

// Componente principal que renderiza os cards e o modal
function CategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Simula dados para o modal, já que o objeto original foi simplificado
  const handleCardClick = (category) => {
    setSelectedCategory({
      ...category,
      // Adicione aqui os dados que o modal precisa, como icon e clickDescription
      clickDescription:
        "Descrição detalhada para o modal sobre " + category.title,
      icon: "ICON_PLACEHOLDER", // Substitua por um ícone real se necessário
      color: "bg-purple-600", // Cor para o modal
    });
  };

  return (
    // Adaptei o padding e margens para um melhor visual
    <div className=" py-15 md:py-20 px-4 sm:px-10 lg:px-24">
      <div className="container max-w-6xl mx-auto">
        {/* Seu título e descrição existentes */}
        <div className="text-center mb-20">
          <h2
            className="text-[#ffc961] text-center italic px-8 py-2 rounded-xl text-7xl  lg:text-8xl tracking-wide mb-4"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            CATEGORIAS
          </h2>
          <p className="mt-2 text-gray-200 max-w-2xl mx-auto">
            Escolha uma categoria e participe do VS Concurso com sua
            criatividade e talento!
          </p>
        </div>

        {/* Grid de cards atualizado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 md:gap-x-8">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              {...cat}
              onClick={() => handleCardClick(cat)}
            />
          ))}
        </div>
      </div>

      {/* O modal continua funcionando como antes */}
      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/70 "
            onClick={() => setSelectedCategory(null)}
          />
          <div
            className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 my-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center text-center">
              <div
                className={`${selectedCategory.color} rounded-full p-4 mb-4`}
              >
                {/* O ícone aqui precisará ser ajustado, pois foi removido do array principal */}
              </div>
              <h3 className="text-2xl font-bold mb-2">
                {selectedCategory.title}
              </h3>
              <p className="text-gray-700 mb-6">
                {selectedCategory.clickDescription}
              </p>
              <button
                className={`${selectedCategory.color} cursor-pointer text-white font-bold py-3 px-6 rounded-xl shadow hover:opacity-90 transition`}
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryCards;
