import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcommingMeetup from "../components/UpcomingMeetup";
import OldMeetup from "../components/OldMeetup";
import "../sass/Profile.scss";
import { meetupData } from "../data/meetupdata";
const Profile = () => {
  return (
    <div className="profileMainContainer">
      <Header />
      <div className="meetupBox">
        <h2>Upcoming meetups</h2>
        {meetupData.map((meetup, index) => (
          <UpcommingMeetup key={index} meetupDetails={meetup} />
        ))}
        <h2>Old meetups</h2>
        <OldMeetup />
        <OldMeetup />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
