import { useState } from "react";

import "./styles/login.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [data, setData] = useState({});

  const fetchEmail = async () => {
    setLoading(true);
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${url}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setApiData(result);
    setIsEmailCheck(result.success);
    setLoading(false);
  };

  const verifyOtp = async () => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${url}/admin/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    setApiData(result);
    result.code === 403 && setIsEmailCheck(false);
    setLoading(false);
  };
  const submitData = (e) => {
    e.preventDefault();
    isEmailCheck ? verifyOtp() : fetchEmail();
  };

  return (
    <main className="login max-width">
      <form onSubmit={submitData} className={loading ? "loading" : ""}>
        <div className="inputField">
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => {
              setData((pre) => {
                return {
                  ...pre,
                  email: e.target.value,
                };
              });
            }}
            placeholder="Enter Your Email"
          />
        </div>
        {isEmailCheck && (
          <div className="inputField">
            <label htmlFor="otp">Enter Otp</label>
            <input
              type="text"
              required
              value={data.otp}
              maxLength={6}
              pattern="^[0-9]{6}$"
              onChange={(e) => {
                setData((pre) => {
                  return {
                    ...pre,
                    otp: e.target.value,
                  };
                });
              }}
              placeholder="Enter Otp"
            />
          </div>
        )}
        {apiData?.message && (
          <p className={`msg ${apiData?.code === 200 && "success"}`}>
            {apiData?.message}{" "}
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
