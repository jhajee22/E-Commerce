import { useEffect, useState } from "react";
import "./Login.css";
import {toast} from "react-toastify";
import { loginUser } from "../../services/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    navigate("/home");
  }
}, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser({ username, password });
//Store token
localStorage.setItem("accessToken",data.accesstoken);
//Store User
localStorage.setItem("user",JSON.stringify(data));
toast.success("Login Successsful ");
      console.log("Login success:", data);
navigate("/home");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
toast.error(err.message);
      } else {
        setError("Something went wrong");
toast.error("Something went Wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
