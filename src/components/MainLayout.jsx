import BannerTop from "./BannerTop";
import OQueE from "./OQueE";
import Categorias from "./Categorias";
import VideoVertical from "./VideoVertical";

function MainLayout() {
  return (
    <section className="px-4 sm:px-10 lg:px-24 xl:px-40 pt-10 2xl:px-60 space-y-6">
      {/* Banner principal */}
      <div className="rounded-3xl border border-white overflow-hidden h-[25vh] lg:h-[50vh] flex items-center justify-center">
        <BannerTop />
      </div>

      {/* Grid/flex de conteúdo: texto | vídeo */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        {/* Texto */}
        <div className="relative w-full border border-white md:w-3/5 lg:w-2/3  rounded-2xl p-6 md:p-10 mt-8 flex flex-col justify-center">
          {/* Título sobreposto */}
          <h2
            className="
              absolute 
              -top-12 
              left-1/2 
              -translate-x-1/2 
              text-yellow-400 
              text-center 
              font-semibold 
              italic 
              uppercase 
              px-8 
              py-2 
              rounded-xl
              text-4xl 
              sm:text-2xl 
              md:text-6xl 
              tracking-wide"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              fontStyle: "italic",
              letterSpacing: "0.04em",
            }}
          >
            O QUE É O<br />
            CONCURSO?
          </h2>
          {/* Conteúdo do card */}
          <p className="text-gray-200 text-base md:text-lg leading-relaxed mt-8 text-center md:text-left">
            O concurso é uma iniciativa para incentivar pessoas criativas a
            criarem conteúdos originais e inovadores que ajudem na divulgação
            dos mini cursos da Vitis Souls. Os mini cursos são uma ferramenta
            prática, embasada cientificamente e com diversos aprendizados para
            elevar sua vida a um novo nível, com temas variados desde vida
            financeira até objetivos futuros e saúde física.
          </p>
        </div>

        {/* Vídeo */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex justify-center md:justify-end items-center">
          <div className="w-full max-w-[340px] h-80 md:h-[30rem] lg:h-[40rem] rounded-2xl overflow-hidden">
            <VideoVertical />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainLayout;
