import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineLockClosed,
} from "react-icons/hi2";

export default function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { handleRegister, loading } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setError("");

      const user = await handleRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (user) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="login-page">

      <div className="background-grid"></div>

      <div className="pink-glow"></div>
      <div className="blue-glow"></div>

      <div className="login-card">

        <div className="logo">
          InterviewAI
        </div>

        <h1>Create Account 🚀</h1>

        <p>
          Join InterviewAI and generate AI-powered interview reports in seconds.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <HiOutlineUser />

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <HiOutlineEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <HiOutlineLockClosed />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <HiOutlineLockClosed />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        <div className="footer">
          Already have an account?

          <Link to="/login">
            Sign In
          </Link>
        </div>

      </div>

    </div>
  );
}