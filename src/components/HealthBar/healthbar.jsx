import React from "react";

function HealthBar(props) {
  return (
    <div
      style={{
        width: "80%",
        position: "absolute",
        bottom: 0,
        left: "10%",
        height: "50px",
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "0%",
          height: "80%",
          transition: "0.5s",
          background: "#F46652",
          width: props.width + "%",
        }}
      />
      <p
        style={{
          position: "absolute",
          left: "50%",
          top: "-10%",
          transform: "translate(-50%, -50%)",
          fontSize: "30px",
        }}
      >
        Health
      </p>
    </div>
  );
}

export default HealthBar;
