import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { useEffect, useState } from "react";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loginData = localStorage.getItem("user");
    const data = JSON.parse(loginData);
    setUser(data);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={`bg-indigo-600 text-white p-4 shadow-md`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to={"/rooms"} className="flex items-center space-x-2">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-lg">🏨</span>
          </div>
          <h1 className="text-lg font-semibold md:block hidden">
            Hotel Management
          </h1>
        </Link>

        {/* Book Your Room / Welcome Message */}
        <div>
          {user ? (
            <p className="text-xl sm:text-base">
              Welcome, <span className="font-bold ">{user.fullName}</span>
            </p>
          ) : (
            <h1 className="text-2xl font-bold">Book Your Room</h1>
          )}
        </div>

        {/* Login/Logout Button */}
        <div>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center bg-white px-4 py-2 rounded-sm text-red-600 font-medium gap-2"
            >
              <span className="hidden sm:inline text-lg">Logout</span>
              <IoMdLogIn size={23} color="red" />
            </button>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center justify-center gap-2 text-xl"
            >
              <span className="hidden sm:inline text-lg">Login</span>
              <BiLogOutCircle size={25} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
