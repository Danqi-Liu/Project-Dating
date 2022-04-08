import LoginButton from "../Auth0Login";
import LogoutButton from "../Auth0Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Form } from "./Form";
import { checkSessionStorage } from "../CheckSessionStorage";
const LoginPage = () => {
  const users = checkSessionStorage("users", {});
  const { user, isAuthenticated, isLoading } = useAuth0();
  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {users.some((el) => el.email === user.email) ? (
          <button>go to home</button>
        ) : (
          <Form email={user.eamil} src={user.picture} />
        )}
      </div>
    )
  );
};

export default LoginPage;
