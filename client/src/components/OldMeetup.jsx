import "../sass/OldMeetup.scss";
import expandarrow from "../assets/expand-arrow.png";
// import { useState } from "react";
const OldMeetup = () => {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="oldMeetupContainer">
      Kalles stickmöte
      <img src={expandarrow} alt="Expand More" className="expandMoreIcon" />
    </div>
  );
};

export default OldMeetup;
