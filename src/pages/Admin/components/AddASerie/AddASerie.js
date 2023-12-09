import styles from "./AddASerie.module.scss";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSerie, updateSerie } from "../../../../apis/series";
import { SerieContext } from "../../../../context";
import { useNavigate } from "react-router-dom";

export default function AddASerie() {
  const [feedbackGood, setFeedbackGood] = useState("");
  const [errorPoster, setErrorPoster] = useState("");
  const posterRef = useRef();
  const navigate = useNavigate();

  const { addOneSerie, oneSerie, updateOneSerie } = useContext(SerieContext);
  const [posterPreview, setPosterPreview] = useState();

  const defaultValues = {
    title: "",
    poster: null,
    year: null,
    resume: "",
    numberSeason: null,
    still: false,
    imdbNote: null,
    sensCritiqueNote: null,
    country: "",
  };

  const serieSchema = yup.object({
    title: yup.string().required("Ce champ doit être renseigné"),
    year: yup
      .number()
      .typeError("Le champ doit contenir un nombre")
      .test(
        "is-four-digits",
        "Le nombre doit contenir exactement quatre chiffres",
        (value) => {
          return /^[0-9]{4}$/.test(value);
        }
      )
      .required("Le champ est requis"),
    numberSeason: yup
      .number()
      .typeError("Le champ doit contenir un nombre")
      .required("Ce champ doit être renseigné"),
    imdbNote: yup
      .string()
      .typeError("Veuillez entrer un nombre valide")
      .required("Ce champ doit être renseigné")
      .matches(
        /^[0-9]+([.][0-9]+)?$/,
        "Veuillez entrer un nombre entier ou décimal valide en utilisant le point."
      )
      .test(
        "maxValue",
        "La note ne doit pas dépasser 10",
        (value) => parseFloat(value) <= 10
      ),
    sensCritiqueNote: yup
      .string()
      .typeError("Veuillez entrer un nombre valide")
      .required("Ce champ doit être renseigné")
      .matches(
        /^[0-9]+([.][0-9]+)?$/,
        "Veuillez entrer un nombre entier ou décimal valide en utilisant le point."
      )
      .test(
        "maxValue",
        "La note ne doit pas dépasser 10",
        (value) => parseFloat(value) <= 10
      ),
    resume: yup.string().required("Ce champ doit être renseigné"),
    country: yup.string().required("Ce champ doit être renseigné"),
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(serieSchema),
  });

  useEffect(() => {
    if (oneSerie === null) {
      reset(defaultValues);
    } else {
      setPosterPreview(
        `https://serieback-production.up.railway.app/poster/${oneSerie[0].poster}`
        // `http://localhost:8000/poster/${oneSerie[0].poster}`
      );
      reset({ ...oneSerie[0] });
    }
  }, [oneSerie, reset]);

  const clearInputFile = () => {
    posterRef.current.value = "";
    posterRef.current.type = "text";
    posterRef.current.type = "file";
    setPosterPreview(
      `https://serieback-production.up.railway.app/poster/${oneSerie[0].poster}`
      // `http://localhost:8000/poster/${oneSerie[0].poster}`
    );
  };

  const handlePosterChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function submit() {
    setFeedbackGood("");
    setErrorPoster("");
    const values = getValues();
    console.log({ values });
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("year", values.year);
    formData.append("resume", values.resume);
    formData.append("numberSeason", values.numberSeason);
    formData.append("still", values.still);
    formData.append("imdbNote", values.imdbNote);
    formData.append("sensCritiqueNote", values.sensCritiqueNote);
    formData.append("country", values.country);
    const isEditMode = oneSerie !== null; // vérification avec un booléen si nous sommes en mode édition
    const posterFile = posterRef.current?.files[0];

    if (posterFile) {
      // Vérifications communes pour le poster, en mode ajout ou édition
      const maxFileSize = 3000000;
      if (posterFile.size > maxFileSize) {
        setErrorPoster("Le fichier est trop lourd");
        return;
      }
      const supportedExtensions = ["jpg", "jpeg", "png", "avif"];
      const fileExtension = posterFile.name.split(".").pop().toLowerCase();
      if (!supportedExtensions.includes(fileExtension)) {
        setErrorPoster("Format de fichier non supporté.");
        return;
      }
      formData.append("poster", posterFile);
    } else if (!isEditMode) {
      // En mode ajout, le poster est obligatoire
      setErrorPoster("Veuillez télécharger une image");
      return;
    }
    if (isEditMode) {
      console.log(oneSerie[0]);
      formData.append("idSerie", oneSerie[0].idSerie);

      try {
        const response = await updateSerie(formData);
        console.log("EDIT");
        if (response.messageGood) {
          setFeedbackGood(response.messageGood);
          console.log(response.newSerie);
          updateOneSerie(response.newSerie);
          reset(defaultValues);
          posterRef.current.value = "";
          setTimeout(() => {
            setFeedbackGood("");
            navigate("/admin/serielist");
          }, 3000);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await addSerie(formData);
        console.log("addSerie", response.newSerie);
        if (response.messageGood) {
          setFeedbackGood(response.messageGood);
          addOneSerie(response.newSerie);
          reset(defaultValues);
          posterRef.current.value = "";
          setTimeout(() => {
            setFeedbackGood("");
          }, 3000);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column mt20 mb20 flex-fill card p20 ${styles.form}`}
    >
      <h2 className="mb20">
        {oneSerie ? "Modifier une série" : "Ajouter une série"}
      </h2>
      <div className="d-flex flex-column mb10">
        <label htmlFor="title">Titre de la série</label>
        <input {...register("title")} type="text" id="title" />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-row mb20">
        <div className={`${styles.inputPoster}`}>
          <label htmlFor="poster" className="mb10">
            Poster
          </label>
          <div className={`${styles.inputPoster}`}>
            <input
              type="file"
              id="poster"
              ref={posterRef}
              onChange={handlePosterChange}
            />
            {oneSerie && (
              <button
                type="button"
                onClick={clearInputFile}
                className={`btn btn-admin-reverse ml20`}
              >
                Clear poster
              </button>
            )}
          </div>
          {errorPoster && <p className="form-error">{errorPoster}</p>}
        </div>
        {oneSerie && (
          <div>
            <img
              src={posterPreview}
              alt="poster"
              className={`${styles.posterMoment}`}
            />
          </div>
        )}
      </div>
      <div className="d-flex flex-column mb10">
        <label htmlFor="year">Année de sortie</label>
        <input {...register("year")} type="number" id="year" />
        {errors.year && <p className="form-error">{errors.year.message}</p>}
      </div>
      <div className="d-flex flex-column mb10">
        <label htmlFor="synopsis">Synopsis</label>
        <textarea {...register("resume")} cols={200} rows={10} id="resume" />
        {errors.synopsis && (
          <p className="form-error">{errors.synopsis.message}</p>
        )}
      </div>
      <div className="d-flex flex-column mb10">
        <label htmlFor="numberSeason">Nombres de saisons</label>
        <input {...register("numberSeason")} type="number" id="year" />
        {errors.numberSeason && (
          <p className="form-error">{errors.numberSeason.message}</p>
        )}
      </div>
      <div className="d-flex mb20 align-items-center">
        <label htmlFor="still" className="mr10">
          En cours ?
        </label>
        <input {...register("still")} type="checkbox" id="still" />
      </div>
      <div className="d-flex flex-column mb10">
        <label htmlFor="sensCritiqueNote">Note Sens Critique</label>
        <input
          {...register("sensCritiqueNote", {
            pattern: {
              value: /^[0-9]*[.]?[0-9]+$/,
              message:
                "Veuillez entrer un nombre valide (les décimaux sont autorisés).",
            },
          })}
          type="text"
          id="sensCritiqueNote"
        />
        {errors.sensCritiqueNote && (
          <p className="form-error">{errors.sensCritiqueNote.message}</p>
        )}
      </div>
      <div className="d-flex flex-column mb10">
        <label htmlFor="imdbNote">Note IMDb</label>
        <input
          {...register("imdbNote", {
            pattern: {
              value: /^[0-9]*[.]?[0-9]+$/,
              message:
                "Veuillez entrer un nombre valide (les décimaux sont autorisés).",
            },
          })}
          type="text"
          id="imdbNote"
        />
        {errors.imdbNote && (
          <p className="form-error">{errors.imdbNote.message}</p>
        )}
      </div>
      <div className="d-flex flex-column mb10">
        <label htmlFor="country">Pays de la série</label>
        <input {...register("country")} type="text" id="country" />
        {errors.country && (
          <p className="form-error">{errors.country.message}</p>
        )}
      </div>
      <div>
        <button className="btn btn-primary">
          {oneSerie ? "Modifier" : "Ajouter"}
        </button>
      </div>
      {feedbackGood && (
        <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>
      )}
    </form>
  );
}
