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
    { msg: "welcome to the live chat", author: "system" },
  ]);
  const [input, setInput] = useState("");
  const handleSendMessage = (event) => {
    event.preventDefault();
    if (Object.keys(user).length === 0) {
      setMessageArray([
        { msg: "Choose a user to chat first", author: "system" },
        ...messageArray,
      ]);
    } else {
      setMessageArray([{ msg: input, author: "me" }, ...messageArray]);
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
    setMessageArray([
      { msg: `${obj.senderName}:${obj.message}`, author: "other" },
      ...messageArray,
    ]);
  });
  return (
    <Wrapper className="chat-app">
      <MessageList>
        {messageArray.map((el, index) => {
          if (el.author === "system") {
            return <SystemP key={el.msg + index}>{el.msg}</SystemP>;
          } else if (el.author === "me") {
            return <MyP key={el.msg + index}>{el.msg}</MyP>;
          } else {
            return <OtherP key={el.msg + index}>{el.msg}</OtherP>;
          }
        })}
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
  p {
    /* width: 18vw; */
    padding: 2px 0;
  }
`;
const SystemP = styled.p`
  text-align: center;
  background: var(--main-bg-color);
`;
const OtherP = styled.p`
  text-align: left;
  background: var(--secondry-bg-color);
`;

const MyP = styled.p`
  text-align: right;
`;

const Wrapper = styled.div`
  margin-left: 1vw;
  width: 20vw;
  background: snow;
  input {
    width: 15vw;
    font-size: 0.8rem;
  }
  button {
    width: 4vw;
    font-size: 0.8rem;
  }
`;
