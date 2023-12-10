import { useLoaderData } from "react-router-dom";
import { UserContext } from "../../../context";
import { useState } from "react";
import { signin, signout } from "../../../apis/users";
import Cookies from "js-cookie";

export default function UserProvider({ children }) {
  const { users } = useLoaderData();
  const [userConnected, setUserConnected] = useState(users);
  console.log({ userConnected });

  async function login(values) {
    const newUser = await signin(values);
    setUserConnected(newUser);
  }

  async function logoutAndRemoveToken() {
    await signout();

    // Remove the token cookie
    const removeToken = async () => {
      Cookies.remove("token");
    };

    await removeToken();
  }

  async function logout() {
    await logoutAndRemoveToken();
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
