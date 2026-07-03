import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import "./Login.scss";

export default function Login() {
  const [error, setError] = useState("");
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setError("");
      const user = await handleLogin(formData);
  
      if (user) {
        navigate("/");
      }
    }catch(err){
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

        <h1>Welcome Back 👋</h1>

        <p>
          Sign in to continue generating AI-powered interview reports.
        </p>

        <form onSubmit={handleSubmit}>

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

          {error && <p className="error-message">{error}</p>}

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <div className="footer">

          Don't have an account?

          <Link to="/register">

            Create Account

          </Link>

        </div>

      </div>

    </div>
  );
}