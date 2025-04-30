import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Armchair, Home, LogIn, LogOut, UserPlus, Menu, X } from "lucide-react";

const Navbar = () => {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
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

        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 py-2">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
              onClick={toggleMenu}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            {token ? (
              <>
                <Link
                  to="/seat-booking"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  <Armchair className="h-4 w-4" />
                  <span>Book Seats</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
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
                  onClick={toggleMenu}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
                  onClick={toggleMenu}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
