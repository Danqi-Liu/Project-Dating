import { BrowserRouter, Switch, Route } from "react-router-dom";
import GlobalStyles from "./component/GlobalStyles";
import HomePage from "./component/HomePage";
function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div
        style={{
          background: "var(--main-bg-color)",
          width: "var(--max-content-width)",
          height: "100vh",
        }}
      >
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          {/* <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/users/:id">
            <UserProfile />
          </Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
