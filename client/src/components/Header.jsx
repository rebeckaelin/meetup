import "../sass/Header.scss";
import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";
const Header = ({ userLogoSrc, hideContent }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="headerMainContainer">
      <div className="left-container">
        <div className="ball"></div>
        <h1 onClick={() => navigate("/meetups")}>MeetHub</h1>
      </div>
      <div className={`right-container ${hideContent ? "hidden" : ""}`}>
        <p className="logoutButton" onClick={handleLogout}>
          LOGOUT
        </p>
        <img
          className="profileImg"
          onClick={() => navigate("/profile")}
          src={userLogoSrc}
          alt="User Logo"
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  userLogoSrc: PropTypes.string.isRequired,
  hideContent: PropTypes.bool,
};

export default Header;
