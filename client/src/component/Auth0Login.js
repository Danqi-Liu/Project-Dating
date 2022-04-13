import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled, { keyframes } from "styled-components";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Wrapper>
      <button onClick={() => loginWithRedirect()}>
        Welcome to <span>Lovigo</span>
      </button>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  button {
    font-size: 3rem;
    background: var(--main-bg-color);
    color: violet;
    box-shadow: 0 0 10px;
    border-radius: 4px;
    z-index: 2;
    &:hover {
      color: var(--hover-color);
      cursor: pointer;
      transform: scale(1.1);
    }
  }
  span {
    font-family: "Beau Rivage", cursive;
    font-weight: 700;
    padding: 0 5px;
  }
`;
export default LoginButton;
