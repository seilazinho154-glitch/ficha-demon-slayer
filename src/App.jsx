import { useState } from "react";

export default function App() {
  // Identidade
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("");
  const [origem, setOrigem] = useState("");
  const [afiliacao, setAfiliacao] = useState("");
  const [historia, setHistoria] = useState("");

  // Atributos
  const [atributos, setAtributos] = useState({
    FOR: 1,
    AGI: 1,
    RES: 1,
    PER: 1,
    INT: 1,
    CAR: 1,
    DET: 1,
  });

  // Combate
  const hp = 10 + atributos.RES * 2;
  const folego = 10 + atributos.DET * 2;
  const iniciativa = atributos.AGI + atributos.PER;

  // XP e Nível
  const [xp, setXp] = useState(0);
  const [nivel, setNivel] = useState(1);

  const adicionarXP = (valor) => {
    let novoXP = xp + valor;
    let novoNivel = nivel;

    if (novoXP >= 100) {
      novoXP -= 100;
      novoNivel++;
    } else if (novoXP < 0) {
      if (novoNivel > 1) {
        novoNivel--;
        novoXP = 90; // volta quase para próximo nível
      } else {
        novoXP = 0;
      }
    }

    setXp(novoXP);
    setNivel(novoNivel);
  };

  const mudarAtributo = (atributo, valor) => {
    setAtributos((prev) => ({
      ...prev,
      [atributo]: Math.max(1, prev[atributo] + valor),
    }));
  };

  const Card = ({ title, color, children }) => (
    <div className={`p-4 rounded-lg shadow-md mb-6`} style={{ backgroundColor: color }}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen p-6" style={{ background: "linear-gradient(to bottom, #14532d, #422006)" }}>
      <h1 className="text-3xl font-bold text-center text-white mb-8">📜 Ficha - Mundo Demon Slayer</h1>

      {/* Identidade */}
      <Card title="Identidade" color="#14532d">
        <input className="w-full p-2 mb-2 rounded" placeholder="Nome do Personagem" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input className="w-full p-2 mb-2 rounded" placeholder="Idade" value={idade} onChange={(e) => setIdade(e.target.value)} />
        <input className="w-full p-2 mb-2 rounded" placeholder="Gênero" value={genero} onChange={(e) => setGenero(e.target.value)} />
        <input className="w-full p-2 mb-2 rounded" placeholder="Origem" value={origem} onChange={(e) => setOrigem(e.target.value)} />
        <input className="w-full p-2 mb-2 rounded" placeholder="Afiliação" value={afiliacao} onChange={(e) => setAfiliacao(e.target.value)} />
        <textarea className="w-full p-2 rounded" placeholder="História Resumida" value={historia} onChange={(e) => setHistoria(e.target.value)} />
      </Card>

      {/* Atributos */}
      <Card title="Atributos Principais" color="#1e3a8a">
        {Object.keys(atributos).map((attr) => (
          <div key={attr} className="flex items-center justify-between mb-2">
            <span>{attr}: {atributos[attr]}</span>
            <div>
              <button onClick={() => mudarAtributo(attr, 1)} className="bg-green-600 px-2 py-1 rounded text-white mr-2">+</button>
              <button onClick={() => mudarAtributo(attr, -1)} className="bg-red-600 px-2 py-1 rounded text-white">-</button>
            </div>
          </div>
        ))}
      </Card>

      {/* Combate */}
      <Card title="Combate" color="#7f1d1d">
        <p>Vida (HP): {hp}</p>
        <p>Fôlego: {folego}</p>
        <p>Iniciativa: {iniciativa}</p>
        <input className="w-full p-2 my-2 rounded" placeholder="Arma Principal" />
        <input className="w-full p-2 my-2 rounded" placeholder="Arma Secundária" />
        <input className="w-full p-2 my-2 rounded" placeholder="Estilo de Respiração / Habilidade Oni" />
        <textarea className="w-full p-2 rounded" placeholder="Técnicas Especiais" />
      </Card>

      {/* Progressão */}
      <Card title="Progressão" color="#78350f">
        <p>Nível: {nivel}</p>
        <p>XP: {xp} / 100</p>
        <div className="flex gap-2 mt-2">
          <button onClick={() => adicionarXP(10)} className="bg-green-600 px-3 py-1 rounded text-white">+10 XP</button>
          <button onClick={() => adicionarXP(-10)} className="bg-red-600 px-3 py-1 rounded text-white">-10 XP</button>
        </div>
      </Card>
    </div>
  );
}
