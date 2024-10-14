import logo from "../assets/logo.jpg";
import "./styles/logo.css";
import { Link } from "react-router-dom"; 
const Logo = () => {
  return (
    <Link to={"/"} className="logo">
      <img src={logo} alt="chagans business center" />
    </Link>
  );
};

export default Logo;
