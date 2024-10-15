import { useDocumentTitle } from "../helper/Hooks";
import "./styles/AboutUs.css";
const AboutUs = () => {
  useDocumentTitle("About Us || Chagans Technologies ltd");
  return (
    <main className="AboutUs">
      <div className="max-width">
        <div className="about-header">
          <div className="imageContainer">
            <img
              src="https://cdn.dribbble.com/users/1732368/screenshots/16255555/media/4e3d5e1ffd75982cd0c013dd16c6c968.gif"
              alt="fintech"
            />

            <div className="hide"></div>
          </div>

          <div className="textContainer">
            <h1>About Us</h1>
            <h2>Welcome to Chagans Technologies Limited</h2>
            <p>
              Welcome to Chagans Technologies Limited – your go-to platform for
              all utility services! At chagans.com, we offer a one-stop digital
              solution for all your recharge and bill payment needs, serving
              happy customers across India. Our platform makes it easy to handle
              everything, whether it’s prepaid mobile recharges, postpaid bill
              payments, DTH, electricity, landline, gas, water, or broadband
              services. We provide a reliable, user-friendly experience that
              simplifies your utility management. At chagans.com, we’re
              committed to offering a smooth and hassle-free experience,
              ensuring that every transaction is quick and secure. We aim to be
              your trusted choice for managing all your utilities, bringing you
              back time and again for your everyday needs.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
