import mobileIcon from "../../assets/mobileIcon.png";
import DTHIcon from "../../assets/DTHIcon.png";
import electricityIcon from "../../assets/electricityIcon.png";
import fastagIcon from "../../assets/fasttagIcon.png";
import creditCard from "../../assets/creditCard.png";
import rentAgreement from "../../assets/rentAgreement.png";
import affidavit from "../../assets/affidavit.png";
import loanPayerIcon from "../../assets/loanpayerIcon.png";
import Insurance from "../../assets/insurance.png";

import { useState } from "react";
import "./styles/Utility.css";
import Mobile from "./services/Mobile";
import Popup from "./Popup";
import Fastag from "./services/Fastag";
import { Link } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
const Utility = () => {
  const serviceList = [
    {
      name: "Mobile",
      icon: mobileIcon,
    },
    {
      name: "Dth",
      icon: DTHIcon,
    },
    {
      name: "Electricity",
      icon: electricityIcon,
    },
    {
      name: "FASTag",
      icon: fastagIcon,
    },
  ];
  return (
    <section className="utility">
      <div className="utilityHeader"></div>
      <div className="info">
        {" "}
        <h2 className="subTitle">Our Utility services</h2>
        <p className="description">
          We provide the following utility services to our customers. You can
          easily find the service you need from the list below.
        </p>
      </div>
      <div className="services">
        <Link className="service">
          <div className="imageWrapper">
            <img src={creditCard} alt="creditCard" />
          </div>
          <h3>Credit Card Bill Payment</h3>
        </Link>
        <Link className="service">
          <div className="imageWrapper">
            <img src={Insurance} alt="insurance" />
          </div>
          <h3>Insurance</h3>
        </Link>
        <Link to={"/rental-agreement"} className="service">
          <div className="imageWrapper">
            <img src={rentAgreement} alt="utility" />
          </div>
          <h3>Rent Agreement</h3>
        </Link>
        <Link to={"/affidavit"} className="service">
          <div className="imageWrapper">
            <img src={affidavit} alt="creditCard" />
          </div>
          <h3>Affidavit</h3>
        </Link>
        <Link className="service">
          <div className="imageWrapper">
            <img src={loanPayerIcon} alt="creditCard" />
          </div>
          <h3>Loan Repayment</h3>
        </Link>
        {serviceList.map((item) => (
          <div
            className="service"
            key={item.name}
            onClick={() => setService(item.name)}
          >
            <div className="imageWrapper">
              <img src={item.icon} alt={item.name} />
            </div>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Utility;
