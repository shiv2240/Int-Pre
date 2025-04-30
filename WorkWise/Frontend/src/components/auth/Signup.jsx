import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Loader } from "lucide-react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      await axios.post("http://localhost:2030/api/auth/signup", {
        username,
        password,
      });
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage("Error creating account. Username may already be taken.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-500 via-blue-200 to-purple-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
      <div className="rounded-2xl border border-black/30 bg-white/10 p-8 backdrop-blur-md shadow-2xl shadow-blue-200/40 space-y-6 transition-transform transform hover:scale-[1.02]">
      <div className="text-center">
            <UserPlus className="mx-auto h-12 w-12 text-blue-400 drop-shadow-md" />
            <h2 className="mt-4 text-3xl font-bold text-black drop-shadow-sm">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-black/80">
              Sign up to start booking seats
            </p>
          </div>

          {isSuccess ? (
            <div className="mt-8 rounded-md bg-green-100/10 p-4 border border-green-300 text-green-300 text-sm">
              <p>Account created successfully! Redirecting to login...</p>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-black">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="mt-1 block w-full rounded-md border border-white/30 bg-white/30 px-4 py-2 text-black placeholder-black/70 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-black">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full rounded-md border border-white/30 bg-white/30 px-4 py-2 text-black placeholder-black/70 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
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
                    Creating account...
                  </span>
                ) : (
                  "Create account"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-black/80">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-900 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
