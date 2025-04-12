// src/components/RotaPrivada.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function RotaPrivada({ children }) {
  const [autorizado, setAutorizado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarAdmin = async (email) => {
      const snapshot = await getDocs(collection(db, "admins"));
      const lista = snapshot.docs.map(doc => doc.data().email);
      setAutorizado(lista.includes(email));
      setCarregando(false);
    };

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        verificarAdmin(user.email);
      } else {
        setAutorizado(false);
        setCarregando(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (carregando) return <p className="text-center mt-10">Verificando acesso de administrador...</p>;

  if (!autorizado) return <Navigate to="/login" />;

  return children;
}
