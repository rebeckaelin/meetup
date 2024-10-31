import "../sass/UpcommingMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
import { useState } from "react";
import PropTypes from "prop-types";

const OldMeetup = ({ eventDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleReview, setToggleReview] = useState(false);

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
            <strong>Plats:</strong> {location}
          </p>
          <p>
            <strong>Värd:</strong> {host}
          </p>
          <img
            src={expandarrow}
            alt="Expand More"
            className={`expandMoreIcon ${toggleReview ? "rotated" : ""}`}
            onClick={() => setToggleReview(!toggleReview)}
            style={{
              transform: toggleReview ? "rotate(0deg)" : "rotate(90deg)",
            }}
          />
          {toggleReview && (
            <div>
              <p>
                <strong>Snittbetyg:</strong> {averageRating}
              </p>
              <h4>Recensioner:</h4>
              <ul>
                {reviews.map((review, reviewIndex) => (
                  <li key={reviewIndex}>{review}</li>
                ))}
              </ul>
            </div>
          )}
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
    reviews: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default OldMeetup;
