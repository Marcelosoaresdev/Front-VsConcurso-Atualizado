// src/components/ModalFormulario.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// --- Ícones para Feedback Visual ---
const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
const CheckCircleIcon = () => (
  <svg
    className="w-16 h-16 text-[#add083]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const ExclamationCircleIcon = () => (
  <svg
    className="w-16 h-16 text-red-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// --- Animações ---
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
  if (!plano) {
    return null;
  }

  const [dados, setDados] = useState({ nome: "", email: "", telefone: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(""); // Para mensagens de erro

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  // 👇 2. SUBSTITUA COMPLETAMENTE a função handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Envia os dados para a rota correta do backend
      const response = await axios.post(`${apiUrl}/api/inscricao`, {
        ...dados,
        plano: plano, // Envia o objeto 'plano' completo
      });

      // Pega a URL de checkout da resposta do backend
      const { checkoutUrl } = response.data;

      setStatus("success");

      // Redireciona para o pagamento após um pequeno delay
      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setStatus("error");
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Não foi possível conectar ao servidor.");
      }
    }
  };

  const renderContent = () => {
    switch (status) {
      // ... (case 'success' continua o mesmo)
      case "success":
        return (
          <motion.div
            key="success"
            // ... (código do sucesso)
          >
            <CheckCircleIcon />
            <h3 className="text-2xl font-bold">Inscrição Enviada!</h3>
            <p className="text-gray-300">
              Você será redirecionado para o pagamento em instantes...
            </p>
          </motion.div>
        );

      // 👇 3. Adicione a mensagem de erro dinâmica no case 'error'
      case "error":
        return (
          <motion.div
            key="error"
            // ... (código do erro)
          >
            <ExclamationCircleIcon />
            <h3 className="text-2xl font-bold text-red-500">
              Ops! Algo deu errado.
            </h3>
            <p className="text-gray-300">
              {errorMessage} {/* <--- MOSTRA O ERRO DO BACKEND */}
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </motion.div>
        );
      default: // idle or submitting
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
                Falta pouco! Preencha seus dados para continuar.
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
              <input
                type="tel"
                name="telefone"
                placeholder="Seu telefone com DDD"
                value={dados.telefone}
                onChange={handleChange}
                required
                className="w-full p-3 bg-[#2d002a] text-white border border-[#5a1c54] rounded-lg focus:ring-2 focus:ring-[#add083] focus:border-transparent transition"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="cursor-pointer w-full flex justify-center items-center bg-[#add083] text-black font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all hover:scale-105 disabled:bg-gray-500 disabled:scale-100 disabled:cursor-wait"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-[#40013b] border border-[#5a1c54] rounded-2xl p-8 max-w-md w-full"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <button
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </motion.div>
    </div>
  );
}

export default ModalFormulario;
