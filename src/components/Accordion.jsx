import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Accordions() {
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const panels = [
    {
      title: "O que é a Vitis Souls?",
      body: `A Vitis Souls é um movimento que acredita no poder da transformação.
             No autoconhecimento que inspira, na criatividade que cura,
             e nas ideias que conectam.`,
    },
    {
      title: "Como funciona o concurso?",
      body: `Você pode participar nas categorias Reels, Pitch de Vendas ou Design.
             As melhores inscrições em cada categoria ganham até R$3.000!`,
    },
    {
      title: "Por que participar?",
      body: `É a sua chance de mostrar talento, ganhar visibilidade
             e receber um prêmio para alavancar seus projetos.`,
    },
  ];

  return (
    // aqui vem o padding “global” igual às outras seções do site
    <section className="bg-amber-200 px-4 sm:px-10 lg:px-24 xl:px-40 2xl:px-60">
      {/* espaçamento entre cada accordion */}
      <div className="space-y-4">
        {panels.map((item, idx) => {
          const i = idx + 1;
          return (
            <Accordion
              key={i}
              open={open === i}
              icon={
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform duration-300 ${
                    open === i ? "rotate-180 text-blue-500" : "text-gray-400"
                  }`}
                />
              }
              className={`rounded-xl border transition-shadow ${
                open === i
                  ? "bg-blue-gray-50 border-blue-200 shadow-lg"
                  : "bg-white border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* aqui você mantém o padding interno de cada header */}
              <AccordionHeader
                onClick={() => handleOpen(i)}
                className="flex  bg-white items-center justify-between px-6 py-4"
              >
                <span
                  className={`text-lg font-semibold ${
                    open === i ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {item.title}
                </span>
              </AccordionHeader>
              {/* e o padding interno do corpo também */}
              <AccordionBody className=" bg-white px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                {item.body}
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </section>
  );
}

export default Accordions;