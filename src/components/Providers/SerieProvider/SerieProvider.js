import { useState } from "react";
import { SerieContext } from "../../../context";
import { useLoaderData } from "react-router-dom";

export default function SerieProvider({ children }) {
  const { series } = useLoaderData();
  const [allSeries, setAllSeries] = useState(series[0]);
  const [oneSerie, setOneSerie] = useState(null);
  const [ratingArticle, setRatingArticle] = useState(0);
  console.log({ series });

  function getOneSerie(id) {
    setOneSerie(allSeries.filter((a) => a.idSerie === id));
  }

  function updateOneSerie(updatedSerie) {
    setAllSeries(
      allSeries.map((serie) =>
        serie.idSerie === updatedSerie.idSerie ? updatedSerie : serie
      )
    );
  }

  function resetForAdd() {
    setOneSerie(null);
  }

  function deleteOneSerie(id) {
    console.log("delete", id);
    setAllSeries(allSeries.filter((a) => a.idSerie !== id));
  }

  function addOneSerie(newSerie) {
    setAllSeries([...allSeries, newSerie]);
  }

  // console.log(ratingArticle);

  return (
    <SerieContext.Provider
      value={{
        allSeries,
        getOneSerie,
        oneSerie,
        // series,
        deleteOneSerie,
        addOneSerie,
        setRatingArticle,
        resetForAdd,
        updateOneSerie,
      }}
    >
      {children}
    </SerieContext.Provider>
  );
}
