import Logo from "../utils/logo";
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
      title: "Services",
      list: [
        {
          name: "Digital Payments",
          path: "/services/digital-payments",
        },
        {
          name: "Payout Solutions",
          path: "/services/payout-solutions",
        },
        {
          name: "Banking Solutions",
          path: "/services/banking-solutions",
        },
        {
          name: "Rental Agreements",
          path: "/services/rental-agreements",
        },
        {
          name: "Legal Documents",
          path: "/services/legal-documents",
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
  return (
    <footer>
      <div className="footerContainer max-width">
        <Logo />
        <div className="footerLinks">
          {footerLinks.map((footerLink, index) => (
            <div className="footerLink" key={index}>
              <h3>{footerLink.title}</h3>
              <ul>
                {footerLink.list.map((link, index) => (
                  <li key={index}>
                    <a href={link.path}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
