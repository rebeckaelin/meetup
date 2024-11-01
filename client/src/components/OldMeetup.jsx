import "../sass/UpcommingMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Reviews from "./Reviews";
const OldMeetup = ({ eventDetails, hideContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleReview, setToggleReview] = useState(false);
  // const token = sessionStorage.getItem("userToken");
  // const [reviewList, setReviewList] = useState([]);
  const {
    desc = "ingen beskrivning tillgänglig",
    name = "Ingen titel",
    location = "Ingen plats",
    host = "Ingen värd",
    averageRating = 0,
    reviews = [],
  } = eventDetails || {};
  const handleImageClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  // const getData = async () => {
  //   try {
  //     const res = await fetch(
  //       //byta url till en ny
  //       "https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/reviews",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     if (!data.success) {
  //       alert("could not get reviews");
  //       return;
  //     }
  //     console.log(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getData();
  // });

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
              <strong>Average:</strong> {averageRating}
            </p>
            <h4>Reviews:</h4>
            <ul>
              {reviews.map((review, reviewIndex) => (
                <li key={reviewIndex}>{review}</li>
              ))}
            </ul>
          </div>
          <p className={`${hideContent ? "hidden" : ""}`}>Leave a review</p>
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
          <div className={` ${hideContent ? "hidden" : ""}`}>
            {toggleReview && <Reviews meetupId={eventDetails.meetupId} />}
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
};

export default OldMeetup;
