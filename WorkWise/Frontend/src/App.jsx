import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import SeatBooking from "./components/SeatBooking";
import Navbar from "./components/layout/Navbar";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/seat-booking"
                element={
                  <AuthContext.Consumer>
                    {({ token }) => (token ? <SeatBooking /> : <Login />)}
                  </AuthContext.Consumer>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;