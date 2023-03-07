import React, { useState } from 'react';
import Header from '../Header/header';
import Button from '../Button/button';

import './gameoverview.css'

const GameOverView = ({ selectedTextOptions, score, highScore, hardcore, spawnRate, onGameRestart }) => {
  const [animatingOut, setAnimatingOut] = useState(false);

  const restartGame = () => {
    setAnimatingOut(true);
    setTimeout(() => {
      onGameRestart();
    }, 500);
  };

  const options = selectedTextOptions.map((el, i, arr) => {
    let tail = ', ';
    if (i === arr.length - 1) {
      tail = '';
    }
    let text = el.charAt(0).toUpperCase() + el.slice(1) + tail;
    return text;
  });

  const highScoretext = score === highScore ? 'New Highscore!' : '';

  let spawnSpeedText = '';
  switch (spawnRate) {
    case 10:
      spawnSpeedText = 'Faster';
      break;
    case 15:
      spawnSpeedText = 'Fast';
      break;
    case 20:
      spawnSpeedText = 'Normal';
      break;
    case 25:
      spawnSpeedText = 'Slow';
      break;
    case 30:
      spawnSpeedText = 'Slower';
      break;
    default:
      spawnSpeedText = '';
      break;
  }

  const hardcoreText = hardcore ? 'Hardcore' : '';

  const containerStyle = animatingOut ? { top: '-150vh' } : {};

  return (
    <div className="view-container">
    <div className="inner-container" style={containerStyle}>
        <Header>Type Fall</Header>
        <div className='gameover-container'>
          <h2>Game Over!</h2>
          <h2>{highScoretext}</h2>
          <h3>Score: {score}</h3>
          <h3>Highscore: {highScore}</h3>
          <h3>{hardcoreText}</h3>
          <h3>Characters: {options}</h3>
          <h3>Speed: {spawnSpeedText}</h3>
          <div style={{ textAlign: 'right' }}>
            <Button handleClick={restartGame}>New Game</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOverView;
