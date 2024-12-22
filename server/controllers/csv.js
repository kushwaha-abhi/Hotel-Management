const { Parser } = require("json2csv");
const BookedRoom = require("../models/bookedRoom.model");

module.exports.downloadFile = async (req, res) => {
  try {
    let bookings = await BookedRoom.find(
      {},
      {
        name: 1,
        roomNumber: 1,
        checkInAmount: 1,
        checkOutAmount: 1,
        totalAmount: 1,
        paymentMode: 1,
        numberOfDays: 1,
        numberOfPeople: 1,
        documentNumber: 1,
        bookedAt: 1,
        _id: 0,
      }
    );

    bookings = bookings.map((booking) => ({
      ...booking._doc,
      bookedAt: booking.bookedAt
        ? new Date(booking.bookedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A",
    }));

    // Convert the MongoDB documents (JSON) to CSV
    const fields = [
      { label: "Name", value: "name" },
      { label: "Room No.", value: "roomNumber" },
      { label: "Check-In Amt", value: "checkInAmount" },
      { label: "Check-Out Amt", value: "checkOutAmount" },
      { label: "Total Amount", value: "totalAmount" },
      { label: "Mode", value: "paymentMode" },
      { label: "No. of Days", value: "numberOfDays" },
      { label: "No. of People", value: "numberOfPeople" },
      { label: "Document No.", value: "documentNumber" },
      { label: "Date", value: "bookedAt" },
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(bookings);

    // Set headers for CSV download
    res.setHeader("Content-Disposition", "attachment; filename=bookings.csv");
    res.setHeader("Content-Type", "text/csv");

    res.status(200).send(csv);
  } catch (error) {
    console.error("Error generating CSV:", error);
    res.status(500).send("Error generating CSV file.");
  }
};
