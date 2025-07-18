// src/components/ModalFormulario.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { IMaskInput } from "react-imask";

const allCategories = ["REELS", "PITCH", "DESIGN"];

// --- Ícones e Animações (continuam os mesmos) ---
const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    {" "}
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>{" "}
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>{" "}
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    className="w-16 h-16 text-[#add083]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />{" "}
  </svg>
);
const ExclamationCircleIcon = () => (
  <svg
    className="w-16 h-16 text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />{" "}
  </svg>
);
const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
  exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
};
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function ModalFormulario({ plano, onClose, apiUrl }) {
  if (!plano) return null;

  // ▼▼▼ Adicionado 'perfilInstagram' ao estado inicial ▼▼▼
  const [dados, setDados] = useState({
    nome: "",
    email: "",
    telefone: "",
    perfilInstagram: "",
  });
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const maxCategorias = parseInt(plano.titulo.charAt(0));

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCategoriasSelecionadas([...categoriasSelecionadas, value]);
    } else {
      setCategoriasSelecionadas(
        categoriasSelecionadas.filter((cat) => cat !== value)
      );
    }
  };

  useEffect(() => {
    // ▼▼▼ Adicionado 'perfilInstagram' à desestruturação ▼▼▼
    const { nome, email, telefone, perfilInstagram } = dados;
    const unmaskedPhone = telefone.replace(/\D/g, "");

    // ▼▼▼ Validação agora inclui o perfil do Instagram ▼▼▼
    const isValid =
      nome.trim() !== "" &&
      email.trim() !== "" &&
      unmaskedPhone.length === 11 &&
      perfilInstagram.trim() !== "" && // Garante que não está vazio
      categoriasSelecionadas.length === maxCategorias;

    setIsFormValid(isValid);
  }, [dados, categoriasSelecionadas, maxCategorias]);

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await axios.post(`${apiUrl}/api/inscricao`, {
        ...dados,
        // Adiciona o @ de volta antes de enviar, para padronizar
        perfilInstagram: `@${dados.perfilInstagram}`,
        plano: plano,
        categoriasEscolhidas: categoriasSelecionadas,
      });

      if (
        response &&
        response.data &&
        typeof response.data.checkoutUrl === "string"
      ) {
        setStatus("success");
        setTimeout(() => {
          window.location.href = response.data.checkoutUrl;
        }, 2000);
      } else {
        throw new Error("Resposta inválida do servidor.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message ||
          "Não foi possível gerar o link de pagamento."
      );
    }
  };

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <motion.div
            key="success"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center flex flex-col items-center space-y-4 text-white"
          >
            {" "}
            <CheckCircleIcon />{" "}
            <h3 className="text-2xl font-bold">Inscrição Enviada!</h3>{" "}
            <p className="text-gray-300">
              Você será redirecionado para o pagamento...
            </p>{" "}
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            key="error"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-center flex flex-col items-center space-y-4 text-white"
          >
            {" "}
            <ExclamationCircleIcon />{" "}
            <h3 className="text-2xl font-bold text-red-500">
              Ops! Algo deu errado.
            </h3>{" "}
            <p className="text-gray-300">{errorMessage}</p>{" "}
            <button
              onClick={() => setStatus("idle")}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Tentar Novamente
            </button>{" "}
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="form"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-center mb-6">
              <h2
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                Inscrição:{" "}
                <span className="text-[#add083]">{plano.titulo}</span>
              </h2>
              <p className="text-gray-400 mt-2">
                Preencha seus dados e selecione suas categorias.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="nome"
                placeholder="Seu nome completo"
                value={dados.nome}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#2d002a] text-white border border-[#5a1c54] rounded-lg focus:ring-2 focus:ring-[#add083] focus:border-transparent transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Seu melhor e-mail"
                value={dados.email}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#2d002a] text-white border border-[#5a1c54] rounded-lg focus:ring-2 focus:ring-[#add083] focus:border-transparent transition"
              />
              <IMaskInput
                mask="(00) 00000-0000"
                value={dados.telefone}
                name="telefone"
                type="tel"
                placeholder="Seu telefone com DDD"
                required
                className="w-full p-3 bg-[#2d002a] text-white border border-[#5a1c54] rounded-lg focus:ring-2 focus:ring-[#add083] focus:border-transparent transition"
                onAccept={(value) => setDados({ ...dados, telefone: value })}
              />

              {/* ▼▼▼ NOVO CAMPO DE INSTAGRAM ▼▼▼ */}
              {/* Container que permite o posicionamento absoluto do ícone */}
              <div className="relative">
                {/* O ícone "@" posicionado de forma absoluta */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">@</span>
                </div>

                {/* Seu input com o padding esquerdo para não sobrepor o ícone */}
                <input
                  type="text"
                  name="perfilInstagram"
                  placeholder="Seu perfil do Instagram"
                  value={dados.perfilInstagram}
                  onChange={handleChange}
                  required
                  // O padding esquerdo (pl-8 ou pl-9) dá espaço para o @
                  className="w-full p-3 pl-8 bg-[#2d002a] text-white border border-[#5a1c54] rounded-lg focus:ring-2 focus:ring-[#add083] focus:border-transparent transition"
                />
              </div>

              {/* O texto de ajuda com uma das novas sugestões */}
              <p className="text-sm text-gray-300">
                A avaliação considerará apenas os conteúdos publicados neste perfil.
              </p>

              <div className="p-4 border border-[#5a1c54] rounded-lg bg-[#2d002a]/50">
                <h4 className="font-bold text-white mb-2">
                  Selecione {maxCategorias} Categoria(s):
                </h4>
                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center space-x-3 cursor-pointer text-white"
                    >
                      <input
                        type="checkbox"
                        value={cat}
                        onChange={handleCategoryChange}
                        checked={categoriasSelecionadas.includes(cat)}
                        disabled={
                          categoriasSelecionadas.length >= maxCategorias &&
                          !categoriasSelecionadas.includes(cat)
                        }
                        className="w-5 h-5 bg-gray-700 border-gray-600 rounded text-[#add083] focus:ring-2 focus:ring-[#add083]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Selecionadas: {categoriasSelecionadas.length} de{" "}
                  {maxCategorias}
                </p>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || status === "submitting"}
                className="cursor-pointer w-full flex justify-center items-center bg-[#add083] text-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all hover:scale-105 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <SpinnerIcon />
                ) : (
                  `Pagar R$${plano.preco}`
                )}
              </button>
            </form>
          </motion.div>
        );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />{" "}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-[#40013b] border border-[#5a1c54] rounded-2xl p-8 max-w-md w-full"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {" "}
        <button
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          {" "}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />{" "}
          </svg>{" "}
        </button>{" "}
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>{" "}
      </motion.div>{" "}
    </div>
  );
}

export default ModalFormulario;
