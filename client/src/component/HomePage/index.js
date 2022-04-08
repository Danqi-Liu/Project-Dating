import LoginUserProfile from "../Auth0UserProfile";
import LoginButton from "../Auth0Login";
import LogoutButton from "../Auth0Logout";
import { useContext } from "react";
import { UsersContext } from "../UsersContext";
import { Header } from "./Header";
import { UserCell } from "./UserCell";
const HomePage = () => {
  const { users, renderUsers } = useContext(UsersContext);
  return (
    <>
      <Header />
      <UserCell userInfo={users[1]} />
    </>
  );
};

export default HomePage;
