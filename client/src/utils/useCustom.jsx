import axios from "axios";
import { GET_ALL_ROOM } from "./API";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useCustom = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(GET_ALL_ROOM);
      setRooms(response.data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return { rooms, isLoading, setLoading, getRooms };
};

export default useCustom;
