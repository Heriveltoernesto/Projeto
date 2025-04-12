// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 bg-gradient-to-br from-yellow-50 to-white min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🏟️ Bem-vindo ao ArenaFutebolBR</h1>
      <p className="text-lg text-gray-600 mb-8">Tudo sobre o esporte, do passado ao presente. Em tempo real.</p>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Link to="/memorias" className="block p-6 rounded-xl shadow bg-white hover:bg-yellow-100 transition">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">📖 Memórias Arena BR</h2>
          <p className="text-sm text-gray-700">Reviva os maiores jogos, estádios históricos e partidas inesquecíveis.</p>
        </Link>

        <Link to="/jogadores" className="block p-6 rounded-xl shadow bg-white hover:bg-yellow-100 transition">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">⭐ Jogadores Históricos</h2>
          <p className="text-sm text-gray-700">Descubra os craques que marcaram época no futebol brasileiro e mundial.</p>
        </Link>

        <Link to="/patrocinadores" className="block p-6 rounded-xl shadow bg-white hover:bg-yellow-100 transition">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">💼 Patrocinadores</h2>
          <p className="text-sm text-gray-700">Veja quem apoia o ArenaFutebolBR e ajude a fortalecer a nossa história.</p>
        </Link>
      </div>

      <div className="mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} ArenaFutebolBR — feito com paixão pelo esporte ⚽
      </div>
    </div>
  );
}
