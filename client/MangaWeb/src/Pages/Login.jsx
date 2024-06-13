import Axios from "../utils/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import file CSS kustom untuk styling tambahan
import animationData from "../assets/Animation - 1717523045286.json"; // Import file animasi LottieFiles
import Lottie from "react-lottie";
import { Link } from "react-router-dom";
import showToast from "../utils/toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      let response = await Axios({
        method: "POST",
        url: "/login",
        data: {
          email: email,
          password: password,
        },
      });
      localStorage.access_token = response.data.access_token;
      navigate("/homepage");
    } catch (error) {
      console.error(error.message);
      showToast(error.response?.data?.message || error.message);
    }
  };

  async function handleCredentialResponse(response) {
    try {
      let res = await Axios({
        method: "POST",
        url: "/login-google",
        headers: {
          google_token: response.credential,
        },
      });
      console.log("Encoded JWT ID token: " + response.credential);
      localStorage.access_token = res.data.access_token;
      navigate("/homepage");
    } catch (error) {
      console.error(error.response?.data?.message);
      showToast(error.response?.data?.message || error.message);
    }
    // console.log("Encoded JWT ID token: " + response.credential);
  }
  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "367565485864-er87gjq57fhmf2jonlp62gk2t4stonlb.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { type: "icon", theme: "outline", size: "medium" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <div className="login-container" style={{ overflow: "hidden" }}>
      <div className="background-image"></div>
      <div className="login-image-container">
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
          }}
        />
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email address or phone number"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-login">
            Log In
          </button>
          <div className="mt-3">
            <p>or login with</p>
          </div>
          <div id="buttonDiv"></div>
        </form>
        <div className="signup-link mt-3">
          <p>
            Don't have an account? <Link to={"/register"}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
