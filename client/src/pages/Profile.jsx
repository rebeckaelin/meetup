import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcomingMeetup from "../components/UpcomingMeetup";
import OldMeetup from "../components/OldMeetup";
import "../sass/Profile.scss";
import { useEffect, useState } from "react";
import userLogo from "../assets/userLogo.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);
  const [oldMeetups, setOldMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetups = async () => {
      const token = sessionStorage.getItem("userToken");
      try {
        const response = await fetch(
          "https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/meetups/filtered",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meetups data");
        }
        const data = await response.json();
        const meetups = Array.isArray(data.data) ? data.data : [];

        const today = new Date();
        today.setHours(0);
        const upcoming = meetups.filter(
          (meetup) => new Date(meetup.date) >= today
        );
        const old = meetups.filter((meetup) => new Date(meetup.date) < today);

        const sortedUpcoming = upcoming.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const sortedOld = old.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setUpcomingMeetups(sortedUpcoming);
        setOldMeetups(sortedOld);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetups();
  }, []);

  if (loading) return <p>Loading meetups...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderNoMeetupsMessage = () => (
    <div
      className={`noMeetupsMessage ${
        upcomingMeetups.length === 0 && oldMeetups.length > 0
          ? "smallMargin"
          : ""
      }`}
    >
      <p>
        {upcomingMeetups.length === 0 && oldMeetups.length === 0
          ? "You have no Meetups booked, go to the Meetups Page 😀"
          : "You have no upcoming Meetups. Go to the Meetups Page to book your next one! 😀"}
        <br />
        <Link className="link" to="/meetups">
          👉 Book Meetup!
        </Link>
      </p>
    </div>
  );

  return (
    <div className="profileMainContainer">
      <Header userLogoSrc={userLogo} />
      <div className="meetupBox">
        {upcomingMeetups.length === 0 &&
          oldMeetups.length === 0 &&
          renderNoMeetupsMessage()}

        {upcomingMeetups.length > 0 && (
          <>
            <h2 className="headline">Upcoming meetups</h2>
            {upcomingMeetups.map((meetup) => (
              <UpcomingMeetup key={meetup.meetupId} meetupDetails={meetup} />
            ))}
          </>
        )}

        {upcomingMeetups.length === 0 &&
          oldMeetups.length > 0 &&
          renderNoMeetupsMessage()}

        <h2 className="headline">Old meetups</h2>
        {oldMeetups.length > 0 ? (
          oldMeetups.map((event) => (
            <OldMeetup key={event.meetupId} eventDetails={event} />
          ))
        ) : (
          <div className="noOldMeetupsMessage">
            <p>
              You have no past meetups yet! Check back after you have attended
              one to leave a review 🤗
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
