import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/currencyFormat";
import { imgSrc } from "../utils/constant";
import axios from "axios";
import { API } from "../utils/API";
import toast from "react-hot-toast";

const RoomCard = ({ roomNumber, isAvailable, price, user }) => {
  const navigate = useNavigate();
  const handleBook = () => {
    if (!user) navigate("/login");
    else navigate(`/room/${roomNumber}`, { state: { roomNumber, price } });
  };

  const handleCancel = async () => {
    const CANCEL_ROOM = API + "/room/cancel/" + roomNumber;
    try {
      const response = await axios.put(CANCEL_ROOM);
      if (response.status === 200) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
      }
    }
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
            onClick={handleBook}
            className="bg-blue-500 hover:bg-blue-600 text-white text-center font-medium py-2 px-4 rounded"
          >
            Book Now
          </button>
        ) : (
          <button
            className="bg-red-600 text-white font-medium py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel Now
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
