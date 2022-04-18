import { Header } from "../HomePage/Header";
import { Sidebar } from "../HomePage/SideBar";
import styled from "styled-components";
import { SubContainer } from "./index";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext, useEffect, useState } from "react";
import { MessageSender } from "./MessageSender";
import { LoadingAnimation } from "../LoadingAnimation";
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
          <h1>
            <LoadingAnimation size={64} />
          </h1>
        ) : (
          messages.map((el) => {
            return (
              <Div key={el._id}>
                <MessageSender senderEmail={el.senderEmail} />
                <span>&nbsp;{el.message}</span>
              </Div>
            );
          })
        )}
      </SubContainer>
    </>
  );
};
const Div = styled.div`
  display: flex;
  align-items: center;
`;
