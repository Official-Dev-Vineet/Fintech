import "./styles/ContentBox.css";
import payOut from "../../assets/payout.png";
import creditCard from "../../assets/creditCard.png";
import rentAgreement from "../../assets/rentAgreement.png";
import affidavit from "../../assets/affidavit.png";
import w2wIcon from "../../assets/w2wIcon.png";
import loanPayerIcon from "../../assets/loanpayerIcon.png";
import Insurance from "../../assets/insurance.png";
import mobileIcon from "../../assets/mobileIcon.png";
import DTHIcon from "../../assets/DTHIcon.png";
import electricityIcon from "../../assets/electricityIcon.png";
import fastagIcon from "../../assets/fasttagIcon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { getCookie } from "./commonFunc";
import Popup from "./Popup";
import WalletToWallet from "./services/WalletToWallet";
import Mobile from "./services/Mobile";

const ContentBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNo: "",
    amountPay: "",
  });
  const { state } = useLocation();
  const [userData, setUserData] = useState(state);

  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [walletTransfer, setWalletTransfer] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Simple validation for required fields
    if (!formData.cardNo || !formData.amountPay) {
      setErrorMessage("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = getCookie("token");
      // Make the API request to pay the credit card bill
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/payment/creditCard`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            latitude: location.latitude,
            longitude: location.longitude,
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process payment.");
      }

      const data = await response.json();
      data.code === 200 && setFormData({ cardNo: "", amountPay: "" });
    } catch (error) {
      setErrorMessage(error.message || "Payment failed. Try again later.");
    }
  };
  // Array of greeting messages
  const greetings = {
    morning: [
      "Good morning! Wishing you a day full of positive energy and great opportunities!",
      "Rise and shine! Hope your day is as bright as your smile!",
      "Good morning! May today bring you closer to your goals and dreams!",
    ],
    afternoon: [
      "Good afternoon! Hope your day is going well and productive!",
      "Hello! Sending you some positive vibes to get through the rest of the day!",
      "Good afternoon! Keep pushing, you're doing great!",
    ],
    evening: [
      "Good evening! Time to relax and unwind after a productive day.",
      "Hope your evening is filled with peace and calm!",
      "Good evening! Let the night bring you comfort and relaxation.",
    ],
    night: [
      "Good night! Rest well and wake up refreshed for a brand new day.",
      "Wishing you a peaceful and restful night. Sweet dreams!",
      "Good night! May your dreams be sweet and your rest be deep.",
    ],
  };

  // Function to get a random greeting based on local time
  function getGreeting() {
    const hour = new Date().getHours();
    let greetingCategory;

    if (hour >= 5 && hour < 12) {
      greetingCategory = "morning";
    } else if (hour >= 12 && hour < 16) {
      greetingCategory = "afternoon";
    } else if (hour >= 16 && hour < 21) {
      greetingCategory = "evening";
    } else {
      greetingCategory = "night";
    }

    // Get a random greeting from the selected category
    const messages = greetings[greetingCategory];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  }

  const token = getCookie("token");
  const fetchBalance = async (e) => {
    const target = e.target;

    if (!token) {
      alert("Please login to continue");
      navigate("/login");
    } else {
      try {
        target.onclick = null;
        target.innerText = "Fetching balance...";
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/user/checkBalance`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch balance.");
        }
        const data =await res.json();
        console.log(data);
        data?.success && (target.innerText = "₹ " + data.balance);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className="contentBox">
      <div className="headerArea">
        <h2>
          Welcome,{" "}
          <span className="themeText">
            {userData?.name || "Chagans Services"}
          </span>
        </h2>
        <p className="greeting">{getGreeting()}</p>
      </div>
      <div className="contentHeader">
        <div className="card">
          <h3>{userData?.companyDetails?.shopName}</h3>
          <h4>Account Name: Suraj Yadav</h4>
          <p className="cardNumber">
            {" "}
            +91 **** ** {userData?.phoneNumber.toString().slice(-4)}{" "}
          </p>
          <p>
            balance :{" "}
            <span className="balance" onClick={fetchBalance}>
              ₹ ***
            </span>
          </p>
        </div>
      </div>

      <div className="contentBody">
        <div className="services">
          <Link to={"/admin/payout"} className="service">
            <div className="imageWrapper">
              <img src={payOut} alt="payout" />
            </div>
            <h3>Payout</h3>
          </Link>
          <Link onClick={() => setIsOpen(true)} className="service">
            <div className="imageWrapper">
              <img src={creditCard} alt="creditCard" />
            </div>
            <h3>Credit Card</h3>
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
          <Link to={"/loan-payer"} className="service">
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
          <Link onClick={() => setWalletTransfer(true)} className="service">
            <div className="imageWrapper">
              <img src={w2wIcon} alt="creditCard" />
            </div>
            <h3>Wallet to Wallet</h3>
          </Link>
          <Link to="/admin/insurance" className="service">
            <div className="imageWrapper">
              <img src={Insurance} alt="insurance" />
            </div>
            <h3>Insurance</h3>
          </Link>
        </div>
        {walletTransfer && (
          <Popup
            cmp={<WalletToWallet />}
            func={() => setWalletTransfer(false)}
          />
        )}
        {service === "Mobile" && (
          <Popup cmp={<Mobile />} func={() => setService("")} />
        )}
        {service === "FASTag" && (
          <Popup cmp={<Fastag />} func={() => setService("")} />
        )}
        {isOpen && (
          <div className={`creditSide ${isOpen ? "open" : ""}`}>
            <aside className="creditSideBar">
              <h2>Enter Card details</h2>
              <button onClick={() => setIsOpen(false)} className="closeBtn">
                <IoMdCloseCircle />
              </button>
              <form className="creditCard" onSubmit={handleSubmit}>
                <div className="inputField">
                  <input
                    type="text"
                    pattern="^[0-9]{16}$"
                    placeholder="Enter Card Number "
                    required
                    maxLength={16}
                    id="cardNo"
                    value={formData.cardNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="inputField">
                  <input
                    type="text"
                    pattern="^[0-9]+$"
                    required
                    placeholder="Enter Amount Rs. "
                    id="amountPay"
                    value={formData.amountPay}
                    onChange={handleInputChange}
                  />
                </div>
                {errorMessage && <p className="error">{errorMessage}</p>}

                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Pay Now"}
                </button>
              </form>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentBox;
