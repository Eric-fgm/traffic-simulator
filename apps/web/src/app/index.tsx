import { Intersection, Sidebar } from "../components";
import QueryClientProvider from "../providers/query-client";
import SimulationProvider from "../providers/simulation";

function App() {
  return (
    <QueryClientProvider>
      <SimulationProvider>
        <div className="font-family flex">
          <Sidebar />
          <Intersection />
        </div>
      </SimulationProvider>
    </QueryClientProvider>
  );
}

export default App;
