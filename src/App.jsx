import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bucketlist from "./pages/Bucketlist";
import Seen from "./pages/Seen";
import About from "./pages/About";

function App() {


  return (
    <>
  <Navbar />
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/bucketlist" element={<Bucketlist/>} />
      <Route path="/about" element={<About/>} />
        <Route path="/seen" element={<Seen/>} />
  </Routes>
</>
  );
}

export default App
