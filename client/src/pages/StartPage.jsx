import "../sass/StartPage.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import userLogo from "../assets/userLogo.png";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPsw, setLoginPsw] = useState("");
  const [comparePsw, setComparePsw] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const baseURL = "https://yh2yzv1g0b.execute-api.eu-north-1.amazonaws.com/";

  useEffect(() => {
    setIsButtonDisabled(password !== comparePsw || password === "");
  }, [password, comparePsw]);

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
        setComparePsw("");
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
      sessionStorage.setItem("userToken", data.data.token);
      sessionStorage.setItem("user", data.data.userId);
      if (data.success) {
        setLoginEmail("");
        setLoginPsw("");
        navigate("/meetups");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // hideContent={true}

  return (
    <div className="startPageMainContainer">
      <Header userLogoSrc={userLogo} />
      <div className="loginBox">
        <h2 className="loginTitle">LOGIN</h2>
        <form className="loginForm" onSubmit={handleSignIn}>
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            name="loginEmail"
            id="loginEmail"
            value={loginEmail}
            autoComplete="off"
            required
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            name="loginPassword"
            id="loginPassword"
            value={loginPsw}
            autoComplete="off"
            required
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
                autoComplete="off"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                value={password}
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Confirm password</label>
              <input
                type="password"
                name="password"
                id="checkpassword"
                value={comparePsw}
                autoComplete="off"
                required
                onChange={(e) => setComparePsw(e.target.value)}
              />
              <button
                className="signUpButton"
                type="submit"
                disabled={isButtonDisabled}
                style={{
                  backgroundColor: isButtonDisabled ? "gray" : "#EB6060",
                  cursor: isButtonDisabled ? "not-allowed" : "pointer",
                }}
              >
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
