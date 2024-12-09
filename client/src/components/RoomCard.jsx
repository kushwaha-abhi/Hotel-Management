import { Link } from "react-router-dom";
import { formatPrice } from "../utils/currencyFormat";

const RoomCard = ({ roomNumber, isAvailable, price }) => {
  const onBook = () => {
    console.log(roomNumber);
  };
  return (
    <div className="border h-[48vh] rounded-lg shadow-md p-4 bg-white w-[25%] hover:scale-105 transition-all duration-300">
      <div className="h-full w-full flex flex-col gap-2">
        <img
          src="https://as1.ftcdn.net/v2/jpg/06/19/00/08/1000_F_619000872_AxiwLsfQqRHMkNxAbN4l5wg1MsPgBsmo.jpg"
          alt="Room"
          className="w-full h-full object-contain"
        />
        <div className="text-lg font-semibold">
          Room Number: <span className="text-gray-700">{roomNumber}</span>
        </div>

        <div
          className={`text-sm font-medium  ${
            isAvailable ? "text-green-600" : "text-red-600"
          }`}
        >
          Status: {isAvailable ? "Available" : "Booked"}
        </div>

        <div className="font-medium text-lg">{formatPrice(price)}</div>

        {isAvailable ? (
          <Link
            to={`/room/${roomNumber}`}
            className="bg-blue-500 hover:bg-blue-600 text-white text-center font-medium py-2 px-4 rounded"
          >
            Book Now
          </Link>
        ) : (
          <button
            className="bg-blue-200 text-white font-medium py-2 px-4 rounded"
            disabled
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
