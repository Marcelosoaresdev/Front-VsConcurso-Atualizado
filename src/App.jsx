import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Seus componentes de seção
import MainLayout from "./components/MainLayout";
import RegrasEObjetivos from "./components/RegrasEObjetivos";
import CategoryCards from "./components/CategoryCards";
import Waves from "./components/Waves";
import TextMarquee from "./components/TextMarquee";
import CriteriosAvaliacao from "./components/CriteriosAvaliacao";
import ConhecaVitis from "./components/ConhecaVitis";
import Accordion from "./components/Accordion";
import Contato from "./components/Contato";
import BotaoFlutuante from "./components/BotaoFlutuante";
import FormularioInscricao from "./components/FormularioInscricao";
import ModalFormulario from "./components/ModalFormulario";

// ▼▼▼ IMPORTE OS 3 NOVOS COMPONENTES DE UMA VEZ ▼▼▼
import { Sucesso, Falha, Pendente } from "./components/StatusPages"; // Ajuste o caminho se necessário

// Componente que agrupa todas as seções da página inicial
function PaginaPrincipal() {
  const [showModal, setShowModal] = useState(false);

  // Dados para o modal (mesma estrutura do FormularioInscricao)
  const planoDados = {
    id: "inscricao-gratuita",
    titulo: "Inscrição Gratuita",
    preco: "0",
    features: [
      "Participação em todas as categorias",
      "Chance de ganhar R$3000,00",
    ],
    tipo: "gratuito",
  };

  return (
    <>
      <MainLayout />
      <CategoryCards />
      <RegrasEObjetivos />
      <TextMarquee />
      <CriteriosAvaliacao />
      <FormularioInscricao />
      <Waves />
      <ConhecaVitis />
      <Accordion />
      <Contato />
      <BotaoFlutuante onOpenModal={() => setShowModal(true)} />

      <AnimatePresence>
        {showModal && (
          <ModalFormulario
            plano={planoDados}
            apiUrl="https://backend-concurso.onrender.com"
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <div className="bg-[#510963] min-h-screen">
      <Router>
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<PaginaPrincipal />} />

          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/falha" element={<Falha />} />
          <Route path="/pendente" element={<Pendente />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
