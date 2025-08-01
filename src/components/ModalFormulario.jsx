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

  // Agora permite selecionar quantas categorias quiser (mínimo 1)
  const minCategorias = 1;

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

    // ▼▼▼ Validação agora permite múltiplas categorias (mínimo 1) ▼▼▼
    const isValid =
      nome.trim() !== "" &&
      email.trim() !== "" &&
      unmaskedPhone.length === 11 &&
      perfilInstagram.trim() !== "" && // Garante que não está vazio
      categoriasSelecionadas.length >= minCategorias;

    setIsFormValid(isValid);
  }, [dados, categoriasSelecionadas, minCategorias]);

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Envia os dados para o backend MongoDB
      const response = await axios.post(`${apiUrl}/api/inscricao`, {
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        perfilInstagram: dados.perfilInstagram.startsWith('@') ? dados.perfilInstagram : `@${dados.perfilInstagram}`,
        plano: {
          id: plano.id,
          titulo: plano.titulo,
          preco: plano.preco || "0",
          tipo: plano.tipo || "gratuito"
        },
        categoriasEscolhidas: categoriasSelecionadas,
        dataInscricao: new Date().toISOString(),
        status: "inscrito"
      });

      // Verifica se a inscrição foi salva com sucesso
      if (response && response.data) {
        console.log("Inscrição salva com sucesso:", response.data);
        setStatus("success");
        
        // Redireciona para a página de sucesso após 2 segundos
        setTimeout(() => {
          onClose();
          window.location.href = "/sucesso";
        }, 2000);
      } else {
        throw new Error("Resposta inválida do servidor.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      
      // Mesmo que dê erro na resposta, se a requisição foi processada e os dados
      // já foram enviados com sucesso para o banco, redirecionamos para sucesso
      if (error.response?.status === 500 && error.response?.data?.message?.includes("já existe")) {
        console.log("Inscrição já processada, redirecionando para sucesso");
        setTimeout(() => {
          onClose();
          window.location.href = "/sucesso";
        }, 2000);
        return;
      }
      
      setStatus("error");
      setErrorMessage(
        error.response?.data?.message ||
          "Erro ao processar sua inscrição. Tente novamente."
      );
      
      // Se for um erro realmente crítico, redireciona para a página de falha
      if (error.response?.status >= 500) {
        setTimeout(() => {
          onClose();
          window.location.href = "/falha";
        }, 2000);
      }
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15, 
                delay: 0.2 
              }}
            >
              <CheckCircleIcon />
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-[#add083]"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              🎉 Inscrição Realizada com Sucesso! 🎉
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-2"
            >
              <p className="text-gray-300 text-lg">
                Parabéns! Você está oficialmente inscrito no concurso!
              </p>
              <p className="text-gray-400 text-sm">
                Agora é só criar seu conteúdo e postar no Instagram com #vitissouls
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-[#2d002a] border border-[#add083] rounded-lg p-4 mt-4"
            >
              <p className="text-sm text-[#add083] font-semibold">
                ✨ Boa sorte no concurso! ✨
              </p>
            </motion.div>
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
              <p className="text-sm text-gray-300 text-left mb-2">
                Coloque abaixo o perfil que será postado o conteúdo
              </p>
              <div className="relative">
                {/* O ícone "@" posicionado de forma absoluta */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">@</span>

                  {/* O texto de ajuda com uma das novas sugestões */}
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

              <div className="p-4 border border-[#5a1c54] rounded-lg bg-[#2d002a]/50">
                <h4 className="font-bold text-white mb-2">
                  Selecione as categorias que deseja participar:
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
                        className="w-5 h-5 bg-gray-700 border-gray-600 rounded text-[#add083] focus:ring-2 focus:ring-[#add083]/50"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Selecione pelo menos 1 categoria para participar
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
                  "Finalizar Inscrição Gratuita"
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
