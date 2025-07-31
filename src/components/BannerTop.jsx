import CapaBanner from "../assets/imagens/capa_concurso_banner.webp";

function BannerTop() {
  return (
    <div className="w-full h-full object-cover">
      <img
        src={CapaBanner}
        alt="Capa do concurso"
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
  );
}

export default BannerTop;
