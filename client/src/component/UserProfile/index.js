import { useParams, useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { UsersContext } from "../UsersContext";
import { CurrentUserContext } from "../CurrentUserContext";
import styled, { keyframes } from "styled-components";
import { Header } from "../HomePage/Header";
import { Sidebar } from "../HomePage/SideBar";
import { LeaveMessage } from "./LeaveMessage";

const UserProfile = () => {
  const profileBGSource = [
    "/profile_bg_1.jpg",
    "/profile_bg_2.jpg",
    "/profile_bg_3.jpg",
    "/profile_bg_4.jpg",
    "/profile_bg_5.jpg",
    "/profile_bg_6.jpg",
    "/profile_bg_7.jpg",
    "/profile_bg_8.jpg",
    "/profile_bg_9.jpg",
    "/profile_bg_10.jpg",
  ];

  const { email } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const { allUsers, status } = useContext(UsersContext);
  let birthday = "";
  let user = {};

  if (status === "idle") {
    let arr = allUsers.filter((el) => el.email === email);
    user = { ...arr[0] };
    console.log(user);
    if (user.dob.date.length > 10) {
      birthday = user.dob.date.slice(0, 10);
    } else {
      birthday = user.dob.date;
    }
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Wrapper>
        <Img
          alt="img"
          src={
            process.env.PUBLIC_URL +
            profileBGSource[Math.floor(Math.random() * 10)]
          }
        />
        {status === "loading" ? (
          <h1>loading</h1>
        ) : (
          <>
            <UserImg alt="user img" src={user.picture.large} />
            <h1>
              {user.name.first} {user.name.last} {user.dob.age}
            </h1>
          </>
        )}
        {status === "loading" ? (
          <h1>loading</h1>
        ) : (
          <div>
            <p>About {user.gender === "male" ? "him" : "her"}:</p>
            <p>Email: &nbsp; {user.email}</p>
            <p>Birthday: &nbsp;{birthday}</p>
            <p>
              City: &nbsp;{user.location.city} &nbsp;&nbsp;&nbsp;Country:&nbsp;
              {user.location.country}
            </p>
          </div>
        )}

        <div>
          <LeaveMessage senderEmail={currentUser.email} recieverEmail={email} />
        </div>
      </Wrapper>
    </>
  );
};
const textAnimation = keyframes`
from {
  background-position: 0
  }
  to {
    background-position: 22rem;
  }`;
const Wrapper = styled.div`
  position: relative;
  background: var(--main-bg-color);
  margin-left: 20vw;
  h1 {
    position: absolute;
    color: var(--text-color);
    left: calc(5vw + 10rem);
    top: 9rem;
    background: linear-gradient(to right, pink 0, red 5%, white 10%);
    background-position: 0;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${textAnimation} 5s infinite forwards;
    font-weight: 800;
  }
  div {
    font-weight: 700;
    color: var(--text-color);
    margin-top: 4rem;
    background-image: url("http://localhost:3000/double-heart.png");
    background-repeat: no-repeat;
    background-color: var(--secondry-bg-color);
    background-position: top left;
    background-size: 4rem;
    height: 4rem;
    width: 75vw;
    box-shadow: 5px 5px 5px;
  }
  p {
    margin-left: 4rem;
  }
`;
const Img = styled.img`
  width: 75vw;
  height: 12rem;
`;
const UserImg = styled.img`
  position: absolute;
  width: 10rem;
  border-radius: 8px;
  box-shadow: 0 0 10px;
  z-index: 1;
  left: 5vw;
  top: 4rem;
`;

export default UserProfile;
