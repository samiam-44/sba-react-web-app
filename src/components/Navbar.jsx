import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/bucketlist">My Bucketlist Movies</Link>
      <Link to="/seen">Seen</Link>
    </nav>
  );
}
