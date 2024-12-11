import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GET_ALL_ROOM } from "../utils/API";
import toast from "react-hot-toast";

const Home = () => {
  //   const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);
  //   const navigate = useNavigate();

  const getRooms = async () => {
    try {
      const response = await axios.get(GET_ALL_ROOM);
      setRooms(response.data?.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  //   useEffect(() => {
  //     const loginData = localStorage.getItem("user");
  //     setUser(loginData);
  //     !loginData && navigate("/login");
  //   }, []);
  if (rooms.length === 0) {
    return (
      <div className="min-h-[83vh] grid place-items-center text-2xl pt-24">
        No Rooms are Available
        <Link
          to={"/createroom"}
          className="bg-indigo-600 py-2 px-5 rounded mt-5 text-white"
        >
          Creae a Room
        </Link>
      </div>
    );
  }
  return (
    <div className="min-h-[83vh] px-20 py-10">
      <div className="w-full flex gap-10 h-full flex-wrap justify-center">
        {rooms.map((room) => (
          <RoomCard
            key={room?._id}
            roomNumber={room.roomNumber}
            isAvailable={room.available}
            price={room.roomPrice}
          />
        ))}
      </div>
      <Link
        to={"/createroom"}
        className="bg-indigo-600 py-2 px-5 rounded mt-5 text-white"
      >
        Creae a Room
      </Link>
    </div>
  );
};

export default Home;
