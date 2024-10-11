import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";
import { setCookie } from "./commonFunc";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [data, setData] = useState({});
  const [location, setLocation] = useState(null); // state for storing location

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's location when the component loads
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchEmail = async () => {
    if (!location) {
      console.error("Location not available. Cannot make API call.");
      return;
    }

    setLoading(true);
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${url}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Latitude: location.latitude,
        Longitude: location.longitude,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setApiData(result);
    setIsEmailCheck(result.success);
    setLoading(false);
  };

  const verifyOtp = async () => {
    if (!location) {
      console.error("Location not available. Cannot make API call.");
      return;
    }

    setLoading(true);
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${url}/admin/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Latitude: location.latitude,
        Longitude: location.longitude,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setApiData(result);
    setCookie("token", result.token, 1);
    result.code === 200 && navigate("/admin/dashboard");
    result.code === 403 && setIsEmailCheck(false);
    setLoading(false);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (!location) {
      alert("Location not available. Please allow location access.");
      return;
    }
    isEmailCheck ? verifyOtp() : fetchEmail();
  };

  return (
    <main className="login max-width">
      <form onSubmit={submitData} className={loading ? "loading" : ""}>
        <div className="inputField">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            value={data.email || ""}
            onChange={(e) =>
              setData((pre) => ({
                ...pre,
                email: e.target.value,
              }))
            }
            placeholder="Enter Your Email"
          />
        </div>
        {isEmailCheck && (
          <div className="inputField">
            <label htmlFor="otp">Enter Otp</label>
            <input
              type="text"
              required
              value={data.otp || ""}
              maxLength={6}
              pattern="^[0-9]{6}$"
              onChange={(e) =>
                setData((pre) => ({
                  ...pre,
                  otp: e.target.value,
                }))
              }
              placeholder="Enter Otp"
            />
          </div>
        )}
        {apiData?.message && (
          <p className={`msg ${apiData?.code === 200 && "success"}`}>
            {apiData?.message}
            {apiData?.attemptLeft
              ? `(${apiData?.attemptLeft} attempts left)`
              : ""}
          </p>
        )}
        <button type="submit" disabled={loading}>
          {apiData?.code !== 200 ? "Submit" : "Verify OTP"}
        </button>
      </form>
    </main>
  );
};

export default Login;
