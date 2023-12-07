import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import { signup } from "../../../apis/users";

export default function Register() {
  const [feedback, setFeedback] = useState("");
  const [feedbackGood, setFeedbackGood] = useState("");
  const [errorPoster, setErrorPoster] = useState("");
  const navigate = useNavigate();
  const avatarRef = useRef();

  const yupSchema = yup.object({
    username: yup
      .string()
      .required("Le champ est obligatoire")
      .min(2, "Le champ doit comporter 2 caractères")
      .max(12, "Le champ ne doit pas contenir plus de 12 caractères"),
    email: yup
      .string()
      .required("Le champ est obligatoire")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Votre email n'est pas valide"
      ),
    password: yup
      .string()
      .required("Le champ est obligatoire")
      .min(5, "Le champ doit comporter 5 caractères"),
    confirmPassword: yup
      .string()
      .required("Le champ est obligatoire")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passe ne correspondent pas"
      ),
    cgu: yup.boolean().oneOf([true], "Vous devez accepter les CGU"),
  });

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    cgu: false,
    avatar: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit() {
    setFeedback("");
    const values = getValues();
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (avatarRef.current && avatarRef.current.files[0]) {
      const maxFileSize = 500000;
      if (avatarRef.current.files[0].size > maxFileSize) {
        setErrorPoster("Le fichier est trop lourd");
        return;
      }
      const supportedExtensions = ["jpg", "jpeg", "png", "avif"];
      const fileExtension = avatarRef.current.files[0].name
        .split(".")
        .pop()
        .toLowerCase();
      if (!supportedExtensions.includes(fileExtension)) {
        setErrorPoster("Format de fichier non supporté.");
        return;
      }
      formData.append("avatar", avatarRef.current.files[0]);
    }
    console.log(formData);
    try {
      const response = await signup(formData);
      if (response.message) {
        setFeedback(response.message);
      } else {
        setFeedbackGood(response.messageGood);
        setErrorPoster("");
        reset(defaultValues);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center flex-fill`}
    >
      <form onSubmit={handleSubmit(submit)}>
        <h3 className="mb20">
          Les champs <span className={`${styles.feedback}`}>*</span> sont
          obligatoires
        </h3>
        <div className="d-flex flex-column mb20">
          <label htmlFor="username" className="mb10">
            Pseudo <span className={`${styles.feedback}`}>*</span>
          </label>
          <input {...register("username")} type="text" id="username" />
          {errors?.username && (
            <p className="text-error">{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="email" className="mb10">
            Email <span className={`${styles.feedback}`}>*</span>
          </label>
          <input {...register("email")} type="text" id="email" />
          {errors?.email && (
            <p className="text-error">{errors.email.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            Password <span className={`${styles.feedback}`}>*</span>
          </label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="confirmPassword" className="mb10">
            Confirm password <span className={`${styles.feedback}`}>*</span>
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
          />
          {errors?.confirmPassword && (
            <p className="text-error">{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="avatar" className="mb10">
            Avatar
          </label>
          <input type="file" id="avatar" ref={avatarRef} />
          {errorPoster && <p className="form-error">{errorPoster}</p>}
        </div>
        <div className="d-flex mb20 align-items-center">
          <label htmlFor="cgu" className="mr10">
            CGU
          </label>
          <input {...register("cgu")} type="checkbox" id="cgu" />
        </div>
        {errors?.cgu && <p className="text-error">{errors.cgu.message}</p>}
        <button className="btn btn-primary">Submit</button>
        {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
        {feedbackGood && (
          <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>
        )}
      </form>
    </div>
  );
}
