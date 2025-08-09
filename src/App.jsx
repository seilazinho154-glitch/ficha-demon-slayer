import React, { useState } from "react";

export default function App() {
  const maxPoints = 35;
  const maxPerAttribute = 10;

  const [attributes, setAttributes] = useState({
    forca: 0,
    agilidade: 0,
    resistencia: 0,
    percepcao: 0,
    inteligencia: 0,
    carisma: 0,
    determinacao: 0,
  });

  const [respiracao, setRespiracao] = useState("");
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);

  const totalPoints = Object.values(attributes).reduce((a, b) => a + b, 0);
  const remainingPoints = maxPoints - totalPoints;

  const updateAttribute = (attr, value) => {
    if (value < 0 || value > maxPerAttribute) return;
    const newAttributes = { ...attributes, [attr]: value };
    const sum = Object.values(newAttributes).reduce((a, b) => a + b, 0);
    if (sum <= maxPoints) {
      setAttributes(newAttributes);
    }
  };

  const hp = 10 + attributes.resistencia * 2;
  const stamina = 10 + attributes.determinacao * 2;
  const dano = 5 + attributes.forca * 1.5;
  const iniciativa = attributes.agilidade + attributes.percepcao;

  const xpToNextLevel = Math.floor(100 + level * 20);
  const gainXp = (amount) => {
    let newXp = xp + amount;
    let newLevel = level;
    while (newXp >= xpToNextLevel && newLevel < 50) {
      newXp -= xpToNextLevel;
      newLevel++;
    }
    setXp(newXp);
    setLevel(newLevel);
  };

  const respiracoes = [
    "Respiração da Água",
    "Respiração da Chama",
    "Respiração do Trovão",
    "Respiração da Flor",
    "Respiração da Pedra",
    "Respiração da Serpente",
    "Respiração Original",
  ];

  const Section = ({ title, children, color }) => (
    <div className={`p-4 rounded-xl shadow-md mb-6 text-white`} style={{ backgroundColor: color }}>
      <h2 className="text-lg font-bold mb-3">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <h1 className="text-center text-2xl font-extrabold mb-6 text-gray-800">📜 Ficha de Personagem – Demon Slayer RPG</h1>

      {/* Identidade */}
      <Section title="Identidade" color="#1B4332">
        <input placeholder="Nome do Personagem" className="w-full mb-2 p-2 rounded text-black" />
        <input placeholder="Idade" className="w-full mb-2 p-2 rounded text-black" />
        <input placeholder="Gênero" className="w-full mb-2 p-2 rounded text-black" />
        <input placeholder="Origem" className="w-full mb-2 p-2 rounded text-black" />
        <input placeholder="Afiliação" className="w-full mb-2 p-2 rounded text-black" />
        <textarea placeholder="História Resumida" className="w-full p-2 rounded text-black" />
      </Section>

      {/* Atributos */}
      <Section title="Atributos Principais" color="#FF6B6B">
        <p className="mb-2 font-semibold">Pontos Restantes: {remainingPoints}</p>
        {Object.entries(attributes).map(([attr, value]) => (
          <div key={attr} className="flex items-center mb-2">
            <span className="flex-1 capitalize">
              {attr.charAt(0).toUpperCase() + attr.slice(1)} ({attr.slice(0,3).toUpperCase()}):
            </span>
            <button
              className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-600"
              onClick={() => updateAttribute(attr, value - 1)}
            >
              -
            </button>
            <span className="mx-3">{value}</span>
            <button
              className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-600"
              onClick={() => updateAttribute(attr, value + 1)}
            >
              +
            </button>
          </div>
        ))}
      </Section>

      {/* Combate */}
      <Section title="Combate" color="#4D194D">
        <p>HP: {hp}</p>
        <p>Fôlego: {stamina}</p>
        <p>Dano: {dano}</p>
        <p>Iniciativa: {iniciativa}</p>
        <input placeholder="Arma Principal" className="w-full mb-2 p-2 rounded text-black" />
        <input placeholder="Arma Secundária" className="w-full mb-2 p-2 rounded text-black" />
        <select
          value={respiracao}
          onChange={(e) => setRespiracao(e.target.value)}
          className="w-full p-2 rounded text-black"
        >
          <option value="">Selecione uma Respiração</option>
          {respiracoes.map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </select>
      </Section>

      {/* XP e Progressão */}
      <Section title="Progressão" color="#1D3557">
        <p className="mb-2">Nível: {level} / 50</p>
        <div className="w-full bg-gray-700 rounded h-5 overflow-hidden mb-2">
          <div
            className="bg-yellow-400 h-5 transition-all duration-300"
            style={{ width: `${(xp / xpToNextLevel) * 100}%` }}
          ></div>
        </div>
        <p className="mb-2">XP: {xp} / {xpToNextLevel}</p>
        <button
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
          onClick={() => gainXp(20)}
        >
          Ganhar 20 XP
        </button>
      </Section>
    </div>
  );
}
