import React from "react";
import "./button.css";

export default function Button(props) {
  const classNames = ["button"];
  if (props.italic) {
    classNames.push("button--italic");
  }
  return (
    <button
      className={classNames.join(" ")}
      onClick={props.handleClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
