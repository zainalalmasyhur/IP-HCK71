import Axios from "../utils/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CancelButton from "../components/Public/CancelButton";
import AddUserButton from "../components/Public/AddUserButton";
import showToast from "../utils/toast";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Regis = async (event) => {
    event.preventDefault();

    try {
      await Axios({
        url: "/register",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          username: username,
          email: email,
          password: password,
        },
      });
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log(error);
      const errorMessage = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(", ")
        : error.response.data.message;
      showToast(errorMessage || error.message);
    }
  };

  return (
    <section className="container">
      <div className="d-flex justify-content-center">
        <h1 className="display-2 mt-3">Sign Up</h1>
      </div>
      <br />
      <div className="row">
        <div className="">
          <form id="product-form" onSubmit={Regis}>
            <div className="mb-3">
              <label htmlFor="product-name">
                Username <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="product-name"
                placeholder="Enter product name"
                autoComplete="off"
                required=""
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="product-desc">
                Email <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="product-desc"
                placeholder="Enter product description"
                autoComplete="off"
                required=""
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="product-desc">
                Password <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="product-desc"
                placeholder="Enter product Location"
                autoComplete="off"
                required=""
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="row mt-5 mb-3">
              <CancelButton />
              <AddUserButton />
            </div>
          </form>
        </div>
      </div>
      <hr />
    </section>
  );
}
