// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import MemoriasArenaBR from "./pages/MemoriasArenaBR";
import JogadoresHistoricos from "./pages/JogadoresHistoricos";
import Patrocinadores from "./pages/Patrocinadores";
import Noticias from "./pages/Noticias";
import Radios from "./pages/Radios";
import Videos from "./pages/Videos";
import Login from "./pages/Login";
import PainelAdmin from "./pages/PainelAdmin";
import RotaPrivada from "./components/RotaPrivada";

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex gap-4 justify-center text-sm">
        <Link to="/">🏠 Início</Link>
        <Link to="/memorias">📖 Memórias</Link>
        <Link to="/jogadores">⭐ Jogadores</Link>
        <Link to="/patrocinadores">💼 Patrocinadores</Link>
        <Link to="/noticias">📰 Notícias</Link>
        <Link to="/radios">📻 Rádios</Link>
        <Link to="/videos">🎥 Vídeos</Link>
        <Link to="/login">🔐 Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/radios" element={<Radios />} />
        <Route path="/login" element={<Login />} />

        <Route path="/painel-admin" element={<RotaPrivada><PainelAdmin /></RotaPrivada>} />
        <Route path="/memorias" element={<RotaPrivada><MemoriasArenaBR /></RotaPrivada>} />
        <Route path="/jogadores" element={<RotaPrivada><JogadoresHistoricos /></RotaPrivada>} />
        <Route path="/patrocinadores" element={<RotaPrivada><Patrocinadores /></RotaPrivada>} />
        <Route path="/noticias" element={<RotaPrivada><Noticias /></RotaPrivada>} />
        <Route path="/videos" element={<RotaPrivada><Videos /></RotaPrivada>} />
      </Routes>
    </Router>
  );
}
