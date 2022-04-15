import io from "socket.io-client";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useParams } from "react-router-dom";
const socket = io.connect("/");
export const Socket = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { email } = useParams();
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState("");
  useEffect(() => {
    socket.emit("join", { myEmail: currentUser.email, id: socket.id });
  }, []);
  socket.on("recievedMsg", (obj) => {
    console.log(obj);
  });
  const handleClick = () => {
    console.log("clicked");
    socket.emit("message", {
      recieverEmail: email,
      myEmail: currentUser.email,
      message: `hello from ${currentUser.email}`,
    });
  };

  return <Button onClick={handleClick}>socket test</Button>;
};
const Button = styled.button`
  font-size: 2rem;
`;
