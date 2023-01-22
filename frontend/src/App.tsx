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
import { userService } from "./services/userService";
import { Toast } from "primereact/toast";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8080";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSigningUp, setIsSigningUp] = React.useState(false);
  const toast = React.useRef<Toast>(null);

  React.useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (userID) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    const [user, error] = await userService.login({ email, password });

    if (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
      return;
    }

    localStorage.setItem("userID", String(user!.id));
    setLoggedIn(true);
  };

  const handleSignup = async (
    name: string,
    password: string,
    email: string
  ) => {
    const [user, error] = await userService.createUser({
      name,
      password,
      email,
    });

    if (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
      });
      return;
    }

    localStorage.setItem("userID", String(user!.id));
    setLoggedIn(true);
    setIsSigningUp(false);
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
      <Toast ref={toast} />
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
