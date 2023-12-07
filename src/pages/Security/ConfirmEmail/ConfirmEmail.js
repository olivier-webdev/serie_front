import { useState } from "react";
import { verifyMail } from "../../../apis/security";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const token = new URLSearchParams(window.location.search).get("token");
  const [feedback, setFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    if (token) {
      try {
        const message = await verifyMail(token);
        console.log(message);
        if (message.message === "Inscription validée") {
          setFeedback(message.message);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        } else {
          setFeedbackError(message.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="d-flex flex-column flex-fill container">
      <h1 className="my30">Confirmation de l'email</h1>
      <div>
        <button onClick={handleClick} className="btn btn-primary mt20">
          Cliquez sur ce bouton
        </button>
        {feedback && (
          <>
            <p className="text-yes">{feedback} ! Vous allez être redirigé(e)</p>
          </>
        )}
        {feedbackError && <p className="text-error">{feedbackError}</p>}
      </div>
    </div>
  );
};

export default ConfirmEmail;
