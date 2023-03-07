import React, { useState, useEffect, useRef } from "react";

import HealthBar from "../HealthBar/healthbar";

const data = {
  letters: "abcdefghijklmnopqrstuvwxyz".split(""),
  numbers: "0123456789".split(""),
  symbols: "<>;'\"[]{}+=()&%$#@!_-*:.,`".split(""),
};

const GameView = ({ textOptions, spawnRate, onGameOver, hardcore }) => {
  let sampleOptions = textOptions.map((val) => {
    if (data[val]) {
      return data[val];
    } else {
      return null;
    }
  });
  sampleOptions = [].concat.apply([], sampleOptions);

  const [options, setOptions] = useState(sampleOptions);
  const [optionsPlaying, setOptionsPlaying] = useState([]);
  const [speed] = useState(0.9);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [animatingOut, setAnimatingOut] = useState(false);
  let gameTime = 0;
  const intSpeed = 50;
  const spawnRateInterval = intSpeed * spawnRate;

  const randomIntInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const addNewItem = () => {
    if (options.length > 0) {
      const index = randomIntInRange(0, options.length);
      let item = {
        character: options[index],
        xPosition: randomIntInRange(5, 95),
        yPosition: -20,
        active: true,
        hitHealth: false,
        remove: false,
      };
      setOptionsPlaying((prevOptionsPlaying) => [...prevOptionsPlaying, item]);
    }
  };

  const updatePositions = () => {
    setOptionsPlaying((prevOptionsPlaying) => {
      let options = [];
      prevOptionsPlaying.forEach(function (val) {
        if (val.active) {
          val.yPosition += speed;
        }
        if (val.yPosition > 80 && val.active) {
          val.active = false;
          val.deathTimer = 0;
          val.hitHealth = true;
          setHealth((prevHealth) => prevHealth - 10);
        }
        if (!val.active) {
          val.deathTimer++;
        }
        if (val.deathTimer > 20) {
          val.remove = true;
        }
        if (val.remove) {
          setOptions((prevOptions) => [...prevOptions, val.character]);
        } else {
          options.push(val);
        }
      });
      return options;
    });
  };


  const gameInterval = () => {
    if (gameTime % spawnRateInterval === 0) {
      addNewItem();
    }
    if (document.querySelector("input") && !animatingOut) {
      document.querySelector("input").focus();
    }
    updatePositions();
    gameTime += intSpeed ;

  };

  const handleUserKeyInput = (e) => {    
    if (!animatingOut) {
      let val = e.target.value.toLowerCase();
      let found = false;
      optionsPlaying.forEach((el, index, arr) => {
        if (val === el.character && el.active) {
          found = true;
          setScore((prevScore) => prevScore + 1);
          arr[index].active = false;
          arr[index].deathTimer = 0;
        }
      });
      if (!found && hardcore) {
        setHealth((prevHealth) => prevHealth - 10);
      }
      e.target.value = "";
    }
  };

  useEffect(() => {
    const containerEl = document.querySelector(".container");
    if (containerEl) {
      containerEl.addEventListener("animationend", () => {
        setAnimatingOut(false);
      });
    }
  }, []);

  const interval = useRef();
  useEffect(() => {
    interval.current = setInterval(gameInterval, intSpeed);
    return () => clearInterval(interval.current);
  }, []);

  const handleGameOver = () => {
    clearInterval(interval.current);
    setAnimatingOut(true);
    setTimeout(() => {
      onGameOver(score);
    }, 500);
  };

  useEffect(()=>{
    if(health<=0)
      handleGameOver();
  },[health])


  const targets = optionsPlaying.map((val) => {
    const style = {
      position: "absolute",
      left: `${Math.round(val.xPosition)}vw`,
      top: 0,
      fontSize: "2rem",
      border: "2px solid black",
      padding: ".5rem",
      transform: `translate(-50%,${val.yPosition}vh)`,
      transition: `${intSpeed}ms`,
    };
    if (!val.active) {
      style.transform = `translate(-50%,${val.yPosition}vh) scale(2) rotate(360deg)`;
      style.opacity = 0;
      style.transition = "500ms";
    }
    if (val.hitHealth) {
      style.color = "#F30A13";
    }
    return (
      <h3 style={style} key={`${val.character}-${val.xPosition}`}>
        {val.character}
      </h3>
    );
  });

  let containerStyles = {
    padding: "0 1rem",
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    animation: "slide-in forwards .5s",
    transition: ".5s",
  };

  containerStyles.top = animatingOut ? "150vh" : "0";
  containerStyles.background = animatingOut ? "#F46652" : "white";

  return (
    <div
      className="container"
      style={containerStyles}
      onClick={() => {
        document.querySelector("input").focus();
      }}
    >
      <h1>Score: {score}</h1>
      <input
        type="text"
        autoFocus
        onChange={handleUserKeyInput}
        style={{ opacity: 0, fontSize: "20px" }}
      />
      {targets}
      <HealthBar width={health} />
    </div>
  );
};

export default GameView;
