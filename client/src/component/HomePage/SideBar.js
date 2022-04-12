import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiHome, FiBell, FiBookmark, FiUser, FiSearch } from "react-icons/fi";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext, useState } from "react";
import { SearchForm } from "./SearchForm";
export const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [searchFormOpened, setSearchFormOpened] = useState(false);
  const handleSearchButtonClick = () => {
    setSearchFormOpened(true);
  };
  return (
    <Wrapper>
      <li>
        <NavigationLink exact to="/home" onClick={() => window.scrollTo(0, 0)}>
          <FiHome />
          <MediaQuerySpan>&nbsp;&nbsp;Home</MediaQuerySpan>
        </NavigationLink>
      </li>
      <li>
        <NavigationLink to="/currentUserProfile">
          <FiUser />
          <MediaQuerySpan>&nbsp;&nbsp;Profile</MediaQuerySpan>
        </NavigationLink>
      </li>
      <li>
        <NavigationLink to="/liveChat">
          <FiBell />
          <MediaQuerySpan>&nbsp;&nbsp;Notifications</MediaQuerySpan>
        </NavigationLink>
      </li>
      <li>
        <SearchButton onClick={handleSearchButtonClick}>
          <FiSearch />
          <MediaQuerySpan>&nbsp;&nbsp;Quick Search</MediaQuerySpan>
        </SearchButton>
      </li>
      {searchFormOpened === true && (
        <SearchForm setSearchFormOpened={setSearchFormOpened} />
      )}
    </Wrapper>
  );
};

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 700;
  display: inline-block;
  text-align: center;
  border-radius: 8px;
  margin: 2rem 0 0 2rem;
  &.active {
    color: Purple;
    text-decoration: none;
  }
  &:hover {
    background-color: red;
  }
`;
const SearchButton = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: var(--text-color);
  font-weight: 700;
  display: inline-block;
  text-align: center;
  border-radius: 8px;
  margin: 2rem 0 0 2rem;
  &.active {
    color: Purple;
    text-decoration: none;
  }
  &:hover {
    background-color: red;
  }
`;
const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  position: fixed;
  top: 140px;
  li {
    width: 20vw;
  }
`;

const MediaQuerySpan = styled.span`
  @media (max-width: 900px) {
    display: none;
  }
`;
