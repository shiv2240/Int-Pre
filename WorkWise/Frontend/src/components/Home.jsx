import React from "react";
import { Link } from "react-router-dom";
import { Armchair, ArrowRight, CheckCircle } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white">

      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Book Your Seats Easily
            </h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              Welcome to SeatBook, the simplest way to book and manage your
              seats for any event. Get started in seconds with our intuitive
              booking system.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/login"
                className="btn btn-primary rounded-full px-6 py-3 border text-white border-white-100 bg-transparent text-base flex items-center transition-transform duration-200 transform hover:scale-105 hover:bg-transparent hover:text-black"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                to="/signup"
                className="btn btn-outline border-white bg-transparent border border-white-100 text-white hover:bg-transparent rounded-full px-6 py-3 text-base transition-transform duration-200 transform hover:scale-105 hover:text-black hover:border-black"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 -bottom-1">
          <svg
            className="w-full text-white"
            height="48"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28.0L1200,0z"
              fill="currentColor"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,71.32L1200,0z"
              fill="currentColor"
              opacity=".5"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,75.12L1200,0z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple Seat Booking System
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to book seats for your events
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          <div className="card p-6 flex flex-col items-center text-center shadow-md rounded-lg transition-transform hover:scale-105">
            <div className="rounded-full bg-blue-100 p-3">
              <Armchair className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Easy Seat Selection</h3>
            <p className="mt-2 text-gray-600">
              Simple interface to select and book multiple seats in one go
            </p>
          </div>


          <div className="card p-6 flex flex-col items-center text-center shadow-md rounded-lg transition-transform hover:scale-105">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Instant Confirmation</h3>
            <p className="mt-2 text-gray-600">
              Get immediate confirmation of your seat bookings
            </p>
          </div>


          <div className="card p-6 flex flex-col items-center text-center shadow-md rounded-lg transition-transform hover:scale-105">
            <div className="rounded-full bg-indigo-100 p-3">
              <svg
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-semibold">Secure Booking</h3>
            <p className="mt-2 text-gray-600">
              Your bookings are secure and protected by authentication
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="flex justify-center">
            <Link
              to="/signup"
              className="btn btn-primary rounded-full text-white px-6 py-3 bg-blue-600 text-sm flex items-center transition-transform duration-200 transform hover:scale-105 hover:bg-blue-600 hover:text-black"
            >
              Create an account
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
