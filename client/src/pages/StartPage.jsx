import "../sass/StartPage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { useState } from "react";

const StartPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const baseURL = "https://or5ue0zwa6.execute-api.eu-north-1.amazonaws.com";

  const toggleVisibility = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email: email, password: password };
      console.log("newUser", newUser);
      const request = await fetch(`${baseURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await request.json();
      console.log("data", data);
      if (data.success) {
        setIsVisible(!isVisible);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="startPageMainContainer">
      <Header />
      <div className="loginBox">
        <h2 className="loginTitle">Login</h2>
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
            <form className="loginForm" onSubmit={handleSignUp}>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                value={password}
                type="text"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Confirm password</label>
              <input type="text" name="password" id="checkpassword" />
              <button className="signUpButton" type="submit">
                SIGN UP
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StartPage;
