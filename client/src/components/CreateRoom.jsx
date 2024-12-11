import axios from "axios";
import { useState } from "react";
import { CREATE_ROOM } from "../utils/API";
import toast from "react-hot-toast";

function CreateRoom() {
  const [roomNumber, setRoomNumber] = useState("");
  const [available, setAvailable] = useState(true);
  const [roomPrice, setRoomPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRoom = {
      roomNumber,
      available,
      roomPrice,
    };
    console.log("Room Created:", newRoom);
    try {
      const response = await axios.post(CREATE_ROOM, newRoom);
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setRoomNumber("");
    setAvailable(true);
    setRoomPrice("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 mb-52 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create a Room</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roomNumber" className="block text-gray-600 mb-2">
            Room Number
          </label>
          <input
            type="text"
            id="roomNumber"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter room number"
            required
          />
        </div>

        <div>
          <label htmlFor="available" className="block text-gray-600 mb-2">
            Availability
          </label>
          <select
            id="available"
            value={available}
            onChange={(e) => setAvailable(e.target.value === "true")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div>
          <label htmlFor="roomPrice" className="block text-gray-600 mb-2">
            Room Price
          </label>
          <input
            type="number"
            id="roomPrice"
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter room price"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Create Room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
