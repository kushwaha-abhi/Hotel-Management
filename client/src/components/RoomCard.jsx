import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/currencyFormat";
import { imgSrc } from "../utils/constant";

const RoomCard = ({ roomNumber, isAvailable, price }) => {
  const navigate = useNavigate();
  const onBook = () => {
    console.log(roomNumber);
  };
  return (
    <div className="border h-[48vh] rounded-lg shadow-md p-4 bg-white md:w-[25%] w-full hover:scale-105 transition-all duration-300">
      <div className="h-full w-full flex flex-col gap-2">
        <img src={imgSrc} alt="Room" className="w-full h-full object-contain" />
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
          <button
            onClick={() => {
              navigate(`/room/${roomNumber}`, { state: { roomNumber, price } });
            }}
            // to={`/room/${roomNumber}`}
            className="bg-blue-500 hover:bg-blue-600 text-white text-center font-medium py-2 px-4 rounded"
          >
            Book Now
          </button>
        ) : (
          <button
            className="bg-red-600 text-white font-medium py-2 px-4 rounded"
            disabled
          >
            Cancel Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
