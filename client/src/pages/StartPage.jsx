import "../sass/StartPage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StartPage = () => {
  return (
    <div className="startPageMainContainer">
      <Header />
      <div className="loginBox">
        <h2>Login</h2>
        <form className="loginForm">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="password" />
          <div className="formButtons">
            <button className="buttonOne" type="submit">
              LOGIN
            </button>
            <button className="buttonTwo">SIGN UP</button>
          </div>
        </form>
      </div>
      <div></div>
      <Footer />
    </div>
  );
};

export default StartPage;
