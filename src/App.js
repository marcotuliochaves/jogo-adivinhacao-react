import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  const [ranking, setRanking] = useState(() => {
    return JSON.parse(localStorage.getItem("ranking")) || [];
  });

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  }, [words]);

  const startGame = useCallback(
    (playerName) => {
      setCurrentPlayer(playerName);
      clearLettersStates();

      const { category, word } = pickWordAndCategory();
      let wordLetters = word.toLowerCase().split("");

      setPickedCategory(category);
      setPickedWord(word);
      setLetters(wordLetters);
      setGameStage(stages[1].name);
    },
    [pickWordAndCategory]
  );

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const verifyWord = (word) => {
    const normalizedWord = word.toLowerCase();
    const normalizedPickedWord = pickedWord.toLowerCase();

    if (normalizedWord === normalizedPickedWord) {
      setScore((prevScore) => prevScore + 200);
      setGuesses((prevGuesses) => prevGuesses + 2);

      clearLettersStates();
      startGame(currentPlayer);
    } else {
      setGuesses((prevGuesses) => prevGuesses - 1);
      setWrongLetters((prev) => [...prev, normalizedWord]);
    }
  };

  const retry = () => {
    setCurrentPlayer("");
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses === 0) {
      clearLettersStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((prevScore) => prevScore + 100);
      startGame(currentPlayer);
    }
  }, [guessedLetters, letters, startGame, currentPlayer]);

  useEffect(() => {
    if (gameStage === "end") {
      const saveData = () => {
        if (!currentPlayer || score === 0) return;

        const existingRanking =
          JSON.parse(localStorage.getItem("ranking")) || [];

        const newEntry = {
          player: currentPlayer,
          score: score,
          date: new Date().toLocaleDateString("pt-BR"),
          word: "—", // ou "Jogo completo"
        };

        const updatedRanking = [...existingRanking, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        localStorage.setItem("ranking", JSON.stringify(updatedRanking));
        setRanking(updatedRanking);
        console.log("Ranking atualizado:", updatedRanking);
      };

      saveData();
    }
  }, [gameStage, currentPlayer, score]);

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          verifyWord={verifyWord}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && (
        <GameOver retry={retry} score={score} ranking={ranking} />
      )}
    </div>
  );
}

export default App;
