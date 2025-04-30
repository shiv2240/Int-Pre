const mongoose = require("mongoose");
require("dotenv").config();
const Seat = require("../models/Seat");

const createSeats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const existing = await Seat.countDocuments();

    if (existing > 0) {
      console.log("Seats already exist, skipping seeding...");
      return process.exit(0);
    }

    const totalSeats = 80;
    const rowSize = 7;
    const fullRows = Math.floor(totalSeats / rowSize);
    const leftover = totalSeats % rowSize;
    let seatNumber = 1;

    const seats = [];

    for (let row = 1; row <= fullRows; row++) {
      for (let i = 1; i <= rowSize; i++) {
        seats.push({
          row,
          seatNumber: seatNumber++,
        });
      }
    }

    if (leftover > 0) {
      const lastRow = fullRows + 1;
      for (let i = 1; i <= leftover; i++) {
        seats.push({
          row: lastRow,
          seatNumber: seatNumber++,
        });
      }
    }

    await Seat.insertMany(seats);
    console.log("80 seats seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

createSeats();
