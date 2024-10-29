import "../sass/OldMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
const OldMeetup = () => {
  return (
    <div className="oldMeetupContainer">
      Kalles stickmöte
      <img src={expandarrow} alt="Expand More" className="expandMoreIcon" />
    </div>
  );
};

export default OldMeetup;
