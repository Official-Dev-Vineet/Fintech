import { NavLink } from "react-router-dom";
import Logo from "../utils/logo";
import "./styles/Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
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
  const [active, setActive] = useState(false);
  return (
    <nav className={active ? "active" : ""}>
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
        <div className="bar" onClick={() => setActive(!active)}>
          <GiHamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
