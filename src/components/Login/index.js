import React, { useState } from "react";
import "./Login.css";
import { useHistory } from "react-router-dom";
import { PreloadMessage } from "react-preloader-tmnt";

const Login = ({ setIsAuth, isAuth }) => {
  const history = useHistory();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch("https://word-race-backend.herokuapp.com/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((creds) => {
        setIsAuth(true);
        setLoading(false);
        localStorage.setItem("token", creds.token);
        localStorage.setItem("userId", creds.userId);
        history.push("/game");
      })
      .catch((err) => {
        setErrors(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="log-in">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          required
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
        />
        <label htmlFor="password" name="password">
          Password
        </label>
        <input
          required
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
        />
        <button type="submit">Log in</button>
        <PreloadMessage
          loading={loading}
          message="Logging In"
          alignIndicator="bottom"
        />
      </form>
      {errors && <div className="errors">{errors}</div>}
    </div>
  );
};

export default Login;
