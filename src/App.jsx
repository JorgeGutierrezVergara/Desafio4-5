import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./assets/components/Navigation";
import Home from "./assets/views/Home";
import Pizza from "./assets/views/Pizza";
import Carrito from "./assets/views/Carrito";
import CounterProvider from "./assets/context/CounterContext";

function App() {
  return (
    <>
      <div className="App">
        <CounterProvider>
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Carrito" element={<Carrito />} />
              <Route path="/Pizza/:id" element={<Pizza />} />
            </Routes>
          </BrowserRouter>
        </CounterProvider>
      </div>
    </>
  );
}

export default App;
