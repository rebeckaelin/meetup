import "../sass/UpcommingMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
import { useState } from "react";
import PropTypes from "prop-types";

const UpcomingMeetup = ({ meetupDetails }) => {
  const token = sessionStorage.getItem("userToken");
  const userId = sessionStorage.getItem("user");
  const [isOpen, setIsOpen] = useState(false);
  const isBoked = meetupDetails.participants.includes(userId);
  const reloadPage = () => {
    window.location.reload();
  };

  const handleImageClick = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };
  const bookMeetup = async () => {
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
      if (!data.success) {
        alert("could not book meetup");
        return;
      }
      alert(`${meetupDetails.name} is booked`);
      reloadPage();
      console.log("fetched data", data);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelBooking = async () => {
    try {
      const res = await fetch(
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
      if (!data.success) {
        alert("could not cancel");
        return;
      }
      alert(`${meetupDetails.name} is canceled`);
      reloadPage();
      console.log("fetched data", data);
    } catch (error) {
      console.log(error);
    }
  };
  //hanterar om man är bokad eller inte och vilken funktion den ska peka på
  const handleBooking = async () => {
    if (!isBoked) {
      await bookMeetup();
    } else {
      await cancelBooking();
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
          <button className="bookingBtn" onClick={handleBooking}>
            {isBoked
              ? "avboka"
              : meetupDetails.participants.length === meetupDetails.seats
              ? "Fully booked"
              : "Book"}
          </button>
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
