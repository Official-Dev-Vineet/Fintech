import { useState } from "react";
import "./styles/Register.css";
import { scrollToTop } from "../helper/Hooks";
import { Link } from "react-router-dom";
const Register = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const checkData = () => {
    if (
      data.name &&
      data.email &&
      data.phone &&
      data.address &&
      data.password
    ) {
      setError(""); // Clear error if all data is correct
      setStep(2);
      scrollToTop();
    } else {
      setError("Please fill all the fields");
    }
  };

  const checkOtp = () => {
    if (otp.length === 6) {
      setIsOtpVerified(true);
      scrollToTop();
      setStep(4);
      setError("");
    } else {
      setError("Please enter a valid OTP");
    }
  };

  const checkCompanyData = () => {
    if (data.shopName && data.shopAddress) {
      setStep(3);
      setError("");
      scrollToTop();
    } else {
      setError("Please fill all details");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main>
      <div className="register-header">
        <h1>Register</h1>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <div className="register-container">
        <div className="register-form">
          {step === 1 && (
            <>
              <h2 className="subTitle">Personal Details</h2>
              <div className="inputGroups">
                <div className="inputGroup">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    value={data.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter your mobile"
                    value={data.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="address">Address</label>
                  <textarea
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                    rows={5}
                    value={data.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter a password"
                    value={data.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button className="nextBtn" onClick={checkData}>
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <h2 className="subTitle">Shop Details</h2>
              <div className="inputGroups">
                <div className="inputGroup">
                  <label htmlFor="shopName">Shop Name</label>
                  <input
                    type="text"
                    name="shopName"
                    id="shopName"
                    placeholder="Enter your shop name"
                    value={data.shopName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="inputGroup">
                  <label htmlFor="shopAddress">Shop Address</label>
                  <textarea
                    name="shopAddress"
                    id="shopAddress"
                    placeholder="Enter your shop address"
                    rows={5}
                    value={data.shopAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button className="nextBtn" onClick={checkCompanyData}>
                Next
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <h2 className="subTitle">OTP Verification</h2>
              <div className="inputGroups">
                <div className="inputGroup">
                  <label htmlFor="otp">Enter OTP</label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="nextBtn" onClick={checkOtp}>
                Verify
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="subTitle">User Profile</h2>
              <div className="inputGroups">
                <div className="inputGroup">
                  <label htmlFor="profile">Upload Profile</label>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    placeholder="Upload your profile"
                    onChange={(e) => setUserProfile(e.target.files[0])}
                    required
                  />
                </div>
              </div>
              <button
                className="nextBtn"
                onClick={() => {
                  setLoading(true);
                  // Simulate API call or other submission logic here
                  setTimeout(() => {
                    setSuccess(true);
                    setLoading(false);
                  }, 2000); // Simulate 2-second delay for submission
                }}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              {success && (
                <p className="success-message">Registration Successful!</p>
              )}
            </>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </main>
  );
};

export default Register;
