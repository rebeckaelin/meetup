import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcomingMeetup from "../components/UpcomingMeetup";
import OldMeetup from "../components/OldMeetup";
import "../sass/Profile.scss";
import { useEffect, useState } from "react";
import userLogo from "../assets/userLogo.png";

const Profile = () => {
  const [upcomingMeetups, setUpcomingMeetups] = useState([]);
  const [oldMeetups, setOldMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetups = async () => {
      console.log("Updated upcomingMeetups:", upcomingMeetups);
      console.log("Updated oldMeetups:", oldMeetups);
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
        console.log("Fetched data:", data);
        console.log(data.data);
        const meetups = Array.isArray(data.data) ? data.data : [];

        const today = new Date();
        const upcoming = meetups.filter((meetup) => {
          const meetupDate = new Date(meetup.date);

          return meetupDate >= today;
        });

        const old = meetups.filter((meetup) => {
          const meetupDate = new Date(meetup.date);

          return meetupDate < today;
        });

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
      <Header userLogoSrc={userLogo} />
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
