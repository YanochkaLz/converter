import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoutesC from "./components/RoutesC";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <RoutesC />
    </BrowserRouter>
  );
}

export default App;
