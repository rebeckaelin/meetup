import "../sass/UpcommingMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
import { useState } from "react";
import PropTypes from "prop-types";

const UpcomingMeetup = ({ meetupDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  return (
    <div className="upcommingMeetupContainer">
      <div className="headerContent">
        {meetupDetails.name}
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
          <p className="desc">{meetupDetails.desc}</p>
          <p>
            <strong>Datum:</strong> {meetupDetails.date}
          </p>
          <p>
            <strong>Tid:</strong> {meetupDetails.time}
          </p>
          <p>
            <strong>Plats:</strong> {meetupDetails.location}
          </p>
          <p>
            <strong>Värd:</strong> {meetupDetails.host}
          </p>
          <p>
            <strong>Deltagare: </strong>
            {meetupDetails.numberOfParticipants}
          </p>
        </div>
      )}
    </div>
  );
};

UpcomingMeetup.propTypes = {
  meetupDetails: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    numberOfParticipants: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
};

export default UpcomingMeetup;
