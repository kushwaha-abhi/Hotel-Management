import { bookings } from "../utils/constant";

const Transactions = () => {
  if (bookings.length === 0) {
    return (
      <div className="grid min-h-[83vh] place-items-center text-3xl font-medium">
        No Booked Rooms
      </div>
    );
  }
  return (
    <div className="py-8 px-6 min-h-[83vh] overflow-auto  border">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <div className="grid grid-cols-8 gap-4 bg-gray-100 text-gray-700 font-semibold p-2 py-3 rounded-md md:w-full w-[150%] overflow-x-auto">
        <div className="md:block hidden">S. No.</div>
        <div>Name</div>
        <div>Room No.</div>
        <div>No. of Days</div>
        <div>No. of People</div>
        <div>Amount</div>
        <div>Payment Mode</div>
        <div>Date</div>
      </div>

      {bookings.map((booking, index) => (
        <div
          key={booking.id}
          className="grid grid-cols-8 gap-4 p-3 border-b border-gray-300 hover:bg-slate-100 text-sm md:text-base md:w-full w-[150%] overflow-x-auto"
        >
          <div className="md:block hidden">{index + 1}</div>
          <div>{booking.name}</div>
          <div>{booking.roomNo}</div>
          <div>{booking.days}</div>
          <div>{booking.people}</div>
          <div>{booking.amount}</div>
          <div>{booking.paymentMode}</div>
          <div>{booking.date}</div>
        </div>
      ))}
      <div className="mt-4 flex items-end">
        <button className="bg-indigo-600 py-2 px-4 rounded-md text-white font-medium">
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default Transactions;
