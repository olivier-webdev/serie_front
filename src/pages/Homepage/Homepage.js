import { SerieContext } from "../../context";
import styles from "./Homepage.module.scss";
import Serie from "./components/Serie";
import { useContext, useState } from "react";

export default function Homepage() {
  const { allSeries, series } = useContext(SerieContext);
  const [filter, setFilter] = useState("");

  // function updateSeries(newSerie) {
  //   setSeries(series.map((s) => (s.id === newSerie.id ? newSerie : s)));
  // }

  const handleInput = (e) => {
    const search = e.target.value;
    setFilter(search.trim().toLowerCase());
  };
  return (
    <div className="d-flex flex-column flex-fill container">
      <h1 className="mb20">Découvrez nos dernières critiques</h1>
      <div
        className={`card p20 mb20 d-flex flex-column flex-fill ${styles.contentCard}`}
      >
        <div
          className={`d-flex justify-content-center align-items-center my30 ${styles.searchBar}`}
        >
          <i className="fas fa-magnifying-glass mr10"></i>
          <input
            onInput={handleInput}
            className="flex-fill"
            type="text"
            placeholder="Search..."
          />
        </div>
        <div className={`${styles.grid}`}>
          {allSeries &&
            allSeries
              .filter((serie) => serie.title.toLowerCase().includes(filter))
              .map((serie) => <Serie key={serie.idSerie} serie={serie} />)}
        </div>
      </div>
    </div>
  );
}
