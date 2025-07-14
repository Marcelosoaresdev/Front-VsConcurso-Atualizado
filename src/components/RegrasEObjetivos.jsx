import React from "react";

function RegrasEObjetivos() {
  return (
    <div className="bg-primary text-white py-3 px-4 sm:px-10 lg:px-24 xl:px-40 2xl:px-60">
      <div className="mx-auto">
        {/* Container com grid responsivo */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6">
          {/* Card de Objetivos */}
          <div className="bg-gray-800 rounded-xl p-2 md:p-5 shadow-lg border border-gray-700">
            <div className="flex items-center mb-5">
              <div className="bg-red-500 p-2 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h- w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-md md:text-2xl font-bold text-red-500">
                PROIBIDO
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex">
                <span className="text-teal-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Conteúdo ofensivo, discriminatório ou violento.
                </p>
              </li>
              <li className="flex">
                <span className="text-teal-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Uso de material com direitos autorais sem permissão. (músicas,
                  vídeos ou imagens)
                </p>
              </li>
              <li className="flex">
                <span className="text-teal-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Uso de marcas ou logos de terceiros.
                </p>
              </li>
              <li className="flex">
                <span className="text-teal-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Descumprimento das regras de inscrição.
                </p>
              </li>
              <li className="flex">
                <span className="text-teal-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Promover a excelência e inovação em concursos públicos.
                </p>
              </li>
            </ul>
          </div>

          {/* Card de Regras */}
          <div className="bg-gray-800 rounded-xl p-2 md:p-5 shadow-lg border border-gray-700">
            <div className="flex items-center mb-5">
              <div className="bg-blue-500 p-2 rounded-lg mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-md md:text-2xl font-bold text-blue-400">
                REGRAS
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex">
                <span className="text-blue-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Idade mínima para participação: 18 anos.
                </p>
              </li>
              <li className="flex">
                <span className="text-blue-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  A inscrição é individual, mas pode conter mais pessoas dentro
                  do conteúdo em si.
                </p>
              </li>
              <li className="flex">
                <span className="text-blue-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Você pode se inscrever em quantas categorias quiser e
                  concorrer em cada uma delas. (com conteúdos separados para
                  cada uma)
                </p>
              </li>
              <li className="flex">
                <span className="text-blue-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  Prazo final para envio é até o fim de Agosto.
                </p>
              </li>
              <li className="flex">
                <span className="text-blue-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  O conteúdo deve ser autoral e original.
                </p>
              </li>
              <li className="flex">
                <span className="text-blue-400 mr-2">•</span>
                <p className="text-xs md:text-base">
                  O uso da logo da Vitis Souls é obrigatória.(checar mídia ki
                  com conteúdo complementar que você pode usar)
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegrasEObjetivos;
