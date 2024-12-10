import { useEffect, useState } from "react";
import RoomCard from "../components/RoomCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const rooms = [
    { roomNumber: 101, isAvailable: true, price: 3999 },
    { roomNumber: 102, isAvailable: false, price: 2999 },
    { roomNumber: 103, isAvailable: true, price: 1999 },
    { roomNumber: 104, isAvailable: false, price: 3999 },
    { roomNumber: 105, isAvailable: false, price: 4999 },
    { roomNumber: 106, isAvailable: true, price: 2999 },
  ];
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loginData = localStorage.getItem("user");
    setUser(loginData);
    !loginData && navigate("/login");
  }, []);

  return (
    <div className="min-h-[83vh] px-20 py-10">
      <div className="w-full flex gap-10 h-full flex-wrap justify-center">
        {rooms.map((room) => (
          <RoomCard
            key={room.roomNumber}
            roomNumber={room.roomNumber}
            isAvailable={room.isAvailable}
            price={room.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
