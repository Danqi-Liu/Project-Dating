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
        <p>
          {name.first} {name.last}
        </p>
        {/* {loginStatus !== "loggedOut" && currentUser.friends.includes(id) && (
          <Ribbon>My friend</Ribbon>
        )} */}
      </MyLink>
    </>
  );
};

const Img = styled.img`
  width: 8rem;
  /* border: 1px var(--primary-color) solid; */
  border-radius: 8px;
  box-shadow: 0 0 5px;
  &:hover {
    transform: scale(0.98);
    border: 2px var(--primary-color) solid;
  }
`;
const MyLink = styled(Link)`
  position: relative;
  text-decoration: none;
  overflow: hidden;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    &:hover {
      color: var(--hover-color);
      transform: scale(1.05);
    }
  }
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
