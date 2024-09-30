import { NavLink } from "react-router-dom";
import Logo from "../utils/logo";
import "./styles/Navbar.css";
const Navbar = () => {
  const menuLinks = [
    {
      path: "/about-us",
      name: "About Us",
    },
    {
      path: "/contact-us",
      name: "Contact Us",
    },
    {
      path: "/our-services",
      name: "Our Services",
    },
  ];
  return (
    <nav>
      <div className="max-width">
        <Logo />
        <div className="menuLinks">
          <ul>
            {menuLinks.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path}>{link.name}</NavLink>
              </li>
            ))}
          </ul>
          <button>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

