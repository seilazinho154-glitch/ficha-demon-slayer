import React, { useState, useEffect } from 'react';

export default function App() {
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState(1);
  const [xp, setXp] = useState(0);

  const xpNecessario = nivel * 100;

  useEffect(() => {
    if (xp >= xpNecessario) {
      setNivel(nivel + 1);
      setXp(xp - xpNecessario);
    }
  }, [xp]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-red-900 p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Ficha - Mundo Demon Slayer</h1>
      
      <div className="bg-black bg-opacity-30 p-4 rounded-lg shadow-lg max-w-lg mx-auto">
        <label className="block mb-2">Nome do Personagem:</label>
        <input 
          type="text" 
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 text-black rounded"
        />

        <p>Nível: {nivel}</p>
        <p>XP: {xp} / {xpNecessario}</p>
        <div className="flex gap-2 mt-2">
          <button onClick={() => setXp(xp + 10)} className="bg-green-700 px-3 py-1 rounded">+10 XP</button>
          <button onClick={() => setXp(xp - 10)} className="bg-red-700 px-3 py-1 rounded">-10 XP</button>
        </div>
      </div>
    </div>
  );
}
