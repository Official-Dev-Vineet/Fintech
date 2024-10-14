import mobileIcon from "../../assets/mobileIcon.png";
import DTHIcon from "../../assets/dthIcon.png";
import electricityIcon from "../../assets/electricityIcon.png";
import fastagIcon from "../../assets/fasttagIcon.png";


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
        {service === "Mobile" && (
          <Popup cmp={<Mobile />} func={() => setService("")} />
        )}
        {
          service === "FASTag" && (<Popup cmp={<Fastag />} func={() => setService("")} />)
        }
      </div>
    </section>
  );
};

export default Utility;
