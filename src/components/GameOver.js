import "./GameOver.css";

const GameOver = ({ retry, score, ranking = [] }) => {
  // Debug: check what ranking data we're receiving
  console.log("Current score:", score);
  console.log("Full ranking data:", ranking);

  // Find current player's position in ranking
  const currentPlayerRank =
    ranking.findIndex((item) => item.score === score) + 1;

  return (
    <div className="game-over-container">
      <h1>Game Over!</h1>

      <div className="score-section">
        <h2>
          Your Score: <span className="highlight">{score}</span>
        </h2>
        {currentPlayerRank > 0 && (
          <p className="rank-message">
            You ranked #{currentPlayerRank} in the leaderboard!
          </p>
        )}
      </div>

      <div className="leaderboard">
        <h3>🏆 Leaderboard 🏆</h3>

        {ranking.length > 0 ? (
          <ol className="ranking-list">
            {ranking.slice(0, 10).map((player, index) => (
              <li
                key={`${player.date}-${index}`}
                className={player.score === score ? "current-player" : ""}
              >
                <span className="rank">#{index + 1}</span>
                <span className="name">{player.player}</span>
                <span className="score">{player.score} pts</span>
                <span className="word">{player.word}</span>
                <span className="date">{player.date}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="no-scores">No scores recorded yet!</p>
        )}
      </div>

      <button onClick={retry} className="retry-button">
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
