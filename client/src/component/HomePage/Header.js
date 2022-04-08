import styled from "styled-components";
import { useState } from "react";
import LogoutButton from "../Auth0Logout";
export const Header = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (ev) => {
    ev.preventDefault();
  };
  return (
    <Wrapper>
      <img alt="heart img" src="./heart.png" />
      <form onSubmit={(ev) => handleSearch(ev)}>
        <input
          value={search}
          onChange={(ev) => setSearch(ev.currentTarget.value)}
          placeholder="search here"
        ></input>
        <button type="submit">Search</button>
      </form>
      <button>In box</button>
      <LogoutButton />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  display: grid;
  align-items: center;
  background: var(--main-bg-color);
  grid-template-columns: 20vw 20vw 20vw 20vw;
  img {
    width: 60px;
  }
  input {
    height: 40px;
  }
  button {
    height: 40px;
  }
`;
