import styled from "styled-components";
import { useState, useContext } from "react";
import LogoutButton from "../Auth0Logout";
import { UsersContext } from "../UsersContext";
import { useHistory, Link } from "react-router-dom";
export const Header = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const { status, setStatus, setRenderUsers, setCount, setUsers } =
    useContext(UsersContext);
  let count = 0;
  const colorArr = ["#cc5500", "red", "purple", "blue"];
  const mainbgColor = ["pink", "white", "gold", "gray"];
  const textColor = ["black", "Fuchsia", "DarkViolet", "GoldenRod"];
  const hoverColor = ["red", "blue", "Indigo", "DeepPink"];
  const handleToggleTheme = (count) => {
    document.documentElement.style.setProperty(
      "--primary-color",
      colorArr[count % 4]
    );
    document.documentElement.style.setProperty(
      "--main-bg-color",
      mainbgColor[count % 4]
    );
    document.documentElement.style.setProperty(
      "--text-color",
      textColor[count % 4]
    );
    document.documentElement.style.setProperty(
      "--hover-color",
      hoverColor[count % 4]
    );
  };
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
            setSearch("");
            history.push("/home");
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
      <MyLink to="/home">
        <img alt="heart img" src={process.env.PUBLIC_URL + "/heart.png"} />
        <span>Lovigo</span>
      </MyLink>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder="search here"
        ></input>
        <button type="submit" disabled={status === "loading" ? true : false}>
          Search
        </button>
      </form>
      <button onClick={() => handleToggleTheme(count++)}>Theme</button>
      <LogoutButton />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 95vw;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--main-bg-color);
  img {
    width: 60px;
  }
  input {
    height: 20px;
    width: 5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  button {
    font-size: 1.3rem;
    height: 60px;
    width: 7rem;
    font-weight: 700;
    background: var(--main-bg-color);
    color: var(--text-color);
    &:hover {
      color: var(--hover-color);
      background: var(--secondry-bg-color);
      transform: scale(1.05);
    }
    &:disabled {
      opacity: 60%;
    }
  }
  span {
    font-family: "Beau Rivage", cursive;
    font-weight: 700;
    font-size: 35px;
    position: absolute;
    top: 10px;
  }
`;
const MyLink = styled(Link)`
  position: relative;
  height: 60px;
`;
