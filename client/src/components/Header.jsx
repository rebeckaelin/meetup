import "../sass/Header.scss";

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
        <button className="logoutButton" onClick={handleLogout}>
          LOGOUT
        </button>
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

export default Header;
