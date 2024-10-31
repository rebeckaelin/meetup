import "../sass/UpcommingMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
import { useState } from "react";
import PropTypes from "prop-types";

const UpcomingMeetup = ({ meetupDetails }) => {
  const [isOpen, setIsOpen] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const handleImageClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const handleBooking = async () => {
    const token = sessionStorage.getItem("userToken");
    try {
      const res = await fetch(
        "https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/meetups/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ meetupId: meetupDetails.meetupId }),
        }
      );
      const data = await res.json();
      reloadPage();
      console.log("fetched data", data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async () => {
    const token = sessionStorage.getItem("userToken");
    try {
      const res = await fetch(
        //Byt ut Länken Nedanför ----->
        "https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/meetups/registration",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ meetupId: meetupDetails.meetupId }),
        }
      );
      const data = await res.json();
      reloadPage();
      console.log("fetched data", data);
    } catch (error) {
      console.log(error);
    }
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
            <strong>Date:</strong> {meetupDetails.date}
          </p>
          <p>
            <strong>Time:</strong> {meetupDetails.time}
          </p>
          <p>
            <strong>Location:</strong> {meetupDetails.location}
          </p>
          <p>
            <strong>Host:</strong> {meetupDetails.host}
          </p>
          <p>
            <strong>Participants: </strong>
            {meetupDetails.participants.length}
          </p>
          <p>
            <strong>Seats: </strong>
            {meetupDetails.seats}
          </p>
          <button onClick={handleBooking}>
            {meetupDetails.participants.length === meetupDetails.seats
              ? "Fully booked"
              : "Book"}
          </button>
          <button onClick={cancelBooking}>Cancel</button>
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
    meetupId: PropTypes.string,
    participants: PropTypes.array,
    seats: PropTypes.number,
  }).isRequired,
};

export default UpcomingMeetup;
