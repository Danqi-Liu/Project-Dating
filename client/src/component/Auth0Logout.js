import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => {
        const user = JSON.parse(sessionStorage.getItem("currentUser"));

        sessionStorage.removeItem("currentUser");
        fetch(`/api/delete-user-online/${user.email}`, { method: "DELETE" })
          .then(() => console.log("online user deleted"))
          .catch((err) => console.log(err.message));
        return logout({ returnTo: window.location.origin });
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
