import { useLoaderData } from "react-router-dom";
import { UserContext } from "../../../context";
import { useState } from "react";
import { signin, signout } from "../../../apis/users";
import Cookie from "js-cookie";

export default function UserProvider({ children }) {
  const { users } = useLoaderData();
  const [userConnected, setUserConnected] = useState(users);
  console.log({ userConnected });

  async function login(values) {
    const newUser = await signin(values);
    setUserConnected(newUser);
  }

  async function logout() {
    await signout();
    Cookie.remove("token");
    setUserConnected(null);
  }

  return (
    <UserContext.Provider
      value={{
        userConnected,
        setUserConnected,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
