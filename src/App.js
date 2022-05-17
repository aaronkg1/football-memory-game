import { useState, useEffect, useRef } from "react";
import { randomPlayerSelector } from "./utilities/player-List";
import { useHttps } from "./hooks/https";
import { DisplayPlayers } from "./components/DisplayPlayers";
import { shuffle } from "./utilities/shuffle";
import "./styles/App.css";

function App() {
  const [players, setPlayers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const randomPlayerIDs = randomPlayerSelector();
  let [loadingState, fetchedPlayers] = useHttps(
    "https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=",
    randomPlayerIDs,
    [gameOver]
  );

  useEffect(() => {
    setIsLoading(loadingState);
    const playersCopy = [...fetchedPlayers];
    playersCopy.forEach((item) => {
      item.clicked = 0;
    });
    setPlayers(playersCopy);
  }, [fetchedPlayers, loadingState]);

  useEffect(() => {
    if (score >= bestScore) {
      setBestScore(score);
    }
    if (gameOver === true) {
      const playersCopy = [...fetchedPlayers];
      playersCopy.forEach((item) => {
        item.clicked = 0;
      });
      setPlayers(playersCopy);
      setGameOver(false);
    }
  }, [score, fetchedPlayers, bestScore, gameOver]);

  const selectPlayer = (e) => {
    const selectedPlayer = players.filter((player) => {
      return player.players[0].idPlayer === e.target.id;
    });
    selectedPlayer[0].clicked += 1;
    if (selectedPlayer[0].clicked > 1) {
      setScore(0);
      setGameOver(true);
    } else
      setScore((score) => {
        return score + 1;
      });

    setPlayers(shuffle(players));
  };
  let playerDisplay;
  isLoading === true
    ? (playerDisplay = <div>Players Loading...</div>)
    : (playerDisplay = (
        <DisplayPlayers players={players} selectPlayer={selectPlayer} />
      ));

  return (
    <div className="main-container">
      <header>
        <p>Current Score: {score}</p>
        <h1>Football Memory Game</h1>
        <p>Best Score: {bestScore}</p>
      </header>
      <div className="content">
        <div className="player-display">{playerDisplay}</div>
      </div>
    </div>
  );
}

export default App;
