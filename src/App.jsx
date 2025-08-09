import { useState } from "react";

export default function App() {
  const [atributos, setAtributos] = useState({
    FOR: 1,
    AGI: 1,
    RES: 1,
    PER: 1,
    INT: 1,
    CAR: 1,
    DET: 1,
  });

  const [xp, setXp] = useState(0);
  const nivel = Math.floor(xp / 100) + 1;

  const handleChangeAtributo = (key, value) => {
    setAtributos({ ...atributos, [key]: parseInt(value) || 0 });
  };

  // Cálculos automáticos
  const hp = 10 + atributos.RES * 2;
  const folego = 10 + atributos.DET * 2;
  const iniciativa = atributos.AGI + atributos.PER;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        📜 Ficha de Personagem – Mundo de Demon Slayer
      </h1>

      <div className="w-full max-w-4xl space-y-6">
        {/* Identidade */}
        <section className="bg-green-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Identidade</h2>
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Nome do Personagem" />
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Idade" type="number" />
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Gênero" />
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Origem" />
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Afiliação" />
          <textarea className="w-full p-2 rounded text-black" placeholder="História Resumida"></textarea>
        </section>

        {/* Atributos */}
        <section className="bg-red-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Atributos Principais</h2>
          {Object.keys(atributos).map((key) => (
            <div key={key} className="flex justify-between mb-2">
              <label>{key}</label>
              <input
                type="number"
                className="w-16 p-1 text-black rounded"
                value={atributos[key]}
                min="1"
                max="5"
                onChange={(e) => handleChangeAtributo(key, e.target.value)}
              />
            </div>
          ))}
        </section>

        {/* Combate */}
        <section className="bg-yellow-700 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Combate</h2>
          <p>Vida (HP): {hp}</p>
          <p>Fôlego: {folego}</p>
          <p>Iniciativa: {iniciativa}</p>
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Arma Principal" />
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Arma Secundária" />
          <input className="w-full mb-2 p-2 rounded text-black" placeholder="Estilo de Respiração / Habilidade Oni" />
          <textarea className="w-full p-2 rounded text-black" placeholder="Técnicas Especiais"></textarea>
        </section>

        {/* Progressão */}
        <section className="bg-purple-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-2">Progressão</h2>
          <p>Nível: {nivel}</p>
          <p>Experiência: {xp}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => setXp(xp + 10)} className="bg-green-500 px-3 py-1 rounded">+10 XP</button>
            <button onClick={() => setXp(Math.max(0, xp - 10))} className="bg-red-500 px-3 py-1 rounded">-10 XP</button>
          </div>
          <textarea className="w-full mt-2 p-2 rounded text-black" placeholder="Técnicas Aprendidas"></textarea>
          <textarea className="w-full mt-2 p-2 rounded text-black" placeholder="Marcas ou Evoluções"></textarea>
        </section>
      </div>
    </div>
  );
}
