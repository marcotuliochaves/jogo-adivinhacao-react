import { useState, useRef } from "react";
import "./Game.css";

const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  verifyWord,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");
  const [wordGuess, setWordGuess] = useState("");
  const letterInputRef = useRef(null);
  const wordInputRef = useRef(null);

  const handleLetterSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");
    letterInputRef.current.focus();
  };

  const handleWordSubmit = (e) => {
    e.preventDefault();
    verifyWord(wordGuess);
    setWordGuess("");
    wordInputRef.current.focus();
  };

  return (
    <div>
      <div className="game">
        <p className="points">
          <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra: </h1>
        <h3 className="tip">
          Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativas!</p>
        <div className="wordContainer">
          {letters.map((letters, i) =>
            guessedLetters.includes(letters) ? (
              <span key={i} className="letter">
                {" "}
                {letters}
              </span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )
          )}
        </div>
        <div className="letterContainer">
          <p>Tente adivinhar uma letra da palavra:</p>
          <form onSubmit={handleLetterSubmit}>
            <input
              type="text"
              name="letter"
              maxLength="1"
              required
              onChange={(e) => setLetter(e.target.value)}
              value={letter}
              ref={letterInputRef}
            />
            <button>Jogar!</button>
          </form>
          <div className="wordGuessContainer">
            <p>Ou chute a palavra inteira:</p>
            <form onSubmit={handleWordSubmit}>
              <input
                type="text"
                name="word"
                required
                onChange={(e) => setWordGuess(e.target.value)}
                value={wordGuess}
                ref={wordInputRef}
              />
              <button>Arriscar!</button>
            </form>
          </div>
        </div>
        <div className="wrongLettersContainer">
          <p>Letras já utilizadas:</p>
          {wrongLetters.map((letter, i) => (
            <span key={i}>{letter}, </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
