import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
export const UserCell = ({ userInfo }) => {
  const { name, email, gender, dob, location, picture } = userInfo;

  return (
    <>
      <MyLink to={`/users/${email}`}>
        <Img alt="user img" src={picture.medium}></Img>
        {/* {loginStatus !== "loggedOut" && currentUser.friends.includes(id) && (
          <Ribbon>My friend</Ribbon>
        )} */}
      </MyLink>
    </>
  );
};

const Img = styled.img`
  width: var(--user-img-width);
  border: 2px var(--primary-color) solid;
  &:hover {
    transform: scale(0.98);
    border: 6px var(--primary-color) solid;
  }
`;
const MyLink = styled(Link)`
  position: relative;
  text-decoration: none;
  overflow: hidden;
  margin: 3px;
`;

const Ribbon = styled.div`
  position: absolute;
  text-align: center;
  font-size: 12px;
  background: var(--primary-color);
  color: white;
  transform: rotate(45deg);
  width: calc(var(--user-img-width) * 0.5);
  top: calc(var(--user-img-width) * 0.1);
  left: calc(var(--user-img-width) * 0.6);
  z-index: 1;
`;
