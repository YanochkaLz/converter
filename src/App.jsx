import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesC from "./components/RoutesC";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <div className="main">
          <RoutesC />
        </div>
      </main>
    </HashRouter>
  );
}

export default App;
