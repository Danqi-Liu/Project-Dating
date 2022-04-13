import { Header } from "../HomePage/Header";
import { Sidebar } from "../HomePage/SideBar";
import styled from "styled-components";
import { SubContainer } from "./index";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import { MessageSender } from "./MessageSender";
export const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const { currentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    setLoadingMessages(true);
    fetch(`/api/get-myMessage?email=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages([...data.data]);
        setLoadingMessages(false);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <Header />
      <Sidebar />
      <SubContainer>
        {loadingMessages === true ? (
          <h1>loading</h1>
        ) : (
          messages.map((el) => {
            return (
              <div key={el._id}>
                <MessageSender senderEmail={el.senderEmail} />
                {el.message}
              </div>
            );
          })
        )}
      </SubContainer>
    </>
  );
};
