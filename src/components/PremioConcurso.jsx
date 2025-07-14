// src/components/PremioConcurso.jsx
import React from "react";
import PremioImg from "../assets/imagens/dinheiro.jpeg";

export default function PremioConcurso() {
  return (
    // aqui já deixamos o próprio componente full-screen e centralizado
    <div className=" flex items-center justify-center bg-primary">
      <div className="bg-primary text-black flex items-center p-8 rounded-lg">
        {/* Imagem à esquerda */}
        <img
          src={PremioImg}
          alt="R$ 1000"
          className="md:w-[400px] w-23 h-auto flex-shrink-0 mr-8"
        />

        {/* Texto e ondulações */}
        <div className="flex flex-col">
          <h2 className="text-4xl font-handwriting leading-tight">
            Prêmio do concurso
          </h2>
          <svg
            className="mt-2 w-24 h-6 text-gray-900"
            viewBox="0 0 100 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,10 C20,0 40,20 60,10 S100,10 100,10"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
