import React from "react";
import "./App.css";

import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { Content } from "./components/Content";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username === "alvin" && password === "123") {
      setLoggedIn(true);
    }
  };

  const handleSignup = (username: string, password: string, email: string) => {
    console.log(username, password, email);
  };

  if (isSigningUp) {
    return (
      <SignupPage
        onSignup={handleSignup}
        onLogin={() => setIsSigningUp(false)}
      />
    );
  }

  if (!loggedIn) {
    return (
      <LoginPage onLogin={handleLogin} onSignup={() => setIsSigningUp(true)} />
    );
  }

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
