import "../sass/Footer.scss";

const Footer = () => {
  return (
    <div className="footerMainContainer">
      <div className="footer-box">
        <h3>About us</h3>
        <br />
        <p>
          Discover and join memorable events. Connect, get inspired and make
          lasting memories.
        </p>
      </div>
      <div className="footer-box">
        <h3>Contact</h3>
        <br />
        <p>Email:</p>
        <p>info@MeetHub.com</p>
        <p>Phone: + 123 456 7890</p>
      </div>
      <div className="footer-box">
        <h3>Social Media</h3>
        <br />
        <p>Twitter: 🐦</p>
        <p>SnapChat: 👻</p>
        <p>WhatsApp: 💬</p>
      </div>
    </div>
  );
};

export default Footer;
