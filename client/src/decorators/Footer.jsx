
import { Link } from "react-router-dom";
import "./styles/Footer.css";

const Footer = () => {
  const footerLinks = [
    {
      title: "Company",
      list: [
        {
          name: "About Us",
          path: "/about-us",
        },
        {
          name: "Contact Us",
          path: "/contact-us",
        },
      ],
    },
    {
      title: "Legal",
      list: [
        {
          name: "Privacy Policy",
          path: "/legal/privacy-policy",
        },
        {
          name: "Terms and Conditions",
          path: "/legal/terms-and-conditions",
        },
        {
          name: "Cookie Policy",
          path: "/legal/cookie-policy",
        },
        {
          name: "Refund Policy",
          path: "/legal/refund-policy",
        },
      ],
    },
  ];

  const personalInfo = [
    {
      name: "Address",
      value: `Chagans Technologies Limited, SCO-4, Dayal Bagh Market,
              Sector-39, Surajkund, Faridabad - 121009 Haryana`,
    },
  ];

  return (
    <footer>
      <div className="footerContainer max-width">
        <div className="footerLinks">
          {footerLinks.map((footerLink, index) => (
            <div className="footerLink" key={index}>
              <h3>{footerLink.title}</h3>
              <ul>
                {footerLink.list.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="infoGroup">
          <span>Address :</span>
          <p>{personalInfo[0].value}</p>
        </div>
        <div className="copyright">
          <h3>Chagans Technologies Limited</h3>
          <p>&copy; 2024 Chagans Technologies Limited All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
