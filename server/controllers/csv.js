const { Parser } = require("json2csv");
const BookedRoom = require("../models/bookedRoom.model");

module.exports.downloadFile = async (req, res) => {
  try {

    let bookings = await BookedRoom.find(
      {},
      {
        name: 1,
        roomNumber: 1,
        numberOfPeople: 1,
        totalAmount: 1,
        paymentMode: 1,
        date: 1,
        numberOfDays: 1,
        _id: 0,
        bookedAt: 1,
      }
    );


    bookings = bookings.map((booking) => ({
      ...booking._doc, 
      bookedAt: booking.bookedAt
        ? new Date(booking.bookedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "N/A",
    }));

    // Convert the MongoDB documents (JSON) to CSV
    const fields = [
      "name",
      "roomNumber",
      "numberOfPeople",
      "totalAmount",
      "paymentMode",
      "date",
      "numberOfDays",
      "bookedAt",
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
