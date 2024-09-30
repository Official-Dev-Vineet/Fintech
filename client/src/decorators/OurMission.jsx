import { Link } from "react-router-dom";
import "./styles/OurMission.css";

const OurMission = () => {
  return (
    <section className="ourMission">
      <div className="imageContainer">
        <img src="https://img.freepik.com/premium-photo/man-touching-mission-text-screen_218381-4228.jpg" alt="our mission" />
      </div>
      <div className="textWrapper">
        <h2 className="subTitle">Our mission</h2>
        <p>
          At <span className="themeText">Chagans Business Center</span>, our
          goal is to help businesses manage their finances more easily using
          modern technology. We provide simple, secure, and reliable financial
          tools to help businesses with payments, loans, and financial planning.
          Our focus is on making financial services easier to use, so businesses
          can grow and succeed in today’s digital world.
        </p>
        <Link to="/about-us">Read more</Link>
      </div>
    </section>
  );
};

export default OurMission;
