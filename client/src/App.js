import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./component/GlobalStyles";
import HomePage from "./component/HomePage";
import LoginPage from "./component/LoginPage";
import UserProfile from "./component/UserProfile";
import { CurrentUserProfile } from "./component/CurrentUserProfile";
function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div
        style={{
          background: "var(--main-bg-color)",
          width: "max-content-width",
          minHeight: "100vh",
        }}
      >
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route path="/currentUserProfile">
            <CurrentUserProfile />
          </Route>
          <Route path="/users/:email">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
