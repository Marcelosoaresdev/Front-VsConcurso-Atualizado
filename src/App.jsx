import MainLayout from "./components/MainLayout";
import RegrasEObjetivos from "./components/RegrasEObjetivos";
import CategoryCards from "./components/CategoryCards";
import Waves from "./components/Waves";
import TextMarquee from "./components/TextMarquee";
import CriteriosAvaliacao from "./components/CriteriosAvaliacao";
import Accordion from "./components/Accordion";
import ConhecaVitis from "./components/ConhecaVitis";
import TaxaInscricao from "./components/TaxaInscricao";

function App() {
  return (
    <div className="bg-[#510963] min-h-screen">
      <MainLayout />
      <CategoryCards />
      <RegrasEObjetivos />
      <TextMarquee />
      <CriteriosAvaliacao />
      <TaxaInscricao />
      <Waves />
      <ConhecaVitis />
      <Accordion />
    </div>
  );
}

export default App;
