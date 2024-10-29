import "../sass/Header.scss";

import userLogo from "../assets/userLogo.png";

const Header = () => {
  return (
    <div className="headerMainContainer">
      <div className="left-container">
        <div className="ball"></div>
        <h1>MeetHub</h1>
      </div>
      <div className="right-container">
        <img src={userLogo} alt="" />
      </div>
    </div>
  );
};

export default Header;
