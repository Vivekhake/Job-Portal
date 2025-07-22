import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import "./LoginForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "STUDENT", // default role
  });
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        formData,
        { withCredentials: true }
      );
      console.log("Login success", res.data);
      alert("Login successful!");

      // ✅ Save only name to localStorage
      localStorage.setItem("user", JSON.stringify({ name: res.data.name }));

      // ✅ Redirect to home page
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email, password, or role");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Role:</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="STUDENT">Student</option>
          <option value="RECRUITER">Recruiter</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
