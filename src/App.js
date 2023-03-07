import React, { useState } from "react";

import StartView from "./components/StartView/startview";
import GameView from "./components/GameView/gameview";
import GameOverView from "./components/GameOverView/gameoverview";

const App = () => {
  const [currentView, setCurrentView] = useState("StartView");
  const [selectedTextOptions, setSelectedTextOptions] = useState(['letters']);
  const [textOptions] = useState(["letters", "numbers", "symbols"]);
  const [spawnRate, setSpawnRate] = useState(20);
  const [hardcore, setHardcore] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleGameStart = (textOptions, spawnRate, hardcore) => {
    setSelectedTextOptions(textOptions);
    setCurrentView("GameView");
    setSpawnRate(spawnRate);
    setHardcore(hardcore);
  };

  const handleGameOver = (score) => {
    setScore(score);
    if (score > highScore) {
      setHighScore(score);
    }
    setCurrentView('GameOverView');
  };

  const handleGameRestart = () => {
    setCurrentView("StartView");
  };

  if (currentView === "StartView") {
    return (
      <StartView
        textOptions={textOptions}
        selectedTextOptions={selectedTextOptions}
        spawnRate={spawnRate}
        onGameStart={handleGameStart}
        hardcore={hardcore}
      />
    );
  } else if (currentView === "GameView") {
    return (
      <GameView
        textOptions={selectedTextOptions}
        spawnRate={spawnRate}
        onGameOver={handleGameOver}
        hardcore={hardcore}
      />
    );
  } else if (currentView === "GameOverView") {
    return (
      <GameOverView
        score={score}
        highScore={highScore}
        selectedTextOptions={selectedTextOptions}
        spawnRate={spawnRate}
        onGameRestart={handleGameRestart}
        hardcore={hardcore}
      />
    );
  } else {
    return (
      <StartView
        textOptions={textOptions}
        selectedTextOptions={selectedTextOptions}
        spawnRate={spawnRate}
        onGameStart={handleGameStart}
      />
    );
  }
};

export default App;
