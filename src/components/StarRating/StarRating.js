import { useEffect, useState } from "react";

export default function StarRating({ maxRating = 10, onChange }) {
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  function setCurrentRatingClick(note) {
    currentRating === note ? setCurrentRating(0) : setCurrentRating(note);
  }

  useEffect(() => {
    onChange(currentRating);
  }, [currentRating, onChange]);

  return (
    <div className="d-flex flex-column align-items-center mt20 background">
      <h2 className="mt20">Ma note</h2>
      <div className="d-flex justify-content-center mt10">
        {[...Array(maxRating)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <p
              key={index}
              className={`hand star ${
                ratingValue <= (hoverRating || currentRating) ? "active" : ""
              }`}
              onClick={() => setCurrentRatingClick(ratingValue)}
              onMouseLeave={() => setHoverRating(0)}
              onMouseEnter={() => setHoverRating(ratingValue)}
            >
              &#9733;
            </p>
          );
        })}
      </div>
    </div>
  );
}
