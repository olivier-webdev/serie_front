import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { modifyPassword } from "../../../apis/security";

const ResetPassword = () => {
  const email = new URLSearchParams(window.location.search).get("email");
  const [feedbackGood, setFeedbackGood] = useState("");
  const navigate = useNavigate();

  const yupSchema = yup.object({
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
  });

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(yupSchema),
  });

  async function submit(values) {
    console.log(values);
    try {
      const response = await modifyPassword(values.password, email);
      if (response.message) {
        setFeedbackGood(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center flex-fill`}
    >
      <h1>RESET PASSWORD</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="d-flex flex-column mb20">
          <label htmlFor="password" className="mb10">
            New Password <span></span>
          </label>
          <input {...register("password")} type="password" id="password" />
          {errors?.password && (
            <p className="text-error">{errors.password.message}</p>
          )}
        </div>
        <div className="d-flex flex-column mb20">
          <label htmlFor="confirmPassword" className="mb10">
            Confirm password <span></span>
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
        <button className="btn btn-primary">Submit</button>
        {feedbackGood && <p className={`text-yes`}>{feedbackGood}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
