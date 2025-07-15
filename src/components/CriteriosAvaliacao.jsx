import React from "react";

// Dados dos critérios para facilitar a manutenção
const evaluationCriteria = [
  {
    title: "1. DESEMPENHO NAS REDES SOCIAIS:",
    items: [
      "Perfil público.",
      "Marcar @vitissouls e usar #vitissouls.",
      "Métricas: visualizações, curtidas, compartilhamentos, comentários.",
      "É permitido tráfego pago.",
    ],
  },
  {
    title: "2. CRIATIVIDADE E TÉCNICA:",
    items: [
      "Originalidade e sensibilidade.",
      "Qualidade visual e sonora.",
      "Alinhamento com os valores da Vitis Souls (checar no material complementar)",
    ],
  },
];

// Componente para um item da lista (evita repetição de código)
const ListItem = ({ children }) => (
  <li className="flex">
    <span className="mr-2">-</span>
    <span>{children}</span>
  </li>
);

function CriteriosAvaliacao() {
  return (
    // Container principal com fundo roxo e padding
    <div className=" text-white py-12 px-4 sm:px-10 lg:px-24 xl:px-40 2xl:px-60">
      <div className="max-w-4x ">
        {/* Título estilizado como na imagem */}
        <h2
          className="text-7xl  lg:text-8xl text-center italic uppercase mb-10 text-[#ffc961]"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          CRITÉRIOS DE AVALIAÇÃO
        </h2>

        {/* Grid responsivo para os cards: 
            - 1 coluna no celular (padrão)
            - 2 colunas em telas médias e maiores (md:grid-cols-2)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {evaluationCriteria.map((criterion) => (
            // Card de critério
            <div
              key={criterion.title}
              className="bg-[#40013b] p-6 rounded-2xl border-2 border-[#5a1c54]"
            >
              <h3 className="font-bold text-lg mb-4">{criterion.title}</h3>
              <ul className="space-y-2 text-gray-300">
                {criterion.items.map((item) => (
                  <ListItem key={item}>{item}</ListItem>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CriteriosAvaliacao;
