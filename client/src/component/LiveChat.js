import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { CurrentUserContext } from "./CurrentUserContext";
const socket = io.connect("/");
export const LiveChat = ({ user }) => {
  const { currentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    socket.emit("join", { myEmail: currentUser.email, id: socket.id });
  }, []);
  const [messageArray, setMessageArray] = useState([
    "welcome to the live chat",
  ]);
  const [input, setInput] = useState("");
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (Object.keys(user).length === 0) {
      setMessageArray(["Choose a user to chat first", ...messageArray]);
    } else {
      setMessageArray([input, ...messageArray]);
      setInput("");
      socket.emit("message", {
        recieverEmail: user.email,
        myEmail: currentUser.email,
        myName: `${currentUser.name.first} ${currentUser.name.last}`,
        message: input,
      });
    }
  };
  const handleInput = (ev) => {
    setInput(ev.target.value);
  };
  socket.on("recievedMsg", (obj) => {
    console.log(obj.message);
    console.log(obj.senderName);
    setMessageArray([`${obj.senderName}:${obj.message}`, ...messageArray]);
  });
  return (
    <Wrapper className="chat-app">
      <MessageList>
        {messageArray.map((el, index) => (
          <p key={el + index}>{el}</p>
        ))}
      </MessageList>
      <form className="user-form" onSubmit={handleSendMessage}>
        <input
          name="user-input"
          value={input}
          placeholder="Type your message"
          onChange={handleInput}
        />
        <button type="submit">Send</button>
      </form>
    </Wrapper>
  );
};
const MessageList = styled.div`
  height: 28vh;
  width: 20vw;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
`;
const Wrapper = styled.div`
  margin-left: 1vw;
  width: 20vw;
  background: var(--secondry-bg-color);
  input {
    width: 15vw;
    font-size: 0.8rem;
  }
  button {
    width: 4vw;
    font-size: 0.8rem;
  }
`;
