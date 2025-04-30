import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Armchair, Home, LogIn, LogOut, UserPlus } from "lucide-react";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-600">
              <Armchair className="h-6 w-6" />
              <span className="text-xl font-bold">SeatBook</span>
            </Link>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {token ? (
              <>
                <Link
                  to="/seat-booking"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                >
                  <Armchair className="h-4 w-4" />
                  <span>Book Seats</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
