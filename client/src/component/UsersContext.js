import { createContext, useState, useEffect } from "react";
import { checkSessionStorage } from "./CheckSessionStorage";
export const UsersContext = createContext(null);
export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [renderUsers, setRenderUsers] = useState([]);
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState("loading");
  const time = checkSessionStorage("timer", 0);
  const currentTime = Date.now();
  useEffect(() => {
    if (currentTime - time >= 3000) {
      sessionStorage.setItem("timer", JSON.stringify(Date.now()));
      fetch("/api/get-users")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          let user20Arr = data.data.filter((el, index) => index <= 19);
          setUsers(data.data);
          setStatus("idle");
          setRenderUsers([...user20Arr]);
          sessionStorage.setItem("users", JSON.stringify(data.data));
        })
        .catch((err) => console.log(err.message));
    } else {
      setUsers(checkSessionStorage("users", []));
      setRenderUsers(checkSessionStorage("users", []));
      setStatus("idle");
    }
  }, []);
  return (
    <UsersContext.Provider
      value={{
        users,
        status,
        renderUsers,
        count,
        setCount,
        setUsers,
        setStatus,
        setRenderUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
