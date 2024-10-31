import "../sass/StartPage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import userLogo from "../assets/userLogo.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPsw, setLoginPsw] = useState("");
  const navigate = useNavigate();

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

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = { email: loginEmail, password: loginPsw };
      const request = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await request.json();
      console.log("data", data);
      sessionStorage.setItem("userToken", data.data);

      if (data.success) {
        setLoginEmail("");
        setLoginPsw("");
        navigate("/meetups");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="startPageMainContainer">
      <Header userLogoSrc={userLogo} hideImage={true} />
      <div className="loginBox">
        <h2 className="loginTitle">Login</h2>
        <form className="loginForm" onSubmit={handleSignIn}>
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            name="loginEmail"
            id="loginEmail"
            value={loginEmail}
            autoComplete="off"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            name="loginPassword"
            id="loginPassword"
            value={loginPsw}
            autoComplete="off"
            onChange={(e) => setLoginPsw(e.target.value)}
          />
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
