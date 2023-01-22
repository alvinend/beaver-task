import React from "react";
import { User } from "../services/types";
import { userService } from "../services/userService";

export const Topbar = () => {
  const [taskCount, setTaskCount] = React.useState(0);
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    (async () => {
      const [user, error] = await userService.getUser(
        parseInt(localStorage.getItem("userID")!)
      );
      if (error) {
        return;
      }

      setUser(user);
    })();
  }, []);

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
      ></div>
      <div
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        {user?.name}
        <i
          className="pi pi-sign-out"
          style={{
            marginLeft: "1rem",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("userID");
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};
