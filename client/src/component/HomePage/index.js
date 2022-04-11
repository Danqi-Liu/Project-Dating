import { useContext, useState } from "react";
import { UsersContext } from "../UsersContext";
import { Header } from "./Header";
import { UserCell } from "./UserCell";
import { SlideShow } from "./SlideShow";
import styled from "styled-components";
const HomePage = () => {
  const { status, users, renderUsers, setRenderUsers, count, setCount } =
    useContext(UsersContext);

  console.log(count);
  const handleLoadMore = () => {
    let user20Array = [];
    for (let index = count * 20; index < (count + 1) * 20; index++) {
      user20Array.push(users[index]);
    }
    setRenderUsers([...renderUsers, ...user20Array]);
    setCount(count + 1);
  };
  return (
    <>
      <Header />
      <SlideShow />
      {status === "loading" ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div>
            <div>side bar</div>
            <UserImgContainer>
              {renderUsers.map((el) => {
                console.log("el", el);
                return <UserCell key={el.email} userInfo={el} />;
              })}
            </UserImgContainer>
          </div>
          <button onClick={handleLoadMore}>Load more</button>
        </>
      )}
    </>
  );
};
const UserImgContainer = styled.div`
  display: flex;
  width: 75vw;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  background: var(--main-bg-color);
`;
export default HomePage;
