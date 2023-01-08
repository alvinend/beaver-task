import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

export const LoginPage = ({
  onLogin,
  onSignup,
}: {
  onLogin: (username: string, password: string) => void;
  onSignup: () => void;
}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#EFF3F8",
        padding: "0rem 2.4rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          width: "50%",
          height: "50%",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 0 0.5rem 0.1rem #00000029",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Welcome Back!
        </div>
        <InputText
          placeholder="Username"
          style={{
            width: "100%",
          }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          placeholder="Password"
          type={"password"}
          style={{
            width: "100%",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          label="Login"
          style={{
            width: "100%",
          }}
          onClick={() => onLogin(username, password)}
        />
        {/* Crate link to Signup */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <div>Don't have an account?</div>
          <span
            style={{
              color: "#007BFF",
              cursor: "pointer",
            }}
            onClick={onSignup}
          >
            Signup
          </span>
        </div>
      </div>
    </div>
  );
};
