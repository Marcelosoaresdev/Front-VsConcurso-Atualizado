import React from "react";
import BannerTop from "./BannerTop";
import VideoVertical from "./VideoVertical";
// Supondo que a imagem está em src/assets/imagens/premio.png
import premioImage from "../assets/imagens/premio.png";

function MainLayout() {
  return (
    <section className="px-4 sm:px-10 lg:px-24 xl:px-40 pt-10 2xl:px-60 space-y-10">
      {/* Banner principal */}
      <div className="rounded-3xl border border-[#5a1c54] overflow-hidden h-[25vh] lg:h-[50vh] flex items-center justify-center">
        <BannerTop />
      </div>

      {/* LAYOUT PRINCIPAL:
        - Agora é SEMPRE `flex-row` (lado a lado).
        - O espaçamento (`gap`) é menor no celular.
      */}
      <div className="flex flex-row gap-2 sm:gap-6 items-start">
        {/* Coluna Esquerda: Texto + Imagem 
          - Ocupa 60% da largura no celular (w-3/5) e se ajusta para telas maiores.
        */}
        <div className="flex flex-col gap-4 sm:gap-6 w-3/5 md:w-2/3">
          {/* Card "O QUE É O CONCURSO?" */}
          <div className="relative border bg-[#40013b] border-[#5a1c54] rounded-2xl p-3 sm:p-6 md:p-10 flex flex-col justify-center">
            <h2
              // FONTE E POSIÇÃO RESPONSIVAS
              className="absolute -top-10 sm:-top-8 md:-top-10 lg:-top-10 left-1/2 -translate-x-1/2 text-[#ffc961] text-center italic uppercase px-2 sm:px-8 py-2 rounded-xl 
                         text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              O QUE É O<br />
              CONCURSO?
            </h2>

            {/* PARÁGRAFOS COM FONTE RESPONSIVA */}
            <p className="text-gray-200 text-center text-[12.9px]  md:text-[15.48px] leading-snug sm:leading-relaxed mt-8 sm:mt-10 md:mt-30">
              O concurso é uma iniciativa para incentivar pessoas criativas a
              criarem conteúdos originais e inovadores que ajudem na divulgação
              dos mini cursos da Vitis Souls.
            </p>
            <p className="text-gray-200 text-center text-[12.9px] md:text-[15.48px] leading-snug sm:leading-relaxed mt-2 sm:mt-4 md:mt-6">
              Os mini cursos são uma ferramenta prática, embasada
              cientificamente e com diversos aprendizados para elevar sua vida a
              um novo nível, com temas variados desde vida financeira até
              objetivos futuros e saúde física.
            </p>
          </div>

          {/* Imagem do Prêmio */}
          <img
            src={premioImage}
            alt="Prêmio de R$1.000 para o vencedor de cada categoria"
            className="w-full h-full max-w-md self-center"
          />
        </div>

        {/* Coluna Direita: Vídeo 
          - Ocupa 40% da largura no celular (w-2/5)
        */}
        <div className="w-2/5 md:w-1/3">
          <div className="w-full aspect-[9/16] rounded-2xl overflow-hidden border border-[#40013b] shadow-lg">
            <VideoVertical />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainLayout;
