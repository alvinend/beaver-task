import React from "react";

export const Sidebar = () => {
  return (
    <div style={{ width: "10%", height: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "0 1.2rem",
        }}
      >
        <h3
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "7%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "2rem",
          }}
        >
          <i
            className="pi pi-book"
            style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
          ></i>
          Beaver Task
        </h3>

        <div
          style={{
            width: "100%",
            cursor: "pointer",
            marginBottom: "2rem",
          }}
        >
          All Task
        </div>
      </div>
    </div>
  );
};
