import styled from "styled-components";
import { UsersContext } from "../UsersContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
export const MessageSender = ({ senderEmail }) => {
  const { allUsers, status } = useContext(UsersContext);
  let user = {};
  if (status === "idle") {
    let arr = allUsers.filter((el) => el.email === senderEmail);
    user = { ...arr[0] };
  }
  return (
    <MyLink to={`/users/${senderEmail}`}>
      <Img alt="sneder image" src={user.picture.thumbnail} />
      <span>
        {user.name.first} {user.name.last}:
      </span>
    </MyLink>
  );
};
const MyLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 2rem;
  border-radius: 50%;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
