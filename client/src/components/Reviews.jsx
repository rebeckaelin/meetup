import { useState } from "react";
import PropTypes from "prop-types";
import "../sass/Reviews.scss";

const Reviews = ({ meetupId, hasLeftReview }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [justRate, setJustRate] = useState(false);
  const handleReview = async (event) => {
    const token = sessionStorage.getItem("userToken");

    event.preventDefault();

    try {
      const res = await fetch(
        "https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            meetupId: meetupId,
            comment: review,
            rating: rating,
          }),
        }
      );
      const data = await res.json();

      if (!data.success) {
        alert("could not add rating");
        return;
      }
      alert("added rating");
      setJustRate(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="reviewForms" onSubmit={(e) => handleReview(e)}>
        <label className="reviewLabel" htmlFor="review"></label>
        <textarea
          className="reviewInput"
          onChange={(e) => setReview(e.target.value)}
          type="text"
          id="review"
          required
          placeholder="Fantastiskt fluffig kanelbulle, men sockrig nog att ge påskharen sockerchock – nästan perfekt!"
        ></textarea>
        <label className="ratingLabel" htmlFor="rating"></label>
        <div className="buttonContainer">
          <input
            className="ratingInput"
            onChange={(e) => setRating(e.target.value)}
            type="number"
            min="1"
            max="5"
            id="rating"
            required
            placeholder="1-5"
          ></input>
          <button
            disabled={hasLeftReview ? true : false}
            className="reviewButton"
            style={{
              opacity: hasLeftReview || justRate ? 0.5 : "",
              cursor: hasLeftReview || justRate ? "not-allowed" : "pointer",
            }}
            type="submit"
          >
            {hasLeftReview || justRate ? "Reviewed" : "Add review"}
          </button>
        </div>
      </form>
    </div>
  );
};

Reviews.propTypes = {
  meetupId: PropTypes.string,
  hasLeftReview: PropTypes.bool,
};

export default Reviews;
