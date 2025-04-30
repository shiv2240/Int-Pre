import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Loader } from "lucide-react";

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://int-pre.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate("/seat-booking");
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-500 via-blue-200 to-purple-300 py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md">
    <div className="rounded-2xl border border-black/30 bg-white/10 p-8 backdrop-blur-md shadow-2xl shadow-blue-200/40 space-y-6 transition-transform transform hover:scale-[1.02]">
      <div className="text-center">
        <LogIn className="mx-auto h-12 w-12 text-blue-600 drop-shadow-md" />
        <h2 className="mt-4 text-3xl font-bold text-gray-900 drop-shadow-sm">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-900">
          Enter your credentials to access your account
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white/30 px-4 py-2 text-gray-900 placeholder-text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white/30 px-4 py-2 text-gray-900 placeholder-text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-red-300 text-sm mt-2">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl hover:from-blue-600 hover:to-indigo-600 shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-900">
        <p>
          Don’t have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-900 hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;
