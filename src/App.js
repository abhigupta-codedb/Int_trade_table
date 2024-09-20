import "./App.css";
import DataTable from "./TradeTable";
import { intData } from "./intData";

function App() {
  return (
    <div className="App">
      <DataTable intData={intData} />
    </div>
  );
}

export default App;
