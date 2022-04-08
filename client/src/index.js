import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UsersContextProvider } from "./component/UsersContext";
import { CurrentUserProvider } from "./component/CurrentUserContext";
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-aqkoczy7.us.auth0.com"
      clientId="A7a1QJxLdRGr4IhJrfEf0EpamScsu8Jn"
      redirectUri={window.location.origin}
    >
      <UsersContextProvider>
        <CurrentUserProvider>
          <App />
        </CurrentUserProvider>
      </UsersContextProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
