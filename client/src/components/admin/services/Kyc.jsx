import { useNavigate } from "react-router-dom";
import { getCookie } from "../commonFunc";
import { useEffect, useState } from "react";
import "./styles/Kyc.css";

const Kyc = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    AadharNo: "",
    panNo: "",
    AadharCardImage: null,
    panCardImage: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "AadharCardImage" || name === "panCardImage"
          ? e.target.files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const token = getCookie("token");
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/user/kycDocument`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit KYC data");
      }

      const result = await response.json();
      console.log("KYC submission successful:", result);
      // Redirect or show a success message here if necessary
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validateAadharNo = (value) => /^\d*$/.test(value) && value.length <= 12;
  const validatePanNo = (value) =>
    /^[A-Z]{0,5}[0-9]{0,4}[A-Z]{0,1}$/.test(value) && value.length <= 10;

  return (
    <section className="kyc">
      <form className="kyc_form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2 className="subTitle">KYC</h2>
          <p className="description">
            We are going to verify your identity. This process will take 24
            hours.
          </p>
        </div>
        <div className="inputField">
          <label htmlFor="AadharNo">Aadhar No</label>
          <input
            type="text"
            name="AadharNo"
            placeholder="Aadhar Number"
            id="AadharNo"
            maxLength={12}
            required
            value={formData.AadharNo}
            onChange={(e) =>
              validateAadharNo(e.target.value) && handleInputChange(e)
            }
          />
        </div>
        <div className="inputField">
          <label htmlFor="AadharCard">Aadhar Card Photo</label>
          <input
            type="file"
            name="AadharCardImage"
            id="AadharCard"
            accept="image/*"
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="inputField">
          <label htmlFor="panNo">PAN No</label>
          <input
            type="text"
            name="panNo"
            placeholder="PAN Number"
            id="panNo"
            required
            maxLength={10}
            value={formData.panNo}
            onChange={(e) =>
              validatePanNo(e.target.value) && handleInputChange(e)
            }
          />
        </div>
        <div className="inputField">
          <label htmlFor="panCard">PAN Card Photo</label>
          <input
            type="file"
            name="panCardImage"
            id="panCard"
            accept="image/*"
            required
            onChange={handleInputChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Kyc;
