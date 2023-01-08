import React from "react";

export const Topbar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100px",
        backgroundColor: "#EFF3F8",
        padding: "1.2rem 2rem",
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
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        Alvin Endratno
        <i
          className="pi pi-sign-out"
          style={{
            marginLeft: "1rem",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};
