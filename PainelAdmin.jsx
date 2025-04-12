// src/pages/PainelAdmin.jsx
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function PainelAdmin() {
  const navigate = useNavigate();

  const sair = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">⚙️ Painel de Administração</h1>
        <button onClick={sair} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Sair
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <AdminCard rota="/memorias" titulo="📖 Gerenciar Memórias" />
        <AdminCard rota="/jogadores" titulo="⭐ Gerenciar Jogadores" />
        <AdminCard rota="/patrocinadores" titulo="💼 Gerenciar Patrocinadores" />
        <AdminCard rota="/noticias" titulo="📰 Gerenciar Notícias" />
        <AdminCard rota="/videos" titulo="🎥 Gerenciar Vídeos" />
        <AdminCard rota="/estatisticas" titulo="📊 Ver Estatísticas" />
        <AdminCard rota="/gerenciar-admins" titulo="🔐 Gerenciar Admins" />
      </div>
    </div>
  );
}

function AdminCard({ rota, titulo }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md border text-center">
      <a href={rota} className="text-lg font-semibold text-blue-600 hover:underline block">
        {titulo}
      </a>
    </div>
  );
}
