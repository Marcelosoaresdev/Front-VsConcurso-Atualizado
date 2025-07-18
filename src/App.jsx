import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Seus componentes de seção
import MainLayout from "./components/MainLayout";
import RegrasEObjetivos from "./components/RegrasEObjetivos";
import CategoryCards from "./components/CategoryCards";
import Waves from "./components/Waves";
import TextMarquee from "./components/TextMarquee";
import CriteriosAvaliacao from "./components/CriteriosAvaliacao";
import ConhecaVitis from "./components/ConhecaVitis";
import TaxaInscricao from "./components/TaxaInscricao";
import Accordion from "./components/Accordion";
import Contato from "./components/Contato";

// ▼▼▼ IMPORTE OS 3 NOVOS COMPONENTES DE UMA VEZ ▼▼▼
import { Sucesso, Falha, Pendente } from "./components/StatusPages"; // Ajuste o caminho se necessário

// Componente que agrupa todas as seções da página inicial
function PaginaPrincipal() {
  return (
    <>
      <MainLayout />
      <CategoryCards />
      <RegrasEObjetivos />
      <TextMarquee />
      <CriteriosAvaliacao />
      <TaxaInscricao />
      <Waves />
      <ConhecaVitis />
      <Accordion />
      <Contato />
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
