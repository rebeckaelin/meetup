import Header from "../components/Header";
import Footer from "../components/Footer";
import UpcommingMeetup from "../components/UpcommingMeetup";
import OldMeetup from "../components/OldMeetup";
import "../sass/Profile.scss";
const Profile = () => {
  return (
    <div className="profileMainContainer">
      <Header />
      <div className="meetupBox">
        <h2>Upcoming meetups</h2>
        <UpcommingMeetup />
        <UpcommingMeetup />
        <UpcommingMeetup />
        <UpcommingMeetup />
        <h2>Old meetups</h2>
        <OldMeetup />
        <OldMeetup />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
