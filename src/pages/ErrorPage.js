import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  const navigate = useNavigate();

  function navigateToHomepage() {
    navigate("/");
  }
  return (
    <div className="flex-fill">
      <h1>ERROR PAGE</h1>
      <p>
        {error.status} | {error.statusText}
      </p>
      <button onClick={navigateToHomepage} className="btn btn-primary">
        Return to Homepage
      </button>
    </div>
  );
}
