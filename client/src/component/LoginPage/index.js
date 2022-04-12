import LoginButton from "../Auth0Login";
import { useAuth0 } from "@auth0/auth0-react";
import { Form } from "./Form";
import { UsersContext } from "../UsersContext";
import { CurrentUserContext } from "../CurrentUserContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { checkSessionStorage } from "../CheckSessionStorage";
const LoginPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { allUsers, status } = useContext(UsersContext);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const history = useHistory();
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
    return <LoginButton />;
  }
  if (status === "loading" || isLoading) {
    return <h1>loading</h1>;
  }
  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {allUsers.some((el) => el.email === user.email) ? (
          <button onClick={handleClick}>go to home</button>
        ) : (
          <Form email={user.email} src={user.picture} />
        )}
      </div>
    )
  );
};

export default LoginPage;
