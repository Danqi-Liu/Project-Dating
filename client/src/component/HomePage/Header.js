import styled from "styled-components";
import { useState, useContext } from "react";
import LogoutButton from "../Auth0Logout";
import { UsersContext } from "../UsersContext";
export const Header = () => {
  const [search, setSearch] = useState("");
  const { setStatus, setRenderUsers, setCount, setUsers } =
    useContext(UsersContext);
  const handleSearch = (ev) => {
    ev.preventDefault();

    const keyword = search.trim();

    if (keyword === "") {
      return;
    } else {
      setStatus("loading");
      fetch(`/api/search-users?keywords=${keyword}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            console.log(data.data);
            let user20Arr = data.data.filter((el, index) => index <= 19);
            console.log(user20Arr);
            setRenderUsers([...user20Arr]);
            setUsers([...data.data]);
            setCount(1);
            setStatus("idle");
          } else {
            setRenderUsers([]);
            setCount(0);
            setStatus("idle");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };
  return (
    <Wrapper>
      <img alt="heart img" src="./heart.png" />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
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
