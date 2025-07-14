import React, { useState } from "react";

const categories = [
  {
    title: "REELS",
    subtitle: "SAIBA MAIS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    ),
    description: "Crie reels criativos e concorra a prêmios incríveis",
    clickDescription: "Participe do desafio de pitchs e mostre sua ideia",
    color: "bg-purple-600",
  },
  {
    title: "DESIGN",
    subtitle: "SAIBA MAIS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    description: "Mostre seu talento em design gráfico e digital",
    clickDescription: "Participe do desafio de pitchs e mostre sua ideia",
    color: "bg-blue-600",
  },
  {
    title: "PITCH DE VENDAS",
    subtitle: "SAIBA MAIS",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
        />
      </svg>
    ),
    description: "Apresente sua ideia em pitchs de vídeo de 60 segundos",
    clickDescription: "Participe do desafio de pitchs e mostre sua ideia",
    color: "bg-green-600",
  },
];

function CategoryCard({ title, icon, description, color, onClick }) {
  return (
    <div className="relative border border-white rounded-xl p-6 pb-12 flex flex-col items-center text-center h-full">
      <div className="absolute -top-6 md:-top-8 left-1/2 transform -translate-x-1/2 rounded-full shadow-lg ">
        <div className={`${color} rounded-full p-3`}>{icon}</div>
      </div>
      <div className="mt-12 flex-grow">
        <h3 className="text-2xl font-bebas text-white md:text-3xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-white">{description}</p>
      </div>
      <button
        onClick={onClick}
        className={`cursor-pointer absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm py-2 px-3.5 lg:text-2xl lg:py-2 lg:px-8 translate-y-1/2 ${color} text-white font-bold  rounded-sm shadow transition`}
      >
        SAIBA MAIS
      </button>
    </div>
  );
}

function CategoryCards() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="px-4 sm:px-10 lg:px-24 xl:px-40 2xl:px-60 mb-35 mt-15">
      <div className="container max-w-auto mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">CATEGORIAS</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-4"></div>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Escolha uma categoria e participe do VS Concurso com sua
            criatividade e talento!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-15 md:gap-12 md:min-h-80">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              {...cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay atrás do modal */}
          <div
            className="absolute inset-0 bg-black/50 cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          />

          {/* Modal */}
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
                {selectedCategory.icon}
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
