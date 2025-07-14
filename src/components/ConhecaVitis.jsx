import logoVitis from "../assets/imagens/logoVitis.png";

function ConhecaVitis({ logoSrc = logoVitis, logoAlt = "Logo Vitis Souls" }) {
  return (
    <section className=" bg-amber-200 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-20 w-auto md:h-70 mr-1 md:mr-6"
      />
      <h1
        className=" sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-2xl text-gray-900"
        style={{
          fontFamily: "Bebas Neue, sans-serif",
          fontStyle: "",
          letterSpacing: "0.04em",
          fontSize: "6rem",
        }}
      >
        Conheça a Vitis Souls
      </h1>
    </section>
  );
}

export default ConhecaVitis;
