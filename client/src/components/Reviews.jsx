import { useState } from "react";
import PropTypes from "prop-types";

const Reviews = ({ meetupId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const handleReview = async (event) => {
    const token = sessionStorage.getItem("userToken");
    event.preventDefault();
    console.log("rating", rating);
    console.log("review", review);
    //post req
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
      console.log("data", data);
      if (!data.success) {
        alert("could not add rating");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleReview(e)}>
        <label htmlFor="review">Review</label>
        <input
          onChange={(e) => setReview(e.target.value)}
          type="text"
          id="review"
          required
        ></input>
        <label htmlFor="rating">Rating</label>
        <input
          onChange={(e) => setRating(e.target.value)}
          type="number"
          min="1"
          max="5"
          id="rating"
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

Reviews.propTypes = {
  meetupId: PropTypes.string,
};

export default Reviews;
