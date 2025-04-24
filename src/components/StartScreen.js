import { useState } from "react";
import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      startGame(playerName); // Pass the name to the startGame function
    }
  };

  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Digite seu nome e clique para começar!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Seu nome"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value.trimStart())}
          maxLength={15}
          required
          autoFocus
        />
        <button type="submit" disabled={!playerName.trim()}>
          Iniciar Jogo
        </button>
      </form>
    </div>
  );
};

export default StartScreen;
