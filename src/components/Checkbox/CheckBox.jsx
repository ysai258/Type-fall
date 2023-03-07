import React from "react";

import "./checkbox.css";
export default function CheckBox(props) {
  let disabled = false;
  let spanStyles = {
    opacity: 1,
  };
  if (props.disabled === true) {
    disabled = true;
    spanStyles.opacity = 0.75;
  }
  return (
    <label className="block-label">
      <input
        type="checkbox"
        disabled={disabled}
        value={props.value}
        checked={props.checked}
        onChange={props.handleInput}
      />
      <span
        tabIndex="0"
        role="button"
        onKeyPress={props.handleInput}
        style={spanStyles}
      >
        {props.children}
      </span>
    </label>
  );
}
