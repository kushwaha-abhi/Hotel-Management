import { IoCall, IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-gray-300 py-4">
      <div className="container mx-auto flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        Developing by Abhinav
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Hotel Management. All rights
          reserved.
        </div>
        {/* Contact Details */}
        <div className="flex flex-col items-center sm:flex-row sm:space-x-4 text-sm">
          <a
            href="mailto:abhinavmaurya476@gmail.com"
            className="hover:underline"
          >
            <IoMail size={26} />
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="tel:+917052314766" className="hover:underline">
            <IoCall size={26} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
