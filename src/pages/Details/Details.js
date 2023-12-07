import { useContext } from "react";
import { SerieContext } from "../../context";
import styles from "./Details.module.scss";
import StarRating from "../../components/StarRating/StarRating";

export default function Details() {
  const { oneSerie, setRatingArticle } = useContext(SerieContext);
  console.log(oneSerie);
  return (
    <div className="d-flex flex-column flex-fill">
      {oneSerie.length > 0 && (
        <div>
          <div className={`d-flex flex-column flex-fill ${styles.list}`}>
            <h1 className="ml20 my30">
              {oneSerie[0].title} (
              <span className={`${styles.year}`}>{oneSerie[0].year}</span>) -{" "}
              {oneSerie[0].country}
            </h1>
            <div className={`d-flex ${styles.beside}`}>
              <img
                className={`${styles.poster}`}
                src={`https://serieback-production.up.railway.app/poster/${oneSerie[0].poster}`}
                alt=""
              />
              <div className={`d-flex flex-column`}>
                <p className={`${styles.paragraph}`}>
                  <span className={`${styles.resume}`}>Résumé :</span>{" "}
                  {oneSerie[0].resume}
                </p>
                <h3 className={`mb10`}>
                  <span className={`${styles.year}`}>
                    Nombres de saisons :{" "}
                  </span>
                  {oneSerie[0].numberSeason}
                </h3>
                <h3 className="mb10">
                  {oneSerie[0].still ? "En cours" : "arrêté"}
                </h3>
                <h3 className="mb10">
                  <span className={`${styles.year}`}>Note imdB : </span>{" "}
                  {oneSerie[0].imdbNote}
                </h3>
                <h3 className={`${styles.noteSC}`}>
                  <span className={`${styles.year}`}>Note SC : </span>{" "}
                  {oneSerie[0].sensCritiqueNote}
                </h3>
                <StarRating onChange={setRatingArticle} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
