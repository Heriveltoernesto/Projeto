// src/pages/MemoriasArenaBR.jsx
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function MemoriasArenaBR() {
  const [jogosAntigos, setJogosAntigos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ time1: '', time2: '', data: '', estadio: '', resumo: '' });
  const [enviando, setEnviando] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const fetchJogos = async () => {
      const querySnapshot = await getDocs(collection(db, "jogosAntigos"));
      const dados = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJogosAntigos(dados);
      setLoading(false);
    };
    fetchJogos();
  }, [enviando]);

  const enviarJogo = async (e) => {
    e.preventDefault();
    setEnviando(true);
    if (editandoId) {
      await updateDoc(doc(db, "jogosAntigos", editandoId), form);
      setEditandoId(null);
    } else {
      await addDoc(collection(db, "jogosAntigos"), form);
    }
    setForm({ time1: '', time2: '', data: '', estadio: '', resumo: '' });
    setEnviando(false);
  };

  const editarJogo = (jogo) => {
    setForm({ time1: jogo.time1, time2: jogo.time2, data: jogo.data, estadio: jogo.estadio, resumo: jogo.resumo });
    setEditandoId(jogo.id);
  };

  const excluirJogo = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta memória?")) {
      await deleteDoc(doc(db, "jogosAntigos", id));
      setEnviando(true);
      setTimeout(() => setEnviando(false), 500);
    }
  };

  return (
    <div className="p-6 bg-yellow-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-yellow-900">Memórias Arena BR</h1>
      <p className="text-center text-yellow-700 mb-8">Reviva grandes momentos do esporte brasileiro e mundial</p>

      {loading ? (
        <p className="text-center text-yellow-800">Carregando memórias esportivas...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jogosAntigos.map((jogo) => (
            <div key={jogo.id} className="bg-white rounded-xl shadow-md p-4 border border-yellow-200">
              <h2 className="text-xl font-semibold text-yellow-800">{jogo.time1} x {jogo.time2}</h2>
              <p className="text-sm text-gray-600">Data: {jogo.data}</p>
              <p className="text-sm text-gray-600">Estádio: {jogo.estadio}</p>
              <p className="mt-2 text-gray-700">{jogo.resumo}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => editarJogo(jogo)} className="px-3 py-1 bg-blue-500 text-white rounded">Editar</button>
                <button onClick={() => excluirJogo(jogo.id)} className="px-3 py-1 bg-red-500 text-white rounded">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 border-t pt-6 border-yellow-300">
        <h3 className="text-xl font-bold text-yellow-900 mb-2">{editandoId ? 'Editar Memória' : 'Adicione uma nova memória'}</h3>
        <form onSubmit={enviarJogo} className="space-y-4">
          <input type="text" placeholder="Time 1" className="w-full p-2 border rounded" value={form.time1} onChange={e => setForm({...form, time1: e.target.value})} required />
          <input type="text" placeholder="Time 2" className="w-full p-2 border rounded" value={form.time2} onChange={e => setForm({...form, time2: e.target.value})} required />
          <input type="date" className="w-full p-2 border rounded" value={form.data} onChange={e => setForm({...form, data: e.target.value})} required />
          <input type="text" placeholder="Estádio" className="w-full p-2 border rounded" value={form.estadio} onChange={e => setForm({...form, estadio: e.target.value})} required />
          <textarea placeholder="Resumo do jogo" className="w-full p-2 border rounded" value={form.resumo} onChange={e => setForm({...form, resumo: e.target.value})} required />
          <button disabled={enviando} type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
            {enviando ? (editandoId ? 'Atualizando...' : 'Enviando...') : (editandoId ? 'Atualizar Memória' : 'Enviar Memória')}
          </button>
        </form>
      </div>

      <div className="mt-12 border-t pt-6 border-yellow-300">
        <h3 className="text-xl font-bold text-yellow-900 mb-2">Espaço para Patrocinadores</h3>
        <p className="text-gray-700 mb-4">Sua marca pode estar aqui, apoiando a história do esporte! Entre em contato para mais informações.</p>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Quero Patrocinar</button>
      </div>
    </div>
  );
}
