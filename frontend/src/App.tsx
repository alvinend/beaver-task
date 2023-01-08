import React from "react";
import "./App.css";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Content } from "./components/Content";

function App() {
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Sidebar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          height: "100%",
        }}
      >
        <Topbar />
        <Content />
      </div>
    </div>
  );
}

export default App;
