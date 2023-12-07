import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import styles from "./Admin.module.scss";
import { Suspense, useContext, useEffect, useState } from "react";
import { SerieContext, UserContext } from "../../context";

export default function Admin() {
  const { userConnected } = useContext(UserContext);
  const { resetForAdd } = useContext(SerieContext);
  // const navigate = useNavigate();
  const location = useLocation();
  console.log({ location });

  useEffect(() => {
    if (!location.pathname.startsWith("/admin/editSerie")) {
      resetForAdd();
    }
    // if (!(userConnected && userConnected.admin === 1)) {
    //   navigate("/login");
    // }
  }, [resetForAdd]);

  // const [lienActive, setLienActive] = useState(0);

  // const handleClick = (number, e) => {
  //   if (lienActive === number) {
  //     e.preventDefault();
  //   }
  //   if (lienActive === 0) {
  //     resetForAdd();
  //   }

  //   setLienActive(number);
  // };
  return (
    <div className={`d-flex flex-fill ${styles.admin}`}>
      {userConnected && userConnected.admin === 1 ? (
        <>
          <div className={`my30 ml20 d-flex mr20 ${styles.menuAdmin}`}>
            <ul className="d-flex flex-column fz20">
              <NavLink end to="" className={`mb20`} onClick={resetForAdd}>
                Add a TV serie
              </NavLink>
              <NavLink to="serieList">Serie List</NavLink>
            </ul>
          </div>
          <div>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </>
      ) : null}
    </div>
  );
}
