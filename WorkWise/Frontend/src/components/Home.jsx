import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Seat Booking App</h1>
      <p>Start by logging in or signing up to book seats.</p>
      <p>Use the navigation bar to access different features.</p>
      <Link to ="/login">
      <button>Log In</button>
      </Link>
      <Link to="/signup">
      <button>Sign Up</button>
        </Link>
    </div>
  );
};

export default Home;
