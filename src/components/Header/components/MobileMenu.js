import styles from "./MobileMenu.module.scss";
import { useContext } from "react";
import { UserContext } from "../../../context";
import { NavLink } from "react-router-dom";

export default function MobileMenu({ toggleMenu }) {
  const { userConnected, logout } = useContext(UserContext);
  return (
    // <ul className={`card ${styles.mobileContainer}`}>
    //   <li>Favorites</li>
    //   <li>Login</li>
    // </ul>
    <div>
      {userConnected && userConnected.admin === 1 ? (
        <ul className={`card ${styles.mobileContainer}`}>
          <NavLink
            onClick={(e) => toggleMenu(e)}
            to="/admin"
            className="mr10 btn btn-primary"
          >
            <i className="fas fa-lock-open mr5"></i>
            Admin
          </NavLink>
          <NavLink className={`mr10 btn btn-primary-reverse`}>
            <i className="fa-solid fa-user mr5"></i>
            <span
              onClick={(e) => {
                logout();
                toggleMenu(e);
              }}
            >
              Logout
            </span>
          </NavLink>
        </ul>
      ) : userConnected ? (
        <ul className={`card ${styles.mobileContainer}`}>
          <NavLink className={`mr10 btn btn-primary-reverse`}>
            <i className="fa-solid fa-user mr5"></i>
            <span
              onClick={(e) => {
                logout();
                toggleMenu(e);
              }}
            >
              Logout
            </span>
          </NavLink>
          <NavLink
            onClick={(e) => toggleMenu(e)}
            to="favorites"
            className={`mr10 btn btn-primary`}
          >
            <i className="fas fa-star mr5"></i>
            <span>Favorites</span>
          </NavLink>
          <NavLink
            onClick={(e) => toggleMenu(e)}
            to="profile"
            className={`mr10 btn btn-primary-reverse`}
          >
            <i className="fa-solid fa-user mr5"></i>
            <span>Profile</span>
          </NavLink>
        </ul>
      ) : (
        <ul className={`card ${styles.mobileContainer}`}>
          <NavLink
            onClick={(e) => toggleMenu(e)}
            to="register"
            className={`mr10 btn btn-primary`}
          >
            <i className="far fa-address-card mr5"></i>
            <span>Register</span>
          </NavLink>
          <NavLink
            onClick={(e) => toggleMenu(e)}
            to="login"
            className={`mr10 btn btn-primary-reverse`}
          >
            <i className="fas fa-right-to-bracket mr5"></i>
            <span>Login</span>
          </NavLink>
        </ul>
      )}
    </div>
  );
}
