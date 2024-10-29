import "../sass/UpcommingMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
const UpcommingMeetup = () => {
  return (
    <div className="upcommingMeetupContainer">
      annas teparty
      <img src={expandarrow} alt="Expand More" className="expandMoreIcon" />
    </div>
  );
};

export default UpcommingMeetup;
