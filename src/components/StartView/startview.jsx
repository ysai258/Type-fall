import CheckBox from "../Checkbox/CheckBox";
import Button from "../Button/button";
import Header from "../Header/header";

import "./startview.css";
import React, { useState } from "react";

export default function StartView(props) {
  const [textOptions] = useState(props.textOptions);
  const [selectedTextOptions, setSelectedTextOptions] = useState(
    props.selectedTextOptions
  );
  const [spawnRate, setSpawnRate] = useState(props.spawnRate);
  const [hardcore, setHardcore] = useState(props.hardcore);
  const [animatingOut, setAnimatingOut] = useState(false);

  const handleGameStart = props.onGameStart;

  const updateOptions = (val) => {
    if (!selectedTextOptions.includes(val)) {
      setSelectedTextOptions([...selectedTextOptions, val]);
    } else {
      setSelectedTextOptions(
        selectedTextOptions.filter((option) => option !== val)
      );
    }
  };

  const handleSpeedUpdate = (value) => {
    setSpawnRate(value);
  };

  const handleHardcore = () => {
    setHardcore(!hardcore);
  };

  const onStartGame = () => {
    setAnimatingOut(true);

    setTimeout(() => {
      if (selectedTextOptions.length >= 1) {
        handleGameStart(selectedTextOptions, spawnRate, hardcore);
      }
    }, 500);
  };

  let textOptionsRender = textOptions.map((val) => {
    const checked = selectedTextOptions.includes(val);
    return (
      <CheckBox
        key={val}
        value={val}
        checked={checked}
        tabindex="0"
        handleInput={() => {
          updateOptions(val);
        }}
      >
        {val.charAt(0).toUpperCase() + val.slice(1)}
      </CheckBox>
    );
  });

  const speedOptionsRender = ["Faster", "Fast", "Normal", "Slow", "Slower"].map(
    (el, i) => {
      const value = 10 + i * 5;
      const checked = spawnRate === value;
      return (
        <CheckBox
          key={value}
          value={value}
          checked={checked}
          handleInput={() => {
            handleSpeedUpdate(value);
          }}
        >
          {el}
        </CheckBox>
      );
    }
  );

  const disabled = selectedTextOptions.length >= 1 ? false : true;

  const animatingOutStyle = animatingOut ? { opacity: "1", top: "-150vh" } : {};

  return (
    <div className="view-container">
      <div className="inner-container" style={animatingOutStyle}>
        <Header>Type Fall</Header>
        <p>
          Select the types of characters you would like to practice, the rate
          and whether you are penalized for mistakes.
        </p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "30%", margin: "1rem" }}>
            {textOptionsRender}
          </div>
          <div style={{ width: "30%", margin: "1rem" }}>
            {speedOptionsRender}
          </div>
          <div style={{ width: "30%", margin: "1rem" }}>
            <CheckBox
              value={"hardcore"}
              checked={hardcore}
              handleInput={() => {
                handleHardcore();
              }}
            >
              Hardcore
            </CheckBox>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button handleClick={onStartGame} disabled={disabled}>
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
}
