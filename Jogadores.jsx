// src/pages/JogadoresHistoricos.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function JogadoresHistoricos() {
  const [jogadores, setJogadores] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: '', posicao: '', pais: '', imagem: '', biografia: '', titulos: '' });
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const fetchJogadores = async () => {
      const querySnapshot = await getDocs(collection(db, "jogadoresHistoricos"));
      const dados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJogadores(dados);
      setLoading(false);
    };
    fetchJogadores();
  }, [enviando]);

  const enviarJogador = async (e) => {
    e.preventDefault();
    setEnviando(true);
    await addDoc(collection(db, "jogadoresHistoricos"), form);
    setForm({ nome: '', posicao: '', pais: '', imagem: '', biografia: '', titulos: '' });
    setEnviando(false);
  };

  const jogadoresFiltrados = jogadores.filter(j =>
    j.nome.toLowerCase().includes(busca.toLowerCase()) ||
    j.posicao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Jogadores Históricos</h1>
      <p className="text-center text-gray-500 mb-6">Conheça os craques que marcaram época no futebol mundial</p>

      <input
        type="text"
        placeholder="Buscar por nome ou posição..."
        className="w-full max-w-xl mx-auto mb-6 p-2 border rounded block"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {loading ? (
        <p className="text-center text-gray-600">Carregando jogadores...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jogadoresFiltrados.map((jogador) => (
            <div key={jogador.id} className="bg-white border p-4 rounded-xl shadow">
              <img
                src={jogador.imagem}
                alt={jogador.nome}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-xl font-bold text-gray-800">{jogador.nome}</h2>
              <p className="text-sm text-gray-600">{jogador.posicao} | {jogador.pais}</p>
              <p className="text-gray-700 mt-2 text-sm">{jogador.biografia}</p>
              {jogador.titulos && <p className="text-xs text-gray-500 mt-2 italic">Títulos: {jogador.titulos}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Adicionar Jogador Histórico</h3>
        <form onSubmit={enviarJogador} className="space-y-4 max-w-xl mx-auto">
          <input type="text" placeholder="Nome" className="w-full p-2 border rounded" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} required />
          <input type="text" placeholder="Posição" className="w-full p-2 border rounded" value={form.posicao} onChange={e => setForm({...form, posicao: e.target.value})} required />
          <input type="text" placeholder="País" className="w-full p-2 border rounded" value={form.pais} onChange={e => setForm({...form, pais: e.target.value})} required />
          <input type="url" placeholder="URL da Imagem" className="w-full p-2 border rounded" value={form.imagem} onChange={e => setForm({...form, imagem: e.target.value})} required />
          <textarea placeholder="Biografia" className="w-full p-2 border rounded" value={form.biografia} onChange={e => setForm({...form, biografia: e.target.value})} required />
          <input type="text" placeholder="Títulos (separados por vírgula)" className="w-full p-2 border rounded" value={form.titulos} onChange={e => setForm({...form, titulos: e.target.value})} />
          <button disabled={enviando} type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {enviando ? 'Enviando...' : 'Adicionar Jogador'}
          </button>
        </form>
      </div>
    </div>
  );
}
