import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcomingMeetup from "../components/UpcomingMeetup";
import OldMeetup from "../components/OldMeetup";
import "../sass/Profile.scss";
import { useEffect, useState } from "react";

const Profile = () => {
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);
  const [oldMeetups, setOldMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const response = await fetch(
          "https://or5ue0zwa6.execute-api.eu-north-1.amazonaws.com/meetups"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch meetups data");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        const meetups = Array.isArray(data) ? data : data.meetups || [];

        const today = new Date("2024-11-10");
        const upcoming = meetups.filter(
          (meetup) => new Date(meetup.date) >= today
        );
        const old = meetups.filter((meetup) => new Date(meetup.date) < today);

        setUpcomingMeetups(upcoming);
        setOldMeetups(old);
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

  return (
    <div className="profileMainContainer">
      <Header />
      <div className="meetupBox">
        <h2 className="headline">Upcoming meetups</h2>
        {upcomingMeetups.map((meetup) => (
          <UpcomingMeetup key={meetup.meetupId} meetupDetails={meetup} />
        ))}

        <h2 className="headline">Old meetups</h2>
        {oldMeetups.map((event) => (
          <OldMeetup key={event.meetupId} eventDetails={event} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
