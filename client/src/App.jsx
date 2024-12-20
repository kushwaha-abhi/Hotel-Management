import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageNotFound from "./components/PageNotFound";
import BookRoom from "./pages/BookRoom";
import Transactions from "./pages/Transactions";
import { Toaster } from "react-hot-toast";
import CreateRoom from "./components/CreateRoom";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/checkout/:id" element={<CheckOut />} />
        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/room/:id" element={<BookRoom />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
