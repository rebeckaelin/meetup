import "../sass/UpcommingMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Reviews from "./Reviews";
const OldMeetup = ({ eventDetails, hideContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleReview, setToggleReview] = useState(false);
  const token = sessionStorage.getItem("userToken");
  const userId = sessionStorage.getItem("user");
  const [reviewList, setReviewList] = useState([]);
  const [hasLeftReview, setHasLeftReview] = useState(false);
  const checkIfReviewIsLeft = (userId) => {
    if (reviewList.length > 0) {
      const isReviewed = reviewList.some((value) => value.userId === userId);
      setHasLeftReview(isReviewed);
    }
    setHasLeftReview(false);
  };

  const {
    desc = "ingen beskrivning tillgänglig",
    name = "Ingen titel",
    location = "Ingen plats",
    host = "Ingen värd",
    // averageRating = 0,
    // reviews = [],
  } = eventDetails || {};
  const handleImageClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const getData = async () => {
    try {
      const res = await fetch(
        `https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/reviews/${eventDetails.meetupId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      // if (!data.success) {
      //   alert("could not get reviews");
      //   return;
      // }
      console.log("data", data);

      setReviewList(data.data);
      checkIfReviewIsLeft(userId);
      console.log("hasleftreview", hasLeftReview);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="upcommingMeetupContainer">
      <div className="headerContent">
        {name}
        <img
          src={expandarrow}
          alt="Expand More"
          className={`expandMoreIcon ${isOpen ? "rotated" : ""}`}
          onClick={handleImageClick}
          style={{
            transform: isOpen ? "rotate(0deg)" : "rotate(90deg)",
          }}
        />
      </div>
      {isOpen && (
        <div className="additionalContent">
          <p className="desc">{desc}</p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Host:</strong> {host}
          </p>

          <div>
            <p>
              <strong>Average:</strong>{" "}
            </p>
            <div>
              {reviewList.length > 0 ? (
                (
                  reviewList.reduce(
                    (acc, curr) => Number(acc) + Number(curr.rating),
                    0
                  ) / reviewList.length
                ).toFixed(2)
              ) : (
                <p>No rating added on meetup</p>
              )}
            </div>
            <h4>Reviews:</h4>
            <ul>
              {reviewList.length > 0 ? (
                reviewList.map((review, reviewIndex) => (
                  <li key={reviewIndex}>{review.comment}</li>
                ))
              ) : (
                <p>No reviews added on meetup yet</p>
              )}
            </ul>
          </div>
          <br></br>

          <div className="openReview">
            <p className={`${hideContent ? "hidden" : ""}`}>
              <strong>Leave a review</strong>
            </p>
            <img
              src={expandarrow}
              alt="Expand More"
              className={`expandMoreIcon ${toggleReview ? "rotated" : ""} ${
                hideContent ? "hidden" : ""
              }`}
              onClick={() => setToggleReview(!toggleReview)}
              style={{
                transform: toggleReview ? "rotate(0deg)" : "rotate(90deg)",
              }}
            />
          </div>

          <div className={` ${hideContent ? "hidden" : ""}`}>
            {toggleReview && (
              <Reviews
                hasLeftReview={hasLeftReview}
                meetupId={eventDetails.meetupId}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

OldMeetup.propTypes = {
  eventDetails: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    averageRating: PropTypes.number,
    meetupId: PropTypes.string.isRequired,
    reviews: PropTypes.arrayOf(PropTypes.string),
  }),
  hideContent: PropTypes.bool,
};

export default OldMeetup;
