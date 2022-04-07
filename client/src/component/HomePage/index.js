import LoginUserProfile from "../Auth0UserProfile";
import LoginButton from "../Auth0Login";
import LogoutButton from "../Auth0Logout";
const HomePage = () => {
  return (
    <>
      <h1>Home page now</h1>;
      <LoginButton />
      <LogoutButton />
      <LoginUserProfile />
    </>
  );
};

export default HomePage;
