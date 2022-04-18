import LoginButton from "../Auth0Login";
import { useAuth0 } from "@auth0/auth0-react";
import { Form } from "./Form";
import { UsersContext } from "../UsersContext";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { checkSessionStorage } from "../CheckSessionStorage";
import styled from "styled-components";
import { LoadingAnimation } from "../LoadingAnimation";
const LoginPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { allUsers, status } = useContext(UsersContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();
  let loginUser = {};
  const handleClick = () => {
    allUsers.forEach((el) => {
      if (el.email === user.email) {
        setCurrentUser({ ...el });
        sessionStorage.setItem("currentUser", JSON.stringify({ ...el }));
      }
    });
    fetch("/api/add-user-online", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ ...checkSessionStorage("currentUser", {}) }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        history.push("/home");
      })
      .catch((err) => console.log(err.message));
  };
  if (!isAuthenticated) {
    return (
      <Div>
        <LoginButton />
      </Div>
    );
  }
  if (status === "loading" || isLoading) {
    return (
      <Div>
        <h1>
          <LoadingAnimation size={64} />
        </h1>
      </Div>
    );
  } else {
    let arr = allUsers.filter((el) => el.email === user.email);
    loginUser = { ...arr[0] };
  }
  return (
    isAuthenticated && (
      <Div>
        {allUsers.some((el) => el.email === user.email) ? (
          <>
            <img src={loginUser.picture.medium} alt="user image" />
            <h2>
              Hello {loginUser.name.first} {loginUser.name.last}
            </h2>
            <button onClick={handleClick}>Home</button>
          </>
        ) : (
          <Form email={user.email} src={user.picture} />
        )}
      </Div>
    )
  );
};
const Div = styled.div`
  background-image: url("http://localhost:3000/login_bg.jpg");
  background-size: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin-left: 10px;
    font-size: 2rem;
    background: var(--main-bg-color);
    color: violet;
    box-shadow: 0 0 10px;
    border-radius: 4px;
    z-index: 2;
    &:hover {
      color: var(--hover-color);
      cursor: pointer;
      transform: scale(1.1);
    }
  }
`;
export default LoginPage;
