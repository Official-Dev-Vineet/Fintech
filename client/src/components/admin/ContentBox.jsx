import "./styles/ContentBox.css";
import payOut from "../../assets/payout.png";
import utility from "../../assets/utility.png";
import creditCard from "../../assets/creditCard.png";
import rentAgreement from "../../assets/rentAgreement.png";
import affidavit from "../../assets/affidavit.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { getCookie } from "./commonFunc";

const ContentBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    cardNo: "",
    amountPay: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/payment/creditCard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          latitude: location.latitude,
          longitude: location.longitude,
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to process payment.");
      }

      const data = await response.json();
      alert("Payment Successful!");
      setIsOpen(false);
    } catch (error) {
      setErrorMessage(error.message || "Payment failed. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="contentBox">
      <div className="contentHeader">
        <div className="card">
          <h3>Chagans Fintech</h3>
          <h4>Card Holder Name : Admin</h4>
          <p className="cardNumber"> **** **** **** 1234 </p>
          <p>balance : ₹ 500</p>
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

          <Link to={"/admin/utility"} className="service">
            <div className="imageWrapper">
              <img src={utility} alt="utility" />
            </div>
            <h3>Utility</h3>
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
        </div>
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
      </div>
    </section>
  );
};

export default ContentBox;
