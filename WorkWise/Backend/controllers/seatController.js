const Seat = require("../models/Seat.js");
const User = require("../models/User.js");

module.exports.available = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json({ message: "Here are all available Seats", seats });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch Seats", err });
  }
};

module.exports.book = async (req, res) => {
  const { seatCount } = req.body;

  if (!seatCount || seatCount < 1 || seatCount > 7) {
    return res.status(400).json({
      message: "You can only book between 1 and 7 seats at a time",
    });
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const availableSeats = await Seat.find({ isBooked: false }).sort({
      row: 1,
      position: 1,
    });

    const seatsByRow = {};
    availableSeats.forEach((seat) => {
      if (!seatsByRow[seat.row]) seatsByRow[seat.row] = [];
      seatsByRow[seat.row].push(seat);
    });

    for (const row of Object.keys(seatsByRow)) {
      const rowSeats = seatsByRow[row];
      if (rowSeats.length >= seatCount) {
        const selectedSeats = rowSeats.slice(0, seatCount);
        for (let seat of selectedSeats) {
          seat.isBooked = true;
          seat.bookedBy = user._id;
          await seat.save();
        }
        const seatDetails = selectedSeats
          .map((seat) => `Row ${seat.row}, Seat ${seat.seatNumber}`)
          .join(" | ");
        return res.status(200).json({
          message: `Seats booked across nearby rows: ${seatDetails}`,
          seats: selectedSeats,
        });
      }
    }

    const selectedSeats = availableSeats.slice(0, seatCount);
    if (selectedSeats.length < seatCount) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    for (let seat of selectedSeats) {
      seat.isBooked = true;
      seat.bookedBy = user._id;
      await seat.save();
    }

    return res.status(200).json({
      message: "Seats booked across nearby rows",
      seats: selectedSeats,
    });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Unable to book seats", err });
  }
};

module.exports.cancel = async (req, res) => {
  try {
    const { seatId } = req.body;
    const seat = await Seat.findById(seatId);
    if (!seat || seat.bookedBy?.toString() !== req.userId) {
      return res
        .status(400)
        .json({ message: "You cannot cancel this booking now" });
    }
    seat.isBooked = false;
    seat.bookedBy = null;
    await seat.save();
    res.status(200).json({ message: "Booking cancelled Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Unable to cancel at this moment", err });
  }
};

module.exports.resetAll = async (req, res) => {
  try {
    await Seat.updateMany({}, { isBooked: false, bookedBy: null });
    res.status(200).json({ message: "All seat bookings have been reset." });
  } catch (err) {
    res.status(500).json({ message: "Unable to reset seats", err });
  }
};
