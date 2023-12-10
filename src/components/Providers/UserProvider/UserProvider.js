import { useLoaderData } from "react-router-dom";
import { UserContext } from "../../../context";
import { useEffect, useState } from "react";
import { signin, signout } from "../../../apis/users";

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
    useEffect(() => {
      const removeToken = async () => {
        await navigator.cookies.remove("token");
      };
      removeToken();
    }, []);
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
