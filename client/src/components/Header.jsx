import "../sass/Header.scss";

import userLogo from "../assets/userLogo.png";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="headerMainContainer">
      <div className="left-container">
        <div className="ball"></div>
        <h1 onClick={() => navigate("/")}>MeetHub</h1>
      </div>
      <div className="right-container">
        <img onClick={() => navigate("/profile")} src={userLogo} alt="" />
      </div>
    </div>
  );
};

export default Header;
