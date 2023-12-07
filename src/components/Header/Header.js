import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";
import { useContext, useState } from "react";
import MobileMenu from "./components/MobileMenu";
import { UserContext } from "../../context";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { userConnected, logout } = useContext(UserContext);
  console.log(showMenu);

  function toggleMenu(e) {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <NavLink end to="/">
          <img src={logo} alt="logo du blog" />
        </NavLink>
      </div>
      {userConnected && userConnected.admin === 1 ? (
        <ul className={`${styles.desktopHeader}`}>
          <NavLink to="/admin" className="mr10 btn btn-primary">
            <i className="fas fa-lock-open mr5"></i>
            Admin
          </NavLink>
          <NavLink className={`mr10 btn btn-primary-reverse`}>
            <i className="fa-solid fa-user mr5"></i>
            <span onClick={() => logout()}>Logout</span>
          </NavLink>
        </ul>
      ) : userConnected ? (
        <ul className={`${styles.desktopHeader}`}>
          <NavLink className={`mr10 btn btn-primary-reverse`}>
            <i className="fa-solid fa-user mr5"></i>
            <span onClick={() => logout()}>Logout</span>
          </NavLink>
          <NavLink to="favorites" className={`mr10 btn btn-primary`}>
            <i className="fas fa-star mr5"></i>
            <span>Favorites</span>
          </NavLink>
          <NavLink to="profile" className={`mr10 btn btn-primary-reverse`}>
            <i className="fa-solid fa-user mr5"></i>
            <span>Profile</span>
          </NavLink>
        </ul>
      ) : (
        <ul className={`${styles.desktopHeader}`}>
          <NavLink to="register" className={`mr10 btn btn-primary`}>
            <i className="far fa-address-card mr5"></i>
            <span>Register</span>
          </NavLink>
          <NavLink to="login" className={`mr10 btn btn-primary-reverse`}>
            <i className="fas fa-right-to-bracket mr5"></i>
            <span>Login</span>
          </NavLink>
        </ul>
      )}
      <i
        onClick={(e) => toggleMenu(e)}
        className={`fas fa-bars mr10 ${styles.mobileHeader}`}
      ></i>
      {showMenu && (
        <>
          <div onClick={(e) => toggleMenu(e)} className="calc"></div>
          <MobileMenu toggleMenu={toggleMenu} />
        </>
      )}
    </header>
  );
}
