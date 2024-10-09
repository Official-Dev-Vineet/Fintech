import "./styles/contactUs.css";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../helper/Hooks";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  useDocumentTitle("Contact Us || Chagans Technologies ltd");
  const handleChange = (e) => {
    const { name, value } = e.target;
    const filterInputStringToPreventSQLInjection = (input) => {
      return input.replace(/[^a-zA-Z0-9\s.-@%]/g, "");
    };
    setFormData((prevState) => ({
      ...prevState,
      [name]: filterInputStringToPreventSQLInjection(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="top max-width contact">
      <div className="container">
        <span className="big-circle"></span>
        <img src="img/shape.png" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let&apos;s get in touch</h3>
            <p className="text">
              We&apos;re here to help and answer any question you might have. We
              look forward to hearing from you.
            </p>

            <div className="info">
              <div className="information">
                <GrLocation />
                <p>
                  Chagans Technologies Ltd : SCO-4, Dayal Bagh Market,
                  Sector-39, Faridabad- 121009{" "}
                </p>
              </div>
              <div className="information">
                <MdOutlineEmail />
                <Link to="mailto:info@chagans.com">info@chagans.com</Link>
              </div>
              <div className="information">
                <MdOutlinePhone />
                <Link to="tel:01294020010">01294020010</Link>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to="https://www.facebook.com/"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to="https://twitter.com/"
                >
                  <FaXTwitter />
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to="https://www.instagram.com/"
                >
                  <FaInstagram />
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  to="https://www.youtube.com/"
                >
                  <FiYoutube />
                </Link>
              </div>
            </div>
          </div>

          <div className="contact-form ">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form onSubmit={handleSubmit}>
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="name"
                  required
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="name">Name</label>
                {/* <span>Email</span> */}
              </div>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  required
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                {/* <span>Email</span> */}
              </div>
              <div className="input-container">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  className="input"
                  onChange={handleChange}
                />
                <label htmlFor="tel">Phone</label>
                {/* <span>Phone</span> */}
              </div>
              <div className="input-container textarea">
                <textarea
                  name="message"
                  className="input"
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message">Message</label>
                {/* <span>Message</span> */}
              </div>
              <input type="submit" value="Send" className="btn" />
            </form>
          </div>
        </div>
      </div>
      <section className="map">
        <h2 className="heading">
          Find us on <span>Google Maps</span>
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14026.22709944187!2d77.29604631706889!3d28.49289179622721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1727769218162!5m2!1sen!2sin"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  );
};

export default ContactUs;
