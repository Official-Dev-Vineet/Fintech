import { useState, useEffect } from "react";
import "./styles/Rental.css";
import LeaseAgreement from "../decorators/LeaseAgreement";

const Rental = () => {
  // Initialize state from localStorage if available
  const [step, setStep] = useState(1);
  const [data, setData] = useState(
    JSON.parse(localStorage?.getItem("rentalData")) || {}
  );

  // Update localStorage whenever the data changes
  useEffect(() => {
    localStorage.setItem("rentalData", JSON.stringify(data));
  }, [data]);

  const stepUpRental = () => {
    if (data.type) {
      setStep(3);
    } else {
      alert("Please select a type");
    }
  };

  const checkState = () => {
    if (data.state) {
      setStep(4);
    } else {
      alert("Please select a state");
    }
  };

  const stepUpDelivery = () => {
    if (data.delivery) {
      setStep(5);
    } else {
      alert("Please select a delivery type");
    }
  };

  const collectPersonalDetails = () => {
    if (data.name && data.fName && data.address && data.idNumber) {
      setStep(6);
    } else {
      alert("Please fill out your personal details");
    }
  };

  const ValidatePersonalDetails = () => {
    if (
      data.nameOpponent &&
      data.fNameOpp &&
      data.addressOpponent &&
      data.idNumberOpposite
    ) {
      setStep(7);
    } else {
      alert("Please fill out your personal details");
    }
  };
  const validateProperty = () => {
    if (data.propertyPrice && data.propertyAddress && data.propertyName) {
      setStep(8);
    } else {
      alert("Please select a property");
    }
  };
  return (
    <main className="rental">
      <div className="max-width">
        <h1 className="subTitle">Rent Agreement</h1>
        <div className="rentalWrapper">
          <div className="formWrapper">
            {step === 1 && (
              <div className="form">
                <p>
                  Create and manage rental agreements with ease. Our platform
                  provides templates and customization options for landlords and
                  tenants, ensuring clear terms and legal compliance.
                </p>
                <button className="btn" onClick={() => setStep(2)}>
                  Start
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form">
                <p>
                  You are applying for a{" "}
                  <strong className="themeText">Rent agreement</strong> as:
                </p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${data.type === "landlord" && "active"}`}
                    value="Landlord"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        type: "landlord",
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${data.type === "tenant" && "active"}`}
                    value="Tenant"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        type: "tenant",
                      }))
                    }
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(1)}>
                    Previous
                  </button>
                  <button className="btn" onClick={stepUpRental}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form">
                <p>Select the state in which you want to apply for:</p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${data.state === "haryana" && "active"}`}
                    value="Haryana (Stamp Paper - 101)"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        state: "haryana",
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <input
                    type="button"
                    className="input"
                    value="Other"
                    onClick={() =>
                      alert(
                        "Sorry, we currently do not provide services in other states"
                      )
                    }
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(2)}>
                    Previous
                  </button>
                  <button className="btn" onClick={checkState}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form">
                <p>Select the preferred mode of delivery:</p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${
                      data.delivery === "softcopy" && "active"
                    }`}
                    value="Soft Copy (RS-0)"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        delivery: "softcopy",
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${
                      data.delivery === "homedelivery" && "active"
                    }`}
                    value="Home delivery (Charge Applicable)"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        delivery: "homedelivery",
                      }))
                    }
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(3)}>
                    Previous
                  </button>
                  <button className="btn" onClick={stepUpDelivery}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="form">
                <p>Enter Landlord's Details</p>

                <div className="inputField">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.name || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Father name:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.fName || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        fName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Address:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.address || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        address: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="inputField">
                  <label>ID Type:</label>
                  <select
                    className="input"
                    value={data.idType || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        idType: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select ID Type
                    </option>
                    <option value="aadhaar">Aadhaar</option>
                    <option value="passport">Passport</option>
                    <option value="voterID">Voter ID</option>
                    <option value="drivingLicense">Driving License</option>
                  </select>
                </div>

                <div className="inputField">
                  <label>
                    {data.idType === "aadhaar" ? "Aadhaar Number" : "ID Number"}
                    :
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={data.idNumber || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        idNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(4)}>
                    Previous
                  </button>
                  <button className="btn" onClick={collectPersonalDetails}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="form">
                <p>
                  Enter Details Of{" "}
                  {data.type === "landlord" ? "Tenant" : "Landlord"}:
                </p>
                {/* Additional details for the opposite party */}
                <div className="inputField">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.nameOpponent || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        nameOpponent: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Father Name:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.fNameOpp || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        fNameOpp: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Address:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.addressOpponent || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        addressOpponent: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>ID Type:</label>
                  <select
                    className="input"
                    value={data.idTypeOpposite || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        idTypeOpposite: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select ID Type
                    </option>
                    <option value="aadhaar">Aadhaar</option>
                    <option value="passport">Passport</option>
                    <option value="voterID">Voter ID</option>
                    <option value="drivingLicense">Driving License</option>
                  </select>
                </div>

                <div className="inputField">
                  <label>
                    {data.idTypeOpposite === "aadhaar"
                      ? "Aadhaar Number"
                      : "ID Number"}
                    :
                  </label>
                  <input
                    type="text"
                    className="input"
                    value={data.idNumberOpposite || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        idNumberOpposite: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(5)}>
                    Previous
                  </button>
                  <button
                    className="btn"
                    onClick={() => ValidatePersonalDetails()}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            {step == 7 && (
              <>
                <p>Type Of Property:</p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${
                      data.propertyType === "residential" ? "active" : ""
                    }`}
                    value="Residential"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        propertyType: "residential",
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${
                      data.propertyType === "commercial" ? "active" : ""
                    }`}
                    value="Commercial"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        propertyType: "commercial",
                      }))
                    }
                  />
                </div>
                {data.propertyType === "residential" && (
                  <>
                    <p>Property Name:</p>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "house" ? "active" : ""
                        }`}
                        value="House"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "house",
                          }))
                        }
                      />
                    </div>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "apartment" ? "active" : ""
                        }`}
                        value="Apartment"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "apartment",
                          }))
                        }
                      />
                    </div>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "room" ? "active" : ""
                        }`}
                        value="Room"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "room",
                          }))
                        }
                      />
                    </div>
                  </>
                )}
                {data.propertyType === "commercial" && (
                  <>
                    <p>Property Name:</p>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "shop" ? "active" : ""
                        }`}
                        value="Shop"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "shop",
                          }))
                        }
                      />
                    </div>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "office" ? "active" : ""
                        }`}
                        value="Office"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "office",
                          }))
                        }
                      />
                    </div>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "warehouse" ? "active" : ""
                        }`}
                        value="Warehouse"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "warehouse",
                          }))
                        }
                      />
                    </div>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "factory" ? "active" : ""
                        }`}
                        value="Factory"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "factory",
                          }))
                        }
                      />
                    </div>
                  </>
                )}

                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(7)}>
                    Previous
                  </button>
                  <button className="btn" onClick={() => setStep(8)}>
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 8 && (
              <div className="form">
                <p>Fill the details of Property:</p>
                {/* Additional details for the opposite party */}

                <div className="inputField">
                  <label>Property Address:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.propertyAddress || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        propertyAddress: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Property Price:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.propertyPrice || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        propertyPrice: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(6)}>
                    Previous
                  </button>
                  <button className="btn" onClick={() => validateProperty()}>
                    Preview
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="preview">
            <LeaseAgreement data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rental;
