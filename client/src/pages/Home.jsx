import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import { Link } from "react-router-dom";
import useCustom from "../utils/useCustom";

const Home = () => {
  // const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  const { rooms, isLoading } = useCustom();
  // const getRooms = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(GET_ALL_ROOM);
  //     setRooms(response.data?.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     if (error?.message) {
  //       toast.error(error.message);
  //     } else {
  //       toast.error(error?.response?.data?.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const loginData = localStorage.getItem("user");
    setUser(loginData);
  }, []);

  if (isLoading) {
    return <div className="text-3xl mt-20">Loading...</div>;
  } else if (rooms.length === 0) {
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
      <div className="w-full flex gap-10 h-full flex-wrap justify-center mb-12">
        {rooms.map((room) => (
          <RoomCard
            key={room?._id}
            roomNumber={room.roomNumber}
            isAvailable={room.available}
            price={room.roomPrice}
            user={user}
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
