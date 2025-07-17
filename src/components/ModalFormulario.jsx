// src/components/ModalFormulario.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { IMaskInput } from "react-imask";

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
  if (!plano) {
    return null;
  }

  const [dados, setDados] = useState({ nome: "", email: "", telefone: "" });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ▼▼▼ NOVOS ESTADOS PARA VALIDAÇÃO ▼▼▼
  // Guarda os erros de cada campo (ex: { email: 'E-mail inválido' })
  const [errors, setErrors] = useState({});
  // Guarda quais campos o usuário já tocou (para não mostrar erro antes da hora)
  const [touched, setTouched] = useState({});

  // Função para marcar um campo como "tocado" quando o usuário sai dele
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // ▼▼▼ useEffect agora valida cada campo e define os erros ▼▼▼
  useEffect(() => {
    const validate = () => {
      const newErrors = {};

      // Validação do Nome
      if (!dados.nome.trim()) newErrors.nome = "O nome é obrigatório.";

      // Validação do E-mail (formato simples)
      if (!dados.email) {
        newErrors.email = "O e-mail é obrigatório.";
      } else if (!/\S+@\S+\.\S+/.test(dados.email)) {
        newErrors.email = "Formato de e-mail inválido.";
      }

      // Validação do Telefone
      const unmaskedPhone = dados.telefone.replace(/\D/g, "");
      if (unmaskedPhone.length < 11)
        newErrors.telefone = "O telefone está incompleto.";

      setErrors(newErrors);
    };

    validate();
  }, [dados]); // Roda a validação sempre que os dados mudam

  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      // Força todos os campos a mostrarem seus erros se o usuário tentar submeter um formulário inválido
      setTouched({ nome: true, email: true, telefone: true });
      setErrorMessage("Por favor, preencha todos os campos corretamente.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await axios.post(`${apiUrl}/api/inscricao`, {
        ...dados,
        plano: plano,
      });

      if (
        response &&
        response.data &&
        typeof response.data.checkoutUrl === "string"
      ) {
        const checkoutUrl = response.data.checkoutUrl;
        setStatus("success");
        setTimeout(() => {
          window.location.href = checkoutUrl;
        }, 2000);
      } else {
        throw new Error("Resposta inválida do servidor.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      setStatus("error");
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage(
          "Não foi possível gerar o link de pagamento. Tente novamente."
        );
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
            <CheckCircleIcon />
            <h3 className="text-2xl font-bold">Inscrição Enviada!</h3>
            <p className="text-gray-300">
              Você será redirecionado para o pagamento em instantes...
            </p>
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
            <ExclamationCircleIcon />
            <h3 className="text-2xl font-bold text-red-500">
              Ops! Algo deu errado.
            </h3>
            <p className="text-gray-300">{errorMessage}</p>
            <button
              onClick={() => setStatus("idle")}
              className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Tentar Novamente
            </button>
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
                Falta pouco! Preencha seus dados para continuar.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {" "}
              {/* Aumentei o espaçamento para a mensagem de erro */}
              <div>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome completo"
                  value={dados.nome}
                  onChange={handleChange}
                  onBlur={handleBlur} // Adiciona o evento onBlur
                  required
                  // ▼▼▼ Lógica para mudar a cor da borda ▼▼▼
                  className={`w-full p-3 bg-[#2d002a] text-white border rounded-lg focus:ring-2 focus:border-transparent transition ${
                    touched.nome && errors.nome
                      ? "border-red-500 focus:ring-red-500"
                      : touched.nome && !errors.nome
                      ? "border-green-500 focus:ring-green-500"
                      : "border-[#5a1c54] focus:ring-[#add083]"
                  }`}
                />
                {/* ▼▼▼ Mostra a mensagem de erro se existir ▼▼▼ */}
                {touched.nome && errors.nome && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.nome}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu melhor e-mail"
                  value={dados.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full p-3 bg-[#2d002a] text-white border rounded-lg focus:ring-2 focus:border-transparent transition ${
                    touched.email && errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : touched.email && !errors.email
                      ? "border-green-500 focus:ring-green-500"
                      : "border-[#5a1c54] focus:ring-[#add083]"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <IMaskInput
                  mask="(00) 00000-0000"
                  value={dados.telefone}
                  name="telefone"
                  type="tel"
                  placeholder="Seu telefone com DDD"
                  required
                  onBlur={handleBlur}
                  className={`w-full p-3 bg-[#2d002a] text-white border rounded-lg focus:ring-2 focus:border-transparent transition ${
                    touched.telefone && errors.telefone
                      ? "border-red-500 focus:ring-red-500"
                      : touched.telefone && !errors.telefone
                      ? "border-green-500 focus:ring-green-500"
                      : "border-[#5a1c54] focus:ring-[#add083]"
                  }`}
                  onAccept={(value) => {
                    setDados({ ...dados, telefone: value });
                  }}
                />
                {touched.telefone && errors.telefone && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.telefone}
                  </p>
                )}
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
