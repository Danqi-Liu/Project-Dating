import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
const LogoutButton = () => {
  const { logout } = useAuth0();
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Wrapper>
      <p>Hi {currentUser.name.first}</p>
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
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    padding-right: 1rem;
  }
  button {
    font-size: 1rem;
    font-style: italic;
    font-weight: 400;
    background: var(--main-bg-color);
    color: var(--text-color);
    &:hover {
      color: var(--hover-color);
      background: var(--secondry-bg-color);
      transform: scale(1.05);
    }
  }
`;
export default LogoutButton;
