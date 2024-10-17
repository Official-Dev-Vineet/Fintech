import { useState, useEffect } from "react";
import "./styles/Register.css";
import { scrollToTop } from "../helper/Hooks";
import { Link } from "react-router-dom";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div className="inputGroup">
    <label htmlFor={name}>{label}</label>
    {type === "textarea" ? (
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        rows={5}
        value={value}
        onChange={onChange}
        required={required}
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    )}
  </div>
);

const Register = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    shopName: "",
    shopAddress: "",
  });
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [otp, setOtp] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLocation({ lat: null, lon: null }); // Set to null or handle as needed
          }
        );
      }
    };
    fetchLocation();
  }, []);

  const checkData = () => {
    const { name, email, phone, address } = data;
    if (name && email && phone && address) {
      setError("");
      setStep(2);
    } else {
      setError("Please fill all personal details");
    }
    scrollToTop();
  };

  const checkOtp = () => {
    if (otp.length === 6) {
      setStep(4);
      setError("");
    } else {
      setError("Please enter a valid OTP");
    }
    scrollToTop();
  };

  const sendOtp = async () => {
    const { email } = data;
    // Send OTP logic here
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/sendOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Latitude": location.lat,
            "X-Longitude": location.lon,
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();
      if (result.code === 200) {
        setOtp(result.otp);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkCompanyData = () => {
    const { shopName, shopAddress } = data;
    if (shopName && shopAddress) {
      setStep(3);
      setOtp();
      setError("");
      sendOtp();
    } else {
      setError("Please fill all shop details");
    }
    scrollToTop();
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/verifyOtp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            latitude: location.lat,
            longitude: location.lon,
          },
          body: JSON.stringify({
            otp: otp,
            email: data.email,
            phoneNumber: data.phone,
            name: data.name,
            address: data.address,
            companyDetials: {
              shopName: data.shopName,
              shopAddress: data.shopAddress,
            },
          }),
        }
      );
      const result = await response.json();
      if (result.code === 200) {
        setStep(4);
        setError("");
      } else {
        setError("Please enter a valid OTP");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // Send registration data to server
    const formData = new FormData();
    formData.append("userProfileImage", userProfile);
    formData.append("email", data.email);
    try {
      // Simulate API call or other submission logic here
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/userProfile`, // Update with the correct endpoint
        {
          method: "POST",
          headers: {
            latitude: location.lat,
            longitude: location.lon,
          },
          body: formData, // Send necessary data
        }
      );

      const result = await response.json();
      if (result.code === 200) {
        setSuccess(true);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
                <InputField
                  label="Name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
                <InputField
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile"
                />
                <InputField
                  label="Address"
                  type="textarea"
                  name="address"
                  value={data.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                />
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
                <InputField
                  label="Shop Name"
                  type="text"
                  name="shopName"
                  value={data.shopName}
                  onChange={handleInputChange}
                  placeholder="Enter your shop name"
                />
                <InputField
                  label="Shop Address"
                  type="textarea"
                  name="shopAddress"
                  value={data.shopAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your shop address"
                />
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
                <InputField
                  label="Enter OTP"
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
              <button className="nextBtn" onClick={verifyOtp}>
                Verify
              </button>
            </>
          )}
          {step === 4 && (
            <>
              <h2 className="subTitle">User Profile</h2>
              <div className="inputGroups">
                <InputField
                  label="Upload Profile"
                  type="file"
                  name="profile"
                  onChange={(e) => setUserProfile(e.target.files[0])}
                />
              </div>
              <button className="nextBtn" onClick={handleSubmit}>
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
