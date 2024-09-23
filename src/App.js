import "./App.css";
import DataTable from "./TradeTable";
import { intData } from "./intData";
import PillarTable from "./PilarTable";
import { pillarData } from "./pillarData";

function App() {
  return (
    <div className="App">
      <h3>Pillar Table</h3>
      <PillarTable pillarData={pillarData} />
      <DataTable intData={intData} />
    </div>
  );
}

export default App;
