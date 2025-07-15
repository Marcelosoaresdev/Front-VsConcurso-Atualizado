import React from "react";

// Um componente simples para os itens da lista, para evitar repetição
const RuleItem = ({ children }) => (
  <li className="flex text-left">
    <span className="mr-3">-</span>
    <p>{children}</p>
  </li>
);

function ContestRules() {
  return (
    <div className=" text-white py-12 px-4 sm:px-10 lg:px-24 xl:px-40 2xl:px-60">
      <h2
        className="text-[#ffc961] text-center italic px-8 py-2 rounded-xl text-7xl  lg:text-8xl tracking-wide mb-4"
        style={{ fontFamily: "Bebas Neue, sans-serif" }}
      >
        REGRAS DO CONCURSO
      </h2>
      <div className="container  bg-[#40013b] p-6 md:p-8 rounded-lg border-2 border-[#5a1c54]">
        {/* Título Principal */}

        {/* Grid com as duas colunas de regras */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna da Esquerda (mais larga) */}
          <div className="md:col-span-2">
            <ul className="space-y-3 text-base">
              <RuleItem>Idade mínima para participação: 18 anos</RuleItem>
              <RuleItem>
                A inscrição é individual, mas pode conter mais pessoas dentro do
                conteúdo em si.
              </RuleItem>
              <RuleItem>
                Você pode se inscrever em quantas categorias quiser e concorrer
                em cada uma delas <br />
                (com conteúdos separados para cada uma).
              </RuleItem>
              <RuleItem>Prazo final para envio é até o fim de Agosto.</RuleItem>
              <RuleItem>O conteúdo deve ser autoral e original.</RuleItem>
              <RuleItem>O uso da logo da Vittis Souls é obrigatório.</RuleItem>
            </ul>
          </div>

          {/* Coluna da Direita */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              **É PROIBIDO**
            </h3>
            <ul className="space-y-3 text-base">
              <RuleItem>
                Conteúdo ofensivo, discriminatório ou violento.
              </RuleItem>
              <RuleItem>
                Uso de material com direitos autorais sem permissão. (músicas,
                vídeos ou imagens)
              </RuleItem>
              <RuleItem>Uso de marcas ou logos de terceiros.</RuleItem>
              <RuleItem>Descumprimento das regras de inscrição.</RuleItem>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContestRules;
