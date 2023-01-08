import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React from "react";

export const SignupPage = ({
  onSignup,
  onLogin,
}: {
  onSignup: (username: string, password: string, email: string) => void;
  onLogin: () => void;
}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

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
          Get Started!
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
        <InputText
          placeholder="Email"
          style={{
            width: "100%",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          label="Sign Up"
          style={{
            width: "100%",
          }}
          onClick={() => onSignup(username, password, email)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <div>
            Already have an account?
            <span
              style={{
                color: "#3F51B5",
                cursor: "pointer",
              }}
              onClick={onLogin}
            >
              {" "}
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
