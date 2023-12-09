import { useContext } from "react";
import styles from "./Serie.module.scss";
import { SerieContext, UserContext } from "../../../context";
import { NavLink } from "react-router-dom";

export default function Serie({ serie }) {
  const { idSerie, title, poster } = serie;
  const { userConnected } = useContext(UserContext);
  const { getOneSerie } = useContext(SerieContext);

  // const handleClick = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:8000/api/series/likedThisOne",
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(serie),
  //       }
  //     );
  //     if (response.ok) {
  //       const updatedS = await response.json();
  //       updatedS.like = !updatedS.like;
  //       updateSeries(updatedS);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className={`${styles.serie}`}>
      <div className={`${styles.imgContainer}`}>
        <NavLink to={`details/${idSerie}`}>
          <img
            onClick={() => getOneSerie(idSerie)}
            src={`https://serieback-production.up.railway.app/poster/${poster}`}
            // src={`http://localhost:8000/poster/${poster}`}
            alt="oneSerie"
          />
        </NavLink>
      </div>
      <div
        className={`${styles.title} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb10">{title}</h3>
        {userConnected ? <i className={`fas fa-heart`}></i> : null}
      </div>
    </div>
  );
}
