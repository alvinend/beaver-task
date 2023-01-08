import React from "react";

export const Topbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "7%",
        backgroundColor: "#EFF3F8",
        padding: "1.2rem 1.2rem",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          My Tasks
        </div>
        <div
          style={{
            fontSize: "1rem",
          }}
        >
          3 Tasks
        </div>
      </div>
      <div>Alvin Endratno</div>
    </div>
  );
};
