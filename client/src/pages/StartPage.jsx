import "../sass/StartPage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useState } from "react";

const StartPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (e) => {
    e.preventDefault(); //preventa form submission från knappen
    setIsVisible(!isVisible);
  };

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
            <button className="buttonTwo" onClick={toggleVisibility}>
              SIGN UP
            </button>
          </div>
        </form>
        {isVisible && (
          <div className="signUpBox loginBox">
            <form className="loginForm">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
              <label htmlFor="password">Password</label>
              <input type="text" name="password" id="password" />
              <label htmlFor="password">Confirm password</label>
              <input type="text" name="password" id="checkpassword" />
              <button className="signUpButton">SIGN UP</button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StartPage;
