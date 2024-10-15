


import { useState } from "react";
import "./styles/Utility.css";
import Mobile from "./services/Mobile";
import Popup from "./Popup";
import Fastag from "./services/Fastag";
const Utility = () => {
  const [service, setService] = useState("");

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
      <h2 className="subTitle">Our Utility services</h2>
      <p className="description">
        We provide the following utility services to our customers. You can
        easily find the service you need from the list below.
      </p>

      <div className="services">
       
        
      </div>
    </section>
  );
};

export default Utility;
