import "../sass/Header.scss";

import { useNavigate } from "react-router-dom";
const Header = ({ userLogoSrc, hideImage }) => {
  const navigate = useNavigate();
  return (
    <div className="headerMainContainer">
      <div className="left-container">
        <div className="ball"></div>
        <h1 onClick={() => navigate("/")}>MeetHub</h1>
      </div>
      <div className="right-container">
        <img
          className={hideImage ? "hidden" : ""}
          onClick={() => navigate("/profile")}
          src={userLogoSrc}
          alt="User Logo"
        />
      </div>
    </div>
  );
};

export default Header;
