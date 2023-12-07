import { useContext, useState } from "react";
import styles from "../SerieList/SerieList.module.scss";
import { SerieContext, UserContext } from "../../../../context";
import Modal from "../../../../components/Modal/Modal";
import { deleteSerie } from "../../../../apis/series";
import { NavLink, useNavigate } from "react-router-dom";

export default function SerieList() {
  const { userConnected } = useContext(UserContext);
  const navigate = useNavigate();
  console.log({ userConnected });
  const { allSeries, deleteOneSerie, getOneSerie } = useContext(SerieContext);
  const [showModal, setShowModal] = useState(false);
  const [idSerieToDelete, setIdSerieToDelete] = useState(null);
  console.log("serie list", allSeries);

  const handleDeleteClick = (id) => {
    setShowModal(true);
    setIdSerieToDelete(id);
  };

  const handleConfirmDelete = () => {
    deleteOneSerie(idSerieToDelete);
    deleteSerie(idSerieToDelete);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column flex-fill">
      <h1 className="my30">Serie List</h1>
      {!userConnected ? (
        navigate("/admin")
      ) : (
        <>
          <ul className={`${styles.list} mb20`}>
            {allSeries &&
              allSeries.map((s) => (
                <li key={s.idSerie} className={`${styles.link}`}>
                  <span className={`${styles.title}`}>{s.title}</span>
                  <NavLink to={`../editSerie/${s.idSerie}`}>
                    <button
                      onClick={() => getOneSerie(s.idSerie)}
                      className="btn btn-primary mr20"
                    >
                      Edit
                    </button>
                  </NavLink>
                  <button
                    onClick={() => handleDeleteClick(s.idSerie)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
          {showModal && (
            <Modal
              onConfirm={handleConfirmDelete}
              onCancel={handleCloseModal}
              message="Are you sure you want to delete this serie?"
            />
          )}
        </>
      )}
    </div>
  );
}
