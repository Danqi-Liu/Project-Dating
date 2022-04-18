import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiHome, FiBell, FiBookmark, FiUser, FiSearch } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext, useState } from "react";
import { SearchForm } from "./SearchForm";
import { Link } from "react-router-dom";
import { LiveChat } from "../LiveChat";
export const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [searchFormOpened, setSearchFormOpened] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [openUserList, setOpenUserList] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const handleSearchButtonClick = () => {
    setSearchFormOpened(!searchFormOpened);
  };
  const handleOnlineUsers = () => {
    if (openUserList === false) {
      fetch("/api/get-online-users")
        .then((res) => res.json())
        .then((data) => {
          setOnlineUsers([...data.data]);
          setOpenUserList(!openUserList);
          setChatUser({});
        })
        .catch((err) => console.log(err.message));
    } else {
      setOpenUserList(false);
    }
  };
  const handleSelectChatUser = (ev) => {
    const user = onlineUsers.find((el) => el.email === ev.target.value);
    setChatUser({ ...user });
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
        <NavigationLink to="/inbox">
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
      <li>
        <SearchButton onClick={handleOnlineUsers}>
          <FaUserFriends />
          <MediaQuerySpan>&nbsp;&nbsp;Online Users</MediaQuerySpan>
        </SearchButton>
      </li>
      {openUserList === true && (
        <>
          <OnlineUser>
            {onlineUsers.map((el) => {
              return (
                <div key={el._id}>
                  <Link to={`/users/${el.email}`}>
                    <img
                      style={{ width: "2rem" }}
                      alt="image"
                      src={el.picture.thumbnail}
                    />
                  </Link>
                  <button value={el.email} onClick={handleSelectChatUser}>
                    chat
                  </button>
                </div>
              );
            })}
          </OnlineUser>
          <p>
            {Object.keys(chatUser).length === 0
              ? "Chat to someone"
              : `Chat to ${chatUser.name.first} ${chatUser.name.last}`}
          </p>
          <LiveChat user={chatUser} />
        </>
      )}
    </Wrapper>
  );
};
const OnlineUser = styled.div`
  display: flex;
  align-items: left;
  img {
    border-radius: 4px;
    margin: 0 2px;
    &:hover {
      transform: scale(1.05);
    }
  }
  div {
    display: flex;
    flex-direction: column;
  }
  button {
    margin: 0 2px;
    background: var(--secondry-bg-color);
    &:hover {
      color: var(--hover-color);
      transform: scale(1.05);
    }
  }
`;
const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: var(--text-color);
  font-weight: 700;
  display: inline-block;
  text-align: center;
  border-radius: 8px;
  margin: 1.5rem 0 0 2rem;
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
  margin: 1.5rem 0 0 2rem;
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
  top: 120px;

  li {
    width: 20vw;
  }
  p {
    color: var(--text-color);
  }
`;

const MediaQuerySpan = styled.span`
  @media (max-width: 900px) {
    display: none;
  }
`;
